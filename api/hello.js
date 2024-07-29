export default function handler(request, response) {
    const name = request.body.name
    response.status(200).send(`Hello ${name}!`)
}