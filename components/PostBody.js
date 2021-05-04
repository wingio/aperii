import React from 'react'
const tokenize = require('../tokenizer')

export default function PostBody({ text }) {

    var tokens = tokenize(text)

    return (
        <>
            {tokens.map((tok, i) => tok.type == 0 ? <p>{tok.value}</p> : <a href={`/p/${tok.value}`} style={{marginRight: '.2em', marginLeft: `${i == 0 ? '0em' : '.2em'}`}}>@{tok.value}</a>)}
        </>
    )
}
