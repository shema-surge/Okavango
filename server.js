const express = require("express");
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");

const swaggerDocs = require("./public/api-docs/swagger");

const { connectToMongo } = require("./utils/connectToMongo");
const { DB_NAME, DB_USERNAME, DB_PASSWORD, SESSION_SECRET, NODE_ENV } = process.env;

const app = express();
const port = process.env.PORT || 4500;

app.use(express.json());

swaggerDocs(app, process.env.PORT);

app.use(
  session({
    store: MongoStore.create({mongoUrl:`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ed9sx.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`}),
    saveUninitialized: false,
    resave: false,
    secret: SESSION_SECRET,
    rolling: true,
    cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 },
  })
);

app.use("/users", require("./routes/users"));
app.use("/courses", require("./routes/courses"));
app.use("/units", require("./routes/units"));
app.use("/fields",require("./routes/fields"))

app.get("/",(req,res)=>{
  res.json("Okavango is runninh")
})

connectToMongo();

app.listen(port, () => {
  if (NODE_ENV === "development") {
    console.log(`Okavango runnin, PORT: ${port}`);
  } else {
    console.log("Okavango is running");
  }
});
