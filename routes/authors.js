const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// Routes for all authors
router.get("/", async (req, res) => {
  const searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("../views/authors/index", {
      authors: authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// Routes for new authors
router.get("/new", (req, res) => {
  res.render("../views/authors/new", { author: new Author() });
});

// Routes for creating new authors
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    // res.redirect(`../views/authors/${newAuthor.id}`)
    res.redirect("/authors");
  } catch (error) {
    res.render("../views/authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
  //   author.save((err, newAuthor) => {
  //     if (err) {
  //       res.render("../views/authors/new", {
  //         author: author,
  //         errorMessage: "Error creating Author",
  //       });
  //     } else {
  //   res.redirect(`../views/authors/${newAuthor.id}`)
  //   res.redirect("../views/authors/index");
  //   //     }
  //   });
  //   res.render("../views/authors/index");
  //   res.send(req.body.name);
});

module.exports = router;

module.exports = router;
