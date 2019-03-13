const { Token }         = require('../models');
const request           = require("request");
var querystring         = require('querystring');
const { to, ReE, ReS }  = require('../services/util.service');

const create = async function(req, res){
    let err, token;
    let user = req.user;
    let body = req.body;

    body.UserId = user.id;
    if (body.Token.substring(0,2) === "4/")
    {
        body = await getGoogleTokenFromCode(body);
        await body;
    }
    body.Active = 1;
    [err, token] = await to(Token.create(body));
    if(err) return ReE(res, err, 422);

    [err, token] = await to(token.save());
    if(err) return ReE(res, err, 422);

    let token_json = token.toWeb();
    token_json.user = [{user:user.id}];

    return ReS(res, {token:token_json}, 201);
};
module.exports.create = create;

const get = async function(req, res){
    Token.findOne({
        where: {
            UserId: req.user.id
        }
    }).then(tok =>
        res.json(tok)
    ).catch(err =>
        res.json(err))
};
module.exports.get = get;

const remove = async function(req, res){
    Token.destroy({
        where: {
            UserId: req.user.id
        }
    }).then(tok => 
        res.json(tok)
    ).catch(err =>
        res.json(err))
};
module.exports.remove = remove;


function getGoogleTokenFromCode(code) {
    return new Promise(resolve => {
        request.post({
            url:     'https://www.googleapis.com/oauth2/v4/token',
            form:    { client_id: '155473281338-4u7kic0v4unhthn71q7quftlv504vc3s.apps.googleusercontent.com',
                   client_secret: 'ztFa6GDx-gbr2IZBlAx6I7YC',
                   code: code.Token,
                   grant_type: "authorization_code",
                   redirect_uri:  'http://localhost:8081/profile'
                }
        }, function(error, response, body){
            code.Token = JSON.parse(body).access_token;
            code.Refresh = JSON.parse(body).refresh_token;
            resolve(code);
        });
    });
}

	/* //add the tokens to the google api so we have access to the account
	const auth = createConnection();
	auth.setCredentials(tokens);
	
	// connect to google plus - need this to get the user's email
	const plus = getGoogleDriveApi(auth);
	const me = await plus.people.get({ userId: 'me' });
	
	// get the google id and email
	const userGoogleId = me.data.id;
	const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
      
	// return so we can login or sign up the user
	return {
	  id: userGoogleId,
	  email: userGoogleEmail,
	  tokens: tokens, // you can save these to the user if you ever want to get their details without making them log in again
	};*/