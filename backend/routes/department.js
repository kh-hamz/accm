const express = require("express");
const router = express.Router();
const connect = require("../db");
const getId = require("../middleware/getId");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "haroon152018@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

let db = connect.connect_to_db3();

router.post("/fines", getId, async (req, res) => {
  const empId = req.user;
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetFinesInDepartment('" + empId + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        const fineArray = result[0];
        res.status(200).json({ fineArray });
      }
    );
  });
});

router.post("/salaries", getId, async (req, res) => {
  const empId = req.user;
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetCurrentMonthSalariesInSameDepartment('" + empId + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        const fineArray = result[0];
        res.status(200).json({ fineArray });
      }
    );
  });
});

router.post("/removeFines", async (req, res) => {
  const fineId = req.header("fineId");
  const reason = req.header("reason");
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call DeleteFineAndLog('" + fineId + "','" + reason + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ mssg: "Deleted Successfully" });
      }
    );
  });
});

router.post("/addFine", async (req, res) => {
  const salaryId = req.header("salaryId");
  const reason = req.header("reason");
  const fineType = req.header("fineType");
  const fineAmount = req.header("fineAmount");
  if (
    reason === undefined ||
    fineType === undefined ||
    fineAmount === undefined
  )
    return res
      .status(500)
      .json({ error: "No field can be empty fill required fields first" });
  db.connect(function (error) {
    if (error) return res.status(500).json({ error });
    db.query(
      "call AddFine('" +
        salaryId +
        "','" +
        reason +
        "','" +
        fineType +
        "','" +
        fineAmount +
        "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ mssg: "Fine Added Successfully" });
      }
    );
  });
});

router.post("/vendors", getId, async (req, res) => {
  const empId = req.user;
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetVendorsInCurrentDepartment('" + empId + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        const VendorsArray = result[0];
        res.status(200).json({ VendorsArray });
      }
    );
  });
});

router.post("/unpaidTransactions", getId, async (req, res) => {
  const empId = req.user;
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetUnpaidTransactionDues('" + empId + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        const unpaidDuesArray = result[0];
        res.status(200).json({ unpaidDuesArray });
      }
    );
  });
});

router.post("/emailVendors", getId, async (req, res) => {
  const empID = req.user;
  const headEmail = req.header("vendor-email");
  const transactionAmount = req.header("transaction-amount");
  const transactionDate = req.header("transaction-date");
  const subject = req.header("subject");
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetEmployeeEmail('" + empID + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        const { email } = result[0][0];
        const mailConfigurations = {
          from: email,
          to: headEmail,
          subject: subject,
          text:
            "Your payment of amount " +
            transactionAmount +
            " is pending to Meat Masters in a transaction initiated at date " +
            transactionDate +
            " kindly pay the required amount in a timely manner. If you have paid the transaction kindly reply to this email with a screenshot of the payment",
        };
        transporter.sendMail(mailConfigurations, function (error, info) {
            if (error) return res.status(500).send(error);
            res.status(200).json({ email: "Email Sent Successfully" });
          });
      }
    );
  });
});

router.post("/getTransactions", getId, async (req, res) => {
  const empId = req.user;
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetDepartmentTransactions('" + empId + "')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        const transactionsArray = result[0];
        res.status(200).json({ transactionsArray });
      }
    );
  });
});

router.post("/addTransactions", getId, async (req, res) => {
  const empId = req.user;
  const transactionAmount = req.header("transaction-amount");
  const vendorId = req.header("vendorId");
  let paid = req.header("paid");
  paid = (paid==="yes") ? 1:0;
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call AddTransaction('" + empId + "','"+transactionAmount+"','"+vendorId+"','"+paid+"')",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({mssg:"Transaction added sucessfully"});
      }
    );
  });
});

module.exports = router;
