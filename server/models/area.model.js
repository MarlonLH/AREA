module.exports = (sequelize, DataTypes) => {
    var Area = sequelize.define('Area', {
        ActionParam: DataTypes.TEXT,
        ReactionParam: DataTypes.TEXT,
        Active: DataTypes.BOOLEAN,
    });

    Area.associate = function(models){
//        Area = this.belongsTo(models.User);
        Area = this.belongsTo(models.Action);
        Area = this.belongsTo(models.Reaction);
        Area = this.belongsTo(models.Service, {as: 'ServiceSource'});
    };

    Area.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Area;
};