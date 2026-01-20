
async function savePage(event) {

    url = encodeURI(event.url)


    let options = await browser.storage.sync.get();


    if (!options.librarian_address || !options.token) {
        browser.runtime.openOptionsPage()
    }
    
    let restab = await browser.tabs.create({
        url: `${options.librarian_address}?id=${options.token}&url=${url}`,
        active: false
    })

    browser.tabs.onUpdated.addListener(
    async (event)=>{
        let tab = await browser.tabs.get(event)
        // This seems to be the best way to check the tab has *actually* opened and loaded
        if (tab.status = "complete" && tab.favIconUrl) {
            browser.tabs.remove(event)
        }
    }, 
    {tabId: restab.id}
    )
}

browser.pageAction.onClicked.addListener(savePage);
 