module.exports = (dbConnection, Sequelize) => {
    const Movie = dbConnection.define("Movie", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
    return Movie
}