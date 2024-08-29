const {JSDOM} = require('jsdom')

async function crawlPage(currentUrl){
    console.log(`Actively crawling: ${currentUrl}`)
    try{
        const resp = await fetch(currentUrl)
        if(resp.status > 399){
            console.log(`Having status code ${resp.status} on ${currentUrl}`)
            return
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes('text/html')){
            console.log(`error in content type: ${contentType} on ${currentUrl}`)
            return
        }
    console.log(await resp.text())
    }catch(error){
        console.log(`error in fetch : ${error.message} due to wrong URL : ${currentUrl}`)
    }
    
}



function getUrlsFromHtml(htmlBody,baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll("a")
    for(const linkElement of linkElements){
        if(linkElement.href.slice(0,1) === '/'){
           try{
            const urlString = new URL(`${baseURL}${linkElement.href}`)
            urls.push(urlString.href)
           }catch(error){
            console.log(`Invalid url :${error.message}`)
           }
            
        }else{
            try{
                const urlString = new URL(linkElement.href)
                urls.push(urlString.href)
               }catch(error){
                console.log(`Invalid url :${error.message}`)
               }
        }
    }
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