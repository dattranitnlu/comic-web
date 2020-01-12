module.exports = (sequelize, type) => {
    return sequelize.define('TransactionHistories', {
        id: {
            field:'tran_id',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        buyerid: {
            type: type.INTEGER,
            allowNull: false
        },
        sellerid: {
            type: type.INTEGER,
            allowNull: false
        },
        chapid: {
            type: type.INTEGER,
            allowNull: false
        },
        chapCoin: {
            type: type.INTEGER,
            allowNull: false
        },
        tranDate: {
            type: type.STRING,
            allowNull: false
        }
    }, {timestamps: false});
}