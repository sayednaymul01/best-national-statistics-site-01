// Router: hash routes keep every section reachable by a link, and the back
// button works, while the whole site stays a single static page.

const ROUTES = {
  "/": { title: "Overview", view: viewOverview },
  "/population": { title: "Population", view: viewPopulation },
  "/economy": { title: "Economy", view: viewEconomy },
  "/trade": { title: "Trade", view: viewTrade },
  "/society": { title: "Society & land", view: viewSociety },
  "/explore": { title: "Explore", view: viewExplore },
};

let exploreState = { query: "", cat: "All" };

function currentPath() {
  const raw = location.hash.replace(/^#/, "");
  return ROUTES[raw] ? raw : "/";
}

function wirePage(path) {
  if (path === "/economy") {
    drawGdpChart("total");
    document.querySelectorAll("[data-gdp]").forEach((b) =>
      b.addEventListener("click", () => drawGdpChart(b.dataset.gdp)));
  }
  if (path === "/explore") {
    const input = document.getElementById("figsearch");
    input.addEventListener("input", () => {
      exploreState.query = input.value;
      drawFigTable(exploreState.query, exploreState.cat);
    });
    document.querySelectorAll("[data-cat]").forEach((chip) =>
      chip.addEventListener("click", () => {
        exploreState.cat = chip.dataset.cat;
        document.querySelectorAll("[data-cat]").forEach((c) =>
          c.classList.toggle("on", c === chip));
        drawFigTable(exploreState.query, exploreState.cat);
      }));
    drawFigTable("", "All");
  }
}

function render() {
  const path = currentPath();
  const route = ROUTES[path];
  document.getElementById("view").innerHTML = route.view();
  document.title = `Bangladesh in Numbers — ${route.title}`;
  document.querySelectorAll("nav a").forEach((a) =>
    a.classList.toggle("on", a.getAttribute("href") === "#" + path));
  wirePage(path);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
