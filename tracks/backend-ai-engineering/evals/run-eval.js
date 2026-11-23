import { readFile } from 'node:fs/promises';
import { assess } from '../src/risk.js';
const cases = JSON.parse(await readFile(new URL('./cases.json', import.meta.url)));
const results = cases.map(test => ({ ...test, actual: assess(test.request).category }));
const passed = results.filter(test => test.actual === test.category).length;
console.log(JSON.stringify({ passed, total: cases.length, score: `${((passed / cases.length) * 100).toFixed(1)}%`, failures: results.filter(test => test.actual !== test.category) }, null, 2));
if (passed !== cases.length) process.exitCode = 1;
