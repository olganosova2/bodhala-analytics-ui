import {Injectable} from '@angular/core';
import {UserService} from 'bodhala-ui-common';
import * as _moment from 'moment';
import {ICommonFilters, IDataFilters, UserFiltersModel} from '../models/user-filters';

const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  userFilters: IDataFilters;
  includeExpenses: boolean =  false;
  startDate: string = '2015-01-01';  // only for debugging on localhost:4000, on the server it always will be overwritten
  endDate: string = '2019-06-24';  // only for debugging on localhost:4000, on the server it always will be overwritten

  constructor(public userService: UserService,
              public filtersHelper: UserFiltersModel) {
  }

  setCurrentUserFilters(): void {
    const currentUser = this.userService.currentUser || 0;
    const serializedDates = localStorage.getItem('savedDates' + currentUser.client_info_id.toString());
    if (serializedDates) {
      const parsed = JSON.parse(serializedDates);
      this.startDate = parsed.start_date;
      this.endDate = parsed.end_date;
    }
    const serializedFilters = localStorage.getItem('filters_' + currentUser.id.toString());
    if (serializedFilters) {
      this.userFilters = Object.assign({}, JSON.parse(serializedFilters).dataFilters);
    }
    const serializedIncludeExpenses = localStorage.getItem('include_expenses_' + currentUser.id.toString());
    if (serializedIncludeExpenses) {
      this.includeExpenses = JSON.parse(serializedIncludeExpenses) || false;
    }
    this.userFilters = Object.assign({}, this.filtersHelper.create(this.userFilters));
    const dt = moment();
  }

  getCurrentUserCombinedFiltersOld(): any {
    return {...this.getCommonFilters(), ...this.getQueryString()};
  }

  getCurrentUserCombinedFilters(): any {
    const currentUser = { clientId: this.userService.currentUser.client_info_id };
    return {...currentUser, ...this.parseLSQueryString()};
  }

  getCommonFilters(): ICommonFilters {
    return {clientId: this.userService.currentUser.client_info_id, startdate: this.startDate, enddate: this.endDate};
  }

  parseLSQueryString(): any {
    const result = {};
    const qs =  localStorage.getItem('ELEMENTS_dataFilters_' + this.userService.currentUser.id.toString());
    if (!qs) {
      return this.getCommonFilters();
    }
    const serializedQs = JSON.parse(qs).querystring.toString();
    const pairs = serializedQs.split('&');
    for (const pair of pairs) {
      const keys = pair.split('=');
      if (keys.length === 2) {
        result[keys[0]] = decodeURIComponent(keys[1]);
      }
    }
    return result;
  }

  formatRange(filters: any): Array<number> {
    // var maxrange=[1,25,100,500,501];
    // var minrange=[1,26,101,501,501];
    const min = filters.firmSizes[0] = 1 ? filters.firmSizes[0] : filters.firmSizes[0] + 1;
    let max = filters.firmSizes[1];
    if (max === 501) {
      max = null;
    }

    const minMatters = filters.firmMatterCounts[0] = 1 ? filters.firmMatterCounts[0] : filters.firmMatterCounts[0] + 1;
    let maxMatters = filters.firmMatterCounts[1];
    if (maxMatters === 1001) {
      maxMatters = null;
    }
    return [min, max, minMatters, maxMatters];
  }

  setThreshold(filters: any): void {
    filters.threshold = filters.displayThreshold.thresholdHours + (filters.displayThreshold.thresholdMins / 60);
  }

  getEncodedFilters(fs: any): Array<string> {
    const efs = [];
    for (const f of fs) {
      // efs.push(encodeURIComponent(f));
      efs.push(f);
    }
    return efs;
  }

  getQueryString(): any {
    const qs = {} as any;
    this.setThreshold(this.userFilters);
    const range = this.formatRange(this.userFilters);
    this.userFilters.minFirmSize = range[0];
    this.userFilters.maxFirmSize = range[1];
    this.userFilters.minFirmMatterCount = range[2];
    this.userFilters.maxFirmMatterCount = range[3];
    this.userFilters.cities = [];
    if (this.userFilters.geographies.length > 0) {
      const filters = this.userFilters.geographies;

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < filters.length; i++) {
        const geo = filters[i].split(', ');
        const cs = [] as any;
        cs.push(geo[0]);
        cs.push(geo[1]);
        this.userFilters.cities.push(cs);
      }
    }
    if (this.userFilters.firms && this.userFilters.firms.length > 0) {
      if (this.userFilters.excludeFirms) {
        qs.excludeFirmIds = JSON.stringify(this.userFilters.firms);
      } else {
        qs.firms = JSON.stringify(this.userFilters.firms);
      }

    }
    if (this.userFilters.matters && this.userFilters.matters.length > 0) {
      if (this.userFilters.excludeMatters) {
        qs.excludeMatterIds = JSON.stringify(this.userFilters.matters);
      } else {
        qs.matters = JSON.stringify(this.userFilters.matters);
      }

    }
    if (this.userFilters.practiceAreas && this.userFilters.practiceAreas.length > 0) {
      const pas = this.getEncodedFilters(this.userFilters.practiceAreas);
      if (this.userFilters.excludePracticeAreas) {
        qs.excludePracticeAreas = JSON.stringify(pas);
      } else {
        qs.practiceAreas = JSON.stringify(pas);
      }

    }
    if (this.userFilters.linesOfBusiness && this.userFilters.linesOfBusiness.length > 0) {
      const linesOfBusiness = this.getEncodedFilters(this.userFilters.linesOfBusiness);
      if (this.userFilters.excludeLineOfBusiness) {
        qs.excludeLobs = JSON.stringify(linesOfBusiness);
      } else {
        qs.lobs = JSON.stringify(linesOfBusiness);
      }

    }
    if (this.userFilters.offices && this.userFilters.offices.length > 0) {
      const offices = this.getEncodedFilters(this.userFilters.offices);
      if (this.userFilters.excludeOffices) {
        qs.excludeOffices = JSON.stringify(offices);
      } else {
        qs.offices = JSON.stringify(offices);
      }

    }
    if (this.userFilters.clientCounsels && this.userFilters.clientCounsels.length > 0) {
      const clientCounsels = this.getEncodedFilters(this.userFilters.clientCounsels);
      if (this.userFilters.excludeClientCounsel) {
        qs.excludeClientCounsels = JSON.stringify(clientCounsels);
      } else {
        qs.clientCounsels = JSON.stringify(clientCounsels);
      }

    }
    if (this.userFilters.cities && this.userFilters.cities.length > 0) {
      if (this.userFilters.excludeGeography) {
        qs.excludeCities = JSON.stringify(this.userFilters.cities);
      } else {
        qs.cities = JSON.stringify(this.userFilters.cities);
      }

    }
    if (this.userFilters.states && this.userFilters.states.length > 0) {
      qs.states = JSON.stringify(this.userFilters.states);
    }

    if (this.userFilters.courtLocations && this.userFilters.courtLocations.length > 0) {
      // tslint:disable-next-line:variable-name
      let court_states = [];
      // tslint:disable-next-line:variable-name
      let court_locations = [];
      this.userFilters.courtLocations.forEach(l => {
        const split = l.split(/,(.+)/);
        if (split[1].trim() === '') {
          court_states.push(split[0]);
        } else {
          court_locations.push(l);
        }
      });

      if (court_states.length > 0) {
        court_states = this.getEncodedFilters(court_states);
        if (this.userFilters.excludeCourtLocations) {
          qs.excludeCourtStates = JSON.stringify(court_states);
        } else {
          qs.courtStates = JSON.stringify(court_states);
        }
      }

      if (court_locations.length > 0) {
        court_locations = this.getEncodedFilters(court_locations);
        if (this.userFilters.excludeCourtLocations) {
          qs.excludeCourtLocations = JSON.stringify(court_locations);
        } else {
          qs.courtLocations = JSON.stringify(court_locations);
        }
      }

    }
    if (this.userFilters.courtTypes && this.userFilters.courtTypes.length > 0) {
      const courtTypes = this.getEncodedFilters(this.userFilters.courtTypes);
      if (this.userFilters.excludeCourtTypes) {
        qs.excludeCourtTypes = JSON.stringify(courtTypes);
      } else {
        qs.courtTypes = JSON.stringify(courtTypes);
      }
    }

    if (this.userFilters.threshold) {
      qs.threshold = this.userFilters.threshold;
    }
    if (this.userFilters.firmTypes && this.userFilters.firmTypes.length > 0) {
      const firmTypes = this.getEncodedFilters(this.userFilters.firmTypes);
      if (this.userFilters.excludeFirmType) {
        qs.excludeFirmTypes = JSON.stringify(firmTypes);
      } else {
        qs.firmTypes = JSON.stringify(firmTypes);
      }

    }
    if (this.userFilters.minFirmSize === 1 && this.userFilters.maxFirmSize == null) {
      // do nothing

    } else {
      if (this.userFilters.minFirmSize) {
        qs.minFirmSize = this.userFilters.minFirmSize;
      }
      if (this.userFilters.maxFirmSize) {
        qs.maxFirmSize = this.userFilters.maxFirmSize;
      }
    }

    if (this.userFilters.utbmsCodes && this.userFilters.utbmsCodes.length > 0) {
      const utbmsCodes = this.getEncodedFilters(this.userFilters.utbmsCodes);
      if (this.userFilters.excludeUtbmsCodes) {
        qs.excludeUtbmsCodes = JSON.stringify(utbmsCodes);
      } else {
        qs.utbmsCodes = JSON.stringify(utbmsCodes);
      }
    }

    if (this.userFilters.genericFilter1 && this.userFilters.genericFilter1.length > 0) {
      const genericFilter1 = this.getEncodedFilters(this.userFilters.genericFilter1);
      if (this.userFilters.excludeGenericFilter1) {
        qs.excludeGenericFilter1 = JSON.stringify(genericFilter1);
      } else {
        qs.genericFilter1 = JSON.stringify(genericFilter1);
      }
    }
    if (this.userFilters.genericFilter2 && this.userFilters.genericFilter2.length > 0) {
      const genericFilter2 = this.getEncodedFilters(this.userFilters.genericFilter2);
      if (this.userFilters.excludeGenericFilter2) {
        qs.excludeGenericFilter2 = JSON.stringify(genericFilter2);
      } else {
        qs.genericFilter2 = JSON.stringify(genericFilter2);
      }
    }
    if (this.userFilters.genericFilter3 && this.userFilters.genericFilter3.length > 0) {
      const genericFilter3 = this.getEncodedFilters(this.userFilters.genericFilter3);
      if (this.userFilters.excludeGenericFilter3) {
        qs.excludeGenericFilter3 = JSON.stringify(genericFilter3);
      } else {
        qs.genericFilter3 = JSON.stringify(genericFilter3);
      }
    }
    if (this.userFilters.genericFilter4 && this.userFilters.genericFilter4.length > 0) {
      const genericFilter4 = this.getEncodedFilters(this.userFilters.genericFilter4);
      if (this.userFilters.excludeGenericFilter4) {
        qs.excludeGenericFilter4 = JSON.stringify(genericFilter4);
      } else {
        qs.genericFilter4 = JSON.stringify(genericFilter4);
      }
    }
    if (this.userFilters.genericFilter5 && this.userFilters.genericFilter5.length > 0) {
      const genericFilter5 = this.getEncodedFilters(this.userFilters.genericFilter5);
      if (this.userFilters.excludeGenericFilter5) {
        qs.excludeGenericFilter5 = JSON.stringify(genericFilter5);
      } else {
        qs.genericFilter5 = JSON.stringify(genericFilter5);
      }
    }
    if (this.userFilters.genericFilter6 && this.userFilters.genericFilter6.length > 0) {
      const genericFilter6 = this.getEncodedFilters(this.userFilters.genericFilter6);
      if (this.userFilters.excludeGenericFilter6) {
        qs.excludeGenericFilter6 = JSON.stringify(genericFilter6);
      } else {
        qs.genericFilter6 = JSON.stringify(genericFilter6);
      }
    }
    if (this.userFilters.genericFilter7 && this.userFilters.genericFilter7.length > 0) {
      const genericFilter7 = this.getEncodedFilters(this.userFilters.genericFilter7);
      if (this.userFilters.excludeGenericFilter7) {
        qs.excludeGenericFilter7 = JSON.stringify(genericFilter7);
      } else {
        qs.genericFilter7 = JSON.stringify(genericFilter7);
      }
    }
    if (this.userFilters.genericFilter8 && this.userFilters.genericFilter8.length > 0) {
      const genericFilter8 = this.getEncodedFilters(this.userFilters.genericFilter8);
      if (this.userFilters.excludeGenericFilter8) {
        qs.excludeGenericFilter8 = JSON.stringify(genericFilter8);
      } else {
        qs.genericFilter8 = JSON.stringify(genericFilter8);
      }
    }
    if (this.userFilters.genericFilter9 && this.userFilters.genericFilter9.length > 0) {
      const genericFilter9 = this.getEncodedFilters(this.userFilters.genericFilter9);
      if (this.userFilters.excludeGenericFilter9) {
        qs.excludeGenericFilter9 = JSON.stringify(genericFilter9);
      } else {
        qs.genericFilter9 = JSON.stringify(genericFilter9);
      }
    }
    if (this.userFilters.genericFilter10 && this.userFilters.genericFilter10.length > 0) {
      const genericFilter10 = this.getEncodedFilters(this.userFilters.genericFilter10);
      if (this.userFilters.excludeGenericFilter10) {
        qs.excludeGenericFilter10 = JSON.stringify(genericFilter10);
      } else {
        qs.genericFilter10 = JSON.stringify(genericFilter10);
      }
    }
    if (this.userFilters.genericFilter11 && this.userFilters.genericFilter11.length > 0) {
      const genericFilter11 = this.getEncodedFilters(this.userFilters.genericFilter11);
      if (this.userFilters.excludeGenericFilter11) {
        qs.excludeGenericFilter11 = JSON.stringify(genericFilter11);
      } else {
        qs.genericFilter11 = JSON.stringify(genericFilter11);
      }
    }
    if (this.userFilters.genericFilter12 && this.userFilters.genericFilter12.length > 0) {
      const genericFilter12 = this.getEncodedFilters(this.userFilters.genericFilter12);
      if (this.userFilters.excludeGenericFilter12) {
        qs.excludeGenericFilter12 = JSON.stringify(genericFilter12);
      } else {
        qs.genericFilter12 = JSON.stringify(genericFilter12);
      }
    }

    if (this.userService.hasEntitlement('analytics.matter.openclose.dates')) {
      if (this.userFilters.matterOpenDates) {
        if (this.userFilters.matterOpenDates.start) {
          qs.matterOpenDateStart = moment(this.userFilters.matterOpenDates.start).format('YYYY-MM-DD');
        }
        if (this.userFilters.matterOpenDates.end) {
          qs.matterOpenDateEnd = moment(this.userFilters.matterOpenDates.start).format('YYYY-MM-DD');
        }
      }

      if (this.userFilters.matterCloseDates) {
        if (this.userFilters.matterCloseDates.start) {
          qs.matterCloseDateStart = moment(this.userFilters.matterCloseDates.start).format('YYYY-MM-DD');
        }
        if (this.userFilters.matterCloseDates.end) {
          qs.matterCloseDateEnd = moment(this.userFilters.matterCloseDates.end).format('YYYY-MM-DD');
        }
      }

      if (this.userFilters.dayOfMatterRange) {
        if (this.userFilters.dayOfMatter) {
          switch (this.userFilters.dayOfMatterRange) {
            case 'First':
              if (this.userFilters.dayOfMatter.start) {
                qs.dayOfMatterRange = this.userFilters.dayOfMatterRange;
                qs.dayOfMatter1 = this.userFilters.dayOfMatter.start;
              }
              break;
            case 'Last':
              if (this.userFilters.dayOfMatter.start) {
                qs.dayOfMatterRange = this.userFilters.dayOfMatterRange;
                qs.dayOfMatter1 = this.userFilters.dayOfMatter.start;
              }
              break;
            case 'Between':
              if (this.userFilters.dayOfMatter.start) {
                qs.dayOfMatterRange = this.userFilters.dayOfMatterRange;
                if (this.userFilters.dayOfMatter.start) {
                  qs.dayOfMatter1 = this.userFilters.dayOfMatter.start;
                }
                if (this.userFilters.dayOfMatter.end) {
                  qs.dayOfMatter2 = this.userFilters.dayOfMatter.end;
                }
              }
              break;
          }
        }
      }

    }
    if (this.userService.hasEntitlement('analytics.counsel.efficiency')) {
      if (this.userFilters.opposingFirms && this.userFilters.opposingFirms.length > 0) {
        if (this.userFilters.excludeOpposingFirms) {
          qs.excludeOpposingFirms = JSON.stringify(this.userFilters.opposingFirms);
        } else {
          qs.opposingFirms = JSON.stringify(this.userFilters.opposingFirms);
        }
      }
    }
    if (this.userFilters.minFirmMatterCount === 1 && this.userFilters.maxFirmMatterCount === null) {
      // do nothing
    } else {
      if (this.userFilters.minFirmMatterCount) {
        qs.minFirmMatterCount = this.userFilters.minFirmMatterCount;
      }
      if (this.userFilters.maxFirmMatterCount) {
        qs.maxFirmMatterCount = this.userFilters.maxFirmMatterCount;
      }
    }

    /**
     * Process matter range tag filters
     */
    const rangetypes = [];
    for (const k1 of Object.keys(this.userFilters.rangeTagFilters)) {

      if (this.userFilters.rangeTagFilters.hasOwnProperty(k1)) {
        const filterX = this.userFilters.rangeTagFilters[k1];
        if ((filterX.filteredRange[0] !== filterX.range[0] && filterX.filteredRange !== 0) || filterX.filteredRange[1] !== filterX.range[1]) {
          rangetypes.push(filterX.tagtypeid);
          const rangeProp1 = 'min' + filterX.tagtypeid.toString();
          const rangeProp2 = 'max' + filterX.tagtypeid.toString();
          qs[rangeProp1] = filterX.filteredRange[0];
          qs[rangeProp2] = filterX.filteredRange[1];
        }
      }

    }
    if (rangetypes.length) {
      qs.matterRangeTagTypeIds = JSON.stringify(rangetypes);
    }

    /**
     * Process matter select tag filters
     */
    const selecttypes = [];
    for (const k2 of Object.keys(this.userFilters.selectTagFilters)) {

      if (this.userFilters.selectTagFilters.hasOwnProperty(k2)) {
        const filterY = this.userFilters.selectTagFilters[k2];
        if (filterY.value) {
          selecttypes.push(filterY.tagtypeid);
          const rangeProp1 = 'select' + filterY.tagtypeid.toString();
          qs[rangeProp1] = encodeURIComponent(filterY.value);
        }
      }

    }
    if (selecttypes.length) {
      qs.matterSelectTagTypeIds = JSON.stringify(selecttypes);
    }

    /**
     * Process matter multi select ORDERED tag filters
     */
    const multiselecttypes = [];
    for (const k3 of Object.keys(this.userFilters.multiSelectTagFilters)) {

      if (this.userFilters.multiSelectTagFilters.hasOwnProperty(k3)) {
        const filterZ = this.userFilters.multiSelectTagFilters[k3];
        if (filterZ.value && filterZ.value.length) {
          const arr = [];
          filterZ.value.forEach(e => {
            arr.push(encodeURIComponent(e));
          });
          multiselecttypes.push(filterZ.tagtypeid);
          const rangeProp1 = 'multiSelect' + filterZ.tagtypeid.toString();
          qs[rangeProp1] = JSON.stringify(arr);
        }
      }

    }
    if (multiselecttypes.length) {
      qs.matterMultiSelectTagTypeIds = JSON.stringify(multiselecttypes);
    }
    return qs;
  }
}
