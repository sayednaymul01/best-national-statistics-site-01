// Bangladesh in Numbers — data layer.
// Every figure carries the publisher and the year it describes, so a reader
// can trace each number back to the office that produced it. Values are the
// latest published at the time this site was built (November 2026).

const SOURCES = {
  wb: "World Bank, World Development Indicators",
  bbs: "Bangladesh Bureau of Statistics",
  bb: "Bangladesh Bank",
  epb: "Export Promotion Bureau",
  undp: "UNDP Human Development Reports",
  un: "United Nations population estimates",
  btrc: "Bangladesh Telecommunication Regulatory Commission",
  itu: "International Telecommunication Union",
  fao: "Food and Agriculture Organization of the United Nations",
  wto: "World Trade Organization",
};

// The six figures a visitor usually comes for first.
const HEADLINE = [
  { label: "Population", value: "173.6", unit: "million", year: 2024, source: "wb",
    note: "8th most populous country in the world" },
  { label: "Gross domestic product", value: "US$450.1", unit: "billion", year: 2024, source: "wb",
    note: "US$1.68 trillion at purchasing power parity" },
  { label: "GDP per person", value: "US$2,593", unit: "", year: 2024, source: "wb",
    note: "US$9,647 per person at purchasing power parity" },
  { label: "GDP growth", value: "4.22", unit: "% a year", year: 2024, source: "wb",
    note: "Slower than the 6%+ pace of the 2010s" },
  { label: "Life expectancy", value: "74.7", unit: "years", year: 2024, source: "wb",
    note: "Up from about 47 years in 1971" },
  { label: "People per square kilometre", value: "1,119", unit: "", year: 2022, source: "bbs",
    note: "The most densely settled large country on Earth" },
];

// Population counted by each national census, in millions (BBS).
const CENSUS_SERIES = [
  { year: 1974, value: 76.4 },
  { year: 1981, value: 89.9 },
  { year: 1991, value: 111.5 },
  { year: 2001, value: 124.4 },
  { year: 2011, value: 149.8 },
  { year: 2022, value: 165.2 },
];

// The eight divisions and the people each held at the 2022 census (BBS).
const DIVISIONS = [
  { name: "Dhaka", people: 44.22, capital: "Dhaka", note: "Capital region; the largest urban economy" },
  { name: "Chattogram", people: 33.20, capital: "Chattogram", note: "Main seaport and export gateway" },
  { name: "Rajshahi", people: 20.35, capital: "Rajshahi", note: "Mango and silk country in the north-west" },
  { name: "Khulna", people: 17.81, capital: "Khulna", note: "Gateway to the Sundarbans mangrove forest" },
  { name: "Rangpur", people: 17.60, capital: "Rangpur", note: "Northern rice and potato belt" },
  { name: "Mymensingh", people: 12.23, capital: "Mymensingh", note: "Agricultural university and fisheries hub" },
  { name: "Sylhet", people: 11.03, capital: "Sylhet", note: "Tea gardens; large emigrant community abroad" },
  { name: "Barishal", people: 9.10, capital: "Barishal", note: "River delta country in the south" },
];

// GDP in current US dollars, billions (World Bank). The 2023-24 dip is an
// exchange-rate effect: output in taka kept rising while the taka fell.
const GDP_SERIES = [
  { year: 2010, value: 115.3 },
  { year: 2012, value: 133.4 },
  { year: 2014, value: 172.9 },
  { year: 2016, value: 265.2 },
  { year: 2018, value: 321.4 },
  { year: 2020, value: 373.9 },
  { year: 2022, value: 460.2 },
  { year: 2024, value: 450.1 },
];

// GDP per person in current US dollars (World Bank).
const GDP_PER_PERSON_SERIES = [
  { year: 2010, value: 781 },
  { year: 2012, value: 883 },
  { year: 2014, value: 1119 },
  { year: 2016, value: 1680 },
  { year: 2018, value: 1963 },
  { year: 2020, value: 2256 },
  { year: 2022, value: 2688 },
  { year: 2024, value: 2593 },
];

// Merchandise exports by fiscal year, US$ billions. Bangladesh Bank figures;
// FY2023 onward uses the revised customs-based count, which replaced the
// older Export Promotion Bureau series after a 2024 data reconciliation.
const EXPORT_SERIES = [
  { year: "FY19", value: 40.5 },
  { year: "FY20", value: 33.7 },
  { year: "FY21", value: 38.8 },
  { year: "FY22", value: 52.1 },
  { year: "FY23", value: 46.5 },
  { year: "FY24", value: 44.5 },
  { year: "FY25", value: 48.3 },
];

// Money sent home by Bangladeshis working abroad, US$ billions (Bangladesh Bank).
const REMITTANCE_SERIES = [
  { year: "FY20", value: 18.2 },
  { year: "FY21", value: 24.8 },
  { year: "FY22", value: 21.0 },
  { year: "FY23", value: 21.6 },
  { year: "FY24", value: 23.9 },
  { year: "FY25", value: 30.3 },
];

// Where exports went in FY2023-24, share of the total (Bangladesh Bank).
const EXPORT_MARKETS = [
  { name: "United States", share: 17.1 },
  { name: "Germany", share: 10.9 },
  { name: "United Kingdom", share: 10.1 },
  { name: "Spain", share: 7.8 },
  { name: "France", share: 5.1 },
  { name: "All other markets", share: 49.0 },
];

