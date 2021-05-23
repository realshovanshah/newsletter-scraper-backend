import puppeteer from 'puppeteer'
import fetch from 'node-fetch'
import Newsletter from '../entity/Newsletter'

const hnSearchUrl = 'https://hn.algolia.com/api/v1/search?'
const issueNo = 0
const weeklyUrl = `https://mailchi.mp/hackernewsletter/${issueNo}?e=dab6a1a233`

export async function scrapeNewsletter() {
    const browser = await puppeteer.launch()

    const page = await browser.newPage()
    await page.goto(weeklyUrl)
    page.waitForXPath
    console.log(weeklyUrl)
    const element = await page.$$eval('a[style*="color:#0446AB;text-decoration:underline"], h2', el => el.map((val) => val.textContent?.trim()));
    browser.close()

    const newsletterMap: Map<String, Array<number>> = new Map<String, Array<number>>()
    // console.log(element)
    element.map( (e, index)=>{
            setTimeout( function get(){
                const url = hnSearchUrl + new URLSearchParams({
                    query:e!,
                })
                fetch(url).then( res => res.json().then(async (data)=> {
                    if( e?.startsWith('#')) {
                       newsletterMap.set(e.slice(1)!, [])
                    }else{
                        if(data.hits.length!=0){
                            const issueNo = parseInt(data.hits[0]._tags[2].split('_').pop());
                                // console.log(issueNo)
                                // console.log(`adding ${issueNo} (${e}) to ${newsletterMap.get(Array.from(newsletterMap.keys()).reverse()[0])}`)
                                console.log(newsletterMap)
                             newsletterMap.get(Array.from(newsletterMap.keys()).reverse()[0])?.push(issueNo)    
                        }
                    }
                }))
                .catch((error) =>{
                    get
                    console.log(error);
                })
        },2000*index)
    })
    
    setTimeout(()=>{
        // console.log(newsletterMap)
        const newsletter = new Newsletter({
            issueNo:issueNo,
            posts: newsletterMap,
            categories: Array.from(newsletterMap.keys()),
            date: Date.UTC(2021, 5, 21)
        })
    
        try {
            newsletter.save().then((val)=>{
                console.log(val)
            })
        } catch (err) {
            console.log({ message: err.message })
        }
    }, 200000)

}

