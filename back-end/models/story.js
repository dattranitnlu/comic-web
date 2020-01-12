module.exports = (sequelize, type) => {
    return sequelize.define('Stories', {
        id: {
            field:'storyid',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        storyname: {
            type: type.STRING,
            allowNull: false
        },
        description: {
            type: type.TEXT,
            allowNull: true
        },
        copyright: {
            type: type.STRING,
            allowNull: true
        },
        imgUrl: {
            type: type.STRING,
            allowNull: true
        }
    }, {timestamps: false});
}