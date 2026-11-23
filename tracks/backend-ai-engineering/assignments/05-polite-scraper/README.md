# The polite scraper

`src/scraper.js` honors `robots.txt`, spaces requests with a minimum delay, caps retries with exponential backoff, and uses an in-memory TTL cache. It is designed for `books.toscrape.com`-style public sandbox data and refuses a disallowed path before making a request.
