module.exports = (sequelize, type) => {
    return sequelize.define('Comments', {
        id: {
            field:'commentid',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        commentcontent: {
            type: type.STRING,
            allowNull: false
        }
    }, {timestamps: false});
}