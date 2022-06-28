//BEGIN LICENSE BLOCK 
//Interneuron Terminus

//Copyright(C) 2022  Interneuron CIC

//This program is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.

//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

//See the
//GNU General Public License for more details.

//You should have received a copy of the GNU General Public License
//along with this program.If not, see<http://www.gnu.org/licenses/>.
//END LICENSE BLOCK 


import { Component, OnInit } from '@angular/core';
import { Person } from '../../Models/person.model';
import { HeaderService } from '../../services/header.service';
import { AppConfig } from '../../app.config';
import { ApirequestService } from '../../services/apirequest.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as jwt_decode from "jwt-decode";
import { WebStorageService } from '../../services/webstorage.service';
import { SharedDataContainerService } from '../../services/shared-data-container.service';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css']
})
export class PatientSearchComponent implements OnInit {
 
  show: boolean = false;

  surname: string = '';

  firstName: string = '';

  dob: string = '';

  mrn: string = '';

  nhs: string = '';

  filterClause: string = '';

  filterParams: string = '';

  postBody: string = '';

  persons: Person[];

  searchMessage: string = "";

  logedinUserID: string;

  constructor(private apicaller: ApirequestService, private authService: AuthenticationService, private webStorageService: WebStorageService, private headerService: HeaderService, private sharedData: SharedDataContainerService) {
  }

  ngOnInit() {
    let decodedToken = this.authService.decodeAccessToken(this.authService.user.access_token);
    if (decodedToken != null) {

      this.logedinUserID = decodedToken.IPUId;
    }
  }
 
  patientSearch() {

    this.searchMessage = "Searching...";

    this.filterClause = '';

    this.filterParams = '';

    this.persons = [];

    this.show = false;

    let surnameClause: string = '', firstNameClause: string = '', dobClause: string = '', mrnClause: string = '', nhsClause: string = '';
    let surnameParam: string = '', firstNameParam: string = '', dobParam: string = '', mrnParam: string = '', nhsParam: string = '';

    if (this.surname) {
      surnameClause = "familyname like @familyname AND ";
      surnameParam = "{\"paramName\": \"familyname\", \"paramValue\": \"%" + this.surname + "%\"}, "
    }
    else {
      surnameClause = "";
      surnameParam = "";
    }

    if (this.firstName) {
      firstNameClause = "firstname like @firstname AND ";
      firstNameParam = "{\"paramName\": \"firstname\", \"paramValue\": \"%" + this.firstName + "%\"}, "
    }
    else {
      firstNameClause = "";
      firstNameParam = "";
    }

    if (this.dob) {
      dobClause = "dateofbirth = @dateofbirth AND ";
      dobParam = "{\"paramName\": \"dateofbirth\", \"paramValue\": \"" + this.dob + "\"}, "
    }
    else {
      dobClause = "";
      dobParam = "";
    }

    if (this.mrn) {
      mrnClause = "mrn = @mrn AND mrntypecode = '" + AppConfig.settings.mrnTypeCode + "' AND ";
      mrnParam = "{\"paramName\": \"mrn\", \"paramValue\": \"" + this.mrn + "\"}, "
    }
    else {
      mrnClause = "";
      mrnParam = "";
    }

    if (this.nhs) {
      nhsClause = "empi = @empi and empitypecode='" + AppConfig.settings.empiTypeCode + "' AND ";
      nhsParam = "{\"paramName\": \"empi\", \"paramValue\": \"" + this.nhs + "\"}, "
    }
    else {
      nhsClause = "";
      nhsParam = "";
    }

    if (this.surname || this.firstName || this.dob || this.mrn || this.nhs) {
      this.filterClause = this.filterClause.concat(surnameClause, firstNameClause, dobClause, mrnClause, nhsClause)
      this.filterClause = this.filterClause.slice(0, this.filterClause.length - 5);
      this.filterParams = this.filterParams.concat("[");
      this.filterParams = this.filterParams.concat(surnameParam, firstNameParam, dobParam, mrnParam, nhsParam)
      this.filterParams = this.filterParams.slice(0, this.filterParams.length - 2);
      this.filterParams = this.filterParams.concat("]");
    }

    if (this.filterClause && this.filterParams) {

      this.postBody = `[
                      {
                        "filters": [{
                            "filterClause": "` + this.filterClause + `"
                         }]
                      },
                      {
                        "filterparams": ` + this.filterParams + `
                      },
                      {
                        "selectstatement": "SELECT *"
                      },
                      {
                        "ordergroupbystatement": "ORDER BY 2"
                      }
                    ]`;

      this.apicaller.postRequest(AppConfig.settings.apiServices.find(x => x.serviceName == 'PostPatientSearch').serviceUrl, this.postBody)
        .then(
          (persons) => {
            this.persons = persons;
            if (this.persons.length > 0) {
              this.searchMessage = "Patients found";
              this.show = true;
            }
            else {
              this.searchMessage = "No patients found";
            }
          },
          error =>{this.searchMessage="Error"}
        );
    }
  }

  selectedPatient(person: Person) {
    if (this.sharedData.contexts != null) {
      this.sharedData.contexts = null;
      this.sharedData.contextField = "";
      this.webStorageService.removeLocalStorageItem("Terminus:" + this.logedinUserID + ":Contexts");
      this.webStorageService.removeLocalStorageItem("Terminus:" + this.logedinUserID + ":ContextField");
    }
    this.sharedData.personId = person.person_id;
    this.webStorageService.setLocalStorageItem("Terminus:" + this.logedinUserID + ":Patient", person.person_id);
    this.headerService.myPatientSelected.next(person.person_id);
  }

  resetModal() {
    this.headerService.myPatient.next(false);
    this.searchMessage='';
    this.surname = '';
    this.firstName = '';
    this.dob = '';
    this.mrn = '';
    this.nhs = '';
    this.persons = [];
    this.show = false;
  }

}
