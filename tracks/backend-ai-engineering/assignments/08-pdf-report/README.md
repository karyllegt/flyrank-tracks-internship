# PDF report generator

`src/report.js` generates a print-ready A4 HTML report from validated assessment data. It is intentionally renderer-neutral: Playwright, Chromium, or a serverless PDF engine can convert the output to PDF in deployment while tests verify the document structure without downloading a browser.
