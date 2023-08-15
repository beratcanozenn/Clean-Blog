const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const app = express();

// DB Connection
mongoose
  .connect("mongodb://localhost/cleanblog-test-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Databaseye bağlandı"));

// Template Engine
app.set("view engine", "ejs");

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  const posts = await Post.find({});

  res.render("index", { posts });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/add_post", (req, res) => {
  res.render("add_post");
});

app.post("/posts", async (req, res) => {
  const { title, detail } = req.body;

  const post = new Post({
    title,
    detail,
  });

  await post
    .save()
    .then(() => console.log("Veri Eklendi"))
    .catch((err) => console.log("Veri eklenemedi. Hata = " + err));

  res.redirect("/");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} da çalışıyor..`);
});
