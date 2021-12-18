const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT;

// DB:
const connectDB = require("./db/dbConnect");
const MongoStore = require("connect-mongo");
connectDB();

// Для обработки ошибок:
const createError = require("http-errors");

const logger = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const pgSessionStore = require("connect-pg-simple")(session);

// Импортируем routers
const authRouter = require("./routers/auth");
const entryRouter = require("./routers/entry");
const userRouter = require("./routers/user");
const mapRouter = require('./routers/map');



app.use(
  session({
    name: "sid",
    secret: process.env.STR,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 10,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_CONNECT }),
  })
);

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(methodOverride('_method'));

app.use('/auth', authRouter);
app.use('/entry', entryRouter);
app.use("/user", userRouter);
app.use('/map', mapRouter);

// Отлавливаем ошибки:
app.use((req, res, next) => {
  const error = createError(
    404,
    "Запрашиваемой страницы не существует на сервере."
  );
  next(error);
});
app.use((err, req, res, next) => {
  const appMode = req.app.get("env");
  let error;
  if (appMode === "development") {
    error = err;
  } else {
    error = {};
  }
  res.locals.message = err.message;
  res.locals.error = error;
  res.status(err.status || 500);
  res.end();
});

app.listen(port, () => {
  console.log(`server started PORT: ${port}`);
});
