module.exports = (sequelize, type) => {
    return sequelize.define('Rates', {
        id: {
            field: 'rateid',
            type: type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        starnumber: {
            type: type.DOUBLE,
            allowNull: true
        }
    }, {timestamps: false});
}