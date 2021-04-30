// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
    if(req.method =="POST"){
        fetch('https://api.aperii.com/auth/login', {
            method: 'POST',
            body: JSON.stringify(req.body)
        }).then(res => res.json()).then(json => {
            res.status(json.status).send(json)
        })
    }
}