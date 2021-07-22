// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {URLSearchParams} from 'url'
/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default (req, res) => {
    var optionalqp = {}
    if (req.query.replyto) optionalqp.replyto = req.query.replyto
    if(req.method =="POST"){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        console.log(`https://api.aperii.com/users/${req.query.id}/posts${Object.keys(optionalqp).length > 1 ? '?' + new URLSearchParams(optionalqp) : ''}`)
        //console.log(req)
        //JSON.stringify(req.body)
        // fetch(`https://api.aperii.com/users/${req.query.id}/posts${Object.keys(optionalqp).length > 1 ? '?' + new URLSearchParams(optionalqp) : ''}`, {
        //     method: 'POST',
        //     body: JSON.stringify(req.body),
        //     headers: {
        //         'content-type': 'application/json',
        //         authorization: req.headers.authorization
        //     }
        // }).then(res => res.json()).then(json => {
        //     res.status(json.status ? json.status : 200).send(json)
        // })
    }
}