module.exports = (sequelize, type) => {
    return sequelize.define('Roles', {
        id: {
            field:'roleid',
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rolename: {
            type: type.STRING,
            allowNull: false
        }
    }, {timestamps: false});
}