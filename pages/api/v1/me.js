// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
    if(req.method =="GET"){
        //console.log(JSON.stringify(req.body))
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        fetch('https://api.aperii.com/me', {
            method: 'GET',
            headers: {
                authorization: req.headers.authorization 
            }
        }).then(res => res.json()).then(json => {
            res.status(json.status ? json.status : 200).send(json)
        })
    }
}