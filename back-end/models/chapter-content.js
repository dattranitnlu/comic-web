module.exports = (sequelize, type) => {
    return sequelize.define('ChapterContent', {
        id: {
            field:'contentId',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: type.STRING,
            allowNull: true
        }
    }, {timestamps: false});
}