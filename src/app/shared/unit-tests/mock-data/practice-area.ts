import {ITag} from '../../../practice-area/practice-area.model';

export const MOCK_PRACTICE_AREA = {
  client_matter_type: 'LITIGATION',
  active: true,
  boutique: '',
  crawl_id: 1,
  crawlable: '',
  is_javascript: true,
  is_sitemap: true,
  is_proxy_crawl: true,
  bio_config_file: '',
  news_config_file: '',
  leverage: 1,
  average_partner_rate: 1,
  average_associate_rate: 1,
  estimated_number_lawyers: 1,
  synonym_primary_id: 1,
  json_config: '',
  logo_url: '',
  tags: [],
  yearly_stats: []
};

export const MOCK_PRACTICE_AREAS = {
  "result": {
    clients: [
      "AVIATION CASUALTY / AEROSPACE", "EMPLOYMENT NON DUTY", "CONSTRUCTION DEFECT COVERAGE", "HPL/MEDMAL", "EXCESS", "HEALTH MAINTENANCE ORGANIZATIO", "PROPERTY", "FEDERAL BLACK LUNG", "TOXIC TORT", "#N/A", "INTELLECTUAL PROPERTY", "ENVIRONMENTAL COVERAGE", "COVERAGE", "WORKERS COMP (AFA) HO SPECIFIC", "ENVIRONMENTAL", "AUTO & PERSONAL LINES", "WAR HAZARD RECOVERY (AFA)", "PROPERTY COVERAGE", "PUBLIC ENTITY", "FINANCIAL INSTITUTIONS", "WORKERS COMP", "FIDELITY & SURETY", "PROFESSIONAL LIABILITY (AFA)", "MISCELLANEOUG PROF LIABILITY", "POLLUTION INSURANCE PRODUCTS", "CASUALTY", "SUBROGATION", "BANKRUPTCY", "TECH/MEDIA", "DIRECTORS & OFFICERS", "COMMERCIAL GROUND TRANSP.", "SCHOOL LEADERS", "WILLIS SKI PROGRAM (ASDA)", "CVS - WORKERS` COMPENSATION", "COMPLEX", "ARCHITECTS & ENGINEERS", "TAKATA", "MOLD", "CONSTRUCTION RISK", "PROFESSIONAL LIABILITY", "CONSTRUCTION DEFECT (AFA)", "BAD FAITH", "SURETY", "NATIONAL UNION MONITORING", "JC PENNEY CASUALTY CASES", "EMP. RELATED PRACTICES (AFA)", "SCHOOL CONSTRUCTION AUTHORITY", "USL&H LONG SHORE & HARBOR WC", "CLASS ACTION", "FINANCIAL LINES COVERAGE", "CASUALTY (AFA)", "APPELLATE", "DEFENSE BASE ACT", "EMP.RELATED PRACTICES", "WORKERS COMP COVERAGE", "CONSTRUCTION DEFECT", "JC PENNEY WORKERS COMP", "PRODUCTS LIABILITY PRODUCTS LIABILITY PRODUCTS LIA",  "PRODUCTS LIABILITY PRODUCTS LIABILITY PRODUCTS LIABILITY PRODUCT"
    ],
    bodhala: ["Banking & Credit", "Bankruptcy", "Capital Markets", "Energy", "Funds", "General/Other", "Health Care", "IP", "Labor & Employment", "Litigation", "M&A", "Real Estate" ]
  },
  "error": null
};
export const MOCK_MIN_MAX_DATES = {
  "result": {
    "min": "2017-06-24",
    "max": "2019-06-24"
  },
  "error": null
};

