const { Employee } = require("../config/dbconfig");

const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const getEmployeeById = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const employee = await Employee.findByPk(employeeId);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const updateEmployeeById = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const [updatedRows] = await Employee.update(req.body, {
      where: { id: employeeId },
    });
    if (updatedRows === 1) {
      res.json({ message: "Employee updated successfully" });
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

const deleteEmployeeById = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const deletedRows = await Employee.destroy({
      where: { id: employeeId },
    });
    if (deletedRows === 1) {
      res.json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};
