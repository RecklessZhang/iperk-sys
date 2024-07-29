export default function handler(request, response) {
    const name = request.name
    response.status(200).send(`Hello ${name}!`)
}