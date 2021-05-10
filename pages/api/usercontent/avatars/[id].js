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
                var buf = await text.arrayBuffer()
                var img = Buffer.from(buf)
                res.setHeader('Content-Type', resp.headers.get('Content-Type'))
                res.setHeader('Content-Length', img.length//resp.headers.get('Content-Length'))
                res.send(img)
            } else {
                res.status(resp.status).send(resp.text())
            }
        })
    }
}
