export interface ICommonFilters {
  clientId: number;
  startdate: string;
  enddate: string;
}
export interface IDatesRange {
  start: string;
  end: string;
}
export interface IDataFilters {
  matters: Array<string>;
  practiceAreas: Array<string>;
  firms: Array<string>;
  threshold: number;
  displayThreshold: number;
  linesOfBusiness: Array<string>;
  offices: Array<string>;
  clientCounsels: Array<string>;
  geographies: Array<string>;
  firmSizes: Array<number>;
  firmTypes: Array<string>;
  cities: Array<string>;
  states: Array<string>;
  courtLocations: Array<string>;
  courtTypes: Array<string>;
  utbmsCodes: Array<string>;
  excludeFirms: boolean;
  excludeMatters: boolean;
  excludePracticeAreas: boolean;
  excludeLineOfBusiness: boolean;
  excludeOffices: boolean;
  excludeClientCounsel: boolean;
  excludeGeography: boolean;
  excludeFirmType: boolean;
  excludeCourtLocations: boolean;
  excludeCourtTypes: boolean;
  excludeUtbmsCodes: boolean;
  genericFilter1: Array<string>;
  genericFilter2: Array<string>;
  genericFilter3: Array<string>;
  genericFilter4: Array<string>;
  genericFilter5: Array<string>;
  genericFilter6: Array<string>;
  genericFilter7: Array<string>;
  genericFilter8: Array<string>;
  genericFilter9: Array<string>;
  genericFilter10: Array<string>;
  genericFilter11: Array<string>;
  genericFilter12: Array<string>;
  excludeGenericFilter1: boolean;
  excludeGenericFilter2: boolean;
  excludeGenericFilter3: boolean;
  excludeGenericFilter4: boolean;
  excludeGenericFilter5: boolean;
  excludeGenericFilter6: boolean;
  excludeGenericFilter7: boolean;
  excludeGenericFilter8: boolean;
  excludeGenericFilter9: boolean;
  excludeGenericFilter10: boolean;
  excludeGenericFilter11: boolean;
  excludeGenericFilter12: boolean;
  matterOpenDates: IDatesRange;
  matterCloseDates: IDatesRange;
  dayOfMatter: IDatesRange;
  dayOfMatterRange: string;
  opposingFirms: Array<string>;
  firmMatterCounts: Array<number>;
  rangeTagFilters: any;
  selectTagFilters: any;
  multiSelectTagFilters: any;
  loadedFilters: Array<any>;
  chosenFilters: Array<any>;
  updatedOptions: any;
  minFirmSize: number;
  maxFirmSize: number;
  minFirmMatterCount: number;
  maxFirmMatterCount: number;
  excludeOpposingFirms: boolean;
}
export class UserFiltersModel {
  getFirmSizes(sizes: Array<any>): Array<any> {
    if (!sizes || !sizes.length || sizes.length !== 2) {
      return [1, 501];
    }
    // backwards compatibility
    const min = sizes[0];
    const max = sizes[1];
    const minrange = [1, 26, 101, 501, 501];
    const maxrange = [1, 25, 100, 500, 501];
    if (min > 1 && min < 6) {
      sizes[0] = minrange[min - 1];
    }
    if (max > 1 && max < 6) {
      sizes[1] = maxrange[max - 1];
    }
    return sizes;
  }

  getDisplayThreshold(hrs: any): any {
    /**
     * Converts 8.25 hours
     * to 8 hours 15 mins
     */
    if (hrs) {
      const threshold = {} as any;
      const wholeHours = +hrs;
      const pctHours = hrs -= wholeHours;
      const mins = pctHours * 60;
      threshold.thresholdHours = wholeHours;
      threshold.thresholdMins = mins;
      return threshold;
    } else {
      return null;
    }
  }
  getFirmMatterCounts(sizes: Array<any>): Array<any> {
    if (!sizes || !sizes.length || sizes.length !== 2 ) {
      return [1, 1001];
    }
    return sizes;
  }

