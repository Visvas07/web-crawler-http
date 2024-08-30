const { crawlPage } = require('./crawl.js')
const {printReport} = require('./report.js')

async function main(){
    if(process.argv.length < 3){
        console.log("No website provided")
        process.exit(1)
    }else if(process.argv.length > 3){
        console.log("too many command arguments")
        process.exit(1)
    }
        baseUrl = process.argv[2]
        console.log(`Starting to crawl ${baseUrl}`)
        const pages = await crawlPage(baseUrl,baseUrl,{})
    for(const page of Object.entries(pages)){
        console.log(page)
    }
    printReport(pages)
}

main()