const { Area } = require('../models');
const { to, ReE, ReS } = require('../services/util.service');

const create = async function(req, res){
    let err, area;
    let user = req.user;
    let body = req.body;

    body.UserId = user.id;
    [err, area] = await to(Area.create(body));
    if(err) return ReE(res, err, 422);

    [err, area] = await to(area.save());
    if(err) return ReE(res, err, 422);

    let area_json = area.toWeb();
    area_json.UserId = user.id;

    return ReS(res, {area:area_json}, 201);
};
module.exports.create = create;

const getAll = async function(req, res){
    Area.findAll({
        where: { UserId: req.user.id}
    }).then(ar =>
        res.json(ar)
    ).catch(err =>
        res.json(err))
};
module.exports.getAll = getAll;

const get = async function(req, res){
    Area.findOne({
        where: {
            id: req.params.areaId,
            UserId: req.user.id
        }
    }).then(ar =>
        res.json(ar)
    ).catch(err =>
        res.json(err))
};
module.exports.get = get;

const update = async function(req, res){
    Area.update({
        where: {
            id: req.params.areaId,
            UserId: req.user.id
        }
    }).then(ar =>
        res.json(ar)
    ).catch(err =>
        res.json(err))
};
module.exports.update = update;

const remove = async function(req, res){
    Area.destroy({
        where: {
            id: req.params.areaId,
            UserId: req.user.id
        }
    }).then(tok =>
        res.json(tok)
    ).catch(err =>
        res.json(err))
};
module.exports.remove = remove;