  create(obj: IDataFilters): IDataFilters {
    obj = obj || {} as any;
    return {
      matters: obj.matters || [],
      practiceAreas: obj.practiceAreas || [],
      firms: obj.firms || [],
      threshold: obj.threshold || 4,
      displayThreshold: this.getDisplayThreshold(obj.threshold) || this.getDisplayThreshold(4),
      linesOfBusiness: obj.linesOfBusiness || [],
      offices: obj.offices || [],
      clientCounsels: obj.clientCounsels || [],
      geographies: obj.geographies || [],
      firmSizes: this.getFirmSizes(obj.firmSizes),
      firmTypes: obj.firmTypes || [],
      cities: obj.cities || [],
      states: obj.states || [],
      courtLocations: obj.courtLocations || [],
      courtTypes: obj.courtTypes || [],
      utbmsCodes: obj.utbmsCodes || [],
      excludeFirms: obj.excludeFirms || false,
      excludeMatters: obj.excludeMatters || false,
      excludePracticeAreas: obj.excludePracticeAreas || false,
      excludeLineOfBusiness: obj.excludeLineOfBusiness || false,
      excludeOffices: obj.excludeOffices || false,
      excludeClientCounsel: obj.excludeClientCounsel || false,
      excludeGeography: obj.excludeGeography || false,
      excludeFirmType: obj.excludeFirmType || false,
      excludeCourtLocations: obj.excludeCourtLocations || false,
      excludeCourtTypes: obj.excludeCourtTypes || false,
      excludeUtbmsCodes: obj.excludeUtbmsCodes || false,
      genericFilter1: obj.genericFilter1 || [],
      genericFilter2: obj.genericFilter2 || [],
      genericFilter3: obj.genericFilter3 || [],
      genericFilter4: obj.genericFilter4 || [],
      genericFilter5: obj.genericFilter5 || [],
      genericFilter6: obj.genericFilter6 || [],
      genericFilter7: obj.genericFilter7 || [],
      genericFilter8: obj.genericFilter8 || [],
      genericFilter9: obj.genericFilter9 || [],
      genericFilter10: obj.genericFilter10 || [],
      genericFilter11: obj.genericFilter11 || [],
      genericFilter12: obj.genericFilter12 || [],
      excludeGenericFilter1: obj.excludeGenericFilter1 || false,
      excludeGenericFilter2: obj.excludeGenericFilter2 || false,
      excludeGenericFilter3: obj.excludeGenericFilter3 || false,
      excludeGenericFilter4: obj.excludeGenericFilter4 || false,
      excludeGenericFilter5: obj.excludeGenericFilter5 || false,
      excludeGenericFilter6: obj.excludeGenericFilter6 || false,
      excludeGenericFilter7: obj.excludeGenericFilter7 || false,
      excludeGenericFilter8: obj.excludeGenericFilter8 || false,
      excludeGenericFilter9: obj.excludeGenericFilter9 || false,
      excludeGenericFilter10: obj.excludeGenericFilter10 || false,
      excludeGenericFilter11: obj.excludeGenericFilter11 || false,
      excludeGenericFilter12: obj.excludeGenericFilter12 || false,
      matterOpenDates: obj.matterOpenDates,
      matterCloseDates: obj.matterCloseDates,
      dayOfMatter: obj.dayOfMatter,
      dayOfMatterRange: obj.dayOfMatterRange,
      opposingFirms: obj.opposingFirms || [],
      firmMatterCounts: this.getFirmMatterCounts(obj.firmMatterCounts),
      rangeTagFilters: obj.rangeTagFilters || {},
      selectTagFilters: obj.selectTagFilters || {},
      multiSelectTagFilters: obj.multiSelectTagFilters || {},
      loadedFilters: [],
      chosenFilters: obj.chosenFilters || [],
      updatedOptions: {},
      minFirmSize: 1,
      maxFirmSize: 501,
      minFirmMatterCount: 1,
      maxFirmMatterCount: 1001,
      excludeOpposingFirms: obj.excludeOpposingFirms || false
    };
  }
}
