const {sortPages} = require('./report.js')
const {test,expect} = require('@jest/globals')

test('sortPages 2 pages',() => {
    const input ={
        'https://wagslane.dev/path' : 1,
        'https://wagslane.dev' : 3
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev',3],
        ['https://wagslane.dev/path',1]
    ]
    expect(actual).toEqual(expected)
})

test('sortPages multi pages',() => {
    const input ={
        'https://wagslane.dev/path' : 1,
        'https://wagslane.dev' : 3,
        'https://wagslane.dev/path1' : 2,
        'https://wagslane.dev/path5' : 5
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev/path5' , 5],
        ['https://wagslane.dev',3],
        ['https://wagslane.dev/path1' , 2],
        ['https://wagslane.dev/path',1]
    ]
    expect(actual).toEqual(expected)
})