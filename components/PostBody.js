import React from 'react'
const tokenize = require('../tokenizer')

export default function PostBody({ text }) {

    var tokens = tokenize(text)

    return (
        <>
            {tokens.map(tok => tok.type == 0 ? <p>{tok.value}</p> : <a href={`/p/${tok.value}`}> @{tok.value} </a>)}
        </>
    )
}
