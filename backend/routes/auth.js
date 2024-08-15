const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const connect = require("../db");
const jwt = require("jsonwebtoken");


let db = connect.connect_to_db();

const JWt = "Sougma Balls Bitch";

const salt = "$2b$10$FjjBRa6zvhpB0baOCILQw.";

router.post(
  "/",
  [
    body("username", "Username cannot be empty").isLength({min:2}),
    body("username", "Username cannot be longer than 50 characters").isLength({
      max: 50,
    }),
    body("password", "Password cannot be blank").isLength({min:2}),
    body("password", "Password cannot be longer than 50 characters").isLength({
      max: 50,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, salt);
    db.connect(function (error) {
      if (error) return res.status(500).json({ error });
      db.query(
        "call CheckAccount('" + username + "','" + hash + "')",
        function (error, result, fields) {
          if (error) return res.status(500).json({ error });
          const { empID, accountType } = result[0][0];
          let errors1 = [{msg:"Invalid Login credentials"}]
          if (empID == null)
            return res
              .status(400)
              .json({ errors: errors1 });
          const authtoken = jwt.sign(empID, JWt);
          res.status(200).json({authtoken, accountType });
        }
      );
    });
  }
);

module.exports = router;
