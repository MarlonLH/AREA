const request           = require("request");
const { google }        = require('googleapis');
const cron              = require("node-cron");
const { Token }         = require('../models');

const googleConfig = {
    clientId: '155473281338-4u7kic0v4unhthn71q7quftlv504vc3s.apps.googleusercontent.com',
    clientSecret: 'ztFa6GDx-gbr2IZBlAx6I7YC',
    redirect: 'http://localhost:8081/profile' // this must match your google api settings
};

  
  /**
   * Create the google auth object which gives us access to talk to google's apis.
   */
function createConnection() {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}

  /**
 * This scope tells google what information we want to request.
 */
const defaultScope = [
    'https://mail.google.com/',
	'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/youtube',
    ];
      
      /**
       * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
       */

function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
        scope: defaultScope
	});
}
      
      /**
       * Create the google url to be sent to the client.
       */
function urlGoogle() {
	const auth = createConnection(); // this is from previous step
    const url = getConnectionUrl(auth);
	return(url);
}

cron.schedule("*/1 * * * *", function() {
    Token.findAll(
    ).then(tiktok => {
        if (tiktok.length === 0)
            return ;
        tiktok.forEach(element => {
            let checker;
            request.get("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + element.Token,
            (err, res, body) => {
                checker = JSON.parse(body);
                if (checker.error && element.Active != false)
                {
                    request.post({
                        url:     'https://www.googleapis.com/oauth2/v4/token',
                        form: {
                            client_id: '155473281338-4u7kic0v4unhthn71q7quftlv504vc3s.apps.googleusercontent.com',
                            client_secret: 'ztFa6GDx-gbr2IZBlAx6I7YC',
                            refresh_token: element.Refresh,
                            grant_type: "refresh_token"
                        }
                    }, function(error, response, bod){
                        let res = JSON.parse(bod)
                        element.update({
                            Token: res.access_token
                        });
                        if (!res.access_token)
                            element.update({
                                Active: 0
                            });
                    });
                }
            });
        });
    })
});