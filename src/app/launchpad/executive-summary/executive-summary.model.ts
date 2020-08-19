import { environment } from '../../../environments/environment';
import * as config from '../../shared/services/config';
import { PillComponent } from './../card/cells/pill/pill.component';
import { LinkComponent } from './../card/cells/link/link.component';
import {leadPartnerChartOptions} from '../../shared/models/top-lead-partner';
import {practicePieChartOptions} from '../../shared/models/practice';
import {mattersChartOptions} from '../../shared/models/top-matters';
import {firmsChartOptions} from '../../shared/models/top-firms';
import { mattersByHighestAverageRateChartOptions } from '../../shared/models/top-average-matters';
import { activeSpendChart } from '../../shared/models/active-spend';
import { blockBillerChart } from '../../shared/models/top-block-billers';
import {iqReportPieChartOptions} from '../../shared/models/invoiceIq';
import { NumberFilter } from 'ag-grid-community';


export interface ISpendOverviewItem {
    total: number;
    priorYearTotal: number;
    diff: number;
    name: string;
    format?: string;
    lastCell?: boolean;
}

export interface ITopMatterES {
    id: string;
    name: string;
    lawfirm_id: string;
    firm_name: string;
    total_spend: number;
    total_expenses: number;
    bpi: number;
    blended_rate: number;
    block_billing_per: number;
    block_billing_total: number;
    partner_billed_per: number;
    total_partner_billed: number;
    total_associate_billed: number;
    total_partner_hours: number;
    total_hours: number;
    partner_percent_hours_worked: number;
    total_associate_hours: number;
    avg_partner_rate: number;
    link: string;
    block_billing_percent: number;
    bodhala_price_index: number;
    partner_percent: number;
}

export interface ITopFirmESPriorYear {
    id: string;
    firm_name: string;
    total_billed: number;
    total_expenses: number;
    total_matters: number;
    avg_matter_cost: number;
    blended_rate: number;
    blended_rate_formatted: string;
    partner_billed_per: number;
    partner_billed: number;
    associate_billed: number;
    associate_hours: number;
    partner_hours: number;
    total_firm_matters: number;
    firm_block_billed: number;
    matter_cost_closed: number;
    closed_matters: number;
    partner_percent: number;
    avg_matter_cost_formatted: string;
    link: string;
    block_billed_per: number;
    bpi: number;
    bpi_formatted: string;
    partners_per_matter: number;
    avg_partner_rate: number;
    avg_partner_rate_formatted: string;
    partners: number;
    partners_formatted: string;
    avg_matter_cost_trend: number;
    block_billed_per_trend: number;
    blended_rate_trend: number;
    bpi_trend: number;
    avg_partner_rate_trend: number;
    avg_partners_trend: number;
}

export interface ITopFirmES {
    id: string;
    firm_name: string;
    total_billed: number;
    total_expenses: number;
    total_matters: number;
    avg_matter_cost: number;
    blended_rate: number;
    blended_rate_formatted: string;
    partner_billed_per: number;
    partner_billed: number;
    associate_billed: number;
    associate_hours: number;
    partner_hours: number;
    total_hours: number;
    partner_percent_hours_worked: number;
    total_firm_matters: number;
    firm_block_billed: number;
    matter_cost_closed: number;
    total_afa_closed: number;
    closed_matters: number;
    partner_percent: number;
    avg_matter_cost_formatted: string;
    link: string;
    block_billed_per: number;
    bpi: number;
    bpi_formatted: string;
    partners_per_matter: number;
    avg_partner_rate: number;
    avg_partner_rate_formatted: string;
    partners: number;
    partners_formatted: string;
    avg_partners: number;
    avg_partners_formatted: string;
    avg_matter_cost_trend: number;
    block_billed_per_trend: number;
    blended_rate_trend: number;
    bpi_trend: number;
    avg_partner_rate_trend: number;
    avg_partners_trend: number;
}

