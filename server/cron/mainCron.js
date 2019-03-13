var querystring                 = require('querystring');
const cron                      = require("node-cron");
const request                   = require("request");
const { Token, Area, User }     = require('../models');
var randomColor                 = require('randomcolor');
const nodemailer                = require("nodemailer");
const { google }                = require("googleapis");

cron.schedule("10 * * * * *", function() {    // CRON de lever/coucher de soleil
    Area.findAll({
        where: {
            ActionId: 1
        }
    }).then(ar => {
        if (ar.length === 0)
            return ;
        ar.forEach((arItem) => {
            if (arItem.Active == false)
                return ;
            var kind = arItem.ActionParam.split(';;')[0]
            var code = arItem.ActionParam.split(';;')[1]
            let weather;
            let timest;
            request.get("http://api.openweathermap.org/data/2.5/weather?zip=" + code + ",fr&units=metric&APPID=6628d722a288a75e8571c7bcc5aa1cf9",
            (error, response, body) => {
                if(error || !body)
                    return console.dir(error);
                weather = JSON.parse(body);
                if (!weather || !weather.sys)
                    return ;
                let tmp = new Date();
                if (kind == 1)
                    timest = new Date(weather.sys.sunrise * 1000);
                else
                    timest = new Date(weather.sys.sunset * 1000);
                if (arItem.updatedAt < timest && timest <= tmp)
                {
                    arItem.update({
                        Active: 0
                    }).then(function() {
                        arItem.update({
                            Active: 1
                        });
                    });
                    array_of_reactions[arItem.ReactionId - 1](arItem.ReactionParam, arItem.UserId);
                }
            });
        });
    })
});

cron.schedule("*/5 * * * *", function() {    // CRON de new vid channel
    Area.findAll({
        where: {
            ActionId: 2
        }
    }).then(ar => {
        if (ar.length === 0)
            return ;
        ar.forEach((arItem) => {
            if (arItem.Active == false)
                return ;
            request.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyCWldXqrcJ2QOq_0l2n0T9UHqs0ZtbR4OU&part=snippet&channelId=" + arItem.ActionParam,
            (error, res, body) => {
                if(error || !body || !body.items)
                    return console.dir(error);
                let id = JSON.parse(body).items[0].snippet.publishedAt;
                let tmp = new Date();
                if (arItem.updatedAt < id && id <= tmp)
                {
                    arItem.update({
                        Active: 0
                    }).then(function() {
                        arItem.update({
                            Active: 1
                        });
                    });
                    array_of_reactions[arItem.ReactionId - 1](arItem.ReactionParam, arItem.UserId);
                }
            });
        });
    })
});

cron.schedule("*/5 * * * *", function() {    // CRON de new article NYT
    Area.findAll({
        where: {
            ActionId: 3
        }
    }).then(ar => {
        if (ar.length === 0)
            return ;
        ar.forEach((arItem) => {
            if (arItem.Active == false)
                return ;
            let nyt;
            request.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&q=" + arItem.ActionParam + "&api-key=T2Y1EVJa3qSN415CbIl15LZicOxUHo8S",
            (error, response, body) => {
                if(error || !body)
                    return console.dir(error);
                nyt = JSON.parse(body);
                if (!nyt || nyt.response === undefined || !nyt.response.docs[0])
                    return ;
                let tmp = new Date();
                let datt = new Date(nyt.response.docs[0].pub_date);
                if (arItem.updatedAt < datt && datt <= tmp)
                {
                    arItem.update({
                        Active: 0
                    }).then(function() {
                        arItem.update({
                            Active: 1
                        });
                    });
                    array_of_reactions[arItem.ReactionId - 1](arItem.ReactionParam, arItem.UserId);
                }
            });
        });
    })
});

cron.schedule("*/5 * * * *", function() {    // CRON de new bestseller NYT
    Area.findAll({
        where: {
            ActionId: 4
        }
    }).then(ar => {
        if (ar.length === 0)
            return ;
        ar.forEach((arItem) => {
            if (arItem.Active == false)
                return ;
            let nyt;
            request.get("https://api.nytimes.com/svc/books/v3/lists/overview.json?sort=newest&api-key=T2Y1EVJa3qSN415CbIl15LZicOxUHo8S",
            (error, response, body) => {
                if(error || !body)
                    return console.dir(error);
                nyt = JSON.parse(body);
                if (!nyt || nyt.results === undefined || !nyt.results.lists[0])
                    return ;
                let tmp = new Date();
                let datt = new Date(nyt.results.lists[0].books[0].created_date);
                if (arItem.updatedAt < datt && datt <= tmp)
                {
                    arItem.update({
                        Active: 0
                    }).then(function() {
                        arItem.update({
                            Active: 1
                        });
                    });
                    array_of_reactions[arItem.ReactionId - 1](arItem.ReactionParam, arItem.UserId);
                }
            });
        });
    })
});

