function addNorpBtn(){
    document.addEventListener('click', (e)=> {
        if(e.target.classList.contains("btn-norp")){
            e.target.innerText = "eNorp!"
            console.log("Test32.")
        }
    })

    browser.tab.onUpdated((_, _, tab)=> {
        if(tab.url === "http://localhost"){
            browser.tabs.update(tab.id, {url: "../blocked.html"})
        }
    })

}

addNorpBtn();