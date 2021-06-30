import React, {useState, useEffect} from 'react'
import Changelog from '../components/Changelog'
import ExperimentsModal from '../components/ExperimentsModal'
import Constants from '../constants'
import * as info from '../info.json'
var c = new Constants()

export default function useLang() {
    useEffect(() => {
        var tfile = require('..//public/resc/lang.json')
        if(typeof window != "undefined"){
            var lang = localStorage.getItem("language") ? localStorage.getItem("language") : "en-US"
            return tfile[lang]
        } else {
            return tfile["en-US"]
        }
    })
}