cron.schedule("10 * * * * *", function() {    // CRON de new trending gif
    Area.findAll({
        where: {
            ActionId: 5
        }
    }).then(ar => {
        if (ar.length === 0)
            return ;
        ar.forEach((arItem) => {
            if (arItem.Active == false)
                return ;
            let gif;
            request.get("http://api.giphy.com/v1/gifs/trending?api_key=CZu5WOv9GFjjcOsJRxqq1D4GmC8hICcf&limit=2&sort=recent",
            (error, response, body) => {
                if(error || !body)
                    return console.dir(error);
                gif = JSON.parse(body);
                if (!gif || !gif.data)
                    return ;
                let tmp = gif.data[0].trending_datetime;
                let now = new Date();
                if (arItem.updatedAt < new Date(tmp) && new Date(tmp) <= now)
                {
                    arItem.update({
                        Active: 0
                    }).then(function() {
                        arItem.update({
                            Active: 1
                        });
                    });
                    array_of_reactions[arItem.ReactionId - 1](arItem.ReactionParam, arItem.UserId);
                }
            });
        });
    })
});

cron.schedule("40 * * * * *", function() {    // CRON de new gif keyword
    Area.findAll({
        where: {
            ActionId: 6
        }
    }).then(ar => {
        if (ar.length === 0)
            return ;
        ar.forEach((arItem) => {
            if (arItem.Active == false)
                return ;
            let gif;
            request.get("http://api.giphy.com/v1/gifs/search?q=" + arItem.ActionParam + "&api_key=CZu5WOv9GFjjcOsJRxqq1D4GmC8hICcf&limit=2&sort=recent",
            (error, response, body) => {
                if(error || !body)
                    return console.dir(error);
                gif = JSON.parse(body);
                if (!gif || !gif.data || gif.data.length == 0)
                    return ;
                let tmp = gif.data[0].import_datetime;
                let now = new Date();
                if (arItem.updatedAt < new Date(tmp) && new Date(tmp) <= now)
                {
                    arItem.update({
                        Active: 0
                    }).then(function() {
                        arItem.update({
                            Active: 1
                        });
                    });
                    array_of_reactions[arItem.ReactionId - 1](arItem.ReactionParam, arItem.UserId);
                }
            });
        });
    })
});

cron.schedule("* */1 * * *", function() {    // CRON de every day specific hour
    Area.findAll({
        where: {
            ActionId: 7
        }
    }).then(ar => {
        if (ar.length === 0)
            return ;
        ar.forEach((arItem) => {
            if (arItem.Active == false)
                return ;
            let time;
            request.get("http://worldtimeapi.org/api/timezone/Europe/Paris",
            (error, response, body) => {
                if(error || !body)
                    return console.dir(error);
                time = JSON.parse(body);
                var date = new Date(time.datetime);
                if (date.getHours() == arItem.ActionParam)
                    array_of_reactions[arItem.ReactionId - 1](arItem.ReactionParam, arItem.UserId);
            });
        });
    })
});

cron.schedule("*/1 * * * *", function() {    // CRON de every hour specific minute
    Area.findAll({
        where: {
            ActionId: 8
        }
    }).then(ar => {
        if (ar.length === 0)
            return ;
        ar.forEach((arItem) => {
            if (arItem.Active == false)
                return ;
            let time;
            request.get("http://worldtimeapi.org/api/timezone/Europe/Paris",
            (error, response, body) => {
                if(error || !body)
                    return console.dir(error);
                time = JSON.parse(body);
                var date = new Date(time.datetime);
                if (date.getMinutes() == arItem.ActionParam)
                    array_of_reactions[arItem.ReactionId - 1](arItem.ReactionParam, arItem.UserId);
            });
        });
    })
});

cron.schedule("* */1 * * *", function() {    // CRON de Meteo de lendemain
    Area.findAll({
        where: {
            ActionId: 9
        }
    }).then(ar => {
        if (ar.length === 0)
            return ;
        ar.forEach((arItem) => {
            if (arItem.Active == false)
                return ;
            var offset = arItem.ActionParam.split(';;')[0]
            var code = arItem.ActionParam.split(';;')[1]
            var kind = arItem.ActionParam.split(';;')[2]
            let weather;
            request.get("http://api.openweathermap.org/data/2.5/forecast?zip=" + code + ",fr&units=metric&APPID=6628d722a288a75e8571c7bcc5aa1cf9",
            (error, response, body) => {
                if(error || !body)
                    return console.dir(error);
                weather = JSON.parse(body);
                if (!weather)
                    return ;
                var real = weather.list[offset * 8 - 1].weather[0].id;
                if ((real > 200 && real < 300 && kind == 0) || (real > 500 && real < 600 && kind == 1)
                || (real > 600 && real < 700 && kind == 2) || (real > 800 && real < 900 && kind == 3))
                    array_of_reactions[arItem.ReactionId - 1](arItem.ReactionParam, arItem.UserId);
            });
        });
    })
});

