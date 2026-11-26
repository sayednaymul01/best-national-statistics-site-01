# best-national-statistics-site-01

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/sayednaymul01/best-national-statistics-site-01/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/sayednaymul01/best-national-statistics-site-01/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**Bangladesh in Numbers** — a national statistics site for Bangladesh in which
every figure names the office that published it and the year it describes.
Six linked sections: an overview of headline figures; population, with the
census counts from 1974 to 2022 and all eight divisions; the economy, with a
GDP chart that toggles between the total and per-person series; trade and
remittances, with export and remittance charts and the main export markets;
society and land; and an explorer that searches and filters the full shelf of
39 sourced indicators. All charts are drawn by the site's own code, all
content lives in the site's own files, and it works fully offline on a
desktop or a phone.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

That copies `app/` and `screenshots/` into `out/` and writes
`out/dossier.json`. To browse the site itself, serve the `app/` folder with
any static file server and open `index.html`.

## Sources

Figures are credited on the page where they appear. The publishers are the
Bangladesh Bureau of Statistics (censuses and household surveys), Bangladesh
Bank (trade, remittances and balance of payments), the World Bank's World
Development Indicators, the United Nations, UNDP, the ITU, the BTRC, the FAO
and the WTO.

---
<sub>Entered on [make.fun](https://make.fun/?ref=5kt3tsgg&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
