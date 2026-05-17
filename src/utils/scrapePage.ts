import cheerio from 'cheerio';

export interface ScrapeResult {
  url: string;
  searchString: string;
  found: boolean;
  snippet: string | null;
}

export async function fetchPageHtml(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return await response.text();
}

export async function findStringInPage(url: string, searchString: string): Promise<ScrapeResult> {
  const html = await fetchPageHtml(url);
  const $ = cheerio.load(html);
  const bodyText = $('body').text();
  const found = bodyText.includes(searchString);

  return {
    url,
    searchString,
    found,
    snippet: found ? getSnippet(bodyText, searchString) : null,
  };
}

function getSnippet(text: string, needle: string, radius = 80): string | null {
  const index = text.indexOf(needle);
  if (index === -1) return null;
  const start = Math.max(0, index - radius);
  const end = Math.min(text.length, index + needle.length + radius);
  return `${start > 0 ? '...' : ''}${text.slice(start, end)}${end < text.length ? '...' : ''}`;
}
