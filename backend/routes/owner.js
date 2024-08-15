const express = require("express");
const router = express.Router();
const connect = require("../db");
const getId = require("../middleware/getId");

let db = connect.connect_to_db();

router.post("/transactions", async (req, res) => {
  db.connect(function (error) {
    if (error) return res.status(500).json(error);
    db.query(
      "call GetAllTransactions( )",
      function (error, result, fields) {
        if (error) return res.status(500).json(error);
        res.setHeader("Content-Type", "application/json");
        const transactionsArray = result[0];
        res.status(200).json({ transactionsArray });
      }
    );
  });
});

router.post("/contracts", getId,async (req, res) => {
    const empId = req.user;
    db.connect(function (error) {
      if (error) return res.status(500).json(error);
      db.query(
        "call GetEmployeeContractInfo('"+empId+"')",
        function (error, result, fields) {
          if (error) return res.status(500).json(error);
          res.setHeader("Content-Type", "application/json");
          const contractArray = result[0];
          res.status(200).json({ contractArray });
        }
      );
    });
  });

  router.post("/contractsVendors",async (req, res) => {
    db.connect(function (error) {
      if (error) return res.status(500).json(error);
      db.query(
        "call GetVendorContractInfo()",
        function (error, result, fields) {
          if (error) return res.status(500).json(error);
          res.setHeader("Content-Type", "application/json");
          const vendorContracts = result[0];
          res.status(200).json({ vendorContracts });
        }
      );
    });
  });

  router.post("/profit",async (req, res) => {
    db.connect(function (error) {
      if (error) return res.status(500).json(error);
      db.query(
        "call GetOverallProfit()",
        function (error, result, fields) {
          if (error) return res.status(500).json(error);
          res.setHeader("Content-Type", "application/json");
          const {OverallProfit,MostProfitableDepartment,LeastProfitableDepartment} = result[0][0];
          res.status(200).json({OverallProfit,MostProfitableDepartment,LeastProfitableDepartment});
        }
      );
    });
  });

  router.post("/departmentProfits", async (req, res) => {
    db.connect(function (error) {
      if (error) return res.status(500).json(error);
      db.query(
        "call GetDepartmentTransactionAmounts( )",
        function (error, result, fields) {
          if (error) return res.status(500).json(error);
          res.setHeader("Content-Type", "application/json");
          const profitsArray = result[0];
          res.status(200).json({ profitsArray });
        }
      );
    });
  });

  router.post("/deletedFines", async (req, res) => {
    db.connect(function (error) {
      if (error) return res.status(500).json(error);
      db.query(
        "call GetAllFinesDeletedInfo( )",
        function (error, result, fields) {
          if (error) return res.status(500).json(error);
          res.setHeader("Content-Type", "application/json");
          const fines = result[0];
          res.status(200).json({ fines });
        }
      );
    });
  });

  router.post("/allFines", async (req, res) => {
    db.connect(function (error) {
      if (error) return res.status(500).json(error);
      db.query(
        "call GetAllFinesInfo( )",
        function (error, result, fields) {
          if (error) return res.status(500).json(error);
          res.setHeader("Content-Type", "application/json");
          const fines = result[0];
          res.status(200).json({ fines });
        }
      );
    });
  });

  router.post("/salaries", async (req, res) => {
    db.connect(function (error) {
      if (error) return res.status(500).json(error);
      db.query(
        "call GetAllCurrentMonthSalaries( )",
        function (error, result, fields) {
          if (error) return res.status(500).json(error);
          res.setHeader("Content-Type", "application/json");
          const fineArray = result[0];
          res.status(200).json({ fineArray });
        }
      );
    });
  });

module.exports = router