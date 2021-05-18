import React from 'react'
const tokenize = require('../tokenizer')

export default function PostBody({ text }) {

    var tokens = tokenize(text.replace('&nbsp;', ''))

    return (
        <>
            {tokens.map((tok, i) => tok.type == 0 ? `${tok.value}` : tok.type = 3 ? <br /> : <a href={`/p/${tok.value}`} style={{marginRight: '.2em', marginLeft: `${i == 0 ? '0em' : '.2em'}`}}>@{tok.value}</a>)}
        </>
    )
}
