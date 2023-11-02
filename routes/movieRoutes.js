const moviesController = require("../controllers/MoviesController.js")
module.exports = (app) => {
    app.route("/movies")
        .get(moviesController.getAll)
        .post(moviesController.createNew)      // Create
    app.route("/movies/:id")
        .get(moviesController.getById)         // Read
        .put(moviesController.editById)        // Update
        .delete(moviesController.deleteById)   // Delete
}