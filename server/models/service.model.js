module.exports = (sequelize, DataTypes) => {
    var Service = sequelize.define('Service', {
        Name: DataTypes.STRING,
        ImgUrl: DataTypes.STRING,
        Auth: DataTypes.BOOLEAN,
    });

    Service.associate = function(models){
        Service = this.hasMany(models.Action);
        Service = this.hasMany(models.Reaction);
    };

    return Service;
};