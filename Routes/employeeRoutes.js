const express = require("express");
const employeeController = require("../Controller/employeeController");

const router = express.Router();

router.post("/employees", employeeController.createEmployee);

router.get("/employees", employeeController.getAllEmployees);

router.get("/employees/:id", employeeController.getEmployeeById);

router.put("/employees/:id", employeeController.updateEmployeeById);

router.delete("/employees/:id", employeeController.deleteEmployeeById);

module.exports = router;
