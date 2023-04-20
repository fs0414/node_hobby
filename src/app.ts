import express, { Application, Request, Response } from "express";
export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./router/index"));

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

// passport

// const User = {
//   id: 1234,
//   username: "testUser",
//   password: "testPassword",
// };

// passport.use(
//   new LocalStrategy(function (username: string, password: string, done: any) {
//     if (username === User.username && password === User.password) {
//       return done(null, User);
//     }
//     return done(null, false, { message: "Invalid username or password" });
//   })
// );

// passport.serializeUser(function (user: any, done: any) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id: number, done: any) {
//   if (id === User.id) {
//     done(null, User);
//   } else {
//     done({ message: "User not found" }, null);
//   }
// });

// app.use(
//   require("express-session")({
//     secret: "mySecretKey",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// app.get("/passport", (_req: Request, res: Response) => {
//   return res.status(200).send({
//     message: "Hello passport",
//   });
// });

// app.get("/passport/login", (_req, res) => {
//   res.send(`
//     <h1>Login</h1>
//     <form method="POST" action="/passport/login">
//       <label for="username">Username:</label>
//       <input type="text" id="username" name="username" />
//       <br />
//       <label for="password">Password:</label>
//       <input type="password" id="password" name="password" />
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   `);
// });

// app.post(
//   "/passport/login",
//   passport.authenticate("local", {
//     successRedirect: "/passport",
//     failureRedirect: "/passport/login",
//   })
// );

// app.get("passport/logout", (req: any, res) => {
//   req.logout();
//   res.redirect("/");
// });
