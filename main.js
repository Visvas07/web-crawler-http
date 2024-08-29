const { basename } = require("path")
const { crawlPage } = require('./crawl.js')

function main(){
    if(process.argv.length < 3){
        console.log("No website provided")
        process.exit(1)
    }else if(process.argv.length > 3){
        console.log("too many command arguments")
        process.exit(1)
    }
        baseUrl = process.argv[2]
        console.log(`Starting to crawl ${baseUrl}`)
        crawlPage(baseUrl)
    

}

main()