export const MOCK_TOP_LPS = {
  "result": [
    {"id": "428dbf9e-49e7-11ea-ad21-53485f56205f", "name": "Alessandro Turina", "img_url": null, "seniority": "partner", "firm_id": 59, "firm": "Willkie Farr & Gallagher", "total_billed": 5515465.55, "total_expenses": 7039.44, "total_matters": 1, "partner_hours": 4776.1, "associate_hours": 817.7, "partner_billed": 4901780.95, "associate_billed": 544932.6, "partner_writeoff": 0, "partner_writeoff_hours": 0, "associate_writeoff": 0, "associate_writeoff_hours": 0, "top_practice": "General Corporate", "top_matter": {"id": "100004", "name": "2012 GO Restructuring", "total_billed": "5515465.5500"}}, 
    {"id": "e35d7140-49e6-11ea-ad21-4365e4388c74", "name": "Ruchit Patel", "img_url": null, "seniority": "partner", "firm_id": 23, "firm": "Ropes & Gray", "total_billed": 569825, "total_expenses": 0, "total_matters": 4, "partner_hours": 287.7, "associate_hours": 343.1, "partner_billed": 264547, "associate_billed": 243316, "partner_writeoff": 0, "partner_writeoff_hours": 0, "associate_writeoff": 0, "associate_writeoff_hours": 0, "top_practice": "General Corporate", "top_matter": {"id": "100500", "name": "Antitrust & Competition", "total_billed": "505670.0000"}}, 
    {"id": "401ed75c-49e7-11ea-ad21-37759fb70782", "name": "Maurice M. Lefkort", "img_url": null, "seniority": "partner", "firm_id": 59, "firm": "Willkie Farr & Gallagher", "total_billed": 459463.35, "total_expenses": 0, "total_matters": 1, "partner_hours": 260.6, "associate_hours": 157.4, "partner_billed": 350132.65, "associate_billed": 108377.3, "partner_writeoff": 0, "partner_writeoff_hours": 0, "associate_writeoff": 0, "associate_writeoff_hours": 0, "top_practice": "General Corporate", "top_matter": {"id": "100020", "name": "Corporate Structure and Organization", "total_billed": "459463.3500"}}, 
    {"id": "a8c2e7f2-3322-11ea-9041-7ff73f234896", "name": "Fiona Smedley", "img_url": null, "seniority": "partner", "firm_id": 271, "firm": "Herbert Smith Freehills", "total_billed": 306078.9386, "total_expenses": 117.7908, "total_matters": 1, "partner_hours": 33, "associate_hours": 639.04, "partner_billed": 20860.492, "associate_billed": 282413.5208, "partner_writeoff": 0, "partner_writeoff_hours": 0, "associate_writeoff": 0, "associate_writeoff_hours": 0, "top_practice": "General Corporate", "top_matter": {"id": "100445", "name": "Company Secretarial Issues", "total_billed": "306078.9386"}}, 
    {"id": "4681fffc-49e7-11ea-ad21-af66ad089892", "name": "William E. Hiller", "img_url": null, "seniority": "partner", "firm_id": 59, "firm": "Willkie Farr & Gallagher", "total_billed": 119155.65, "total_expenses": 531.41, "total_matters": 1, "partner_hours": 42.9, "associate_hours": 95.6, "partner_billed": 51102.25, "associate_billed": 66029, "partner_writeoff": 0, "partner_writeoff_hours": 0, "associate_writeoff": 0, "associate_writeoff_hours": 0, "top_practice": "General Corporate", "top_matter": {"id": "100005", "name": "2012 REVOLVING CREDIT AGREEMENT", "total_billed": "119155.6500"}}, 
    {"id": "7e9106f6-49e5-11ea-ad21-effe054c997a", "name": "Paul Stevens", "img_url": null, "seniority": "partner", "firm_id": 910, "firm": "Cameron McKenna Nabarro Olswang LLP", "total_billed": 84249.588, "total_expenses": 1018.2878, "total_matters": 2, "partner_hours": 34.3, "associate_hours": 56.5, "partner_billed": 30580.1887, "associate_billed": 19843.6264, "partner_writeoff": 0, "partner_writeoff_hours": 0, "associate_writeoff": 0, "associate_writeoff_hours": 0, "top_practice": "General Corporate", "top_matter": {"id": "100514", "name": "Commercial Matters", "total_billed": "44272.3690"}}, 
    {"id": "9dbff7c0-49e6-11ea-ad21-67f6c1999b29", "name": "Terence Doherty", "img_url": null, "seniority": "partner", "firm_id": 418, "firm": "Osler, Hoskin & Harcourt LLP", "total_billed": 76081, "total_expenses": 860.61, "total_matters": 1, "partner_hours": 21.3, "associate_hours": 80.9, "partner_billed": 19170, "associate_billed": 56630, "partner_writeoff": 0, "partner_writeoff_hours": 0, "associate_writeoff": 0, "associate_writeoff_hours": 0, "top_practice": "General Corporate", "top_matter": {"id": "100517", "name": "Dutch Advice - BTFE Foreign Licenses", "total_billed": "76081.0000"}}, 
    {"id": "4899c158-49e7-11ea-ad21-7bb024d6e924", "name": "Andrea M. Hwang", "img_url": null, "seniority": "partner", "firm_id": 59, "firm": "Willkie Farr & Gallagher", "total_billed": 41570.2, "total_expenses": 0, "total_matters": 1, "partner_hours": 20, "associate_hours": 33, "partner_billed": 18785.2, "associate_billed": 21515.2, "partner_writeoff": 0, "partner_writeoff_hours": 0, "associate_writeoff": 0, "associate_writeoff_hours": 0, "top_practice": "General Corporate", "top_matter": {"id": "100570", "name": "Revolver - Santander Bank", "total_billed": "41570.2000"}}, 
    {"id": "a9015bf4-3322-11ea-9041-c3b5b762d7b4", "name": "Patrick Gay", "img_url": null, "seniority": "partner", "firm_id": 271, "firm": "Herbert Smith Freehills", "total_billed": 2962.443, "total_expenses": 0, "total_matters": 1, "partner_hours": 2.6, "associate_hours": 4.6, "partner_billed": 1635.1062, "associate_billed": 1327.3368, "partner_writeoff": 0, "partner_writeoff_hours": 0, "associate_writeoff": 0, "associate_writeoff_hours": 0, "top_practice": "General Corporate", "top_matter": {"id": "100500", "name": "Antitrust & Competition", "total_billed": "2962.4430"}}, 
    {"id": "125c98f4-49e7-11ea-ad21-1b653d3862e9", "name": "TIM LEWIS", "img_url": null, "seniority": "partner", "firm_id": 919, "firm": "Travers Smith LLP", "total_billed": 2381.7726, "total_expenses": 0, "total_matters": 1, "partner_hours": 1.1, "associate_hours": 1.4, "partner_billed": 1193.2445, "associate_billed": 1188.5281, "partner_writeoff": 0, "partner_writeoff_hours": 0, "associate_writeoff": 0, "associate_writeoff_hours": 0, "top_practice": "General Corporate", "top_matter": {"id": "100559", "name": "Governance Advice", "total_billed": "2381.7726"}}, 
    {"id": "88e7ad48-49e6-11ea-ad21-672858cbece6", "name": "David Zeffman", "img_url": null, "seniority": "partner", "firm_id": 910, "firm": "Cameron McKenna Nabarro Olswang LLP", "total_billed": 1614.6894, "total_expenses": 969.5691, "total_matters": 1, "partner_hours": 0, "associate_hours": 0, "partner_billed": 0, "associate_billed": 0, "partner_writeoff": 0, "partner_writeoff_hours": 0, "associate_writeoff": 0, "associate_writeoff_hours": 0, "top_practice": "General Corporate", "top_matter": {"id": "100020", "name": "Corporate Structure and Organization", "total_billed": "1614.6894"}}, 
    {"id": "793af72e-49e6-11ea-ad21-7300e5b5a575", "name": "Jasha Sprecher", "img_url": null, "seniority": "partner", "firm_id": 7655, "firm": "NautaDutilh N.V.", "total_billed": 1308.5575, "total_expenses": 0, "total_matters": 1, "partner_hours": 1.6, "associate_hours": 1.2, "partner_billed": 908.4724, "associate_billed": 400.0851, "partner_writeoff": 0, "partner_writeoff_hours": 0, "associate_writeoff": 0, "associate_writeoff_hours": 0, "top_practice": "General Corporate", "top_matter": {"id": "100559", "name": "Governance Advice", "total_billed": "1308.5575"}}, 
    {"id": "4faef44a-49e7-11ea-ad21-878a0322e44d", "name": "Barry P. Barbash", "img_url": null, "seniority": "partner", "firm_id": 59, "firm": "Willkie Farr & Gallagher", "total_billed": 835.2, "total_expenses": 0, "total_matters": 1, "partner_hours": 0.4, "associate_hours": 0.6, "partner_billed": 408, "associate_billed": 427.2, "partner_writeoff": 0, "partner_writeoff_hours": 0, "associate_writeoff": 0, "associate_writeoff_hours": 0, "top_practice": "General Corporate", "top_matter": {"id": "100064", "name": "PRODUCT STRATEGY/DEVELOPMENT/EXPANSION", "total_billed": "835.2000"}}], 
    "error": null
}
