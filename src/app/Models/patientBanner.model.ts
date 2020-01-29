// Interneuron Terminus
// Copyright(C) 2019  Interneuron CIC
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// See the
// GNU General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with this program.If not, see<http://www.gnu.org/licenses/>.

import { PatientBannerColumnLabelData } from './patientBannerColumnLabelData.model';

export class MainBannerData {
  leftSideTopRow: PatientBannerColumnLabelData;
  leftSideBottomRowFirst: PatientBannerColumnLabelData;
  leftSideBottomRowMiddle: PatientBannerColumnLabelData;
  leftSideBottomRowLast: PatientBannerColumnLabelData;
  extLeftSideBottomRowFirst: PatientBannerColumnLabelData;
  extLeftSideBottomRowLast: PatientBannerColumnLabelData;
  rightSideTopRowFirst: PatientBannerColumnLabelData;
  rightSideTopRowMiddle: PatientBannerColumnLabelData;
  rightSideTopRowLast: PatientBannerColumnLabelData;
  rightSideBottomRowFirst: PatientBannerColumnLabelData;
  rightSideBottomRowMiddle: PatientBannerColumnLabelData;
  rightSideBottomRowLast: PatientBannerColumnLabelData;
}

export class Column {
  header: string;
  data: PatientBannerColumnLabelData[];
  endpointUri: string;
}

export class PatientBanner {
  mainBanner: MainBanner;
  columns: Column[];
}

export class MainBanner {
  endpointUri: string;
  data: MainBannerData;
}