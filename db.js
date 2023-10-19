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
db.movieroles = require("./models/MovieRole")(sequelize, Sequelize, db.movies, db.artists)

db.movies.belongsToMany(db.artists, { through: db.movieroles })
db.artists.belongsToMany(db.movies, { through: db.movieroles })
db.movies.hasMany(db.movieroles)
db.artists.hasMany(db.movieroles)
db.movieroles.belongsTo(db.movies)
db.movieroles.belongsTo(db.artists)


sync = async () => {
    //await sequelize.sync({ force: true }) // Erase all and recreate
    await sequelize.sync({ alter: true }) // Alter existing to match the model
}

module.exports = { db, sync }