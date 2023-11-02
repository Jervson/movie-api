module.exports = (dbConnection, Sequelize, Movie, Artist) => {
    const MovieRole = dbConnection.define("MovieRole", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return MovieRole
}