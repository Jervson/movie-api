const { db } = require("../db")
const movies = db.movies
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.description) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdMovie = await movies.create(req.body, {
        fields: ["name", "description"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/movies/${createdMovie.id}`)
        .json(createdMovie)
}
// READ
exports.getAll = async (req, res) => {
    const result = await movies.findAll({ attributes: ["id", "name", "description"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundMovie = await movies.findByPk(req.params.id)
    if (foundMovie === null) {
        return res.status(404).send({ error: `Movie not found` })
    }
    res.json(foundMovie)
}
// UPDATE
exports.editById = async (req, res) => {
    const foundMovie = await movies.findByPk(req.params.id)
    if (foundMovie === null) {
        return res.status(404).send({ error: `Movie not found` })
    }
    const updateResult = await movies.update({ ...foundMovie,...req.body }, {
        where: { id: req.params.id },
        fields: ["name", "description"]
    })
    if (updateResult[0] == 0) {
        return res.status(500).send({ error: "update failed" })
    }
    res.status(204)
        .location(`${getBaseurl(req)}/movies/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await movies.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Movie not found" })
    }
    res.status(204).send()
}