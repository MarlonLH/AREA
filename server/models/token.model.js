'use strict';

module.exports = (sequelize, DataTypes) => {
    var Token = sequelize.define('Token', {
        Refresh: DataTypes.TEXT,
        Token: DataTypes.TEXT,
        Token: DataTypes.BOOLEAN,
    });

    Token.associate = function(models){
        Token = this.belongsTo(models.User);
        //Token = this.belongsTo(models.Service);
    };

    Token.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Token;
};
