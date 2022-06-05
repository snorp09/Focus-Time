'use strict';

let enabledState = undefined;

browser.storage.local.get("enabled").then((result) => {
    enabledState = result.enabled;
    const enableBtn = document.querySelector(".btn-enable");
    if (enabledState) {
        enableBtn.innerText = "Disable";
    } else if (!enabledState) {
        console.log(enabledState)
        enableBtn.innerText = "Enable";
    }
})

browser.storage.onChanged.addListener(changed => {
    if(changed.enabled !== undefined){
        enabledState = changed.enabled.newValue;
        const enableBtn = document.querySelector(".btn-enable");
        if(enabledState){
            enableBtn.innerText = "Disable"
        } else if (!enabledState){
            enableBtn.innerText = "Enable"
        }
    }
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains("btn-enable")) {
        // enabledState = message.backgroundEnabled;
        // if (enabledState) {
        //     e.target.innerText = "Disable";
        // } else if (!enabledState) {
        //     e.target.innerText = "Enable";
        // }
        browser.storage.local.set({ enabled: !enabledState }).then(_ => console.log("Test32."));
        // browser.runtime.sendMessage({ enabled: !enabledState }).then((message) => {
        // })
    }

})

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (Object.hasOwn(message, backgroundEnabled)) {
        const enableBtn = document.querySelector(".btn-enable");
        if (enabledState) {
            enableBtn.innerText = "Disable";
        } else if (!enabledState) {
            enableBtn.innerText = "Enable";
        }
    }
})

document.addEventListener('submit', (e)=> {
    e.preventDefault();
    if(e.target.classList.contains("add-site-frm")){
        const urlToAdd = e.target.querySelector(".add-site-input").value;
        browser.storage.local.get("urls").then(result =>{
            let newUrls = undefined;
            if(result.urls === undefined){
                newUrls = [urlToAdd]
            }
            else{
                newUrls = result.urls.concat(urlToAdd);
            }
            browser.storage.local.set({urls: newUrls});
        })
        e.target.querySelector(".add-site-input").value = "";
    }
})