// Page renderers. Each returns the HTML for one route; main.js swaps it in.
// Figures always travel with their source and year: cite() builds the credit.

function cite(fig) {
  return `${SOURCES[fig.source]}, ${fig.year}`;
}

function statCard(fig) {
  return `<article class="statcard">
    <p class="statlabel">${fig.label}</p>
    <p class="statvalue">${fig.value} <span class="statunit">${fig.unit}</span></p>
    <p class="statnote">${fig.note}</p>
    <p class="statcite">${cite(fig)}</p>
  </article>`;
}

function sectionHead(title, sub) {
  return `<div class="sechead"><h2>${title}</h2><p>${sub}</p></div>`;
}

function viewOverview() {
  const cards = HEADLINE.map(statCard).join("");
  const top = [...DIVISIONS].sort((a, b) => b.people - a.people).slice(0, 4);
  const rows = top.map((d) =>
    `<tr><td>${d.name}</td><td class="num">${d.people.toFixed(2)}m</td><td>${d.note}</td></tr>`).join("");
  return `
  <section class="hero">
    <p class="kicker">National statistics · People's Republic of Bangladesh</p>
    <h2>One country, told in numbers that name their source.</h2>
    <p class="lede">Bangladesh is the world's eighth most populous nation and its
    most densely settled large country — a river delta of 173.6 million people
    whose garment exports and migrant workers power one of Asia's fastest-growing
    economies. Every figure on this site names the office that published it and
    the year it describes.</p>
  </section>
  <section class="grid">${cards}</section>
  <section class="panel">
    ${sectionHead("The largest divisions", "Population by division at the 2022 census — Bangladesh Bureau of Statistics.")}
    <table class="datatable"><thead><tr><th>Division</th><th class="num">People</th><th>Known for</th></tr></thead>
    <tbody>${rows}</tbody></table>
    <p class="more"><a href="#/population">See all eight divisions and the census story →</a></p>
  </section>
  <section class="panel">
    ${sectionHead("Start exploring", "Four shelves of figures, each one sourced.")}
    <div class="linkcards">
      <a class="linkcard" href="#/population"><strong>Population</strong><span>Censuses since 1974, density, age and cities</span></a>
      <a class="linkcard" href="#/economy"><strong>Economy</strong><span>GDP, growth, prices, work and poverty</span></a>
      <a class="linkcard" href="#/trade"><strong>Trade &amp; remittances</strong><span>Garments out, wages home, and who buys what</span></a>
      <a class="linkcard" href="#/explore"><strong>Explore all figures</strong><span>Search and filter the full indicator shelf</span></a>
    </div>
  </section>`;
}

function viewPopulation() {
  const census = lineChart(
    CENSUS_SERIES.map((r) => ({ label: String(r.year), value: r.value })),
    { color: "#006a4e", unit: " million", title: "Population counted at each census, millions" });
  const rows = [...DIVISIONS].sort((a, b) => b.people - a.people).map((d) =>
    `<tr><td>${d.name}</td><td class="num">${d.people.toFixed(2)}m</td><td>${d.capital}</td><td>${d.note}</td></tr>`).join("");
  return `
  ${sectionHead("Population", "A delta filling up: the count has more than doubled since independence in 1971, and growth is now slowing toward 1% a year.")}
  <section class="panel">
    <h3>People counted at each census (millions)</h3>
    ${census}
    <p class="note">${NOTES.census}</p>
    <p class="cite">Source: Bangladesh Bureau of Statistics, Population &amp; Housing Censuses 1974–2022.</p>
  </section>
  <section class="panel">
    <h3>The eight divisions, 2022 census</h3>
    <table class="datatable"><thead><tr><th>Division</th><th class="num">People</th><th>Seat</th><th>Known for</th></tr></thead>
    <tbody>${rows}</tbody></table>
    <p class="cite">Source: Bangladesh Bureau of Statistics, Population &amp; Housing Census 2022.</p>
  </section>
  <section class="grid">
    ${statCard({ label: "Share in towns and cities", value: "42", unit: "%", year: 2024, source: "wb", note: "Dhaka alone holds about 24 million people" })}
    ${statCard({ label: "Children per woman", value: "2.0", unit: "", year: 2023, source: "wb", note: "Near replacement level; it was over 6 in the 1970s" })}
    ${statCard({ label: "Median age", value: "28", unit: "years", year: 2024, source: "un", note: "A young country: a quarter of people are under 15" })}
  </section>`;
}

