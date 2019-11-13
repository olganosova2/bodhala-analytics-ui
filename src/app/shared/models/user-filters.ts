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

  create(obj: any): any {
    obj = obj || {};
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
      matterOpenDates: obj.matterOpenDates || false,
      matterCloseDates: obj.matterCloseDates || false,
      dayOfMatter: obj.dayOfMatter || false,
      dayOfMatterRange: obj.dayOfMatterRange || false,
      opposingFirms: obj.opposingFirms || [],
      firmMatterCounts: this.getFirmMatterCounts(obj.firmMatterCounts),
      rangeTagFilters: obj.rangeTagFilters || {},
      selectTagFilters: obj.selectTagFilters || {},
      multiSelectTagFilters: obj.multiSelectTagFilters || {},
      loadedFilters: [],
      chosenFilters: obj.chosenFilters || [],
      updatedOptions: {}
    };
  }
}
