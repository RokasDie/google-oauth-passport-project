var express = require("express");
const passport = require("passport");
const query = require("../lib/query");
var router = express.Router();

query("SELECT NOW()", null, (err, rows, res) => {});

// auth login
router.get("/login", (req, res) => res.render("login", { user: req.user }));

// auth log out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// auth with google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// callback route for google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile/");
});

module.exports = router;
