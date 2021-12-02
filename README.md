# Directify

Basic page content parsing to replace links with blob urls for emulating realtive paths such as `./index.js` or just `index.js`

- Attempts to fetch the base url of files under `website_url/relative_path`
- Returns replaced body content of searched file, containing replaced urls

## Basic Example
```js
// test/index.html (edited)

// init directify
const app = new Directify({
    url: 'https://www.example.com'
})

// log the replaced html to the output
console.log(app.crawl('https://www.example.com/test/index.html'))
```

## Setup

- Clone repository
- Run `tsc` (or `npx tsc`) command under the root directory (directify)
- Start local server under the root directory