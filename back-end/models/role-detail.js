module.exports = (sequelize, type) => {
    return sequelize.define('RoleDetails', {}, {timestamps: false});
}