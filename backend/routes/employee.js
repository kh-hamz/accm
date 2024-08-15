const express = require("express");
const router = express.Router();
const connect = require("../db");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "haroon152018@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const getId = require("../middleware/getId");

let db = connect.connect_to_db2();

router.post("/", getId, async (req, res) => {
  const empID = req.user;
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetEmployeeDetails('" + empID + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        const { Name, departmentName, jobPost, jobGrade, jobDuration } =
          result[0][0];
        res
          .status(200)
          .json({ Name, departmentName, jobPost, jobGrade, jobDuration });
      }
    );
  });
});

router.post("/photo", getId, async (req, res) => {
  const empID = req.user;
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetEmployeeDetails('" + empID + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "image/jpeg");
        const { photo } = result[0][0];
        res.status(200).send(photo);
      }
    );
  });
});

router.post("/monthlySalary", getId, async (req, res) => {
  const empID = req.user;
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetEmployeeMonthlySalaries('" + empID + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        const salaryArray = result[0];
        res.status(200).send({ salaryArray: salaryArray });
      }
    );
  });
});

router.post("/contract", getId, async (req, res) => {
  const empID = req.user;
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetEmployeeContractDetails('" + empID + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        const {
          contractStartDate,
          contractDuration,
          contractAmount,
          annualIncrement,
          annualLeaves,
          sickLeaves,
          pension,
        } = result[0][0];
        res.status(200).send({
          contractStartDate,
          contractDuration,
          contractAmount,
          annualIncrement,
          annualLeaves,
          sickLeaves,
          pension,
        });
      }
    );
  });
});

router.post("/fines", getId, async (req, res) => {
  const empID = req.user;
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetEmployeeFines('" + empID + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        const fineArray = result[0];
        res.status(200).send({ fineArray: fineArray });
      }
    );
  });
});

router.post("/bonuses", getId, async (req, res) => {
  const empID = req.user;
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetEmployeeBonuses('" + empID + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        const bonusArray = result[0];
        res.status(200).send({ bonusArray: bonusArray });
      }
    );
  });
});

router.post("/remainingLeaves", getId, async (req, res) => {
  const empID = req.user;
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetEmployeeLeavesInfo('" + empID + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        const { remainingLeaves, remainingSickLeaves } = result[0][0];
        res.status(200).send({ remainingLeaves, remainingSickLeaves });
      }
    );
  });
});

router.post("/Leaves", getId, async (req, res) => {
  const empID = req.user;
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetEmployeeLeaves('" + empID + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        const leavesArray = result[0];
        res.status(200).send({ leavesArray: leavesArray });
      }
    );
  });
});

router.post("/emailLeaves", getId, async (req, res) => {
  const empID = req.user;
  const date = req.header("starting-date");
  const duration = req.header("duration");
  const reason = req.header("reason");
  const subject = req.header("subject");
  let headMail;

  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetDepartmentHead('" + empID + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        const { depHead,employeeName } = result[0][0];
        db.query(
          "call GetEmployeeEmail('" + depHead + "')",
          function (error, result, fields) {
            if (error) return res.status(500).json(error);
            const { email } = result[0][0];
            headMail = email;
            db.query(
              "call GetEmployeeEmail('" + empID + "')",
              function (error, result, fields) {
                if (error) return res.status(500).json(error);
                const { email } = result[0][0];
                let text =
                  "I " +
                  employeeName +
                  " would like to request a leave starting from " +
                  date +
                  " lasting " +
                  duration +
                  " days due to this reason: " +
                  reason;
                const mailConfigurations = {
                  from: headMail,
                  to: email,
                  subject: subject,
                  text: text,
                };
                transporter.sendMail(
                  mailConfigurations,
                  function (error, info) {
                    if (error) return res.status(500).send(error);
                    res.status(200).json({email: "Email Sent Successfully"});
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});

router.post("/emailFines", getId, async (req, res) => {
  const empID = req.user;
  const fineId = req.header("fineId");
  const reason = req.header("reason");
  const subject = req.header("subject");
  let headMail;

  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetDepartmentHead('" + empID + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        const { depHead,employeeName } = result[0][0];
        db.query(
          "call GetEmployeeEmail('" + depHead + "')",
          function (error, result, fields) {
            if (error) return res.status(500).json(error);
            const { email } = result[0][0];
            headMail = email;
            db.query(
              "call GetEmployeeEmail('" + empID + "')",
              function (error, result, fields) {
                if (error) return res.status(500).json(error);
                const { email } = result[0][0];
                let text =
                  "I " +
                  employeeName +
                  " would like to request a fine withdrawl of a fine with id: " +
                  fineId +
                  " due to this reason: " +
                  reason;
                const mailConfigurations = {
                  from: email,
                  to: headMail,
                  subject: subject,
                  text: text,
                };
                transporter.sendMail(
                  mailConfigurations,
                  function (error, info) {
                    if (error) return res.status(500).send(error);
                    res.status(200).json({email: "Email Sent Successfully"});
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});

module.exports = router;
