module.exports = (sequelize, type) => {
    return sequelize.define('ReadingHistories', {
        id: {
            field:'readid',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        readdate: {
            type: type.DATE,
            allowNull: true
        },
        coin: {
            type: type.FLOAT,
            allowNull: true
        }
    }, {timestamps: false});
}