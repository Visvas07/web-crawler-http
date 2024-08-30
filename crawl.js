const {JSDOM} = require('jsdom')

async function crawlPage(baseURL,currentUrl,pages){
    

    const baseUrlObj = new URL(baseURL)
    const currentUrlObj = new URL(currentUrl)
    if(baseUrlObj.hostname !== currentUrlObj.hostname){
        return pages
    }

    const normalizedCurrentUrl = normalizeUrl(currentUrl)
    if(pages[normalizedCurrentUrl] > 0){
        pages[normalizedCurrentUrl]++
        return pages
    }

    pages[normalizedCurrentUrl] = 1
    console.log(`Actively crawling: ${currentUrl}`)

    try{
        const resp = await fetch(currentUrl)
        if(resp.status > 399){
            console.log(`Having status code ${resp.status} on ${currentUrl}`)
            return pages
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes('text/html')){
            console.log(`error in content type: ${contentType} on ${currentUrl}`)
            return pages
        }
        const htmlBody = await resp.text()
        const nextUrls = getUrlsFromHtml(htmlBody,baseURL)
        for(const nextUrl of nextUrls){
            pages = await crawlPage(baseURL,nextUrl,pages)
        }
    }catch(error){
        console.log(`error in fetch : ${error.message} due to wrong URL : ${currentUrl}`)
    }
    return pages
}



function getUrlsFromHtml(htmlBody,baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll("a")
    console.log(linkElements.length)
    for(const linkElement of linkElements){
       // console.log(linkElement.href)
        if(linkElement.href.slice(0,1) === '/'){
           try{
            const urlString = new URL(`${baseURL}${linkElement.href}`)
            console.log(urlString.href)
            urls.push(urlString.href)
           }catch(error){
            console.log(`Invalid url :${error.message}`)
           }
            
        }else{
            try{
                const urlString = new URL(linkElement.href)
                console.log(urlString.href)
                urls.push(urlString.href)
               }catch(error){
                console.log(`Invalid url :${error.message}`)
               }
        }
    }
    console.log(urls.length)
    return urls

}


function normalizeUrl(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1)
    } 
    return hostPath
}

module.exports = {
    normalizeUrl,
    getUrlsFromHtml,
    crawlPage
}