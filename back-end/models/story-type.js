module.exports = (sequelize, type) => {
    return sequelize.define('StoryTypes', {
        id: {
            field: 'typeid',
            type: type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        typename: {
            type: type.STRING,
            allowNull: false
        }
    }, {timestamps: false});
}