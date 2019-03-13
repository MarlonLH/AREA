const { Service, Action, Reaction } = require('../models');
const { to, ReE, ReS }              = require('../services/util.service');
var   Sequelize                     = require('sequelize');
const Op = Sequelize.Op;

var array;

const geta = async function(req, res){
    array = [];
    Action.findAll(
    ).then(ress => {
        ress.forEach((resItem) => {
            if (array.indexOf(resItem.ServiceId) === -1)
                array.push(resItem.ServiceId);
        });
        Service.findAll({
            where: { id: { [Op.in]: array }}
        }).then(tok => 
            res.json(tok)
        ).catch(err =>
            res.json(err))
    });
};
module.exports.geta = geta;

const getr = async function(req, res){
    array = [];
    Reaction.findAll(
    ).then(ress => {
        ress.forEach((resItem) => {
            if (array.indexOf(resItem.ServiceId) === -1)
                array.push(resItem.ServiceId);
        });
        Service.findAll({
            where: { id: { [Op.in]: array }}
        }).then(tok => 
            res.json(tok)
        ).catch(err =>
            res.json(err))
    });
};
module.exports.getr = getr;

const get = async function(req, res){
    Service.findAll(
    ).then(tok => 
        res.json(tok)
    ).catch(err =>
        res.json(err))
};
module.exports.get = get;