import React from 'react'
const tokenize = require('../tokenizer v2')
import Twemoji from 'react-twemoji';

export default function PostBody({ text, useTwemoji }) {

    var tokens = tokenize(text.replace(/&nbsp;/g, ''))
    
    return (<Twemoji>
    {tokens.map((tok, i) => tok.type == 0 ? `${tok.value}` : tok.type == 1 ? <a href={`/p/${tok.value.slice(1)}`}>{tok.value}</a> : tok.type == 3 ? <br /> : '')}
    </Twemoji>)
    
}
