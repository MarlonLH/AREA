const { Reaction } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const getAllFromService = async function(req, res){
    Reaction.findAll({
        where: { ServiceId: req.params.ServiceId }
    }).then(tok => 
        res.json(tok)
    ).catch(err =>
        res.json(err))
};
module.exports.getAllFromService = getAllFromService;

const getOne = async function(req, res){
    Reaction.findByPk(req.params.ReactionId)
    .then(tok => 
        res.json(tok)
    ).catch(err =>
        res.json(err))
};
module.exports.getOne = getOne;