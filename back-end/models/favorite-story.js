module.exports = (sequelize, type) => {
    return sequelize.define('FavoriteStories', {}, {timestamps: false});
}