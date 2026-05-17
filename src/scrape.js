import { findStringInPage } from './utils/scrapePage.ts';

const [, , url, ...needleParts] = process.argv;
const searchString = needleParts.join(' ');

if (!url || !searchString) {
  console.error('Usage: npm run scrape -- <url> <search string>');
  process.exit(1);
}

try {
  const result = await findStringInPage(url, searchString);
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error('Scrape failed:', error.message);
  process.exit(1);
}
