//BEGIN LICENSE BLOCK 
//Interneuron Terminus

//Copyright(C) 2024  Interneuron Limited

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
import { AppConfig } from '../../app.config';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  releaseNumber : string;
  buildNumber : string;
  CALabelPath : string;
  SBOMPath: string;
  constructor() { }

  ngOnInit(): void {
    this.releaseNumber = AppConfig.settings.aboutScreen.releaseNumber;
    this.buildNumber = AppConfig.settings.aboutScreen.buildNumber;
    this.CALabelPath = AppConfig.settings.aboutScreen.CALabelPath;
    this.SBOMPath = AppConfig.settings.aboutScreen.SBOMPath;
  }

}