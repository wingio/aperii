if(typeof window != "undefined"){
    
    var theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : "dark"
    var body = document.querySelector("body")
    console.log('[THEMER] Loading theme "' + theme + '"...')
    if(theme == "dark") {
        body.classList.remove('light')
        body.classList.add('dark')
    } else {
        body.classList.remove('dark')
        body.classList.add('light')
    }

    console.log('[THEMER] Loaded theme')
    
}