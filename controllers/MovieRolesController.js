const { db } = require("../db")
const movieRoles = db.movieRoles
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: "One or all required parameters are missing" })
    }
    const createdMovie = await movieRoles.create(req.body, {
        fields: ["role"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/movies/${createdMovie.id}`)
        .json(createdMovie)
}
// READ
exports.getAll = async (req, res) => {
    const result = await movieRoles.findAll({
        include: [db.movies, db.artists]
    })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundMovie = await movieRoles.findByPk(req.params.id)
    if (foundMovie === null) {
        return res.status(404).send({ error: `Role not found` })
    }
    res.json(foundMovie)
}
// UPDATE
exports.editById = async (req, res) => {
    const updateResult = await movieRoles.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["role"]
    })
    if (updateResult[0] == 0) {
        return res.status(404).send({ error: "Role not found" })
    }
    res.status(204)
        .location(`${getBaseurl(req)}/movies/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await movieRoles.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Role not found" })
    }
    res.status(204).send()
}