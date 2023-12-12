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
        },
        MovieId:{
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: Movie,
                key: "id"
            },
            onDelete: 'SET NULL'
        },
        ArtistId:{
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: Artist,
                key: "id"
            },
            onDelete: 'SET NULL'
        },
    })
    return MovieRole
}