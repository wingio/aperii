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
        res.setHeader('Content-Length', text.length)
        res.setHeader('Content-Type', res.getHeader("content-type"))
        res.send(text)
    })
}
