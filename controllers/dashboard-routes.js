//require express router
const router = require("express").Router();
//require sequelize
const sequelize = require("../config/connection");
//post model
const { Post } = require("../models/");
// with auth middleware
const withAuth = require("../utils/auth");

//get all posts for dashboard
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("all-posts-admin", {
      posts,
    });
  } catch (err) {
    console.log(err);
    res.redirect("login");
  }
});
//new post
router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {});
});
//edit post
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (postData) {
      const post = postData.get({ plain: true });
      res.render("edit-post", {
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});
//export
module.exports = router;
