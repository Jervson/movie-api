const app = require('express')()
const port = 8080
const swaggerUi = require ('swagger-ui-express')
const swaggerDocument = require ('./docs/swagger.json')

const movies = [
    {id: 1, name: "Shark Attack", description: "crazy shark movie", genre: "horror"},
    {id: 2, name: "Shark Attack 2", description: "crazy shark movie", genre: "horror"},
    {id: 3, name: "Shark Attack 3", description: "crazy shark movie", genre: "horror"},
    {id: 4, name: "Shark Attack 4", description: "crazy shark movie", genre: "horror"},
    {id: 5, name: "Shark Attack 5", description: "crazy shark movie", genre: "horror"},
    {id: 6, name: "Shark Attack 6", description: "crazy shark movie", genre: "horror"},
    {id: 7, name: "Shark Attack 7", description: "crazy shark movie", genre: "horror"},
    {id: 8, name: "Shark Attack 8", description: "crazy shark movie", genre: "horror"},
]

app.get('/movies', (req, res) => {
    req.send([movies])
})

app.get('/movies/:id', (req, res) => {

    if (typeof movies[req.params.id -1] === 'undefined') {
        return res.status(404).send({error: "Movie Not Found"})
    }

    res.send(movies[req.params.id - 1])
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})