let enabled = false

const filter = {
    urls: [""]
}

const checkURLRegEx = (newURL, testURL) => {
    console.log("Firing");
    // TODO Improve regex, to not be picky to www or not.
    const regex = new RegExp(`(https?:\/\/)?(www.)?(?<![A-z])${testURL}(?![A-z])(.[A-z]*)*(\/.*)?`);
    console.log(`Testing URL ${testURL}, result is ${regex.test(newURL)}`)
    return regex.test(newURL);
}

const tabUpdateListener = (tabId, changeInfo, tabInfo) => {
    if(enabled && filter.urls.some(url => checkURLRegEx(tabInfo.url,url))){
        browser.tabs.update(tabId, {url: "../blocked.html", loadReplace: true});
    }
} 

const updateFilterUrls = (newUrls) =>{
        filter.urls = newUrls.map((e, i) =>{
        if(i === 0){
            return e;
        }
        return e;
    });
}

browser.storage.local.get().then(async (result) => {
    if(result.urls === undefined){
        await browser.storage.local.set({urls: [""]})
        result = await browser.storage.local.get()
    }
    updateFilterUrls(result.urls);
    enabled = result.enabled;
    console.log(filter);
    browser.tabs.onUpdated.addListener(tabUpdateListener)
})


browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(Object.hasOwn(message, 'enabled')){
        // enabled = message.enabled;
        sendResponse({backgroundEnabled: enabled})
    }
})

browser.storage.onChanged.addListener(changed => {
    if(changed.enabled !== undefined){
        console.log("Firing.");
        enabled = changed.enabled.newValue;
    }
    if(changed.urls !== undefined){
        updateFilterUrls(changed.urls.newValue);
    }
})
