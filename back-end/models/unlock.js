module.exports = (sequelize, type) => {
    return sequelize.define('Unlocks', {
        unlockdate: {
            type: type.DATE,
            allowNull: true
        },
        price: {
            type: type.FLOAT,
            allowNull: true
        }
    }, {timestamps: false});
}