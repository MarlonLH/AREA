module.exports = (sequelize, DataTypes) => {
    var Action = sequelize.define('Action', {
        Name: DataTypes.STRING,
        Info: DataTypes.TEXT,
    });

    Action.associate = function(models){
//        Action = this.belongsTo(models.Service);
    };

    return Action;
};