export interface ITopTimekeeper {
    id: string;
    name: string;
    seniority: string;
    total_billed: number;
    total_expenses: number;
    lawfirm_id: number;
    firm: string;
    total_matters: number;
    avg_matter_cost: number;
    block_billed_per: number;
    blended_rate: number;
    atty_billed: number;
    atty_hours: number;
    matter_cost_closed: number;
    total_afa_closed: number;
    closed_matters: number;
    total_partner_billed: number;
    avg_matter_cost_formatted: string;
    link: string;
    total: number;
    total_block_billed: number;
}

export const columns = {
    topMatters: [
        { name: 'Matter', field: 'name', component: LinkComponent, isPrimary: true, href: `${environment.host}${config.outerAppLinks.viewMatter}` + '${id}' },
        { name: 'Year to Date Cost', format: 'currency', field: 'total_spend'},
        { name: 'Bodhala Price Index', field: 'bpi', format: 'currency'},
        { name: 'Blended Rate', field: 'blended_rate', format: 'currency'},
        { name: 'Block Billing %', field: 'block_billed_per', format: 'percent'},
        { name: 'Block Billed $', field: 'block_billed_amount', format: 'currency'},
        { name: 'Partner % Billed By $', field: 'partner_billed', format: 'percent'}
    ],
    topFirms: [
        { name: 'Firm', field: 'firm_name', component: LinkComponent, isPrimary: true, route: config.outerAppLinks.viewFirm, route_params: 'id'},
        { name: 'YTD Total Billed', format: 'currency', field: 'total_spend'},
        { name: 'Matters', field: 'num_matters', format: 'number'},
        { name: 'Average Matter Cost', field: 'avg_matter_cost', format: 'currency'},
        { name: 'Blended Attorney Rate', field: 'block_billed_per', format: 'currency'},
        { name: 'Block Billed $', field: 'block_billed_amount', format: 'currency'},
        { name: 'Partner % Billed By $', field: 'partner_billed', format: 'percent'}
    ],
    topTimekeepers: [
        { name: 'Attorney', field: 'name', component: LinkComponent, isPrimary: true, href: `${environment.host}${config.outerAppLinks.viewLeadPartner}` + '${id}/${firm_id}'},
        { name: 'Classification', field: 'bh_classification'},
        { name: 'YTD Total Billed', field: 'total_billed', format: 'currency'},
        { name: 'Matters', field: 'num_matters', format: 'number'},
        { name: 'Average Matter Cost', field: 'avg_matter_cost', format: 'currency'},
        { name: 'Blended Attorney Rate', field: 'block_billed_per', format: 'currency'},
        { name: 'Block Billed $', field: 'block_billed_amount', format: 'currency'},
        { name: 'Partner % Billed By $', field: 'partner_billed', format: 'percent'}
    ],
    firmsYOY: [
        { name: 'Firm', field: 'firm_name', component: LinkComponent, isPrimary: true, route: config.outerAppLinks.viewFirm, route_params: 'id'},
        { name: 'Average Matter Cost', format: 'currency', field: 'avg_matter_cost'},
        { name: 'Average Matter Cost Trend', format: 'percent', field: 'avg_matter_cost_trend'},
        { name: 'Block Billed %', field: 'block_billed_per', format: 'percent'},
        { name: 'Block Billed % Trend', field: 'block_billed_per_trend', format: 'percent'},
        { name: 'Blended Attorney Rate', field: 'blended_rate', format: 'currency'},
        { name: 'Blended Attorney Rate Trend', format: 'percent', field: 'blended_rate_trend'},
        { name: 'Bodhala Price Index', field: 'bpi', format: 'currency'},
        { name: 'Bodhala Price Index Trend', field: 'bpi_trend', format: 'percent'},
        { name: 'Average Partner Rate', field: 'avg_partner_rate', format: 'currency'},
        { name: 'Average Partner Rate', field: 'avg_partner_rate', format: 'currency'},
        { name: 'Average Partners per Matter', field: 'avg_partners_per_matter', format: 'number'},
    ],
  };
