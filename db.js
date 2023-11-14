const { Sequelize } = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
        timestamps: true
    },
    logging: false // console.log
})
try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
const db = {}
db.Sequelize = Sequelize
db.connection = sequelize
db.movies = require("./models/Movie")(sequelize, Sequelize)
db.artists = require("./models/Artist")(sequelize, Sequelize)
db.movieRoles = require("./models/MovieRole")(sequelize, Sequelize, db.movies, db.artists)

db.movies.belongsToMany(db.artists, { through: db.movieRoles })
db.artists.belongsToMany(db.movies, { through: db.movieRoles })
db.movies.hasMany(db.movieRoles)
db.artists.hasMany(db.movieRoles)
db.movieRoles.belongsTo(db.movies)
db.movieRoles.belongsTo(db.artists)


sync = async () => {
    if (process.env.DROP_DB === "true") {
        console.log("Begin DROP")
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 0')
        console.log("Checks disabled")
        await db.connection.sync({ force: true })
        console.log('Database synchronised.')
        await db.connection.query('SET FOREIGN_KEY_CHECKS = 1')
        console.log("Checks enabled")

        const [movie, createdM] = await db.movies.findOrCreate({
            where: {
                name: "Shark Attack"
            },
            defaults: {
                name: "Shark Attack",
                description: "movie about shark",
            }
        })
        console.log("movie created: ", createdM)
        const [artist, createdA] = await db.artists.findOrCreate({
            where: {
                name: "Henri Jervson"
            },
            defaults: {
                name: "Henri Jervson",
                dob: "2021-07-06",
                gender: "Male"
            }
        })
        console.log("artist created: ", createdA)
        const [movieRole, createdMR] = await db.movieRoles.findOrCreate({
            where: {
                id: 1
            },
            defaults: {
                role: "Actor"
            }
        })
        console.log("movieRole created: ", createdMR)
    }
    else {
        console.log("Begin ALTER")
        await db.connection.sync({ alter: true }) // Alter existing to match the model
        console.log('Database synchronised.')   
     }
}

module.exports = { db, sync }