const {normalizeUrl,getUrlsFromHtml} = require('./crawl.js')
const {test,expect} = require('@jest/globals')

test('normalizeUrl strip protocol',()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip trailing slash',()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl capitals',()=>{
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl http',()=>{
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getUrlsFromHtml absolute',() => {
    const inputHTMLBody = `
    <html>
    <body>
        <a href="https://www.visvas-tech.com/path/"> Visvas Website </a>
    </body>
    </html>
    `
    const inputBaseURL = "https://www.visvas-tech.com/path"
    const actual = getUrlsFromHtml(inputHTMLBody,inputBaseURL)
    const expected = ["https://www.visvas-tech.com/path/"]
    expect(actual).toEqual(expected)
})

test('getUrlsFromHtml relative',() => {
    const inputHTMLBody = `
    <html>
    <body>
        <a href="/path/"> Visvas Website </a>
    </body>
    </html>
    `
    const inputBaseURL = "https://www.visvas-tech.com"
    const actual = getUrlsFromHtml(inputHTMLBody,inputBaseURL)
    const expected = ["https://www.visvas-tech.com/path/"]
    expect(actual).toEqual(expected)
})

test('getUrlsFromHtml both',() => {
    const inputHTMLBody = `
    <html>
    <body>
        <a href="/path1/"> Visvas Website </a>
        <a href="https://www.visvas-tech.com/path2/"> Visvas Website </a>
    </body>
    </html>
    `
    const inputBaseURL = "https://www.visvas-tech.com"
    const actual = getUrlsFromHtml(inputHTMLBody,inputBaseURL)
    const expected = ["https://www.visvas-tech.com/path1/","https://www.visvas-tech.com/path2/"]
    expect(actual).toEqual(expected)
})

test('getUrlsFromHtml bad url',() => {
    const inputHTMLBody = `
    <html>
    <body>
        <a href="invalid"> Visvas Website </a>
    </body>
    </html>
    `
    const inputBaseURL = "https://www.visvas-tech.com"
    const actual = getUrlsFromHtml(inputHTMLBody,inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})
