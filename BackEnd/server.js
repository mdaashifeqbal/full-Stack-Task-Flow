const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

require("./config/mongoose-connect");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("All set Aashif you are a best backend engineer");
});

app.use("/api/autheCheck",require("./routes/protected-route"));
app.use("/api/user", require("./routes/user-routes"));
app.use("/api/notes", require("./routes/notes-routes"));

const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(`server is running on http://127.0.0.1:${PORT}`);
});
