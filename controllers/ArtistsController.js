const { db } = require("../db")
const artists = db.artists
const { getBaseurl } = require("./helpers")

// CREATE
exports.createNew = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ error: "Required parameter 'name' is missing" })
    }
    const createdArtist = await artists.create({ ...req.body }, {
        fields: ["name", "dob", "gender"]
    })
    res.status(201)
        .location(`${getBaseurl(req)}/artists/${createdArtist.id}`)
        .send(createdArtist)
}
// READ
exports.getAll = async (req, res) => {
    const result = await artists.findAll({ attributes: ["id", "name"] })
    res.json(result)
}
exports.getById = async (req, res) => {
    const foundArtist = await artists.findByPk(req.params.id)
    if (foundArtist === null) {
        return res.status(404).send({ error: `Artist not found` })
    }
    res.json(foundArtist)
}
// UPDATE
exports.editById = async (req, res) => {
    const foundArtist = await artists.findByPk(req.params.id)
    if (foundArtist === null) {
        return res.status(404).send({ error: `Artist not found` })
    }
    const updateResult = await artists.update({ ...req.body }, {
        where: { id: req.params.id },
        fields: ["name", "dob", "gender"]
    })
    if (updateResult[0] == 0) {
        return res.status(500).send({ error: "server error" })
    }
    res.status(202)
        .location(`${getBaseurl(req)}/artists/${req.params.id}`)
        .send()
}
// DELETE
exports.deleteById = async (req, res) => {
    const deletedAmount = await artists.destroy({
        where: { id: req.params.id }
    })
    if (deletedAmount === 0) {
        return res.status(404).send({ error: "Artist not found" })
    }
    res.status(204).send()
}