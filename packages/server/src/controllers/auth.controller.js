const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");
const { User } = require("../models");

function signIn(req, res) {
  try {
    User.findOne({ email: req.body.email }, (error, user) => {
      if (error || !user) {
        res.status(404).json({ error, message: "User not found" });
      } else if (!user.authenticate(req.body.password)) {
        res.status(400).json({
          error,
          message: "Email and password don't match",
        });
      } else {
        const token = jwt.sign({ _id: user._id }, jwtSecret);
        res.cookie("t", token, { expire: new Date() + 9999 });

        res.status(200).json({
          token,
          user: { _id: user._id, name: user.name, email: user.email },
        });
      }
    });
  } catch (error) {
    res.status(400).json({ error, message: "Failed to sign in" });
  }
}

function signOut(_req, res) {
  res.clearCookie("t");
  res.status(200).json({ message: "Signed out" });
}

function hasAuthorization(req, res, next) {
  const authorized = req.auth && req.profile && req.profile._id == req.auth._id;
  if (!authorized) {
    res.status(403).json({ message: "User is not authorized" });
  }

  next();
}

const requireSignIn = expressJwt({
  secret: jwtSecret,
  userProperty: "auth",
  algorithms: ["HS256", "RS256"],
});

module.exports = {
  signIn,
  signOut,
  hasAuthorization,
  requireSignIn,
};
