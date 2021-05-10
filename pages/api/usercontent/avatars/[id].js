// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default (req, res) => {
    if (req.method == "GET") {
        console.log(req.query)
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        fetch('https://api.aperii.com/avatars/' + req.query.id, {
            method: 'GET'
        }).then(async (resp) => {
            var text = await resp.blob()
            console.log(text)
            if (resp.status == 200) {
                //var img = Buffer.from(text)
                res.setHeader('Content-Type', resp.headers.get('Content-Type'))
                res.setHeader('Content-Length', resp.headers.get('Content-Length'))
                res.send(text)
            } else {
                res.status(resp.status).send(resp.text())
            }
        })
    }
}
