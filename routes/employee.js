const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

  router.post(
    '/emp-login',
    async (req, res, next) => {
      passport.authenticate(
        'empLogin',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
  
              return next(error);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { _id: user._id, username: user.username, role:user.role };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');

                res.cookie('jwt',token);
  
                return res.json({ token });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
  );  
  
module.exports = router;