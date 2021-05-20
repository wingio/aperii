import React from 'react'
const tokenize = require('../tokenizer v2')

export default function PostBody({ text }) {

    var tokens = tokenize(text.replace(/&nbsp;/g, ''))
    return (
        <>
            {tokens.map((tok, i) => tok.type == 0 ? `${tok.value}` : tok.type == 1 ? <a href={`/p/${tok.value.slice(1)}`}>{tok.value}</a> : '')}
        </>
    )
}