function viewEconomy() {
  const chartBox = `<div id="gdpchart"></div>
    <div class="toggle" role="group" aria-label="GDP chart measure">
      <button type="button" data-gdp="total" class="on">Total GDP</button>
      <button type="button" data-gdp="person">GDP per person</button>
    </div>`;
  return `
  ${sectionHead("Economy", "From one of the world's poorest countries at independence to a lower-middle-income economy of US$450 billion.")}
  <section class="panel">
    <h3>Gross domestic product, 2010–2024 (US$ billions)</h3>
    ${chartBox}
    <p class="note">${NOTES.gdp}</p>
    <p class="cite">Source: World Bank, World Development Indicators, 2024 release.</p>
  </section>
  <section class="grid">
    ${statCard({ label: "GDP growth", value: "4.22", unit: "%", year: 2024, source: "wb", note: "Real growth, after a decade mostly above 6%" })}
    ${statCard({ label: "Inflation", value: "10.5", unit: "%", year: 2024, source: "wb", note: "Consumer prices; food inflation ran higher" })}
    ${statCard({ label: "Unemployment", value: "3.6", unit: "%", year: 2024, source: "wb", note: "ILO modelled estimate; much work is informal" })}
    ${statCard({ label: "Below the poverty line", value: "18.7", unit: "%", year: 2022, source: "bbs", note: "Down from 31.5% in 2010; extreme poverty is 5.6%" })}
    ${statCard({ label: "Services share of GDP", value: "53.6", unit: "%", year: 2023, source: "wb", note: "Industry 34.9%, agriculture 11.5%" })}
    ${statCard({ label: "GNI per person", value: "US$2,820", unit: "", year: 2024, source: "wb", note: "Atlas method; lower-middle-income band" })}
  </section>`;
}

// Called by main.js after the economy view lands, and on toggle clicks.
function drawGdpChart(mode) {
  const box = document.getElementById("gdpchart");
  if (!box) return;
  if (mode === "person") {
    box.innerHTML = lineChart(
      GDP_PER_PERSON_SERIES.map((r) => ({ label: String(r.year), value: r.value })),
      { color: "#b8860b", unit: " US dollars", title: "GDP per person, US dollars" });
  } else {
    box.innerHTML = lineChart(
      GDP_SERIES.map((r) => ({ label: String(r.year), value: r.value })),
      { color: "#006a4e", unit: " billion US dollars", title: "GDP, billions of US dollars" });
  }
  document.querySelectorAll("[data-gdp]").forEach((b) =>
    b.classList.toggle("on", b.dataset.gdp === mode));
}

function viewTrade() {
  const exports = barChart(
    EXPORT_SERIES.map((r) => ({ label: r.year, value: r.value })),
    { color: "#006a4e", unit: " billion US dollars", title: "Exports by fiscal year, US$ billions" });
  const remit = barChart(
    REMITTANCE_SERIES.map((r) => ({ label: r.year, value: r.value })),
    { color: "#c8102e", unit: " billion US dollars", title: "Remittances by fiscal year, US$ billions" });
  const markets = shareBars(EXPORT_MARKETS, { title: "Export markets by share, FY2023-24" });
  return `
  ${sectionHead("Trade & remittances", "Two engines earn the foreign currency: sewing garments for the world, and the wages of citizens working abroad.")}
  <section class="panel">
    <h3>Exports of goods (US$ billions, fiscal years)</h3>
    ${exports}
    <p class="cite">Source: Bangladesh Bank, from customs records. FY2023 onward is the revised count agreed in the 2024 data reconciliation.</p>
  </section>
  <section class="panel">
    <h3>Remittances sent home (US$ billions, fiscal years)</h3>
    ${remit}
    <p class="note">${NOTES.trade}</p>
    <p class="cite">Source: Bangladesh Bank, monthly remittance statistics.</p>
  </section>
  <section class="panel">
    <h3>Who buys Bangladesh's exports? Share of FY2023-24 exports</h3>
    ${markets}
    <p class="cite">Source: Bangladesh Bank, Balance of Payments and export receipts, FY2023-24.</p>
  </section>
  <section class="grid">
    ${statCard({ label: "Garments share of exports", value: "81.2", unit: "%", year: 2024, source: "bb", note: "Knitwear and woven clothing together" })}
    ${statCard({ label: "Garment exporter ranking", value: "2nd", unit: "in the world", year: 2024, source: "wto", note: "Second only to China in clothing exports" })}
    ${statCard({ label: "Imports of goods", value: "US$68.35", unit: "billion", year: 2025, source: "bb", note: "Fuel, machinery, cotton and food lead the bill" })}
  </section>`;
}

