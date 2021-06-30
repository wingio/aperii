import React, {useState, useEffect} from 'react'
import Changelog from '../components/Changelog'
import ExperimentsModal from '../components/ExperimentsModal'
import Constants from '../constants'
import * as info from '../info.json'
import langfile from './lang'

export default function useLang() {
    var lang = "en-US"
    if(typeof window != "undefined"){
        var locale = localStorage.getItem("language") ? localStorage.getItem("language") : "en-US"
        lang = locale
    }
    console.log(lang)
    var selection = langfile[lang]
    return selection
}