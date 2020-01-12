module.exports = (sequelize, type) => {
    return sequelize.define('Chapters', {
        id: {
            field:'chapid',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        chapname: {
            type: type.STRING,
            allowNull: false
        },
        postdata: {
            type: type.TEXT,
            allowNull: true
        },
        coin: {
            type: type.FLOAT,
            allowNull: true
        },
        chapstatus: {
            type: type.BOOLEAN,
            allowNull: true
        }
    }, {timestamps: false});
}