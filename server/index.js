const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

let aEmail = "levitation@levitation.in";
let aPass = "levitation";

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const isAuthenticated = email === aEmail && password === aPass;

  if (isAuthenticated) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ error: "Authentication failed" });
  }
});

app.post("/auth/chaPass", (req, res) => {
  const { email, password } = req.body;

  if (email === aEmail) {
    aPass = password;
    res.status(200).json({ message: "Password Changed Successfully" });
  } else {
    res.status(401).json({ message: "Invalid Email ID" });
  }
});

app.post("/form", (req, res) => {
  const data = req.body;
  if (data) {
    console.log(data);
    res.status(200).json({ message: "Data received successfully" });
  } else {
    res.status(500).json({ message: "Failed to receive data" });
  }
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
