const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('../controllers/user.controller');
const AreaController   = require('../controllers/area.controller');
const ActionController   = require('../controllers/action.controller');
const ReactionController   = require('../controllers/reaction.controller');
const TokenController   = require('../controllers/token.controller');
const ServiceController   = require('../controllers/service.controller');
const HomeController 	= require('../controllers/home.controller');

const custom 	        = require('./../middleware/custom');

const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

        /***    USER    ***/
router.post(    '/users',           UserController.create);                                                    // C
router.get(     '/users',           passport.authenticate('jwt', {session:false}), UserController.get);        // R
router.put(     '/users',           passport.authenticate('jwt', {session:false}), UserController.update);     // U
router.delete(  '/users',           passport.authenticate('jwt', {session:false}), UserController.remove);     // D
router.post(    '/users/login',     UserController.login);

        /***    AREAS    ***/
router.post(    '/areas',                   passport.authenticate('jwt', {session: false}), AreaController.create);    // C
router.get(     '/areas',                   passport.authenticate('jwt', {session: false}), AreaController.getAll);    // R

router.get(     '/areas/:areaId',           passport.authenticate('jwt', {session: false}), AreaController.get);    // R
router.put(     '/areas/:areaId',           passport.authenticate('jwt', {session: false}), AreaController.update);    // U
router.delete(  '/areas/:areaId',           passport.authenticate('jwt', {session: false}), AreaController.remove);    // D

        /***    SERVICES    ***/
router.get(     '/services/actions',        ServiceController.geta);
router.get(     '/services/reactions',      ServiceController.getr);
router.get(     '/services',                ServiceController.get);

        /***    TOKENS    ***/
router.post(   '/tokens',                   passport.authenticate('jwt', {session: false}), TokenController.create);
router.get(    '/tokens',                   passport.authenticate('jwt', {session: false}), TokenController.get);
router.delete( '/tokens',                   passport.authenticate('jwt', {session: false}), TokenController.remove);

        /***    ACTIONS    ***/
router.get(    '/actions/all/:ServiceId',   ActionController.getAllFromService);
router.get(    '/actions/:ActionId',        ActionController.getOne);

        /***    REACTIONS    ***/
router.get(    '/reactions/all/:ServiceId', ReactionController.getAllFromService);
router.get(    '/reactions/:ReactionId',    ReactionController.getOne);


router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


//********* API DOCUMENTATION **********
//router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
//router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;