cron.schedule("*/5 * * * *", function() {    // CRON de dépassement de temp
    Area.findAll({
        where: {
            ActionId: 10
        }
    }).then(ar => {
        if (ar.length === 0)
            return ;
        ar.forEach((arItem) => {
            if (arItem.Active == false)
                return ;
            var code = arItem.ActionParam.split(';;')[0]
            var temp = arItem.ActionParam.split(';;')[1]
            var kind = arItem.ActionParam.split(';;')[2]
            let weather;
            request.get("http://api.openweathermap.org/data/2.5/weather?zip=" + code + ",fr&units=metric&APPID=6628d722a288a75e8571c7bcc5aa1cf9",
            (error, response, body) => {
                if(error || !body) {
                    return console.dir(error);
                }
                weather = JSON.parse(body);
                if (!weather)
                    return ;
                if ((kind == 1 && weather.main.temp > temp) || (kind == 2 && weather.main.temp < temp))
                    array_of_reactions[arItem.ReactionId - 1](arItem.ReactionParam, arItem.UserId);
            });
        });
    })
});

cron.schedule("*/1 * * * *", function() {    // CRON d'intervalle
    Area.findAll({
        where: {
            ActionId: 11
        }
    }).then(ar => {
        if (ar.length === 0)
            return ;
        ar.forEach((arItem) => {
            if (arItem.Active == false)
                return ;
            var time = arItem.ActionParam.split(';;')[0]
            var intervalle = arItem.ActionParam.split(';;')[1]
            let date = new Date();
            if ((intervalle == 2 && date.getSeconds() === 0 && date.getMinutes() % time === 0)
            || (intervalle == 1 && date.getMinutes() === 0 && date.getHours() % time === 0)
            || (intervalle == 3 && date.getHours() === 0 && date.getDay() % time === 0))
                array_of_reactions[arItem.ReactionId - 1](arItem.ReactionParam, arItem.UserId);
        });
    })
});

addVidPlaylist = function(message, id)
{
    let token;
    let vid = message.split(';;')[0];
    let playlist = message.split(';;')[1];
    Token.findOne({
        where: { UserId: id }
    }).then(tiktok => {
        token = tiktok.Token;
    })
    request.get("https://www.googleapis.com/youtube/v3/channels?key=AIzaSyCWldXqrcJ2QOq_0l2n0T9UHqs0ZtbR4OU&part=id&forUsername=" + vid,
    (error, res, body) => {
        if(error)
            return console.dir(error);
        if (JSON.parse(body).pageInfo.totalResults != 0)
        {
            request.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyCWldXqrcJ2QOq_0l2n0T9UHqs0ZtbR4OU&part=snippet&order=date&maxResults=1&channelId=" + JSON.parse(body).items[0].id,
            (error, res, bod) => {
                if(error)
                    return console.dir(error);
                if (JSON.parse(bod).items)
                    vid = JSON.parse(bod).items[0].id.videoId
                if (!vid)
                    vid = "GDLBaHjy9Ho";
            });
        }
    });
    setTimeout(() => {
        let body = {
            "snippet": {
                "playlistId": playlist == '000' ? 'WL' : playlist,
                "resourceId": {
                    "kind": "youtube#video",
                    "videoId": vid
                }
            }
        } 
        request({
            method: 'POST',
            body: body,
            json: true,
            headers: {
              'Authorization':'Bearer ' + token
            },
            uri: "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet"
        });
    }, 800);
}

sendMailServeur = async function(message, id)
{
    let object = message.split(';;')[0]
    let content = message.split(';;')[1]
      
    let mail;
    User.findByPk(id
        ).then(usr =>
            mail = usr.email
            )
            
    setTimeout(() => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: "BSAREA00@gmail.com",
              pass: "mq(q@AY*r3E8"
            }
        });
          
        let mailOptions = {
            from: 'The best server ever', // sender address
            to: mail,
            subject: object,
            text: content,
            html: '<b>' + content + '</b>'
        };
        console.log("sent")
        transporter.sendMail(mailOptions, function(error, info) {
            transporter.close();
        });
    }, 200);
}

