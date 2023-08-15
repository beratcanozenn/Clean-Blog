const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

const postComponent = require("./components/postComponent");
const pageComponent = require("./components/pageComponent");

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
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

// Routes
app.get("/", postComponent.getAllPosts);
app.get("/posts/:id", postComponent.getPost);
app.post("/posts", postComponent.createPost);
app.put("/posts/:id", postComponent.updatePost);
app.delete("/posts/:id", postComponent.deletePost);

app.get("/about", pageComponent.getAboutPage);
app.get("/add_post", pageComponent.getAddPage);
app.get("/posts/edit/:id", pageComponent.getEditPage);
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} da çalışıyor..`);
});
