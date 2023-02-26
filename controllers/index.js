//require router
const router = require("express").Router();
//api routes
const apiRoutes = require("./api/");
//home routes
const homeRoutes = require("./home-routes.js");
//dashboard routes
const dashboardRoutes = require("./dashboard-routes.js");

//use api routes
router.use("/api", apiRoutes);
//use home routes
router.use("/", homeRoutes);
//use dashboard routes
router.use("/dashboard", dashboardRoutes);

router.use((req, res) => {
  res.status(404).end();
});

//export
module.exports = router;
