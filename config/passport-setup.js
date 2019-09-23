const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const query = require("../lib/query");

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_API_CLIENT_ID,
      clientSecret: process.env.GOOGLE_API_SECRET
      // options for google strategy
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile._json.picture);
      query(
        'SELECT * FROM "Users" WHERE "GoogleId" = $1',
        [profile.id],
        (err, rows, res) => {
          if (rows.length === 1) {
            console.log("User already created");
            // Passing to passport.serializeUser function
            done(null, rows[0]);
          } else {
            // insert user if doesnt exsit
            const queryText =
              'INSERT INTO "Users" ("Username", "GoogleId", "Thumbnail") VALUES ($1, $2, $3) RETURNING "Id", "Username", "GoogleId"';
            const queryValues = [
              profile.displayName,
              profile.id,
              profile._json.picture
            ];
            query(queryText, queryValues, (err, rows, res) => {
              if (err) throw err;
              console.log("User created", rows);
              // Passing to passport.serializeUser function
              done(null, rows[0]);
            });
          }
        }
      );
    }
  )
);

passport.serializeUser((user, done) => {
  console.log(user);
  console.log("user serialized");
  done(null, user.Id);
});

passport.deserializeUser((id, done) => {
  const queryText = 'SELECT * FROM "Users" WHERE "Id" = $1';
  const queryValues = [id];
  query(queryText, queryValues, (err, rows, res) => {
    console.log("user deserialized");
    done(null, rows[0]);
  });
});
