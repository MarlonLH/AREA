const { Action } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const getAllFromService = async function(req, res){
    Action.findAll({
        where: { ServiceId: req.params.ServiceId }
    }).then(tok => 
        res.json(tok)
    ).catch(err =>
        res.json(err))
};
module.exports.getAllFromService = getAllFromService;

const getOne = async function(req, res){
    Action.findById(req.params.ActionId)
    .then(tok => 
        res.json(tok)
    ).catch(err =>
        res.json(err))
};
module.exports.getOne = getOne;