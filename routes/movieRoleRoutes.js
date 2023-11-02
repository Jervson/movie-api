const movieRolesController = require("../controllers/MovieRolesController.js")
module.exports = (app) => {
    app.route("/movieroles")
        .get(movieRolesController.getAll)
        .post(movieRolesController.createNew)      // Create
    app.route("/movieroles/:id")
        .get(movieRolesController.getById)         // Read
        .put(movieRolesController.editById)        // Update
        .delete(movieRolesController.deleteById)   // Delete
}