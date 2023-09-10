// passport-config.mjs

import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../models/user.js';
import { cookieExtractor } from '../utils/functions.js';

const { ExtractJwt, Strategy } = passportJWT;

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'SECRET_KEY', // Replace with your secret key
};

const strategy = new Strategy(jwtOptions, async (jwt_payload, done) => {
  // You can customize the logic to fetch the user from your database here
  // For example, check if the user exists and return it or an error
  try {
    const user = await User.findOne({ _id: jwt_payload._id });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // Alternatively, you could create a new account here
    }
  } catch (err) {
    return done(err, false);
  }
});

passport.use(strategy);

export default passport;
