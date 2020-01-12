module.exports = (sequelize, type) => {
    return sequelize.define('PurchasedChapter', {
        id: {
            field:'purchased_id',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    }, {timestamps: false});
}