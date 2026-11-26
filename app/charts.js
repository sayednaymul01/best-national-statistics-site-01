// Tiny SVG chart helpers, drawn by hand so the site needs no library.
// Each chart is a string of SVG markup built from plain {label, value} rows.

function fmtNum(v) {
  if (v >= 1000) return Math.round(v).toLocaleString("en-US");
  if (v >= 100) return String(Math.round(v));
  return String(Math.round(v * 10) / 10);
}

function scaleMax(v) {
  // Round a data maximum up to a tidy axis ceiling (1, 1.5, 2, 2.5, 3, 4, 5 ...).
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  const unit = v / pow;
  const steps = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
  for (const s of steps) if (unit <= s) return s * pow;
  return 10 * pow;
}

// Vertical bars with the value printed over each bar and the label under it.
// opts: { unit, color, width, height }
function barChart(rows, opts) {
  const w = opts.width || 720, h = opts.height || 300;
  const padL = 8, padR = 8, padT = 26, padB = 34;
  const plotW = w - padL - padR, plotH = h - padT - padB;
  const max = scaleMax(Math.max(...rows.map((r) => r.value)));
  const slot = plotW / rows.length;
  const barW = Math.min(64, slot * 0.62);
  let out = `<svg viewBox="0 0 ${w} ${h}" role="img" class="chart" aria-label="${opts.title || "bar chart"}">`;
  // three faint guide lines with their axis values
  for (let i = 0; i <= 3; i++) {
    const y = padT + plotH - (plotH * i) / 3;
    const val = (max * i) / 3;
    out += `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" class="grid"/>`;
    out += `<text x="${padL + 2}" y="${y - 4}" class="axis">${fmtNum(val)}</text>`;
  }
  rows.forEach((r, i) => {
    const bh = (r.value / max) * plotH;
    const x = padL + slot * i + (slot - barW) / 2;
    const y = padT + plotH - bh;
    out += `<rect x="${x}" y="${y}" width="${barW}" height="${bh}" rx="4" fill="${opts.color}">` +
      `<title>${r.label}: ${fmtNum(r.value)}${opts.unit || ""}</title></rect>`;
    out += `<text x="${x + barW / 2}" y="${y - 7}" class="barval" text-anchor="middle">${fmtNum(r.value)}</text>`;
    out += `<text x="${x + barW / 2}" y="${h - 12}" class="axis" text-anchor="middle">${r.label}</text>`;
  });
  return out + "</svg>";
}

// A line with filled area under it, dots on each point, first/last labelled.
// opts: { unit, color, width, height }
function lineChart(rows, opts) {
  const w = opts.width || 720, h = opts.height || 300;
  const padL = 34, padR = 16, padT = 24, padB = 34;
  const plotW = w - padL - padR, plotH = h - padT - padB;
  const max = scaleMax(Math.max(...rows.map((r) => r.value)));
  const min = 0;
  const px = (i) => padL + (plotW * i) / (rows.length - 1);
  const py = (v) => padT + plotH - ((v - min) / (max - min)) * plotH;
  let out = `<svg viewBox="0 0 ${w} ${h}" role="img" class="chart" aria-label="${opts.title || "line chart"}">`;
  for (let i = 0; i <= 3; i++) {
    const y = padT + plotH - (plotH * i) / 3;
    out += `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" class="grid"/>`;
    out += `<text x="${padL - 5}" y="${y + 4}" class="axis" text-anchor="end">${fmtNum((max * i) / 3)}</text>`;
  }
  const pts = rows.map((r, i) => `${px(i)},${py(r.value)}`).join(" ");
  out += `<polygon points="${padL},${padT + plotH} ${pts} ${padL + plotW},${padT + plotH}" fill="${opts.color}" opacity="0.14"/>`;
  out += `<polyline points="${pts}" fill="none" stroke="${opts.color}" stroke-width="3" stroke-linejoin="round"/>`;
  rows.forEach((r, i) => {
    out += `<circle cx="${px(i)}" cy="${py(r.value)}" r="4.5" fill="${opts.color}">` +
      `<title>${r.label}: ${fmtNum(r.value)}${opts.unit || ""}</title></circle>`;
    out += `<text x="${px(i)}" y="${h - 12}" class="axis" text-anchor="middle">${r.label}</text>`;
    if (i === 0) {
      // First point: label sits under the dot, inside the pale fill, clear of the line and the axis.
      out += `<text x="${px(i) + 6}" y="${py(r.value) + 22}" class="barval">${fmtNum(r.value)}</text>`;
    } else if (i === rows.length - 1) {
      out += `<text x="${px(i)}" y="${py(r.value) - 11}" class="barval" text-anchor="middle">${fmtNum(r.value)}</text>`;
    }
  });
  return out + "</svg>";
}

// Horizontal share bars for market-share style rows (value is a percentage).
function shareBars(rows, opts) {
  let out = `<div class="sharebars" role="img" aria-label="${opts.title || "share chart"}">`;
  for (const r of rows) {
    out += `<div class="sharerow"><span class="sharename">${r.name}</span>` +
      `<span class="sharetrack"><span class="sharefill" style="width:${r.share}%"></span></span>` +
      `<span class="shareval">${r.share}%</span></div>`;
  }
  return out + "</div>";
}
