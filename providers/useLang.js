import React, {useState, useEffect} from 'react'
import Changelog from '../components/Changelog'
import ExperimentsModal from '../components/ExperimentsModal'
import Constants from '../constants'
import * as info from '../info.json'
var c = new Constants()

export default function useLang() {
    useEffect(() => {
        return c.getLang()
    })
}