import passport from 'passport';
import  LocalStrategy  from 'passport-local';
import  GitHubStrategy  from 'passport-github2';
import userService from '../models/user.js';
import { createHash, isValidPassword } from '../utils.js';

const initializePassport = () => {
  passport.use('login', new LocalStrategy(
    { usernameField: 'email' },
    async (email, password,profile, done) => {
      try {
        console.log(profile);
        const user = await userService.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }
            if (!isValidPassword(user, password)) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }
            // Verifica las credenciales del administrador
            if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                user.role = 'admin';
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

  passport.use('github', new GitHubStrategy({
    clientID: "Iv23li4KnTef54WYz6rG",
    clientSecret: "581585b793446cf127be0c24e4d779a07c8cf549",
    callbackURL: "http://localhost:8080/api/sessions/githubcallback"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await userService.findOne({ email: profile._json.email });
      if (!user) {
        let newUser = {
          first_name: profile._json.name,
          last_name: "",
          age: 20,
          email: profile._json.email,
          password: ""
        };
        let result = await userService.create(newUser);
        return done(null, result);
      } else {
        return done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userService.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

export default initializePassport;

