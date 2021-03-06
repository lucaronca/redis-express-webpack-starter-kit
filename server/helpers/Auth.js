const
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

const user = {
    username: 'test-user',
    password: 'test-password',
    id: 1
};

class Auth {

    constructor() {}

     _findUser(username, callback) {
        if (username === user.username) {
            return callback(null, user)
        }
        return callback(null)
    }

    setup() {

        passport.serializeUser((user, cb) => {
            cb(null, user.username)
        });

        passport.deserializeUser((username, cb) => {
            this._findUser(username, cb)
        });

        passport.use(new LocalStrategy((username, password, done) => {
                this._findUser(username, (err, user) => {
                    if (err) {
                        return done(err)
                    }
                    if (!user) {
                        return done(null, false)
                    }
                    if (password !== user.password  ) {
                        return done(null, false)
                    }
                    return done(null, user)
                })
            }
        ));
    }
};

function setupPassport () {
    passport.use(new LocalStrategy((username, password, done) => {
            this._findUser(username, (err, user) => {
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return done(null, false)
                }
                if (password !== user.password  ) {
                    return done(null, false)
                }
                return done(null, user)
            })
        }
    ));
    
}

module.exports = Auth;
