module.exports = (sequelize, DataTypes) => {
    var Reaction = sequelize.define('Reaction', {
        Name: DataTypes.STRING,
        Info: DataTypes.TEXT,
    });

    Reaction.associate = function(models){
//        Reaction = this.belongsTo(models.Service);
    };

    return Reaction;
};