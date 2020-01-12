module.exports = (sequelize, type) => {
    return sequelize.define('Users', {
        id: {
            field: 'userid',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: type.STRING,
            allowNull: false
        },
        password: {
            type: type.STRING,
            allowNull: false
        },
        fullname: {
            type: type.STRING,
            allowNull: true
        },
        birthday: {
            type: type.DATEONLY,
            allowNull: true
        },
        coin: {
            type: type.FLOAT,
            allowNull: true,
            defaultValue: 0
        },
        email: {
            type: type.STRING,
            allowNull: true
        }
    }, { timestamps: false });
}