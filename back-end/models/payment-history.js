module.exports = (sequelize, type) => {
    return sequelize.define('PaymentHistories', {
        id: {
            field:'pay_id',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userid: {
            type: type.INTEGER,
            allowNull: false
        },
        coin: {
            type: type.INTEGER,
            allowNull: false
        },
        payerEmail: {
            type: type.STRING,
            allowNull: false
        },
        payValue: {
            type: type.STRING,
            allowNull: false
        },
        payDate: {
            type: type.STRING,
            allowNull: false
        },
        payStatus: {
            type: type.BOOLEAN,
            allowNull: false
        }
    }, {timestamps: false});
}