addCalendarEvent = function(message, id)
{
    let token;
    let mail;
    let title = message.split(';;')[0]
    let length = message.split(';;')[1]
    let dateb = new Date(message.split(';;')[2]);
    let date = new Date(message.split(';;')[2]);
    dateb.setHours(date.getHours() - 1 )
    date.setHours(date.getHours() + (length - 1 ))
    if (length < 1)
        return ;
    Token.findOne({
        where: {UserId: id}
    }).then(tok => {
        token = tok.Token;
    })
    var body = {
        "end": {
            "dateTime": date
        },
        "start": {
            "dateTime": dateb
        },
        "description": "Event created with BS-AREA",
        "summary": title
    }
    
    setTimeout(() => {
        if (!token || !message)
            return ;
        request({
            method: 'GET',
            headers: {
              'Authorization':'Bearer ' + token
            },
            uri: "https://www.googleapis.com/calendar/v3/users/me/calendarList",
        }, (err, res, body) => {
            if (!JSON.parse(body).items)
                return ;
            mail = JSON.parse(body).items[0].id;
        });
        setTimeout(() => {
            request({
                method: 'POST',
                body: body,
                json: true,
                headers: {
                    'Authorization':'Bearer ' + token
                  },
                  uri: "https://www.googleapis.com/calendar/v3/calendars/" + mail + "/events",
            });
        }, 200);
    }, 200);
}

uploadFileDrive = function(message, id)
{
    let token;
    Token.findOne({
        where: {UserId: id}
    }).then(tok => {
        token = tok.Token;
    })
    var body = {
        message,
    }
    
    var formData = querystring.stringify(body);
    var contentLength = formData.length;
    
    setTimeout(() => {
        if (!token || !message)
            return ;
        request({
            body: formData,
            method: 'POST',
            headers: {
              'Content-Length': contentLength,
              'Content-Type': 'text/plain',
              'Authorization':'Bearer ' + token
            },
            uri: "https://www.googleapis.com/upload/drive/v3/files?uploadType=media",
        });
    }, 200);
}

sendSelfMail = async function(message, id)
{
    let user;
    let refresh;
    let token;
    Token.findOne({
        where: {
            UserId: id
        }
    }).then(areuh => {
        if (areuh.length === 0)
            return ;
        refresh = areuh.Refresh;
        token = areuh.Token;
        request.get("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token,
        (error, response, body) => {
            user = JSON.parse(body);
        });
    });
    
    let object = message.split(';;')[0]
    let content = message.split(';;')[1]

    setTimeout(() => {
        if (!user)
            return ;
        const smtpTransport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                 type: "OAuth2",
                 user: user.email,
                 clientId: '155473281338-4u7kic0v4unhthn71q7quftlv504vc3s.apps.googleusercontent.com',
                 clientSecret: 'ztFa6GDx-gbr2IZBlAx6I7YC',
                 refreshToken: refresh
            }
        });  

        var mailOptions = {
            from: user.email,
            to: user.email,
            subject: object,
            text: content, // plaintext body
            html: 'Message from: Yourself <br></br> Using our Website :D <br></br><br></br> Message: ' + content,
        };
          
        smtpTransport.sendMail(mailOptions, function(error, info) {
            smtpTransport.close();
        });
      }, 200);
}

sendMail = function(message, id)
{
    let user;
    let refresh;
    let object;
    let content;
    let token;
    let dest;
    Token.findOne({
        where: {
            UserId: id
        }
    }).then(areuh => {
        if (areuh.length === 0)
            return console.dir("Not Logged In");
        refresh = areuh.Refresh;
        token = areuh.Token;
        request.get("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + token,
        (error, response, body) => {
            user = JSON.parse(body);
        });
    });
    
    dest = message.split(';;')[0]
    object = message.split(';;')[1]
    content = message.split(';;')[2]

    setTimeout(() => {
        if (!user)
            return ;
        const smtpTransport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                 type: "OAuth2",
                 user: user.email,
                 clientId: '155473281338-4u7kic0v4unhthn71q7quftlv504vc3s.apps.googleusercontent.com',
                 clientSecret: 'ztFa6GDx-gbr2IZBlAx6I7YC',
                 refreshToken: refresh,
            }
        });  

        var mailOptions = {
            from: user.email,
            to: dest,
            subject: object,
            text: content, // plaintext body
            html: 'Message from: Yourself <br></br> Using our Website :D <br></br><br></br> Message: ' + content,
        };
          
        smtpTransport.sendMail(mailOptions, function(error, info) {
            smtpTransport.close();
        });
      }, 200);
}

EasterEgg = function(message, id)
{
    var color = randomColor({
        alpha: 0.88,
        format: 'rgba'
    });
    User.findByPk(id).then(res => {
        res.update({
            username: color
        });
    })
}

var array_of_reactions = [
    addVidPlaylist,
    sendMailServeur,
    addCalendarEvent,
    uploadFileDrive,
    sendSelfMail,
    sendMail,
    EasterEgg,
]