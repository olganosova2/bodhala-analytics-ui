import {environment} from '../../../environments/environment';

export const BASE_URL = environment.apiUrl;
export const IS_LOCAL = false; // (window.location.href.indexOf('localhost:4200') > 0 || window.location.href.indexOf('127.0.0.1:4200')) > 0 ? true : false;
export const HOST = environment.host;

export const END_POINTS_URLS = {
  errorStub: {url: BASE_URL + 'errorStub', showLoading: false},
  getCurrentUser: {url: BASE_URL + 'getCurrentUser', showLoading: false},
  getClientCounts: {url: BASE_URL + 'analytics/getClientCounts', showLoading: true},
  getUserSideBar: {url: BASE_URL + 'user-sidebar.json', showLoading: true},
  getMenuItems: {url: BASE_URL + 'user-sidebar.json', showLoading: false},
  keepAlive: {url: BASE_URL + 'keepalive', showLoading: false}
}


export const uiTitleString = 'Bodhala Analytics';
export const EST_TIME_ZONE = 'America/New York';
export const KEEP_ALIVE_SEC = 600000;

export const MAXIMUM_TEXT_CHARACTERS = 500;

export const confirmDialogConfig = {
  height: '230px',
  width: '300px',
};
export const timeoutDialogConfig = {
  height: '230px',
  width: '500px',
  position: {top: '0'},
  disableClose: true,
  autoFocus: true,
  data: {countdown: environment.IDLE_KEEPALIVE_CONFIG.keepaliveSeconds}
};
export const RfpGridPageSize = 4;
export const RfpGridPageOptions = [2, 4, 6];

export const BODHALA_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};

