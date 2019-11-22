import { environment } from '../../environments/environment';
import * as config from '../shared/services/config';
import { PillComponent } from './card/cells/pill/pill.component';
import { LinkComponent } from './card/cells/link/link.component';

export const columns = {
  topMatters: [
    { name: 'Matter', field: 'name', component: LinkComponent, href: `${environment.host}${config.outerAppLinks.viewMatter}` + '${id}' },
    { name: 'Spend', format: 'currency', field: 'total_spend', component: PillComponent },
    { name: 'Lead Partner', format: 'lawyer', field: 'lead_partner_name', avatar: 'bio_image_url', component: PillComponent },
    { name: 'Practice Area', field: 'client_matter_type', component: LinkComponent }
  ],
  topFirms: [
    { name: 'Firm', field: 'firm_name', component: LinkComponent },
    { name: 'Total Spend', format: 'currency', field: 'total_billed', component: PillComponent },
    { name: '% of Total Spend', format: 'percent', field: 'total_percent', component: PillComponent }
  ],
  spendByPracticeArea: [
    { name: 'Practice Area', field: 'practice_area', component: LinkComponent },
    { name: 'Spend', format: 'currency', field: 'total_billed', component: PillComponent },
    { name: 'Top Firm', field: 'firm_name', component: LinkComponent},
    { name: 'Top Matter', field: 'matter_name', component: LinkComponent},
  ],
  topLeadPartners: [
    { name: 'Lead Partner', field: 'name', component: LinkComponent },
    { name: 'Spend', format: 'currency', field: 'total_billed', component: PillComponent },
    { name: 'Practice Area', field: 'top_practice', component: LinkComponent},
    { name: 'Top Matter', field: 'top_matter_name', component: LinkComponent},
  ]
};

export const cards = [
  { header: 'Top Matters by Spend', request: 'topMatters', columns: columns.topMatters },
  { header: 'Top Firms by Spend', request: 'topFirms', columns: columns.topFirms },
  { header: 'Spend By Practice Area', request: 'spendByPractice', columns: columns.spendByPracticeArea },
  { header: 'Top Lead Partners', request: 'topLeadPartners', columns: columns.topLeadPartners },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters },
  { header: 'Matters with Highest block billing', request: 'topMatters', columns: columns.topMatters }
];