function viewSociety() {
  return `
  ${sectionHead("Society & land", "Longer lives, near-universal electricity, and a phone in almost every hand — on the largest river delta on Earth.")}
  <section class="grid">
    ${statCard({ label: "Life expectancy", value: "74.7", unit: "years", year: 2024, source: "wb", note: "Higher than the South Asian average" })}
    ${statCard({ label: "Literacy, age 7+", value: "74.7", unit: "%", year: 2022, source: "bbs", note: "Counted at the 2022 census" })}
    ${statCard({ label: "Human Development Index", value: "0.670", unit: "", year: 2022, source: "undp", note: "Rank 130 of 193 countries and territories" })}
    ${statCard({ label: "People using the internet", value: "53.4", unit: "%", year: 2024, source: "itu", note: "Almost all of it on mobile phones" })}
    ${statCard({ label: "Mobile subscriptions", value: "193", unit: "million", year: 2024, source: "btrc", note: "More subscriptions than people — many hold two SIMs" })}
    ${statCard({ label: "Access to electricity", value: "99.5", unit: "%", year: 2022, source: "wb", note: "From under half the country in 2009" })}
  </section>
  <section class="panel">
    <h3>The land itself</h3>
    <p>Bangladesh sits where the Ganges, Brahmaputra and Meghna rivers meet the
    Bay of Bengal, forming the largest river delta in the world. Some 700 rivers
    and channels cross its 147,570 km², which is why the same water that makes
    its rice fields among the most fertile in Asia — it is the world's
    third-largest rice producer — also brings a flood season every monsoon.
    The country is governed as 8 divisions and 64 districts, and its official
    language is Bangla, spoken by nearly everyone.</p>
    <p class="note">${NOTES.society}</p>
    <p class="cite">Sources: Bangladesh Bureau of Statistics; Food and Agriculture Organization, 2023.</p>
  </section>`;
}

function viewExplore() {
  const cats = ["All", ...new Set(INDICATORS.map((i) => i.cat))];
  const chips = cats.map((c, i) =>
    `<button type="button" class="chip${i === 0 ? " on" : ""}" data-cat="${c}">${c}</button>`).join("");
  return `
  ${sectionHead("Explore all figures", "The whole shelf: search by name, or narrow it to one shelf with the buttons.")}
  <section class="panel">
    <label class="searchlabel" for="figsearch">Search figures</label>
    <input id="figsearch" type="search" placeholder="Try: exports, literacy, population…" autocomplete="off">
    <div class="chips" role="group" aria-label="Filter by shelf">${chips}</div>
    <p id="figcount" class="figcount"></p>
    <div id="figtable"></div>
  </section>`;
}

// Renders the explorer table for a query + shelf pair; called on every keystroke.
function drawFigTable(query, cat) {
  const box = document.getElementById("figtable");
  const count = document.getElementById("figcount");
  if (!box) return;
  const q = query.trim().toLowerCase();
  const rows = INDICATORS.filter((i) =>
    (cat === "All" || i.cat === cat) &&
    (q === "" || i.name.toLowerCase().includes(q)));
  count.textContent = rows.length === INDICATORS.length && cat === "All"
    ? `${rows.length} figures`
    : `${rows.length} of ${INDICATORS.length} figures`;
  if (rows.length === 0) {
    box.innerHTML = `<p class="empty">No figure matches that search. Try a shorter word, or clear the shelf filter.</p>`;
    return;
  }
  box.innerHTML = `<table class="datatable"><thead><tr>
    <th>Figure</th><th>Value</th><th class="num">Year</th><th>Source</th></tr></thead>
    <tbody>${rows.map((i) =>
      `<tr><td>${i.name}</td><td class="figval">${i.value}</td><td class="num">${i.year}</td><td>${SOURCES[i.source]}</td></tr>`).join("")}
    </tbody></table>`;
}
