// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default (req, res) => {
    console.log(req.query)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    var options = {
        method: req.method,
        headers: req.headers
    }
    if(options.method != "GET" && req.body) options.body = req.body
    fetch(req.query.url, options).then(async (resp) => {
        var text = await resp.text()
        res.setHeader('Content-Length', resp.headers.get("content-length"))
        res.setHeader('Content-Type', resp.headers.get("content-type"))
        res.setHeader('User-agent', "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36")
        var ct = resp.headers.get("content-type")
        if(ct && ct.startsWith('image/')){
            var blb = await resp.blob()
            var buf = await blb.arrayBuffer()
            var img = Buffer.from(buf)
            res.send(img)
        } else {
            res.send(text)
        }
        
    })
}
