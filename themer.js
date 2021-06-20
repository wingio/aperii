if(typeof window != "undefined"){
    
    var theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : "dark"
    var body = document.querySelector("body")
    if(theme == "dark") {
        body.classList.remove('light')
        body.classList.add('dark')
    } else {
        body.classList.remove('dark')
        body.classList.add('light')
    }

    console.log('[THEMER] Loaded theme')
    
}