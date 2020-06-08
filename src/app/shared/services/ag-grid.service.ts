import { Injectable } from '@angular/core';
import {SideBarDef} from 'ag-grid-community/dist/lib/entities/sideBar';

export const defaultColumn = {
  sortable: true,  filter: 'agNumberColumnFilter', resizable: true, width: 130
};
export const defaultSideBar = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
      toolPanelParams: {
        suppressValues: true,
        suppressPivots: true,
        suppressPivotMode: true,
        suppressRowGroups: true
      }
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
    }
  ],
  position: 'right',
  // colResizeDefault: 'shift',
  defaultToolPanel: ''
};

@Injectable({
  providedIn: 'root'
})
export class AgGridService {

  constructor() { }

  getDefaultGridOptions() {
    return {
      rowHeight: 50,
      headerHeight: 80
    };
  }

  roundCurrencyCellRenderer(params: any) {
    if (isNaN(params.value) || !params.value) {
      return '--';
    }
    const usdFormate = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    });
    const value = usdFormate.format(params.value);
    return '$' + value;
  }
  roundNumberCellRenderer(params: any) {
    if (isNaN(params.value) || !params.value) {
      return '--';
    }
    const usdFormate = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    });
    const value = usdFormate.format(params.value);
    return value;
  }
  roundToOneNumberCellRenderer(params: any) {
    if (isNaN(params.value) || !params.value) {
      return '--';
    }
    const usdFormate = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 1,
      minimumFractionDigits: 1
    });
    const value = usdFormate.format(params.value);
    return value;
  }
  roundToPercentNumberCellRenderer(params: any) {
    if (isNaN(params.value) || !params.value) {
      return '--';
    }
    const usdFormate = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 1,
      minimumFractionDigits: 1
    });
    const value = usdFormate.format(params.value);
    return value + '%';
  }
}
