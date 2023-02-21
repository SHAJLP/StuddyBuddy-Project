//require path
const path = require("path");
//require controllers
const controllers = require("./controllers");
//require express
const express = require("express");
//require session
const session = require("express-session");
//require handlebars
const exphbs = require("express-handlebars");
//require helpers
const helpers = require("./utils/helpers");
//handlebars
const hbs = exphbs.create({ helpers });

//require sequelize
const sequelize = require("./config/connection");
//session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// session const
const sess = {
  secret: "Super secret secret",
  cookie: {
    // Session will expire in 10 minutes
    expires: 10 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//express app
const app = express();
//port
const PORT = process.env.PORT || 3001;

//handlebars app
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//session app
app.use(session(sess));
//express app
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//require routes
app.use(require("./controllers/"));

//listen sequelize sync
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