// The full indicator shelf behind the Explore page. `cat` groups the rows.
const INDICATORS = [
  { name: "Population", value: "173.6 million", year: 2024, source: "wb", cat: "People" },
  { name: "Population counted at the 2022 census", value: "165.16 million", year: 2022, source: "bbs", cat: "People" },
  { name: "Population density", value: "1,119 people per km²", year: 2022, source: "bbs", cat: "People" },
  { name: "Share living in towns and cities", value: "42%", year: 2024, source: "wb", cat: "People" },
  { name: "Median age", value: "28 years", year: 2024, source: "un", cat: "People" },
  { name: "Children per woman (fertility rate)", value: "2.0", year: 2023, source: "wb", cat: "People" },
  { name: "Sex ratio at the census", value: "98 men per 100 women", year: 2022, source: "bbs", cat: "People" },
  { name: "Age 0-14 share of population", value: "25%", year: 2024, source: "un", cat: "People" },
  { name: "Age 65+ share of population", value: "7%", year: 2024, source: "un", cat: "People" },
  { name: "People in greater Dhaka", value: "about 24 million", year: 2024, source: "un", cat: "People" },
  { name: "GDP", value: "US$450.1 billion", year: 2024, source: "wb", cat: "Economy" },
  { name: "GDP at purchasing power parity", value: "US$1.68 trillion", year: 2024, source: "wb", cat: "Economy" },
  { name: "GDP per person", value: "US$2,593", year: 2024, source: "wb", cat: "Economy" },
  { name: "GNI per person (Atlas method)", value: "US$2,820", year: 2024, source: "wb", cat: "Economy" },
  { name: "GDP growth", value: "4.22% a year", year: 2024, source: "wb", cat: "Economy" },
  { name: "Inflation (consumer prices)", value: "10.5% a year", year: 2024, source: "wb", cat: "Economy" },
  { name: "Unemployment (ILO modelled)", value: "3.6% of the labour force", year: 2024, source: "wb", cat: "Economy" },
  { name: "Services share of GDP", value: "53.6%", year: 2023, source: "wb", cat: "Economy" },
  { name: "Industry share of GDP", value: "34.9%", year: 2023, source: "wb", cat: "Economy" },
  { name: "Agriculture share of GDP", value: "11.5%", year: 2023, source: "wb", cat: "Economy" },
  { name: "Below the national poverty line", value: "18.7% of people", year: 2022, source: "bbs", cat: "Economy" },
  { name: "In extreme poverty", value: "5.6% of people", year: 2022, source: "bbs", cat: "Economy" },
  { name: "Income inequality (Gini index)", value: "30.9", year: 2022, source: "wb", cat: "Economy" },
  { name: "Exports of goods (fiscal year)", value: "US$48.30 billion", year: 2025, source: "bb", cat: "Trade" },
  { name: "Imports of goods (fiscal year)", value: "US$68.35 billion", year: 2025, source: "bb", cat: "Trade" },
  { name: "Garments share of exports", value: "81.2%", year: 2024, source: "bb", cat: "Trade" },
  { name: "Remittances from workers abroad", value: "US$30.33 billion", year: 2025, source: "bb", cat: "Trade" },
  { name: "Garment export world ranking", value: "2nd, after China", year: 2024, source: "wto", cat: "Trade" },
  { name: "Life expectancy at birth", value: "74.7 years", year: 2024, source: "wb", cat: "Society" },
  { name: "Literacy, age 7 and over", value: "74.7%", year: 2022, source: "bbs", cat: "Society" },
  { name: "Human Development Index", value: "0.670 (rank 130 of 193)", year: 2022, source: "undp", cat: "Society" },
  { name: "People using the internet", value: "53.4%", year: 2024, source: "itu", cat: "Society" },
  { name: "Mobile phone subscriptions", value: "about 193 million", year: 2024, source: "btrc", cat: "Society" },
  { name: "Access to electricity", value: "99.5% of people", year: 2022, source: "wb", cat: "Society" },
  { name: "Clean cooking fuel use", value: "28.4% of people", year: 2023, source: "wb", cat: "Society" },
  { name: "Land area", value: "147,570 km²", year: 2022, source: "bbs", cat: "Land" },
  { name: "Rivers and channels", value: "about 700", year: 2024, source: "bbs", cat: "Land" },
  { name: "Rice producer world ranking", value: "3rd largest", year: 2023, source: "fao", cat: "Land" },
  { name: "Divisions / districts", value: "8 divisions, 64 districts", year: 2024, source: "bbs", cat: "Land" },
];

// Short reading notes that sit under the section charts.
const NOTES = {
  census: "The census count and the United Nations estimate differ because the estimate adds people the census missed and counts Bangladeshis abroad differently. Both are published openly; this site labels which one each figure comes from.",
  gdp: "Measured in US dollars, the economy appears to shrink in 2023-24. That is the taka's fall showing up in the conversion, not factories closing: output in taka grew, and the World Bank still records 4.22% real growth for 2024.",
  trade: "Two engines pay Bangladesh's import bill: garments sewn for export and wages sent home by roughly ten million citizens working abroad. In FY2024-25 they brought in US$48.3 billion and US$30.3 billion respectively.",
  society: "Bangladesh's social gains ran ahead of its income for decades: life expectancy is now higher than in richer neighbours, and fertility has fallen to about replacement level, which is why population growth has slowed to near 1% a year.",
};
