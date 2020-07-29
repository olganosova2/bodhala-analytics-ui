import {SavingMetrics} from '../../../savings-calculator/savings-calculator.service';

export const MOCK_METRIC = {
  origPercent: 17,
  percent: 17,
  total: 100,
  title: 'Block Billing',
  savingsType: SavingMetrics.BlockBilling,
  maxRange: 100,
  savings: 0,
  details: []
};

export const SAVINGS_DATA = {
  "result": {
    "bb_percent": [{
      "end_date": "2019-06-24",
      "bbp": 16.99042761038000534654829550,
      "total_billed": 107200774.9738,
      "total_block_billed": 16818767.4156
    }, {
      "end_date": "2018-06-24",
      "bbp": 16.65668457036702183137422944,
      "total_billed": 156741970.5613,
      "total_block_billed": 24278977.0778
    }, {
      "end_date": "2017-06-24",
      "bbp": 15.65543974210234023477508729,
      "total_billed": 159965887.3615,
      "total_block_billed": 23333090.4212
    }],
    "rate_increase": "2019-01-01",
    "overstaffing": [{
      "end_date": "2019-06-24",
      "overstaffing": [{
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-09-07",
        "total_billed": 3884.85,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 22.5
      }, {
        "timekeepers": 5,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-09-10",
        "total_billed": 517,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 3.6
      }, {
        "timekeepers": 4,
        "firm_id": 138,
        "firm_name": "Thompson Hine",
        "line_item_date": "2018-11-29",
        "total_billed": 1167.8799,
        "client_matter_id": "OSOS704TF",
        "matter_name": "501-179159-001",
        "total_hours": 4.3
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-10-04",
        "total_billed": 1006.86,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 7.1
      }, {
        "timekeepers": 5,
        "firm_id": 8684,
        "firm_name": "GOODELL DEVRIES LEECH & DANN LLP",
        "line_item_date": "2018-09-05",
        "total_billed": 806.67,
        "client_matter_id": "OSOS339LY",
        "matter_name": "170-059112-001",
        "total_hours": 9.1
      }, {
        "timekeepers": 4,
        "firm_id": 28490,
        "firm_name": "RUDER WARE, LLSC                                            ",
        "line_item_date": "2018-08-01",
        "total_billed": 431.22,
        "client_matter_id": "OSOS635VZ",
        "matter_name": "501-544227-001",
        "total_hours": 3.4
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-09-18",
        "total_billed": 3732.56,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 21.2
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-11-08",
        "total_billed": 1064.56,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 6.8
      }, {
        "timekeepers": 4,
        "firm_id": 8442,
        "firm_name": "CARROLL WARREN & PARKER",
        "line_item_date": "2018-12-14",
        "total_billed": 497.77,
        "client_matter_id": "OSOS163VK",
        "matter_name": "501-366434-001",
        "total_hours": 11
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-07-18",
        "total_billed": 2171.83,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 13
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2019-01-09",
        "total_billed": 217.28,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 2.8
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-08-10",
        "total_billed": 2231.97,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 13.2
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2018-08-27",
        "total_billed": 533.5,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 3.6
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-09-06",
        "total_billed": 1911.87,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 10.8
      }, {
        "timekeepers": 4,
        "firm_id": 4844,
        "firm_name": "Rawle & Henderson LLP",
        "line_item_date": "2019-01-06",
        "total_billed": 7784,
        "client_matter_id": "OSOS436VU",
        "matter_name": "501-232383-001",
        "total_hours": 32.6997
      }, {
        "timekeepers": 4,
        "firm_id": 4844,
        "firm_name": "Rawle & Henderson LLP",
        "line_item_date": "2019-01-17",
        "total_billed": 4834.5,
        "client_matter_id": "OSOS436VU",
        "matter_name": "501-232383-001",
        "total_hours": 23.7
      }, {
        "timekeepers": 4,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2019-01-31",
        "total_billed": 443,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 1.5
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2019-01-16",
        "total_billed": 650.88,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 4.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-08-30",
        "total_billed": 2861.5,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 16.9
      }, {
        "timekeepers": 4,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2018-10-23",
        "total_billed": 643.5,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 3.6
      }, {
        "timekeepers": 4,
        "firm_id": 8925,
        "firm_name": "MACCORKLE LAVENDER PLLC",
        "line_item_date": "2019-05-06",
        "total_billed": 1002.3098,
        "client_matter_id": "OSOS503VL",
        "matter_name": "501-522072-001",
        "total_hours": 7.4999
      }, {
        "timekeepers": 4,
        "firm_id": 283,
        "firm_name": "Wood Smith Henning & Berman",
        "line_item_date": "2018-10-05",
        "total_billed": 1324.05,
        "client_matter_id": "OSOS339UG",
        "matter_name": "501-198137-001",
        "total_hours": 7.7
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-09-20",
        "total_billed": 1676.16,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 9.6
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-08-28",
        "total_billed": 695.4999,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 7.4
      }, {
        "timekeepers": 4,
        "firm_id": 9389,
        "firm_name": "YOKA & SMITH",
        "line_item_date": "2019-02-13",
        "total_billed": 423.3998,
        "client_matter_id": "OSOS905WA",
        "matter_name": "501-660084-001",
        "total_hours": 1.8
      }, {
        "timekeepers": 4,
        "firm_id": 8491,
        "firm_name": "CORNELL GRACE PC",
        "line_item_date": "2018-07-13",
        "total_billed": 665.42,
        "client_matter_id": "OSOS614UV",
        "matter_name": "501-321530-001",
        "total_hours": 3.5
      }, {
        "timekeepers": 4,
        "firm_id": 8706,
        "firm_name": "HALL BOOTH SMITH PC",
        "line_item_date": "2018-09-14",
        "total_billed": 756.6,
        "client_matter_id": "OSOS380VF",
        "matter_name": "501-498739-001",
        "total_hours": 4.5
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-08-20",
        "total_billed": 761.93,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 8
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-09-25",
        "total_billed": 905.01,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 5.1
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-10-05",
        "total_billed": 238.61,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 2
      }, {
        "timekeepers": 4,
        "firm_id": 283,
        "firm_name": "Wood Smith Henning & Berman",
        "line_item_date": "2018-08-08",
        "total_billed": 1145.47,
        "client_matter_id": "OSOS339UG",
        "matter_name": "501-198137-001",
        "total_hours": 6.4
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2018-08-21",
        "total_billed": 230.25,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 2.4
      }, {
        "timekeepers": 4,
        "firm_id": 28490,
        "firm_name": "RUDER WARE, LLSC                                            ",
        "line_item_date": "2018-09-05",
        "total_billed": 144.5,
        "client_matter_id": "OSOS635VZ",
        "matter_name": "501-544227-001",
        "total_hours": 3
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-09-05",
        "total_billed": 2385.23,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 13.1
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2019-02-07",
        "total_billed": 1051.46,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 5.9999
      }, {
        "timekeepers": 4,
        "firm_id": 19855,
        "firm_name": "JORDAN RAMIS PC",
        "line_item_date": "2018-10-19",
        "total_billed": 919.6998,
        "client_matter_id": "OSOS210VZ",
        "matter_name": "501-635447-001",
        "total_hours": 3.7
      }, {
        "timekeepers": 4,
        "firm_id": 138,
        "firm_name": "Thompson Hine",
        "line_item_date": "2019-02-26",
        "total_billed": 543.2,
        "client_matter_id": "OSOS704TF",
        "matter_name": "501-179159-001",
        "total_hours": 2.8
      }, {
        "timekeepers": 4,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2018-07-25",
        "total_billed": 633.5,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 1.3
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-08-15",
        "total_billed": 3220.4,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 18.2
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-09-24",
        "total_billed": 1024.5,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 9.3
      }, {
        "timekeepers": 4,
        "firm_id": 8721,
        "firm_name": "HARRINGTON OCKO & MONK LLP",
        "line_item_date": "2018-08-06",
        "total_billed": 287,
        "client_matter_id": "OSOS998UT",
        "matter_name": "501-393072-001",
        "total_hours": 1.9
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-07-20",
        "total_billed": 317.19,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 1.8
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-08-16",
        "total_billed": 1555.88,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 8.6
      }, {
        "timekeepers": 4,
        "firm_id": 283,
        "firm_name": "Wood Smith Henning & Berman",
        "line_item_date": "2018-07-19",
        "total_billed": 508.38,
        "client_matter_id": "OSOS339UG",
        "matter_name": "501-198137-001",
        "total_hours": 2.8
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2019-02-08",
        "total_billed": 2230.0299,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 13.4997
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2019-01-04",
        "total_billed": 1508.8,
        "client_matter_id": "OSOS208VH",
        "matter_name": "501-095801-001",
        "total_hours": 4.6
      }, {
        "timekeepers": 4,
        "firm_id": 138,
        "firm_name": "Thompson Hine",
        "line_item_date": "2018-12-13",
        "total_billed": 1575.2799,
        "client_matter_id": "OSOS704TF",
        "matter_name": "501-179159-001",
        "total_hours": 5.8
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-11-20",
        "total_billed": 769.22,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 5.2
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2018-12-04",
        "total_billed": 2953.9999,
        "client_matter_id": "OSOS303UX",
        "matter_name": "501-328514-001",
        "total_hours": 9.9
      }, {
        "timekeepers": 4,
        "firm_id": 4279,
        "firm_name": "Ray, McChristian & Jeans PC",
        "line_item_date": "2018-10-17",
        "total_billed": 386.26,
        "client_matter_id": "OSOS583VC",
        "matter_name": "501-219861-001",
        "total_hours": 2.3
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-11-16",
        "total_billed": 1284.28,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 8.8
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-08-15",
        "total_billed": 2047.19,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 24.9
      }, {
        "timekeepers": 4,
        "firm_id": 8906,
        "firm_name": "LLOYD GRAY WHITEHEAD & MONROE PC",
        "line_item_date": "2018-11-19",
        "total_billed": 405.0699,
        "client_matter_id": "OSOS698SW",
        "matter_name": "501-094830-001",
        "total_hours": 2.7
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2018-06-29",
        "total_billed": 1745,
        "client_matter_id": "OSOS888TS",
        "matter_name": "501-199080-001",
        "total_hours": 6.5
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-08-13",
        "total_billed": 366.66,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 2.1
      }, {
        "timekeepers": 4,
        "firm_id": 9389,
        "firm_name": "YOKA & SMITH",
        "line_item_date": "2019-02-07",
        "total_billed": 160.06,
        "client_matter_id": "OSOS796VN",
        "matter_name": "501-568075-001",
        "total_hours": 0.6
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2019-01-29",
        "total_billed": 1436.5,
        "client_matter_id": "OSOS888TS",
        "matter_name": "501-199080-001",
        "total_hours": 5.2
      }, {
        "timekeepers": 5,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2018-08-22",
        "total_billed": 118.5,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 2.5
      }, {
        "timekeepers": 4,
        "firm_id": 8898,
        "firm_name": "LIGHTFOOT FRANKLIN & WHITE LLC",
        "line_item_date": "2019-03-15",
        "total_billed": 321.9399,
        "client_matter_id": "OSOS825WD",
        "matter_name": "030-319919-001",
        "total_hours": 1.9999
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-07-30",
        "total_billed": 5619.64,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 36.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-08-20",
        "total_billed": 344.35,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 2.2
      }, {
        "timekeepers": 8,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-07-31",
        "total_billed": 9278.05,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 56.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-12-03",
        "total_billed": 1293.9798,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 8.8997
      }, {
        "timekeepers": 5,
        "firm_id": 9395,
        "firm_name": "ZELLE LLP",
        "line_item_date": "2018-07-17",
        "total_billed": 353.49,
        "client_matter_id": "OSOS078VF",
        "matter_name": "501-182674-001",
        "total_hours": 10.6
      }, {
        "timekeepers": 4,
        "firm_id": 8702,
        "firm_name": "GUNTY & MCCARTHY",
        "line_item_date": "2019-03-20",
        "total_billed": 290.5097,
        "client_matter_id": "OSOS456WA",
        "matter_name": "182-128867-001",
        "total_hours": 1.9
      }, {
        "timekeepers": 4,
        "firm_id": 9152,
        "firm_name": "RUMBERGER KIRK & CALDWELL",
        "line_item_date": "2018-10-16",
        "total_billed": 373.0599,
        "client_matter_id": "OSOS969VH",
        "matter_name": "683-616884-007",
        "total_hours": 2.6
      }, {
        "timekeepers": 4,
        "firm_id": 4844,
        "firm_name": "Rawle & Henderson LLP",
        "line_item_date": "2019-01-21",
        "total_billed": 4551.5,
        "client_matter_id": "OSOS436VU",
        "matter_name": "501-232383-001",
        "total_hours": 21.1998
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-09-13",
        "total_billed": 2261.07,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 12.6
      }, {
        "timekeepers": 4,
        "firm_id": 8442,
        "firm_name": "CARROLL WARREN & PARKER",
        "line_item_date": "2019-03-06",
        "total_billed": 778.28,
        "client_matter_id": "OSOS163VK",
        "matter_name": "501-366434-001",
        "total_hours": 23.6
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-08-17",
        "total_billed": 2750.92,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 15.1
      }, {
        "timekeepers": 4,
        "firm_id": 9196,
        "firm_name": "SELLAR HAZARD & LUCIA",
        "line_item_date": "2019-01-25",
        "total_billed": 414.0797,
        "client_matter_id": "OSOS096TW",
        "matter_name": "501-292109-001",
        "total_hours": 4.7
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-08-08",
        "total_billed": 2275.62,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 13.5
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-07-26",
        "total_billed": 1124.24,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 7.6
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-07-11",
        "total_billed": 1142.66,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 6.2
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2019-02-25",
        "total_billed": 2290.4598,
        "client_matter_id": "OSOS811VC",
        "matter_name": "501-012800-001",
        "total_hours": 12.6999
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2018-10-08",
        "total_billed": 2616,
        "client_matter_id": "OSOS208VH",
        "matter_name": "501-095801-001",
        "total_hours": 7.9
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2019-01-02",
        "total_billed": 383.6,
        "client_matter_id": "OSOS547SW",
        "matter_name": "510-003493-001",
        "total_hours": 1.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-07-24",
        "total_billed": 752.72,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 4.4
      }, {
        "timekeepers": 4,
        "firm_id": 9204,
        "firm_name": "SHAUB AHMUTY CITRIN & SPRATT LLP",
        "line_item_date": "2019-05-09",
        "total_billed": 607.22,
        "client_matter_id": "OSOS794WD",
        "matter_name": "501-615167-001",
        "total_hours": 2.6
      }, {
        "timekeepers": 4,
        "firm_id": 283,
        "firm_name": "Wood Smith Henning & Berman",
        "line_item_date": "2018-08-14",
        "total_billed": 889.1,
        "client_matter_id": "OSOS339UG",
        "matter_name": "501-198137-001",
        "total_hours": 7.2
      }, {
        "timekeepers": 4,
        "firm_id": 9389,
        "firm_name": "YOKA & SMITH",
        "line_item_date": "2019-01-23",
        "total_billed": 382.67,
        "client_matter_id": "OSOS796VN",
        "matter_name": "501-568075-001",
        "total_hours": 1.5
      }, {
        "timekeepers": 4,
        "firm_id": 1049,
        "firm_name": "Wheeler Trigg O'Donnell LLP",
        "line_item_date": "2018-11-01",
        "total_billed": 752.5,
        "client_matter_id": "OSOS125VM",
        "matter_name": "509-005473-001",
        "total_hours": 2.4
      }, {
        "timekeepers": 4,
        "firm_id": 9389,
        "firm_name": "YOKA & SMITH",
        "line_item_date": "2019-02-12",
        "total_billed": 240.5598,
        "client_matter_id": "OSOS903WA",
        "matter_name": "501-660182-001",
        "total_hours": 1
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-09-13",
        "total_billed": 904.5,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 6.2
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-09-17",
        "total_billed": 2602.51,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 15.1
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-08-21",
        "total_billed": 2449.25,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 14
      }, {
        "timekeepers": 4,
        "firm_id": 4844,
        "firm_name": "Rawle & Henderson LLP",
        "line_item_date": "2019-01-04",
        "total_billed": 3060,
        "client_matter_id": "OSOS436VU",
        "matter_name": "501-232383-001",
        "total_hours": 12.4
      }, {
        "timekeepers": 4,
        "firm_id": 9196,
        "firm_name": "SELLAR HAZARD & LUCIA",
        "line_item_date": "2019-03-20",
        "total_billed": 1018.5098,
        "client_matter_id": "OSOS096TW",
        "matter_name": "501-292109-001",
        "total_hours": 7.2999
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-08-03",
        "total_billed": 1117.44,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 6.3
      }, {
        "timekeepers": 4,
        "firm_id": 4844,
        "firm_name": "Rawle & Henderson LLP",
        "line_item_date": "2019-01-19",
        "total_billed": 7493.5,
        "client_matter_id": "OSOS436VU",
        "matter_name": "501-232383-001",
        "total_hours": 32.2997
      }, {
        "timekeepers": 4,
        "firm_id": 9389,
        "firm_name": "YOKA & SMITH",
        "line_item_date": "2019-01-23",
        "total_billed": 195.95,
        "client_matter_id": "OSOS599VA",
        "matter_name": "501-484527-001",
        "total_hours": 0.8
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-07-27",
        "total_billed": 1441.42,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 8.2
      }, {
        "timekeepers": 7,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-08-01",
        "total_billed": 4307.24,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 25.7
      }, {
        "timekeepers": 4,
        "firm_id": 3506,
        "firm_name": "Lugenbuhl, Wheaton, Peck, Rankin & Hubbard",
        "line_item_date": "2018-10-30",
        "total_billed": 254.5999,
        "client_matter_id": "OSOS041VW",
        "matter_name": "601-143363-001",
        "total_hours": 3.6
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-07-26",
        "total_billed": 1796.44,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 10
      }, {
        "timekeepers": 4,
        "firm_id": 9038,
        "firm_name": "NILAN JOHNSON LEWIS PA",
        "line_item_date": "2018-07-09",
        "total_billed": 2933,
        "client_matter_id": "OSOS127VN",
        "matter_name": "501-181045-001",
        "total_hours": 10.9
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2018-08-23",
        "total_billed": 1164.8,
        "client_matter_id": "OSOS208VH",
        "matter_name": "501-095801-001",
        "total_hours": 3.6
      }, {
        "timekeepers": 4,
        "firm_id": 8491,
        "firm_name": "CORNELL GRACE PC",
        "line_item_date": "2018-06-29",
        "total_billed": 651.84,
        "client_matter_id": "OSOS614UV",
        "matter_name": "501-321530-001",
        "total_hours": 3.5
      }]
    }, {
      "end_date": "2018-06-24",
      "overstaffing": [{
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2018-05-01",
        "total_billed": 2508,
        "client_matter_id": "OSOS810DL",
        "matter_name": "169-085040-001",
        "total_hours": 8.7
      }, {
        "timekeepers": 4,
        "firm_id": 297,
        "firm_name": "Smith Gambrell & Russell",
        "line_item_date": "2017-07-19",
        "total_billed": 4533,
        "client_matter_id": "OSOS303UX",
        "matter_name": "501-328514-001",
        "total_hours": 18.8
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-05",
        "total_billed": 1417.34,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 11.8
      }, {
        "timekeepers": 4,
        "firm_id": 8810,
        "firm_name": "KANARIS STUBENVOLL & HEISS PC",
        "line_item_date": "2017-11-10",
        "total_billed": 1864.34,
        "client_matter_id": "OSOS164SO",
        "matter_name": "683-561092-001",
        "total_hours": 8.8
      }, {
        "timekeepers": 4,
        "firm_id": 452,
        "firm_name": "Wilson, Elser, Moskowitz, Edelman & Dicker, Llp",
        "line_item_date": "2017-07-06",
        "total_billed": 449.1,
        "client_matter_id": "OSOS898TY",
        "matter_name": "501-190648-001",
        "total_hours": 2.4
      }, {
        "timekeepers": 4,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-11-20",
        "total_billed": 2039,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 4.2
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2018-03-06",
        "total_billed": 4116.8,
        "client_matter_id": "OSOS208VH",
        "matter_name": "501-095801-001",
        "total_hours": 12.3
      }, {
        "timekeepers": 4,
        "firm_id": 8810,
        "firm_name": "KANARIS STUBENVOLL & HEISS PC",
        "line_item_date": "2017-07-28",
        "total_billed": 567.44,
        "client_matter_id": "OSOS164SO",
        "matter_name": "683-561092-001",
        "total_hours": 2.7
      }, {
        "timekeepers": 6,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-08-21",
        "total_billed": 667.84,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 3.1
      }, {
        "timekeepers": 7,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-19",
        "total_billed": 1225.88,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 9.5
      }, {
        "timekeepers": 4,
        "firm_id": 8706,
        "firm_name": "HALL BOOTH SMITH PC",
        "line_item_date": "2018-06-11",
        "total_billed": 725.56,
        "client_matter_id": "OSOS380VF",
        "matter_name": "501-498739-001",
        "total_hours": 4.2
      }, {
        "timekeepers": 4,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-10-06",
        "total_billed": 935.5,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 2
      }, {
        "timekeepers": 4,
        "firm_id": 9394,
        "firm_name": "YUKEVICH CAVANAUGH A LAW CORPORATION",
        "line_item_date": "2018-06-18",
        "total_billed": 1243.73,
        "client_matter_id": "OSOS495UK",
        "matter_name": "501-024625-001",
        "total_hours": 6.3
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-02-16",
        "total_billed": 1329.87,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 7.8
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-07-18",
        "total_billed": 1625.23,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 9
      }, {
        "timekeepers": 4,
        "firm_id": 1049,
        "firm_name": "Wheeler Trigg O'Donnell LLP",
        "line_item_date": "2017-06-28",
        "total_billed": 2129.5,
        "client_matter_id": "OSOS301UZ",
        "matter_name": "109-008360-001",
        "total_hours": 5.8
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-11-09",
        "total_billed": 1877.06,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 15.7
      }, {
        "timekeepers": 7,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-08-22",
        "total_billed": 3076.84,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 17.2
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-09-18",
        "total_billed": 479.06,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 2.9
      }, {
        "timekeepers": 4,
        "firm_id": 8810,
        "firm_name": "KANARIS STUBENVOLL & HEISS PC",
        "line_item_date": "2017-11-02",
        "total_billed": 1228.52,
        "client_matter_id": "OSOS164SO",
        "matter_name": "683-561092-001",
        "total_hours": 5.8
      }, {
        "timekeepers": 4,
        "firm_id": 9136,
        "firm_name": "ROBINS KAPLAN LLP",
        "line_item_date": "2017-10-17",
        "total_billed": 674.44,
        "client_matter_id": "OSOS958SO",
        "matter_name": "501-017574-001",
        "total_hours": 9.1
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-08-23",
        "total_billed": 6493.17,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 35.8
      }, {
        "timekeepers": 4,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-09-08",
        "total_billed": 2544,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 5.2
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-07-31",
        "total_billed": 787.15,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 4.5
      }, {
        "timekeepers": 5,
        "firm_id": 153,
        "firm_name": "Carlton Fields,",
        "line_item_date": "2017-09-14",
        "total_billed": 2770.32,
        "client_matter_id": "OSOS960UH",
        "matter_name": "501-183952-001",
        "total_hours": 9.1
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-10-20",
        "total_billed": 1984.62,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 12
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-07-12",
        "total_billed": 1778.98,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 10
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-09-07",
        "total_billed": 3991.74,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 24.8
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-02-22",
        "total_billed": 1468.58,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 8.3
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-07-17",
        "total_billed": 2926.49,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 16.1
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-11-01",
        "total_billed": 3006.32,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 21.8
      }, {
        "timekeepers": 4,
        "firm_id": 9119,
        "firm_name": "RENAUD COOK DRURY MESAROS PA",
        "line_item_date": "2018-01-15",
        "total_billed": 1272.45,
        "client_matter_id": "OSOS322SS",
        "matter_name": "107-019410-001",
        "total_hours": 9
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-09-29",
        "total_billed": 1641.71,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 11.4
      }, {
        "timekeepers": 6,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-07-24",
        "total_billed": 1326.48,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 6.7
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-12-01",
        "total_billed": 331.74,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 2.1
      }, {
        "timekeepers": 7,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-06",
        "total_billed": 3102.54,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 18.5
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2018-04-18",
        "total_billed": 1283.2,
        "client_matter_id": "OSOS208VH",
        "matter_name": "501-095801-001",
        "total_hours": 4.1
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2018-01-10",
        "total_billed": 401.75,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 2.3
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-07-19",
        "total_billed": 266.25,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 1.7
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-27",
        "total_billed": 6051.83,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 34.7
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2017-07-11",
        "total_billed": 558.23,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 4.5
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-02-07",
        "total_billed": 428.25,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 3.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-02-15",
        "total_billed": 3630.71,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 19.7
      }, {
        "timekeepers": 5,
        "firm_id": 297,
        "firm_name": "Smith Gambrell & Russell",
        "line_item_date": "2017-07-10",
        "total_billed": 4185.7,
        "client_matter_id": "OSOS303UX",
        "matter_name": "501-328514-001",
        "total_hours": 19.4
      }, {
        "timekeepers": 5,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2018-04-26",
        "total_billed": 5382.5,
        "client_matter_id": "OSOS810DL",
        "matter_name": "169-085040-001",
        "total_hours": 20
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-07-19",
        "total_billed": 3728.68,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 20.8
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-09-08",
        "total_billed": 843.99,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 6
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-20",
        "total_billed": 2061.39,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 12.5
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-07-20",
        "total_billed": 4788.89,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 26.3
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-07-05",
        "total_billed": 1780.9,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 12.2
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-05",
        "total_billed": 3823.24,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 22.9
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-11-08",
        "total_billed": 1370.13,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 10.5
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-11-15",
        "total_billed": 2133.41,
        "client_matter_id": "OSOS134UW",
        "matter_name": "514-008236-001",
        "total_hours": 10.9
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-08-24",
        "total_billed": 6173.08,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 33.7
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-08-07",
        "total_billed": 763.94,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 4.7
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-28",
        "total_billed": 2482.23,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 14.7
      }, {
        "timekeepers": 4,
        "firm_id": 299,
        "firm_name": "Harris Beach",
        "line_item_date": "2017-10-06",
        "total_billed": 1705.35,
        "client_matter_id": "OSOS431RC",
        "matter_name": "182-123908-001",
        "total_hours": 8.2
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-07-24",
        "total_billed": 168,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 1.3
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-03-14",
        "total_billed": 2524.91,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 13.7
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-06",
        "total_billed": 1476.24,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 10.1
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-11-09",
        "total_billed": 2531.7,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 15
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-12-14",
        "total_billed": 1556.85,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 8.7
      }, {
        "timekeepers": 5,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-07-12",
        "total_billed": 504.75,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 3.5
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-07-05",
        "total_billed": 1593.71,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 9.2
      }, {
        "timekeepers": 8,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-18",
        "total_billed": 967.47,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 7.8
      }, {
        "timekeepers": 4,
        "firm_id": 9204,
        "firm_name": "SHAUB AHMUTY CITRIN & SPRATT LLP",
        "line_item_date": "2018-05-24",
        "total_billed": 1820.69,
        "client_matter_id": "OSOS357VF",
        "matter_name": "501-502445-001",
        "total_hours": 7.7
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-26",
        "total_billed": 1476.79,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 9.3
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-08-28",
        "total_billed": 1589.34,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 9.2
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-09-15",
        "total_billed": 830.11,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 6
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-11-06",
        "total_billed": 811.86,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 8.8
      }, {
        "timekeepers": 4,
        "firm_id": 8898,
        "firm_name": "LIGHTFOOT FRANKLIN & WHITE LLC",
        "line_item_date": "2018-04-05",
        "total_billed": 2308.8,
        "client_matter_id": "OSOS504VJ",
        "matter_name": "501-268997-001",
        "total_hours": 10.3
      }, {
        "timekeepers": 5,
        "firm_id": 1049,
        "firm_name": "Wheeler Trigg O'Donnell LLP",
        "line_item_date": "2017-06-27",
        "total_billed": 2030.5,
        "client_matter_id": "OSOS301UZ",
        "matter_name": "109-008360-001",
        "total_hours": 5.7
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-09-05",
        "total_billed": 723.44,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 6.3
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-06-29",
        "total_billed": 173.75,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 1.1
      }, {
        "timekeepers": 4,
        "firm_id": 9394,
        "firm_name": "YUKEVICH CAVANAUGH A LAW CORPORATION",
        "line_item_date": "2018-05-11",
        "total_billed": 1581.87,
        "client_matter_id": "OSOS495UK",
        "matter_name": "501-024625-001",
        "total_hours": 7.7
      }, {
        "timekeepers": 7,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-07-31",
        "total_billed": 2328.49,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 10.7
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-08-04",
        "total_billed": 325.43,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 2
      }, {
        "timekeepers": 6,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-06-26",
        "total_billed": 1630.1,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 9.1
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-04-05",
        "total_billed": 4866.49,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 26.8
      }, {
        "timekeepers": 4,
        "firm_id": 8721,
        "firm_name": "HARRINGTON OCKO & MONK LLP",
        "line_item_date": "2018-05-23",
        "total_billed": 386,
        "client_matter_id": "OSOS489VQ",
        "matter_name": "501-532472-001",
        "total_hours": 2.7
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-11",
        "total_billed": 1439.37,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 8.6
      }, {
        "timekeepers": 4,
        "firm_id": 1049,
        "firm_name": "Wheeler Trigg O'Donnell LLP",
        "line_item_date": "2017-07-17",
        "total_billed": 251,
        "client_matter_id": "OSOS301UZ",
        "matter_name": "109-008360-001",
        "total_hours": 0.7
      }, {
        "timekeepers": 4,
        "firm_id": 8349,
        "firm_name": "BASSI EDLIN HUIE & BLUM LLP",
        "line_item_date": "2018-02-11",
        "total_billed": 971.84,
        "client_matter_id": "OSOS739UC",
        "matter_name": "684-471708-002",
        "total_hours": 14.2
      }, {
        "timekeepers": 4,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-10-26",
        "total_billed": 1658,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 3.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-25",
        "total_billed": 1978.8,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 12
      }, {
        "timekeepers": 4,
        "firm_id": 297,
        "firm_name": "Smith Gambrell & Russell",
        "line_item_date": "2017-12-05",
        "total_billed": 2034.28,
        "client_matter_id": "OSOS137UT",
        "matter_name": "501-049006-001",
        "total_hours": 11.5
      }, {
        "timekeepers": 5,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-10-25",
        "total_billed": 466.25,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 6.4
      }, {
        "timekeepers": 4,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-07-19",
        "total_billed": 587.34,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 3.7
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-30",
        "total_billed": 832.25,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 7
      }, {
        "timekeepers": 4,
        "firm_id": 8442,
        "firm_name": "CARROLL WARREN & PARKER",
        "line_item_date": "2018-04-16",
        "total_billed": 320.46,
        "client_matter_id": "OSOS163VK",
        "matter_name": "501-366434-001",
        "total_hours": 9
      }, {
        "timekeepers": 4,
        "firm_id": 9329,
        "firm_name": "VERRILL & DANA LLP",
        "line_item_date": "2017-10-09",
        "total_billed": 1268.76,
        "client_matter_id": "OSOS259TU",
        "matter_name": "030-298971-001",
        "total_hours": 6.3
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-09-27",
        "total_billed": 902.64,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 5.6
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-11-10",
        "total_billed": 2252.43,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 16.9
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-11-02",
        "total_billed": 3788.82,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 21.9
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-04-04",
        "total_billed": 5330.15,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 29.3
      }, {
        "timekeepers": 7,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-07-26",
        "total_billed": 931,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 5.8
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-07-21",
        "total_billed": 594.25,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 4.2
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-09-06",
        "total_billed": 3955.51,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 24.8
      }, {
        "timekeepers": 5,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-08-23",
        "total_billed": 148.75,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 1.1
      }, {
        "timekeepers": 4,
        "firm_id": 452,
        "firm_name": "Wilson, Elser, Moskowitz, Edelman & Dicker, Llp",
        "line_item_date": "2017-08-23",
        "total_billed": 2488.52,
        "client_matter_id": "OSOS898TY",
        "matter_name": "501-190648-001",
        "total_hours": 11.3
      }, {
        "timekeepers": 4,
        "firm_id": 8530,
        "firm_name": "DEGAN BLANCHARD & NASH",
        "line_item_date": "2018-05-18",
        "total_billed": 220.69,
        "client_matter_id": "OSOS875VV",
        "matter_name": "290-013147-001",
        "total_hours": 1.3
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-10-23",
        "total_billed": 787.64,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 4.7
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-26",
        "total_billed": 7325.44,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 41.5
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-11-07",
        "total_billed": 2201.19,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 17.2
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-09-13",
        "total_billed": 1901.38,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 13.1
      }, {
        "timekeepers": 4,
        "firm_id": 297,
        "firm_name": "Smith Gambrell & Russell",
        "line_item_date": "2017-12-12",
        "total_billed": 1237.23,
        "client_matter_id": "OSOS137UT",
        "matter_name": "501-049006-001",
        "total_hours": 7.3
      }, {
        "timekeepers": 4,
        "firm_id": 153,
        "firm_name": "Carlton Fields,",
        "line_item_date": "2017-08-24",
        "total_billed": 2153.4,
        "client_matter_id": "OSOS960UH",
        "matter_name": "501-183952-001",
        "total_hours": 7.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-06-30",
        "total_billed": 2751.89,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 15.2
      }, {
        "timekeepers": 4,
        "firm_id": 9389,
        "firm_name": "YOKA & SMITH",
        "line_item_date": "2018-06-19",
        "total_billed": 495,
        "client_matter_id": "OSOS615UY",
        "matter_name": "501-471440-001",
        "total_hours": 1.8
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-16",
        "total_billed": 616.73,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 3.7
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-07-17",
        "total_billed": 1136.06,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 10.5
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-08-01",
        "total_billed": 565.5,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 3.5
      }, {
        "timekeepers": 4,
        "firm_id": 297,
        "firm_name": "Smith Gambrell & Russell",
        "line_item_date": "2017-07-17",
        "total_billed": 7073.3,
        "client_matter_id": "OSOS303UX",
        "matter_name": "501-328514-001",
        "total_hours": 26.8
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-01-03",
        "total_billed": 1911.87,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 12.3
      }, {
        "timekeepers": 5,
        "firm_id": 452,
        "firm_name": "Wilson, Elser, Moskowitz, Edelman & Dicker, Llp",
        "line_item_date": "2017-07-10",
        "total_billed": 1674.23,
        "client_matter_id": "OSOS898TY",
        "matter_name": "501-190648-001",
        "total_hours": 8
      }, {
        "timekeepers": 4,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-11-06",
        "total_billed": 2888,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 5.9
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-29",
        "total_billed": 2977,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 18.6
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-26",
        "total_billed": 2083.9,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 16.1
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-03",
        "total_billed": 478.2,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 3.7
      }, {
        "timekeepers": 4,
        "firm_id": 8721,
        "firm_name": "HARRINGTON OCKO & MONK LLP",
        "line_item_date": "2018-05-16",
        "total_billed": 214,
        "client_matter_id": "OSOS686TY",
        "matter_name": "501-201573-001",
        "total_hours": 1.4
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-11-03",
        "total_billed": 1648.98,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 14
      }, {
        "timekeepers": 4,
        "firm_id": 9394,
        "firm_name": "YUKEVICH CAVANAUGH A LAW CORPORATION",
        "line_item_date": "2017-12-26",
        "total_billed": 1981.43,
        "client_matter_id": "OSOS495UK",
        "matter_name": "501-024625-001",
        "total_hours": 9.6
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-07-12",
        "total_billed": 1109.66,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 6.7
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-07",
        "total_billed": 3146.68,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 18.4
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2017-12-13",
        "total_billed": 846.4,
        "client_matter_id": "OSOS208VH",
        "matter_name": "501-095801-001",
        "total_hours": 2.6
      }, {
        "timekeepers": 7,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-18",
        "total_billed": 6506.74,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 43.2
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-06-27",
        "total_billed": 2517.15,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 14.4
      }, {
        "timekeepers": 4,
        "firm_id": 297,
        "firm_name": "Smith Gambrell & Russell",
        "line_item_date": "2017-12-04",
        "total_billed": 1094.54,
        "client_matter_id": "OSOS137UT",
        "matter_name": "501-049006-001",
        "total_hours": 6.6
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-11-02",
        "total_billed": 2927.26,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 21.3
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-08-11",
        "total_billed": 1825.08,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 10.7
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2018-04-24",
        "total_billed": 1647.5,
        "client_matter_id": "OSOS810DL",
        "matter_name": "169-085040-001",
        "total_hours": 6.8
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-05-02",
        "total_billed": 2704.72,
        "client_matter_id": "OSOS439VL",
        "matter_name": "501-274276-001",
        "total_hours": 16.5
      }, {
        "timekeepers": 4,
        "firm_id": 297,
        "firm_name": "Smith Gambrell & Russell",
        "line_item_date": "2018-02-06",
        "total_billed": 1327.92,
        "client_matter_id": "OSOS137UT",
        "matter_name": "501-049006-001",
        "total_hours": 5.5
      }, {
        "timekeepers": 4,
        "firm_id": 297,
        "firm_name": "Smith Gambrell & Russell",
        "line_item_date": "2017-07-25",
        "total_billed": 2108.6,
        "client_matter_id": "OSOS303UX",
        "matter_name": "501-328514-001",
        "total_hours": 8.5
      }, {
        "timekeepers": 4,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-07-18",
        "total_billed": 547.56,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 2.5
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-04",
        "total_billed": 1297.35,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 11.1
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-07-21",
        "total_billed": 772.11,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 8.8
      }, {
        "timekeepers": 6,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-07-14",
        "total_billed": 1271.66,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 8
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-12-11",
        "total_billed": 2042.82,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 11.1
      }, {
        "timekeepers": 4,
        "firm_id": 8579,
        "firm_name": "ERICKSEN ARBUTHNOT",
        "line_item_date": "2018-03-07",
        "total_billed": 689.66,
        "client_matter_id": "OSOS394VH",
        "matter_name": "501-220444-001",
        "total_hours": 4.8
      }, {
        "timekeepers": 4,
        "firm_id": 9119,
        "firm_name": "RENAUD COOK DRURY MESAROS PA",
        "line_item_date": "2018-01-12",
        "total_billed": 1975.42,
        "client_matter_id": "OSOS322SS",
        "matter_name": "107-019410-001",
        "total_hours": 14.9
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-11-15",
        "total_billed": 1456.62,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 11.1
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-30",
        "total_billed": 591.2,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 3.7
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-25",
        "total_billed": 2296.27,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 15.7
      }, {
        "timekeepers": 7,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-07-10",
        "total_billed": 1463.23,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 6.9
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-08-21",
        "total_billed": 2340.61,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 13
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-09-14",
        "total_billed": 725.57,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 4.3
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2018-05-07",
        "total_billed": 2299,
        "client_matter_id": "OSOS810DL",
        "matter_name": "169-085040-001",
        "total_hours": 7.9
      }, {
        "timekeepers": 9,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-08-10",
        "total_billed": 3502.69,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 20.8
      }, {
        "timekeepers": 9,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-15",
        "total_billed": 5538.69,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 34.7
      }, {
        "timekeepers": 7,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-06-28",
        "total_billed": 3944.02,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 22
      }, {
        "timekeepers": 4,
        "firm_id": 8721,
        "firm_name": "HARRINGTON OCKO & MONK LLP",
        "line_item_date": "2017-11-03",
        "total_billed": 273.5,
        "client_matter_id": "OSOS241UR",
        "matter_name": "501-268083-001",
        "total_hours": 1.5
      }, {
        "timekeepers": 4,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-10-11",
        "total_billed": 2744.5,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 5.9
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-07-18",
        "total_billed": 1324.14,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 12
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-09-26",
        "total_billed": 3727.03,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 22.5
      }, {
        "timekeepers": 7,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-08-14",
        "total_billed": 4318.43,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 19.4
      }, {
        "timekeepers": 4,
        "firm_id": 8721,
        "firm_name": "HARRINGTON OCKO & MONK LLP",
        "line_item_date": "2017-10-16",
        "total_billed": 312.5,
        "client_matter_id": "OSOS588UJ",
        "matter_name": "501-235358-001",
        "total_hours": 1.7
      }, {
        "timekeepers": 4,
        "firm_id": 8950,
        "firm_name": "MATHENY SEARS LINKERT & JAIME LLP",
        "line_item_date": "2018-03-23",
        "total_billed": 592.18,
        "client_matter_id": "OSOS715UR",
        "matter_name": "683-454682-001",
        "total_hours": 3.5
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-28",
        "total_billed": 2736.86,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 17.1
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-14",
        "total_billed": 4833.99,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 35
      }, {
        "timekeepers": 4,
        "firm_id": 8712,
        "firm_name": "HANGLEY ARONCHICK SEGAL PUDLIN & SCHILLER",
        "line_item_date": "2018-02-06",
        "total_billed": 2056.4,
        "client_matter_id": "OSOS327UX",
        "matter_name": "501-178774-001",
        "total_hours": 9.7
      }, {
        "timekeepers": 6,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-08-29",
        "total_billed": 1373.5,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 4.8
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-19",
        "total_billed": 5478.08,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 35.3
      }, {
        "timekeepers": 4,
        "firm_id": 8349,
        "firm_name": "BASSI EDLIN HUIE & BLUM LLP",
        "line_item_date": "2017-09-08",
        "total_billed": 630.31,
        "client_matter_id": "OSOS739UC",
        "matter_name": "684-471708-002",
        "total_hours": 4.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-10-26",
        "total_billed": 3919.77,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 23.4
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-13",
        "total_billed": 1515.26,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 9.1
      }, {
        "timekeepers": 4,
        "firm_id": 297,
        "firm_name": "Smith Gambrell & Russell",
        "line_item_date": "2017-07-31",
        "total_billed": 3835.4,
        "client_matter_id": "OSOS303UX",
        "matter_name": "501-328514-001",
        "total_hours": 16.8
      }, {
        "timekeepers": 5,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-10-19",
        "total_billed": 158,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 4
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-24",
        "total_billed": 1828.76,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 13.3
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-13",
        "total_billed": 3422.16,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 24.9
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-08-07",
        "total_billed": 3350.39,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 19
      }, {
        "timekeepers": 4,
        "firm_id": 9099,
        "firm_name": "PRETZEL & STOUFFER CHARTERED",
        "line_item_date": "2017-09-20",
        "total_billed": 1163.54,
        "client_matter_id": "OSOS556VC",
        "matter_name": "030-319039-001",
        "total_hours": 5.7
      }, {
        "timekeepers": 7,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-20",
        "total_billed": 4771.43,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 28.1
      }, {
        "timekeepers": 4,
        "firm_id": 9038,
        "firm_name": "NILAN JOHNSON LEWIS PA",
        "line_item_date": "2018-05-07",
        "total_billed": 1557.5,
        "client_matter_id": "OSOS127VN",
        "matter_name": "501-181045-001",
        "total_hours": 5.4
      }, {
        "timekeepers": 4,
        "firm_id": 452,
        "firm_name": "Wilson, Elser, Moskowitz, Edelman & Dicker, Llp",
        "line_item_date": "2017-08-28",
        "total_billed": 1054.88,
        "client_matter_id": "OSOS898TY",
        "matter_name": "501-190648-001",
        "total_hours": 4.9
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2017-06-26",
        "total_billed": 1442.37,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 10
      }, {
        "timekeepers": 4,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-10-20",
        "total_billed": 915.4,
        "client_matter_id": "OSOS411UL",
        "matter_name": "501-350878-001",
        "total_hours": 3.5
      }, {
        "timekeepers": 4,
        "firm_id": 8810,
        "firm_name": "KANARIS STUBENVOLL & HEISS PC",
        "line_item_date": "2017-07-10",
        "total_billed": 2550.13,
        "client_matter_id": "OSOS164SO",
        "matter_name": "683-561092-001",
        "total_hours": 12.2
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-08-24",
        "total_billed": 708.48,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 4.3
      }, {
        "timekeepers": 4,
        "firm_id": 9394,
        "firm_name": "YUKEVICH CAVANAUGH A LAW CORPORATION",
        "line_item_date": "2018-05-10",
        "total_billed": 929.06,
        "client_matter_id": "OSOS495UK",
        "matter_name": "501-024625-001",
        "total_hours": 4
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2018-03-22",
        "total_billed": 4095,
        "client_matter_id": "OSOS810DL",
        "matter_name": "169-085040-001",
        "total_hours": 16.5
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-11-15",
        "total_billed": 2156.31,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 13.2
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-08-31",
        "total_billed": 479.08,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 2.9
      }, {
        "timekeepers": 4,
        "firm_id": 452,
        "firm_name": "Wilson, Elser, Moskowitz, Edelman & Dicker, Llp",
        "line_item_date": "2017-07-05",
        "total_billed": 407.87,
        "client_matter_id": "OSOS898TY",
        "matter_name": "501-190648-001",
        "total_hours": 3.5
      }, {
        "timekeepers": 4,
        "firm_id": 297,
        "firm_name": "Smith Gambrell & Russell",
        "line_item_date": "2018-01-23",
        "total_billed": 1506.99,
        "client_matter_id": "OSOS137UT",
        "matter_name": "501-049006-001",
        "total_hours": 8
      }, {
        "timekeepers": 4,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-07-21",
        "total_billed": 386.06,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 2.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-10-17",
        "total_billed": 969.61,
        "client_matter_id": "OSOS134UW",
        "matter_name": "514-008236-001",
        "total_hours": 5.9
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-09-22",
        "total_billed": 1264.4,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 8.7
      }, {
        "timekeepers": 7,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-07-17",
        "total_billed": 4242.79,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 17.2
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-08-14",
        "total_billed": 1179.03,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 7.1
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-01-19",
        "total_billed": 921.5,
        "client_matter_id": "OSOS237UW",
        "matter_name": "501-407293-001",
        "total_hours": 11.8
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-10-23",
        "total_billed": 2468.56,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 18.1
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-11",
        "total_billed": 3011.36,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 18.4
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2018-06-04",
        "total_billed": 150,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 1.3
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-08-09",
        "total_billed": 954.97,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 5.6
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-07-10",
        "total_billed": 1807.28,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 11.6
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2018-04-17",
        "total_billed": 1182.4,
        "client_matter_id": "OSOS208VH",
        "matter_name": "501-095801-001",
        "total_hours": 3.9
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-08-15",
        "total_billed": 2277.08,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 13.2
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-09-12",
        "total_billed": 4842.2,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 32.4
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-05-17",
        "total_billed": 822.56,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 5.6
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-08-08",
        "total_billed": 2822.23,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 16.3
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-09-11",
        "total_billed": 3894.08,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 22.9
      }, {
        "timekeepers": 4,
        "firm_id": 8811,
        "firm_name": "KANE RUSSELL COLEMAN & LOGAN PC",
        "line_item_date": "2017-09-05",
        "total_billed": 2040,
        "client_matter_id": "OSOS356TX",
        "matter_name": "501-155249-001",
        "total_hours": 20.2
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2018-01-24",
        "total_billed": 584.82,
        "client_matter_id": "OSOS643UU",
        "matter_name": "646-207726-001",
        "total_hours": 2.7
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-07-25",
        "total_billed": 1932.24,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 10.8
      }, {
        "timekeepers": 5,
        "firm_id": 153,
        "firm_name": "Carlton Fields,",
        "line_item_date": "2017-09-28",
        "total_billed": 3204.88,
        "client_matter_id": "OSOS960UH",
        "matter_name": "501-183952-001",
        "total_hours": 15.7
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-11-16",
        "total_billed": 1377,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 12.2
      }, {
        "timekeepers": 4,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-11-02",
        "total_billed": 2290,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 5.3
      }, {
        "timekeepers": 4,
        "firm_id": 8316,
        "firm_name": "ANDERSON JULIAN & HULL LLP",
        "line_item_date": "2018-02-08",
        "total_billed": 979.7,
        "client_matter_id": "OSOS901VE",
        "matter_name": "501-265705-001",
        "total_hours": 8.1
      }, {
        "timekeepers": 4,
        "firm_id": 339,
        "firm_name": "Clark Hill",
        "line_item_date": "2017-11-03",
        "total_billed": 946.72,
        "client_matter_id": "OSOS660VF",
        "matter_name": "501-427585-001",
        "total_hours": 6.1
      }]
    }, {
      "end_date": "2017-06-24",
      "overstaffing": [{
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-05",
        "total_billed": 774.59,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 4.7
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-06-20",
        "total_billed": 4216.59,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 26.4
      }, {
        "timekeepers": 7,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-09",
        "total_billed": 5651.2,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 32.4
      }, {
        "timekeepers": 5,
        "firm_id": 15560,
        "firm_name": "NEUNERPATE",
        "line_item_date": "2016-07-01",
        "total_billed": 3993.5,
        "client_matter_id": "OSOS662RW",
        "matter_name": "684-392224-001",
        "total_hours": 18.2
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-23",
        "total_billed": 2761.48,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 19.4
      }, {
        "timekeepers": 5,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-02-24",
        "total_billed": 380,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 2.7
      }, {
        "timekeepers": 4,
        "firm_id": 9119,
        "firm_name": "RENAUD COOK DRURY MESAROS PA",
        "line_item_date": "2016-08-19",
        "total_billed": 1288.16,
        "client_matter_id": "OSOS929UE",
        "matter_name": "169-381169-001",
        "total_hours": 7.6
      }, {
        "timekeepers": 4,
        "firm_id": 115,
        "firm_name": "Snell & Wilmer",
        "line_item_date": "2016-06-29",
        "total_billed": 729,
        "client_matter_id": "OSOS858RV",
        "matter_name": "683-584115-001",
        "total_hours": 4.4
      }, {
        "timekeepers": 7,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-04-04",
        "total_billed": 2763,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 10.2
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-23",
        "total_billed": 1517.93,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 9.6
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-10-27",
        "total_billed": 618.56,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 6.7
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-11-28",
        "total_billed": 3015.34,
        "client_matter_id": "OSOS127TE",
        "matter_name": "501-174184-001",
        "total_hours": 19.1
      }, {
        "timekeepers": 4,
        "firm_id": 9119,
        "firm_name": "RENAUD COOK DRURY MESAROS PA",
        "line_item_date": "2017-01-03",
        "total_billed": 3395,
        "client_matter_id": "OSOS309UT",
        "matter_name": "501-193622-001",
        "total_hours": 18.8
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-04-18",
        "total_billed": 1476.73,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 8.8
      }, {
        "timekeepers": 6,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-06-21",
        "total_billed": 994.74,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 5.5
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-02",
        "total_billed": 856.99,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 9.2
      }, {
        "timekeepers": 9,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-15",
        "total_billed": 6669.72,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 39.9
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-01-27",
        "total_billed": 1033.5399,
        "client_matter_id": "OSOS123UH",
        "matter_name": "683-620686-001",
        "total_hours": 6.6
      }, {
        "timekeepers": 4,
        "firm_id": 75,
        "firm_name": "Troutman Sanders",
        "line_item_date": "2016-12-23",
        "total_billed": 1300,
        "client_matter_id": "OSOS514UR",
        "matter_name": "030-255793-001",
        "total_hours": 4
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-08",
        "total_billed": 3084.6,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 18
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-10",
        "total_billed": 971.56,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 5.9
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-12-12",
        "total_billed": 953.11,
        "client_matter_id": "OSOS127TE",
        "matter_name": "501-174184-001",
        "total_hours": 6.9
      }, {
        "timekeepers": 4,
        "firm_id": 1049,
        "firm_name": "Wheeler Trigg O'Donnell LLP",
        "line_item_date": "2016-08-15",
        "total_billed": 744.96,
        "client_matter_id": "OSOS487UD",
        "matter_name": "107-022650-001",
        "total_hours": 5.7
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-07-18",
        "total_billed": 1185.05,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 11.2
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-02-09",
        "total_billed": 213.98,
        "client_matter_id": "OSOS482TT",
        "matter_name": "501-167732-001",
        "total_hours": 1.7
      }, {
        "timekeepers": 4,
        "firm_id": 290,
        "firm_name": "Cole, Scott & Kissane",
        "line_item_date": "2017-06-13",
        "total_billed": 931.5,
        "client_matter_id": "OSOS894UX",
        "matter_name": "501-145535-001",
        "total_hours": 12.1
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-02-14",
        "total_billed": 5103.66,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 28
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-12-20",
        "total_billed": 942.46,
        "client_matter_id": "OSOS127TE",
        "matter_name": "501-174184-001",
        "total_hours": 6.3
      }, {
        "timekeepers": 5,
        "firm_id": 153,
        "firm_name": "Carlton Fields,",
        "line_item_date": "2016-12-05",
        "total_billed": 2795.06,
        "client_matter_id": "OSOS960UH",
        "matter_name": "501-183952-001",
        "total_hours": 12.2
      }, {
        "timekeepers": 4,
        "firm_id": 8721,
        "firm_name": "HARRINGTON OCKO & MONK LLP",
        "line_item_date": "2016-10-24",
        "total_billed": 420,
        "client_matter_id": "OSOS390TZ",
        "matter_name": "501-175496-001",
        "total_hours": 3.2
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-06-19",
        "total_billed": 4859.7,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 29.7
      }, {
        "timekeepers": 4,
        "firm_id": 8926,
        "firm_name": "MACDONALD DEVIN PC",
        "line_item_date": "2016-08-02",
        "total_billed": 457.07,
        "client_matter_id": "OSOS662UE",
        "matter_name": "683-614117-001",
        "total_hours": 2.8
      }, {
        "timekeepers": 5,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-02-15",
        "total_billed": 547.5,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 4.8
      }, {
        "timekeepers": 8,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-17",
        "total_billed": 8843,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 54.1
      }, {
        "timekeepers": 6,
        "firm_id": 8663,
        "firm_name": "GIEGER, LABORDE & LAPEROUSE, LLC",
        "line_item_date": "2016-07-24",
        "total_billed": 3184.51,
        "client_matter_id": "OSOS475TY",
        "matter_name": "501-258738-001",
        "total_hours": 26.6
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-11",
        "total_billed": 180.41,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 1.2
      }, {
        "timekeepers": 5,
        "firm_id": 8926,
        "firm_name": "MACDONALD DEVIN PC",
        "line_item_date": "2017-04-28",
        "total_billed": 2164.46,
        "client_matter_id": "OSOS212UZ",
        "matter_name": "501-221752-001",
        "total_hours": 15.3
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-06-21",
        "total_billed": 3597.73,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 22.3
      }, {
        "timekeepers": 4,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-02-07",
        "total_billed": 1415.24,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 11.2
      }, {
        "timekeepers": 5,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-04-26",
        "total_billed": 193,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 1.3
      }, {
        "timekeepers": 4,
        "firm_id": 9082,
        "firm_name": "PIETRAGALLO GORDON ALFANO BOSICK & RASPANTI LLP",
        "line_item_date": "2016-10-25",
        "total_billed": 1207.5,
        "client_matter_id": "OSOS270UM",
        "matter_name": "030-321859-001",
        "total_hours": 5.4
      }, {
        "timekeepers": 8,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-01",
        "total_billed": 1641.44,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 13.7
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2016-10-25",
        "total_billed": 2443.43,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 15.5
      }, {
        "timekeepers": 4,
        "firm_id": 153,
        "firm_name": "Carlton Fields,",
        "line_item_date": "2016-12-16",
        "total_billed": 1866.76,
        "client_matter_id": "OSOS960UH",
        "matter_name": "501-183952-001",
        "total_hours": 10.3
      }, {
        "timekeepers": 5,
        "firm_id": 8926,
        "firm_name": "MACDONALD DEVIN PC",
        "line_item_date": "2016-07-19",
        "total_billed": 1621.65,
        "client_matter_id": "OSOS662UE",
        "matter_name": "683-614117-001",
        "total_hours": 11.5
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-01",
        "total_billed": 1919.15,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 15.5
      }, {
        "timekeepers": 4,
        "firm_id": 8552,
        "firm_name": "DONOVAN HATEM LLP",
        "line_item_date": "2017-03-08",
        "total_billed": 706.16,
        "client_matter_id": "OSOS806UA",
        "matter_name": "683-481081-001",
        "total_hours": 4.9
      }, {
        "timekeepers": 4,
        "firm_id": 8734,
        "firm_name": "HEIDELL PITTONI MURPHY & BACH LLP",
        "line_item_date": "2016-08-31",
        "total_billed": 735.35,
        "client_matter_id": "OSOS052RM",
        "matter_name": "107-017056-001",
        "total_hours": 4.4
      }, {
        "timekeepers": 5,
        "firm_id": 8844,
        "firm_name": "KOELLER NEBEKER CARLSON & HALUCK LLP",
        "line_item_date": "2016-07-07",
        "total_billed": 1422.11,
        "client_matter_id": "OSOS422QD",
        "matter_name": "169-358216-001",
        "total_hours": 16.7
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-03-22",
        "total_billed": 274.75,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 2.4
      }, {
        "timekeepers": 4,
        "firm_id": 15560,
        "firm_name": "NEUNERPATE",
        "line_item_date": "2016-06-27",
        "total_billed": 2773.5,
        "client_matter_id": "OSOS662RW",
        "matter_name": "684-392224-001",
        "total_hours": 13.1
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-10-07",
        "total_billed": 1554.22,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 13.5
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-22",
        "total_billed": 1796.62,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 11.3
      }, {
        "timekeepers": 4,
        "firm_id": 15560,
        "firm_name": "NEUNERPATE",
        "line_item_date": "2016-07-08",
        "total_billed": 1476.5,
        "client_matter_id": "OSOS662RW",
        "matter_name": "684-392224-001",
        "total_hours": 7.4
      }, {
        "timekeepers": 4,
        "firm_id": 8844,
        "firm_name": "KOELLER NEBEKER CARLSON & HALUCK LLP",
        "line_item_date": "2016-06-27",
        "total_billed": 1089.89,
        "client_matter_id": "OSOS422QD",
        "matter_name": "169-358216-001",
        "total_hours": 12.7
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2016-10-24",
        "total_billed": 2505.5,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 15.8
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-10-05",
        "total_billed": 2707.18,
        "client_matter_id": "OSOS482TT",
        "matter_name": "501-167732-001",
        "total_hours": 17.9
      }, {
        "timekeepers": 7,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-04",
        "total_billed": 723.42,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 4.5
      }, {
        "timekeepers": 7,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-26",
        "total_billed": 4270.98,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 27.3
      }, {
        "timekeepers": 5,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-05-09",
        "total_billed": 240.5,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 1.6
      }, {
        "timekeepers": 4,
        "firm_id": 8603,
        "firm_name": "FISHKIN LUCKS LLP",
        "line_item_date": "2016-08-09",
        "total_billed": 73.72,
        "client_matter_id": "OSOS325TX",
        "matter_name": "501-292036-001",
        "total_hours": 0.4
      }, {
        "timekeepers": 5,
        "firm_id": 8844,
        "firm_name": "KOELLER NEBEKER CARLSON & HALUCK LLP",
        "line_item_date": "2016-06-28",
        "total_billed": 907.92,
        "client_matter_id": "OSOS422QD",
        "matter_name": "169-358216-001",
        "total_hours": 8.8
      }, {
        "timekeepers": 4,
        "firm_id": 8844,
        "firm_name": "KOELLER NEBEKER CARLSON & HALUCK LLP",
        "line_item_date": "2017-04-04",
        "total_billed": 746.21,
        "client_matter_id": "OSOS422QD",
        "matter_name": "169-358216-001",
        "total_hours": 10
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-06-22",
        "total_billed": 5247.7,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 33.7
      }, {
        "timekeepers": 4,
        "firm_id": 8349,
        "firm_name": "BASSI EDLIN HUIE & BLUM LLP",
        "line_item_date": "2017-03-24",
        "total_billed": 359.39,
        "client_matter_id": "OSOS931SE",
        "matter_name": "182-130124-001",
        "total_hours": 1.9
      }, {
        "timekeepers": 7,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-04-14",
        "total_billed": 1661.43,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 13
      }, {
        "timekeepers": 5,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-04-25",
        "total_billed": 1878,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 4.7
      }, {
        "timekeepers": 5,
        "firm_id": 8663,
        "firm_name": "GIEGER, LABORDE & LAPEROUSE, LLC",
        "line_item_date": "2016-08-04",
        "total_billed": 2250.88,
        "client_matter_id": "OSOS475TY",
        "matter_name": "501-258738-001",
        "total_hours": 15.4
      }, {
        "timekeepers": 9,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-16",
        "total_billed": 8063.13,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 49.7
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-06",
        "total_billed": 806.72,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 8.2
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-03-14",
        "total_billed": 561.23,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 5.3
      }, {
        "timekeepers": 4,
        "firm_id": 9394,
        "firm_name": "YUKEVICH CAVANAUGH A LAW CORPORATION",
        "line_item_date": "2017-04-21",
        "total_billed": 317.19,
        "client_matter_id": "OSOS595TK",
        "matter_name": "501-180260-001",
        "total_hours": 1.3
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-24",
        "total_billed": 1762.74,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 11
      }, {
        "timekeepers": 4,
        "firm_id": 8844,
        "firm_name": "KOELLER NEBEKER CARLSON & HALUCK LLP",
        "line_item_date": "2016-07-12",
        "total_billed": 421.28,
        "client_matter_id": "OSOS422QD",
        "matter_name": "169-358216-001",
        "total_hours": 4.9
      }, {
        "timekeepers": 4,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2016-11-02",
        "total_billed": 306.52,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 2.2
      }, {
        "timekeepers": 5,
        "firm_id": 8663,
        "firm_name": "GIEGER, LABORDE & LAPEROUSE, LLC",
        "line_item_date": "2016-08-01",
        "total_billed": 2690.78,
        "client_matter_id": "OSOS475TY",
        "matter_name": "501-258738-001",
        "total_hours": 21.7
      }, {
        "timekeepers": 4,
        "firm_id": 15560,
        "firm_name": "NEUNERPATE",
        "line_item_date": "2016-07-05",
        "total_billed": 486,
        "client_matter_id": "OSOS662RW",
        "matter_name": "684-392224-001",
        "total_hours": 3.9
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-02-06",
        "total_billed": 302.5,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 2
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-10-03",
        "total_billed": 1874.43,
        "client_matter_id": "OSOS482TT",
        "matter_name": "501-167732-001",
        "total_hours": 11.7
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-02-21",
        "total_billed": 980.18,
        "client_matter_id": "OSOS123UH",
        "matter_name": "683-620686-001",
        "total_hours": 17.8
      }, {
        "timekeepers": 5,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-06-06",
        "total_billed": 1958.91,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 10.5
      }, {
        "timekeepers": 5,
        "firm_id": 9394,
        "firm_name": "YUKEVICH CAVANAUGH A LAW CORPORATION",
        "line_item_date": "2017-04-13",
        "total_billed": 2996.32,
        "client_matter_id": "OSOS595TK",
        "matter_name": "501-180260-001",
        "total_hours": 16.3
      }, {
        "timekeepers": 5,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-01-04",
        "total_billed": 173,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 1.2
      }, {
        "timekeepers": 4,
        "firm_id": 11728,
        "firm_name": "HALL, EVANS                                                 ",
        "line_item_date": "2017-02-14",
        "total_billed": 601.4,
        "client_matter_id": "OSOS496UG",
        "matter_name": "501-290165-001",
        "total_hours": 3.8
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2016-06-30",
        "total_billed": 1219.29,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 7.2
      }, {
        "timekeepers": 5,
        "firm_id": 15560,
        "firm_name": "NEUNERPATE",
        "line_item_date": "2016-06-30",
        "total_billed": 2539,
        "client_matter_id": "OSOS662RW",
        "matter_name": "684-392224-001",
        "total_hours": 11.8
      }, {
        "timekeepers": 7,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-30",
        "total_billed": 5848.13,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 34.1
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-04-12",
        "total_billed": 1229.19,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 7.3
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-02-15",
        "total_billed": 5515.42,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 31.6
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-02",
        "total_billed": 824.58,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 9.3
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2016-12-13",
        "total_billed": 158,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 1
      }, {
        "timekeepers": 4,
        "firm_id": 8544,
        "firm_name": "DONAHUE DAVIES LLP",
        "line_item_date": "2017-05-02",
        "total_billed": 591.7,
        "client_matter_id": "OSOS733TN",
        "matter_name": "510-009818-001",
        "total_hours": 2.9
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-12",
        "total_billed": 2919.7,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 16.3
      }, {
        "timekeepers": 5,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2016-12-21",
        "total_billed": 165,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 1.2
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-04-18",
        "total_billed": 2899.92,
        "client_matter_id": "OSOS482TT",
        "matter_name": "501-167732-001",
        "total_hours": 20.1
      }, {
        "timekeepers": 4,
        "firm_id": 8943,
        "firm_name": "MARTIN CLEARWATER & BELL LLP",
        "line_item_date": "2016-07-06",
        "total_billed": 346.73,
        "client_matter_id": "OSOS358RK",
        "matter_name": "182-126202-001",
        "total_hours": 4.6
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-11-07",
        "total_billed": 2731.14,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 20.4
      }, {
        "timekeepers": 8,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-02",
        "total_billed": 2416.33,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 16.7
      }, {
        "timekeepers": 4,
        "firm_id": 8404,
        "firm_name": "BRODY & BRANCH LLP",
        "line_item_date": "2016-09-20",
        "total_billed": 3648.55,
        "client_matter_id": "OSOS582UE",
        "matter_name": "683-424090-003",
        "total_hours": 19.5
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-02-14",
        "total_billed": 872.41,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 9.4
      }, {
        "timekeepers": 4,
        "firm_id": 8349,
        "firm_name": "BASSI EDLIN HUIE & BLUM LLP",
        "line_item_date": "2017-02-23",
        "total_billed": 870.09,
        "client_matter_id": "OSOS931SE",
        "matter_name": "182-130124-001",
        "total_hours": 4.6
      }, {
        "timekeepers": 7,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-31",
        "total_billed": 5158.47,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 29.6
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-13",
        "total_billed": 1691.2,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 10.5
      }, {
        "timekeepers": 4,
        "firm_id": 290,
        "firm_name": "Cole, Scott & Kissane",
        "line_item_date": "2017-06-23",
        "total_billed": 938,
        "client_matter_id": "OSOS894UX",
        "matter_name": "501-145535-001",
        "total_hours": 11.8
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-02-16",
        "total_billed": 2240.7,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 12.6
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-03-02",
        "total_billed": 154.5,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 1.2
      }, {
        "timekeepers": 5,
        "firm_id": 8844,
        "firm_name": "KOELLER NEBEKER CARLSON & HALUCK LLP",
        "line_item_date": "2017-04-05",
        "total_billed": 1019.27,
        "client_matter_id": "OSOS422QD",
        "matter_name": "169-358216-001",
        "total_hours": 11.8
      }, {
        "timekeepers": 4,
        "firm_id": 283,
        "firm_name": "Wood Smith Henning & Berman",
        "line_item_date": "2017-02-01",
        "total_billed": 1538.42,
        "client_matter_id": "OSOS027TJ",
        "matter_name": "501-225239-001",
        "total_hours": 8.8
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2017-06-08",
        "total_billed": 1428,
        "client_matter_id": "OSOS242UV",
        "matter_name": "030-317542-001",
        "total_hours": 4.7
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2016-11-03",
        "total_billed": 3327.5,
        "client_matter_id": "OSOS250RR",
        "matter_name": "182-126201-001",
        "total_hours": 11.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-04-20",
        "total_billed": 2718.48,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 15.5
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2016-10-20",
        "total_billed": 341.92,
        "client_matter_id": "OSOS123UH",
        "matter_name": "683-620686-001",
        "total_hours": 1.5
      }, {
        "timekeepers": 4,
        "firm_id": 9394,
        "firm_name": "YUKEVICH CAVANAUGH A LAW CORPORATION",
        "line_item_date": "2017-04-19",
        "total_billed": 1512.72,
        "client_matter_id": "OSOS595TK",
        "matter_name": "501-180260-001",
        "total_hours": 6.3
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-30",
        "total_billed": 827.97,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 4.9
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-11-04",
        "total_billed": 1705.26,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 15.7
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2016-12-01",
        "total_billed": 1511.25,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 10.3
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-04-28",
        "total_billed": 656.17,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 4.1
      }, {
        "timekeepers": 4,
        "firm_id": 8536,
        "firm_name": "DEVINE MILLIMET & BRANCH",
        "line_item_date": "2016-07-22",
        "total_billed": 1503.02,
        "client_matter_id": "OSOS146SN",
        "matter_name": "501-058805-001",
        "total_hours": 8.9
      }, {
        "timekeepers": 4,
        "firm_id": 64,
        "firm_name": "Littler Mendelson",
        "line_item_date": "2017-02-01",
        "total_billed": 779.5,
        "client_matter_id": "OSOS910UT",
        "matter_name": "501-225411-001",
        "total_hours": 2.9
      }, {
        "timekeepers": 4,
        "firm_id": 8552,
        "firm_name": "DONOVAN HATEM LLP",
        "line_item_date": "2017-03-14",
        "total_billed": 874.94,
        "client_matter_id": "OSOS806UA",
        "matter_name": "683-481081-001",
        "total_hours": 6.1
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-11",
        "total_billed": 4473.79,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 25.4
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-11-18",
        "total_billed": 1800.7,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 14.9
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-05-17",
        "total_billed": 405.75,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 2.6
      }, {
        "timekeepers": 4,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2016-12-08",
        "total_billed": 637.78,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 3.2
      }, {
        "timekeepers": 4,
        "firm_id": 9119,
        "firm_name": "RENAUD COOK DRURY MESAROS PA",
        "line_item_date": "2017-05-01",
        "total_billed": 356.96,
        "client_matter_id": "OSOS258UH",
        "matter_name": "684-387235-001",
        "total_hours": 2.5
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-04",
        "total_billed": 1846.88,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 10.1
      }, {
        "timekeepers": 5,
        "firm_id": 8663,
        "firm_name": "GIEGER, LABORDE & LAPEROUSE, LLC",
        "line_item_date": "2016-07-23",
        "total_billed": 2489.48,
        "client_matter_id": "OSOS475TY",
        "matter_name": "501-258738-001",
        "total_hours": 24.3
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-06-02",
        "total_billed": 450.08,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 2.6
      }, {
        "timekeepers": 4,
        "firm_id": 8603,
        "firm_name": "FISHKIN LUCKS LLP",
        "line_item_date": "2016-11-16",
        "total_billed": 85.36,
        "client_matter_id": "OSOS325TX",
        "matter_name": "501-292036-001",
        "total_hours": 0.4
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-14",
        "total_billed": 1844.51,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 11.4
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-07-20",
        "total_billed": 994.04,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 11.1
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-02-17",
        "total_billed": 1474.4,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 8.3
      }, {
        "timekeepers": 4,
        "firm_id": 27661,
        "firm_name": "SIBONI & BUCHANAN PLLC",
        "line_item_date": "2017-01-17",
        "total_billed": 323.5,
        "client_matter_id": "OSOS714RB",
        "matter_name": "980-015909-001",
        "total_hours": 1.6
      }, {
        "timekeepers": 4,
        "firm_id": 1049,
        "firm_name": "Wheeler Trigg O'Donnell LLP",
        "line_item_date": "2017-06-08",
        "total_billed": 521.5,
        "client_matter_id": "OSOS301UZ",
        "matter_name": "109-008360-001",
        "total_hours": 1.6
      }, {
        "timekeepers": 4,
        "firm_id": 9119,
        "firm_name": "RENAUD COOK DRURY MESAROS PA",
        "line_item_date": "2016-08-10",
        "total_billed": 1512.23,
        "client_matter_id": "OSOS929UE",
        "matter_name": "169-381169-001",
        "total_hours": 8.4
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-10",
        "total_billed": 4770.43,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 27.1
      }, {
        "timekeepers": 4,
        "firm_id": 8748,
        "firm_name": "HEWITT & TRUSZKOWSKI",
        "line_item_date": "2016-12-07",
        "total_billed": 1930.3,
        "client_matter_id": "OSOS843TI",
        "matter_name": "501-216280-001",
        "total_hours": 10.5
      }, {
        "timekeepers": 4,
        "firm_id": 8544,
        "firm_name": "DONAHUE DAVIES LLP",
        "line_item_date": "2017-04-25",
        "total_billed": 729.5,
        "client_matter_id": "OSOS733TN",
        "matter_name": "510-009818-001",
        "total_hours": 3.3
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-25",
        "total_billed": 1197.17,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 7.2
      }, {
        "timekeepers": 4,
        "firm_id": 8552,
        "firm_name": "DONOVAN HATEM LLP",
        "line_item_date": "2017-03-13",
        "total_billed": 123.19,
        "client_matter_id": "OSOS806UA",
        "matter_name": "683-481081-001",
        "total_hours": 0.8
      }, {
        "timekeepers": 4,
        "firm_id": 8734,
        "firm_name": "HEIDELL PITTONI MURPHY & BACH LLP",
        "line_item_date": "2016-08-30",
        "total_billed": 1577.11,
        "client_matter_id": "OSOS052RM",
        "matter_name": "107-017056-001",
        "total_hours": 9.1
      }, {
        "timekeepers": 5,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-03-21",
        "total_billed": 1004.5,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 2.1
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-03-29",
        "total_billed": 63.5,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 0.6
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-09-07",
        "total_billed": 556.97,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 3.4
      }, {
        "timekeepers": 4,
        "firm_id": 153,
        "firm_name": "Carlton Fields,",
        "line_item_date": "2016-12-21",
        "total_billed": 989.4,
        "client_matter_id": "OSOS960UH",
        "matter_name": "501-183952-001",
        "total_hours": 3.4
      }, {
        "timekeepers": 5,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2016-11-22",
        "total_billed": 301.19,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 1.6
      }, {
        "timekeepers": 4,
        "firm_id": 1049,
        "firm_name": "Wheeler Trigg O'Donnell LLP",
        "line_item_date": "2017-04-13",
        "total_billed": 891,
        "client_matter_id": "OSOS301UZ",
        "matter_name": "109-008360-001",
        "total_hours": 2.6
      }, {
        "timekeepers": 7,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-06-07",
        "total_billed": 1315.81,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 6.7
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-04-05",
        "total_billed": 2970.14,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 17.3
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-08-15",
        "total_billed": 685.6,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 4.2
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-04-20",
        "total_billed": 864.28,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 5.1
      }, {
        "timekeepers": 4,
        "firm_id": 452,
        "firm_name": "Wilson, Elser, Moskowitz, Edelman & Dicker, Llp",
        "line_item_date": "2016-07-20",
        "total_billed": 362.78,
        "client_matter_id": "OSOS614TL",
        "matter_name": "501-014799-001",
        "total_hours": 1.6
      }, {
        "timekeepers": 7,
        "firm_id": 8663,
        "firm_name": "GIEGER, LABORDE & LAPEROUSE, LLC",
        "line_item_date": "2016-08-02",
        "total_billed": 2419.18,
        "client_matter_id": "OSOS475TY",
        "matter_name": "501-258738-001",
        "total_hours": 15.2
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-04-24",
        "total_billed": 1675.1,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 13.6
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2016-07-21",
        "total_billed": 2151.46,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 12.4
      }, {
        "timekeepers": 4,
        "firm_id": 153,
        "firm_name": "Carlton Fields,",
        "line_item_date": "2016-12-30",
        "total_billed": 2619,
        "client_matter_id": "OSOS960UH",
        "matter_name": "501-183952-001",
        "total_hours": 9
      }, {
        "timekeepers": 9,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-19",
        "total_billed": 7175.09,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 44.6
      }, {
        "timekeepers": 4,
        "firm_id": 115,
        "firm_name": "Snell & Wilmer",
        "line_item_date": "2016-07-08",
        "total_billed": 1078.5,
        "client_matter_id": "OSOS858RV",
        "matter_name": "683-584115-001",
        "total_hours": 6.6
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-02-03",
        "total_billed": 165.57,
        "client_matter_id": "OSOS482TT",
        "matter_name": "501-167732-001",
        "total_hours": 1
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-04-26",
        "total_billed": 2390.08,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 13
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-16",
        "total_billed": 2597.47,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 16.3
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-11-22",
        "total_billed": 1274.63,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 11.8
      }, {
        "timekeepers": 4,
        "firm_id": 8950,
        "firm_name": "MATHENY SEARS LINKERT & JAIME LLP",
        "line_item_date": "2017-02-10",
        "total_billed": 792.01,
        "client_matter_id": "OSOS715UR",
        "matter_name": "683-454682-001",
        "total_hours": 6.1
      }, {
        "timekeepers": 5,
        "firm_id": 8844,
        "firm_name": "KOELLER NEBEKER CARLSON & HALUCK LLP",
        "line_item_date": "2017-03-22",
        "total_billed": 1266.04,
        "client_matter_id": "OSOS422QD",
        "matter_name": "169-358216-001",
        "total_hours": 15.4
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-07",
        "total_billed": 1387.18,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 10.6
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-06-16",
        "total_billed": 2001.11,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 11.9
      }, {
        "timekeepers": 6,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-06-19",
        "total_billed": 1326.01,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 6.4
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-01-23",
        "total_billed": 1239.46,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 11.5
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-18",
        "total_billed": 5992.66,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 37
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-12-13",
        "total_billed": 1839.68,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 12.3
      }, {
        "timekeepers": 6,
        "firm_id": 8663,
        "firm_name": "GIEGER, LABORDE & LAPEROUSE, LLC",
        "line_item_date": "2016-07-29",
        "total_billed": 2775.65,
        "client_matter_id": "OSOS475TY",
        "matter_name": "501-258738-001",
        "total_hours": 26.1
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-21",
        "total_billed": 883.66,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 5.6
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2016-07-27",
        "total_billed": 3476.48,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 20
      }, {
        "timekeepers": 5,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-05-31",
        "total_billed": 86.5,
        "client_matter_id": "OSOS918UO",
        "matter_name": "501-356427-001",
        "total_hours": 0.6
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-10-25",
        "total_billed": 911.22,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 5.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-03-28",
        "total_billed": 1973.95,
        "client_matter_id": "OSOS123UH",
        "matter_name": "683-620686-001",
        "total_hours": 28
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-05-24",
        "total_billed": 123,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 0.8
      }, {
        "timekeepers": 4,
        "firm_id": 9214,
        "firm_name": "SHUMAN MCCUSKEY & SLICER PLLC",
        "line_item_date": "2016-09-06",
        "total_billed": 929,
        "client_matter_id": "OSOS735SI",
        "matter_name": "501-047385-001",
        "total_hours": 6.1
      }, {
        "timekeepers": 4,
        "firm_id": 9383,
        "firm_name": "WRIGHT CLOSE & BARGER LLP",
        "line_item_date": "2016-12-07",
        "total_billed": 1386.13,
        "client_matter_id": "OSOS935TV",
        "matter_name": "501-190923-001",
        "total_hours": 5.1
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-04-04",
        "total_billed": 4152.11,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 25
      }, {
        "timekeepers": 4,
        "firm_id": 8844,
        "firm_name": "KOELLER NEBEKER CARLSON & HALUCK LLP",
        "line_item_date": "2016-07-08",
        "total_billed": 710.04,
        "client_matter_id": "OSOS422QD",
        "matter_name": "169-358216-001",
        "total_hours": 8.2
      }, {
        "timekeepers": 4,
        "firm_id": 472,
        "firm_name": "Foran Glennon Palandech Ponzi & Rudloff, Pc",
        "line_item_date": "2017-05-22",
        "total_billed": 382.95,
        "client_matter_id": "OSOS877UU",
        "matter_name": "501-295622-001",
        "total_hours": 7.7
      }, {
        "timekeepers": 7,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-22",
        "total_billed": 3808.44,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 25.6
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2016-07-18",
        "total_billed": 3146.68,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 20.2
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-01-05",
        "total_billed": 540.95,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 3.2
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-02-22",
        "total_billed": 2290.17,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 12.6
      }, {
        "timekeepers": 4,
        "firm_id": 153,
        "firm_name": "Carlton Fields,",
        "line_item_date": "2016-12-12",
        "total_billed": 3899.4,
        "client_matter_id": "OSOS960UH",
        "matter_name": "501-183952-001",
        "total_hours": 14.7
      }, {
        "timekeepers": 8,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-04-06",
        "total_billed": 6887,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 39.5
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-02-28",
        "total_billed": 284.79,
        "client_matter_id": "OSOS482TT",
        "matter_name": "501-167732-001",
        "total_hours": 1.7
      }, {
        "timekeepers": 4,
        "firm_id": 452,
        "firm_name": "Wilson, Elser, Moskowitz, Edelman & Dicker, Llp",
        "line_item_date": "2016-09-22",
        "total_billed": 796.36,
        "client_matter_id": "OSOS849UG",
        "matter_name": "030-172345-001",
        "total_hours": 4
      }, {
        "timekeepers": 4,
        "firm_id": 9394,
        "firm_name": "YUKEVICH CAVANAUGH A LAW CORPORATION",
        "line_item_date": "2017-04-03",
        "total_billed": 427.77,
        "client_matter_id": "OSOS595TK",
        "matter_name": "501-180260-001",
        "total_hours": 2.1
      }, {
        "timekeepers": 4,
        "firm_id": 8544,
        "firm_name": "DONAHUE DAVIES LLP",
        "line_item_date": "2017-05-15",
        "total_billed": 4667.05,
        "client_matter_id": "OSOS733TN",
        "matter_name": "510-009818-001",
        "total_hours": 21.5
      }, {
        "timekeepers": 4,
        "firm_id": 425,
        "firm_name": "Mound Cotton Wollan & Greengrass LLP",
        "line_item_date": "2016-07-26",
        "total_billed": 884.12,
        "client_matter_id": "OSOS330TI",
        "matter_name": "501-190959-001",
        "total_hours": 20.3
      }, {
        "timekeepers": 6,
        "firm_id": 8663,
        "firm_name": "GIEGER, LABORDE & LAPEROUSE, LLC",
        "line_item_date": "2016-07-22",
        "total_billed": 711.97,
        "client_matter_id": "OSOS475TY",
        "matter_name": "501-258738-001",
        "total_hours": 7.1
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-08-19",
        "total_billed": 2023.04,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 12.3
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-08",
        "total_billed": 1273.21,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 8.8
      }, {
        "timekeepers": 4,
        "firm_id": 8552,
        "firm_name": "DONOVAN HATEM LLP",
        "line_item_date": "2017-04-04",
        "total_billed": 610.5,
        "client_matter_id": "OSOS640UT",
        "matter_name": "501-218547-001",
        "total_hours": 3.3
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2016-09-22",
        "total_billed": 710.04,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 4.2
      }, {
        "timekeepers": 4,
        "firm_id": 15560,
        "firm_name": "NEUNERPATE",
        "line_item_date": "2016-06-25",
        "total_billed": 3521,
        "client_matter_id": "OSOS662RW",
        "matter_name": "684-392224-001",
        "total_hours": 19.3
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-04-25",
        "total_billed": 1886.65,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 10.3
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-04-24",
        "total_billed": 2215.49,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 12.1
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-07-25",
        "total_billed": 1410.18,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 14.5
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-03-01",
        "total_billed": 896.29,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 6.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-03",
        "total_billed": 2146.12,
        "client_matter_id": "OSOS123UH",
        "matter_name": "683-620686-001",
        "total_hours": 18.3
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-17",
        "total_billed": 1085.14,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 8.7
      }, {
        "timekeepers": 4,
        "firm_id": 8810,
        "firm_name": "KANARIS STUBENVOLL & HEISS PC",
        "line_item_date": "2017-06-21",
        "total_billed": 3133.58,
        "client_matter_id": "OSOS164SO",
        "matter_name": "683-561092-001",
        "total_hours": 14.6
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-04-07",
        "total_billed": 2045.73,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 11.1
      }, {
        "timekeepers": 4,
        "firm_id": 8844,
        "firm_name": "KOELLER NEBEKER CARLSON & HALUCK LLP",
        "line_item_date": "2017-04-11",
        "total_billed": 656.78,
        "client_matter_id": "OSOS422QD",
        "matter_name": "169-358216-001",
        "total_hours": 8.4
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-26",
        "total_billed": 902.78,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 5.7
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-08-16",
        "total_billed": 1685.38,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 10.1
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-05-31",
        "total_billed": 202.5,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 1.3
      }, {
        "timekeepers": 4,
        "firm_id": 8721,
        "firm_name": "HARRINGTON OCKO & MONK LLP",
        "line_item_date": "2017-02-06",
        "total_billed": 236,
        "client_matter_id": "OSOS688PX",
        "matter_name": "683-464622-001",
        "total_hours": 1.6
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-04-21",
        "total_billed": 1064.94,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 7.3
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-01-27",
        "total_billed": 549.5,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 3.3
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-04-21",
        "total_billed": 3502.68,
        "client_matter_id": "OSOS123UH",
        "matter_name": "683-620686-001",
        "total_hours": 18.1
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-03-09",
        "total_billed": 4702.56,
        "client_matter_id": "OSOS482TT",
        "matter_name": "501-167732-001",
        "total_hours": 33.7
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2016-07-19",
        "total_billed": 3303.82,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 19.6
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-02-21",
        "total_billed": 3405.67,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 19.6
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-04-25",
        "total_billed": 950.99,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 9.5
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-03-29",
        "total_billed": 1025.77,
        "client_matter_id": "OSOS123UH",
        "matter_name": "683-620686-001",
        "total_hours": 21.8
      }, {
        "timekeepers": 4,
        "firm_id": 423,
        "firm_name": "Skarzynski Black LLC",
        "line_item_date": "2017-04-04",
        "total_billed": 1135,
        "client_matter_id": "OSOS603RF",
        "matter_name": "980-016246-001",
        "total_hours": 4.4
      }, {
        "timekeepers": 9,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-25",
        "total_billed": 4989.68,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 32.8
      }, {
        "timekeepers": 6,
        "firm_id": 115,
        "firm_name": "Snell & Wilmer",
        "line_item_date": "2016-07-07",
        "total_billed": 5595,
        "client_matter_id": "OSOS858RV",
        "matter_name": "683-584115-001",
        "total_hours": 32.2
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-02-06",
        "total_billed": 484.03,
        "client_matter_id": "OSOS482TT",
        "matter_name": "501-167732-001",
        "total_hours": 3.3
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-15",
        "total_billed": 3883.85,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 24.3
      }, {
        "timekeepers": 4,
        "firm_id": 9119,
        "firm_name": "RENAUD COOK DRURY MESAROS PA",
        "line_item_date": "2017-01-06",
        "total_billed": 1764.43,
        "client_matter_id": "OSOS309UT",
        "matter_name": "501-193622-001",
        "total_hours": 9.3
      }, {
        "timekeepers": 4,
        "firm_id": 8333,
        "firm_name": "BAILEY & WYANT PLLC",
        "line_item_date": "2016-09-02",
        "total_billed": 1065.1,
        "client_matter_id": "OSOS677SX",
        "matter_name": "501-121693-001",
        "total_hours": 6.7
      }, {
        "timekeepers": 5,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-01-24",
        "total_billed": 3311,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 6.8
      }, {
        "timekeepers": 4,
        "firm_id": 153,
        "firm_name": "Carlton Fields,",
        "line_item_date": "2016-11-28",
        "total_billed": 1495.26,
        "client_matter_id": "OSOS960UH",
        "matter_name": "501-183952-001",
        "total_hours": 7.1
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-15",
        "total_billed": 838.46,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 5.9
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-06-13",
        "total_billed": 2322.18,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 12.6
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2016-11-07",
        "total_billed": 1382.25,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 7.5
      }, {
        "timekeepers": 6,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-04-03",
        "total_billed": 2111.69,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 11.6
      }, {
        "timekeepers": 4,
        "firm_id": 27661,
        "firm_name": "SIBONI & BUCHANAN PLLC",
        "line_item_date": "2017-02-07",
        "total_billed": 2680,
        "client_matter_id": "OSOS714RB",
        "matter_name": "980-015909-001",
        "total_hours": 11.7
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-11-02",
        "total_billed": 1190.83,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 11.2
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2016-10-17",
        "total_billed": 456.87,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 2.7
      }, {
        "timekeepers": 4,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-03-30",
        "total_billed": 341.5,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 0.7
      }, {
        "timekeepers": 4,
        "firm_id": 153,
        "firm_name": "Carlton Fields,",
        "line_item_date": "2017-01-10",
        "total_billed": 1367.7,
        "client_matter_id": "OSOS960UH",
        "matter_name": "501-183952-001",
        "total_hours": 4.7
      }, {
        "timekeepers": 4,
        "firm_id": 2855,
        "firm_name": "Preis PLC",
        "line_item_date": "2016-08-18",
        "total_billed": 191.37,
        "client_matter_id": "OSOS370RV",
        "matter_name": "030-299396-001",
        "total_hours": 1.1
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-04-27",
        "total_billed": 768.23,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 5.2
      }, {
        "timekeepers": 4,
        "firm_id": 9119,
        "firm_name": "RENAUD COOK DRURY MESAROS PA",
        "line_item_date": "2017-01-05",
        "total_billed": 876.88,
        "client_matter_id": "OSOS309UT",
        "matter_name": "501-193622-001",
        "total_hours": 5.8
      }, {
        "timekeepers": 5,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-03-08",
        "total_billed": 742.5,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 3.2
      }, {
        "timekeepers": 6,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-06-20",
        "total_billed": 1357.02,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 8.6
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-03-02",
        "total_billed": 689.59,
        "client_matter_id": "OSOS482TT",
        "matter_name": "501-167732-001",
        "total_hours": 4.2
      }, {
        "timekeepers": 4,
        "firm_id": 8844,
        "firm_name": "KOELLER NEBEKER CARLSON & HALUCK LLP",
        "line_item_date": "2017-04-10",
        "total_billed": 760,
        "client_matter_id": "OSOS422QD",
        "matter_name": "169-358216-001",
        "total_hours": 9.1
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-18",
        "total_billed": 440.67,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 2.6
      }, {
        "timekeepers": 7,
        "firm_id": 8431,
        "firm_name": "CAMPBELL CONROY & O'NEIL PC",
        "line_item_date": "2017-06-12",
        "total_billed": 1542.8,
        "client_matter_id": "OSOS396TO",
        "matter_name": "169-358012-001",
        "total_hours": 7.5
      }, {
        "timekeepers": 4,
        "firm_id": 8426,
        "firm_name": "CADES SCHUTTE LLP",
        "line_item_date": "2017-05-10",
        "total_billed": 291,
        "client_matter_id": "OSOS667RZ",
        "matter_name": "107-020224-001",
        "total_hours": 1.6
      }, {
        "timekeepers": 4,
        "firm_id": 1049,
        "firm_name": "Wheeler Trigg O'Donnell LLP",
        "line_item_date": "2017-05-05",
        "total_billed": 1057.5,
        "client_matter_id": "OSOS301UZ",
        "matter_name": "109-008360-001",
        "total_hours": 3
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-06-14",
        "total_billed": 2227.12,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 12.4
      }, {
        "timekeepers": 5,
        "firm_id": 8663,
        "firm_name": "GIEGER, LABORDE & LAPEROUSE, LLC",
        "line_item_date": "2016-07-26",
        "total_billed": 2797.97,
        "client_matter_id": "OSOS475TY",
        "matter_name": "501-258738-001",
        "total_hours": 23.1
      }, {
        "timekeepers": 6,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-05-08",
        "total_billed": 1626.69,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 10.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-01-20",
        "total_billed": 4024.5299,
        "client_matter_id": "OSOS123UH",
        "matter_name": "683-620686-001",
        "total_hours": 21.0999
      }, {
        "timekeepers": 4,
        "firm_id": 9119,
        "firm_name": "RENAUD COOK DRURY MESAROS PA",
        "line_item_date": "2016-08-24",
        "total_billed": 1056.33,
        "client_matter_id": "OSOS929UE",
        "matter_name": "169-381169-001",
        "total_hours": 6
      }, {
        "timekeepers": 10,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-24",
        "total_billed": 8002.5,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 48.3
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-05-05",
        "total_billed": 379.5,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 2.6
      }, {
        "timekeepers": 4,
        "firm_id": 9189,
        "firm_name": "SCOTTHULSE LAW FIRM PC",
        "line_item_date": "2017-02-06",
        "total_billed": 299.73,
        "client_matter_id": "OSOS901TO",
        "matter_name": "501-155301-004",
        "total_hours": 2.4
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-04-10",
        "total_billed": 1867.25,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 11.6
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-09",
        "total_billed": 1000.83,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 6.1
      }, {
        "timekeepers": 4,
        "firm_id": 15560,
        "firm_name": "NEUNERPATE",
        "line_item_date": "2016-06-24",
        "total_billed": 4286,
        "client_matter_id": "OSOS662RW",
        "matter_name": "684-392224-001",
        "total_hours": 19.5
      }, {
        "timekeepers": 4,
        "firm_id": 153,
        "firm_name": "Carlton Fields,",
        "line_item_date": "2017-01-24",
        "total_billed": 6314.7,
        "client_matter_id": "OSOS960UH",
        "matter_name": "501-183952-001",
        "total_hours": 21.7
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-06-05",
        "total_billed": 2783.9,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 16.4
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-06-06",
        "total_billed": 703.25,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 5.2
      }, {
        "timekeepers": 4,
        "firm_id": 8404,
        "firm_name": "BRODY & BRANCH LLP",
        "line_item_date": "2016-09-06",
        "total_billed": 2623.26,
        "client_matter_id": "OSOS582UE",
        "matter_name": "683-424090-003",
        "total_hours": 14.7
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-03-14",
        "total_billed": 592.5,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 3.6
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-06-12",
        "total_billed": 1931.27,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 10.7
      }, {
        "timekeepers": 4,
        "firm_id": 7049,
        "firm_name": "Quintairos, Prieto, Wood & Boyer, P.A.",
        "line_item_date": "2016-07-25",
        "total_billed": 402.94,
        "client_matter_id": "OSOS571TK",
        "matter_name": "501-234952-001",
        "total_hours": 2.8
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2016-12-21",
        "total_billed": 2350.31,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 13.1
      }, {
        "timekeepers": 9,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-22",
        "total_billed": 8274.1,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 52.4
      }, {
        "timekeepers": 7,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-01",
        "total_billed": 4432.9,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 24.1
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-02-20",
        "total_billed": 1005,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 9.1
      }, {
        "timekeepers": 4,
        "firm_id": 153,
        "firm_name": "Carlton Fields,",
        "line_item_date": "2017-01-13",
        "total_billed": 1164,
        "client_matter_id": "OSOS960UH",
        "matter_name": "501-183952-001",
        "total_hours": 4
      }, {
        "timekeepers": 4,
        "firm_id": 9353,
        "firm_name": "WEINBERG WHEELER HUDGINS GUNN & DIAL LLC",
        "line_item_date": "2016-08-08",
        "total_billed": 2364,
        "client_matter_id": "OSOS888TS",
        "matter_name": "501-199080-001",
        "total_hours": 8.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-02-24",
        "total_billed": 2755.77,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 15.6
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-03-28",
        "total_billed": 867.47,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 5.3
      }, {
        "timekeepers": 4,
        "firm_id": 293,
        "firm_name": "Marshall, Dennehey, Warner, Coleman & Goggin",
        "line_item_date": "2017-01-09",
        "total_billed": 675.7,
        "client_matter_id": "OSOS721NK",
        "matter_name": "683-330789-001",
        "total_hours": 3.8
      }, {
        "timekeepers": 4,
        "firm_id": 299,
        "firm_name": "Harris Beach",
        "line_item_date": "2016-08-01",
        "total_billed": 1526.89,
        "client_matter_id": "OSOS431RC",
        "matter_name": "182-123908-001",
        "total_hours": 7.2
      }, {
        "timekeepers": 4,
        "firm_id": 27661,
        "firm_name": "SIBONI & BUCHANAN PLLC",
        "line_item_date": "2017-02-08",
        "total_billed": 4998,
        "client_matter_id": "OSOS714RB",
        "matter_name": "980-015909-001",
        "total_hours": 10.3
      }, {
        "timekeepers": 4,
        "firm_id": 8552,
        "firm_name": "DONOVAN HATEM LLP",
        "line_item_date": "2017-01-25",
        "total_billed": 1219,
        "client_matter_id": "OSOS609TJ",
        "matter_name": "501-168176-001",
        "total_hours": 6.5
      }, {
        "timekeepers": 5,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-12-14",
        "total_billed": 2931.53,
        "client_matter_id": "OSOS482TT",
        "matter_name": "501-167732-001",
        "total_hours": 20.3
      }, {
        "timekeepers": 5,
        "firm_id": 8975,
        "firm_name": "MCGUIRE WOODS LLP",
        "line_item_date": "2017-03-28",
        "total_billed": 2858,
        "client_matter_id": "OSOS674TQ",
        "matter_name": "683-586799-001",
        "total_hours": 5.9
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-03-17",
        "total_billed": 418.75,
        "client_matter_id": "OSOS908UO",
        "matter_name": "501-305087-001",
        "total_hours": 2.9
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2016-08-14",
        "total_billed": 1280.4,
        "client_matter_id": "OSOS185SE",
        "matter_name": "501-027076-001",
        "total_hours": 6
      }, {
        "timekeepers": 4,
        "firm_id": 8325,
        "firm_name": "ARNSTEIN, LEHR",
        "line_item_date": "2017-05-31",
        "total_billed": 186.5,
        "client_matter_id": "OSOS736UU",
        "matter_name": "501-356378-001",
        "total_hours": 0.6
      }, {
        "timekeepers": 4,
        "firm_id": 9394,
        "firm_name": "YUKEVICH CAVANAUGH A LAW CORPORATION",
        "line_item_date": "2017-04-14",
        "total_billed": 3810.64,
        "client_matter_id": "OSOS595TK",
        "matter_name": "501-180260-001",
        "total_hours": 16.3
      }, {
        "timekeepers": 4,
        "firm_id": 9204,
        "firm_name": "SHAUB AHMUTY CITRIN & SPRATT LLP",
        "line_item_date": "2017-04-14",
        "total_billed": 2093.26,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 9.9
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-03-23",
        "total_billed": 3896.48,
        "client_matter_id": "OSOS123UH",
        "matter_name": "683-620686-001",
        "total_hours": 31.3
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-07-05",
        "total_billed": 404.39,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 2.4
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-02-23",
        "total_billed": 1959.4,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 11.5
      }, {
        "timekeepers": 12,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-05-23",
        "total_billed": 13133.79,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 79.6
      }, {
        "timekeepers": 4,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2016-12-19",
        "total_billed": 736.23,
        "client_matter_id": "OSOS977UI",
        "matter_name": "501-187489-001",
        "total_hours": 4.4
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2017-06-16",
        "total_billed": 2403.89,
        "client_matter_id": "OSOS772SJ",
        "matter_name": "169-388034-001",
        "total_hours": 15.9
      }, {
        "timekeepers": 4,
        "firm_id": 9119,
        "firm_name": "RENAUD COOK DRURY MESAROS PA",
        "line_item_date": "2017-05-24",
        "total_billed": 2240.7,
        "client_matter_id": "OSOS929UE",
        "matter_name": "169-381169-001",
        "total_hours": 13.1
      }, {
        "timekeepers": 5,
        "firm_id": 87,
        "firm_name": "Lewis, Brisbois, Bisgaard & Smith",
        "line_item_date": "2017-06-06",
        "total_billed": 1677.13,
        "client_matter_id": "OSOS109KL",
        "matter_name": "169-221981-001",
        "total_hours": 9.1
      }, {
        "timekeepers": 4,
        "firm_id": 7049,
        "firm_name": "Quintairos, Prieto, Wood & Boyer, P.A.",
        "line_item_date": "2016-09-01",
        "total_billed": 291.49,
        "client_matter_id": "OSOS976TD",
        "matter_name": "501-187438-001",
        "total_hours": 2.7
      }, {
        "timekeepers": 4,
        "firm_id": 8909,
        "firm_name": "LORBER GREENFIELD & POLITO LLP",
        "line_item_date": "2016-12-16",
        "total_billed": 1739.01,
        "client_matter_id": "OSOS127TE",
        "matter_name": "501-174184-001",
        "total_hours": 13.9
      }]
    }]
  },
  "error": null
}
