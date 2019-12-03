import { environment } from '../../environments/environment';
import * as config from '../shared/services/config';
import { PillComponent } from './card/cells/pill/pill.component';
import { LinkComponent } from './card/cells/link/link.component';
import {leadPartnerChartOptions} from '../shared/models/top-lead-partner';
import {practicePieChartOptions} from '../shared/models/practice';
import {mattersChartOptions} from '../shared/models/top-matters';
import {firmsChartOptions} from '../shared/models/top-firms';
import {iqReportPieChartOptions} from '../shared/models/invoiceIq';

export const columns = {
  topMatters: [
    { name: 'Matter', field: 'name', component: LinkComponent, href: `${environment.host}${config.outerAppLinks.viewMatter}` + '${id}' },
    { name: 'Spend', format: 'currency', field: 'total_spend', component: PillComponent },
    { name: 'Lead Partner', format: 'lawyer', field: 'lead_partner_name', avatar: 'bio_image_url', component: PillComponent },
    { name: 'Practice Area', field: 'client_matter_type', component: LinkComponent, href: `${environment.host}${config.outerAppLinks.viewPracticeArea}` }
  ],
  topFirms: [
    { name: 'Firm', field: 'firm_name', component: LinkComponent, href: `${environment.host}${config.outerAppLinks.viewFirm}` + '${id}' },
    { name: 'Total Spend', format: 'currency', field: 'total_billed', component: PillComponent },
    { name: '% of Total Spend', format: 'percent', field: 'total_percent', component: PillComponent }
  ],
  spendByPracticeArea: [
    { name: 'Practice Area', field: 'practice_area', component: LinkComponent, href: `${environment.host}${config.outerAppLinks.viewPracticeArea}`},
    { name: 'Spend', format: 'currency', field: 'total_billed', component: PillComponent },
    { name: 'Top Firm', field: 'firm_name', component: LinkComponent, href: `${environment.host}${config.outerAppLinks.viewFirm}` + '${firm_id}'},
    { name: 'Top Matter', field: 'matter_name', component: LinkComponent, href: `${environment.host}${config.outerAppLinks.viewMatter}` + '${matter_id}'},
  ],
  topLeadPartners: [
    { name: 'Lead Partner', field: 'name', component: LinkComponent, href: `${environment.host}${config.outerAppLinks.viewLeadPartner}` + '${id}' + '/' + '${firm_id}'},
    { name: 'Spend', format: 'currency', field: 'total_billed', component: PillComponent },
    { name: 'Practice Area', field: 'top_practice', component: LinkComponent, href: `${environment.host}${config.outerAppLinks.viewPracticeArea}`},
    { name: 'Top Matter', field: 'top_matter_name', component: LinkComponent, href: `${environment.host}${config.outerAppLinks.viewMatter}` + '${top_matter_id}'},
  ],
  invoiceIQReports: [
    { name: 'Report', field: 'report_name', component: LinkComponent, href: `${environment.host}${config.outerAppLinks.viewIQReport}` + '${id}' },
    { name: 'Total Cost of Work', format: 'currency', field: 'total_billed', component: PillComponent }
  ]
};

export const cards = [
  { header: 'Top Matters by Spend', request: 'topMatters', columns: columns.topMatters, options: mattersChartOptions, span: 2 },
  { header: 'Top Firms by Spend', request: 'topFirms', columns: columns.topFirms, options: firmsChartOptions, span: 2 },
  { header: 'Spend By Practice Area', request: 'spendByPractice', columns: columns.spendByPracticeArea, options: practicePieChartOptions, span: 4 },
  { header: 'Top Lead Partners', request: 'topLeadPartners', columns: columns.topLeadPartners, options: leadPartnerChartOptions, span: 2 },
  { header: 'Invoice IQ Reports', request: 'invoiceIQReports', columns: columns.invoiceIQReports,  options: iqReportPieChartOptions, span: 2 },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters, span: 2 },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters, span: 2 },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters, span: 2 }
];
