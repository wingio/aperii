import React, {useState, useEffect} from 'react'
import Changelog from '../components/Changelog'
import ExperimentsModal from '../components/ExperimentsModal'
import Constants from '../constants'
import * as info from '../info.json'
import * as langfile from '../public/resc/lang.json'

export default function useLang() {
    var lang = langfile["en-US"]
    console.log(lang)
    if(typeof window != "undefined"){
        var locale = localStorage.getItem("language") ? localStorage.getItem("language") : "en-US"
        lang = langfile[locale]
        console.log(lang)
    }
    return lang
}