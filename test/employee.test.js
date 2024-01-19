const request = require("supertest");
const app = require("../index");
const { sequelize, Employee } = require("../config/dbconfig");

beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(async () => {
  await Employee.destroy({ truncate: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Employee API", () => {
  it("should create a new employee", async () => {
    const newEmployee = {
      name: "JohnDoe",
      dateOfBirth: new Date("1990-01-01"),
      age: 31,
      salary: 50000.0,
    };

    const response = await request(app)
      .post("/api/employees")
      .send(newEmployee);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(newEmployee.name);
    expect(response.body.dateOfBirth).toBe(
      newEmployee.dateOfBirth.toISOString()
    );
    expect(response.body.age).toBe(newEmployee.age);
    expect(response.body.salary).toBe(newEmployee.salary);
  });

  it("should get all employees", async () => {
    const employees = [
      {
        name: "JohnDoe",
        dateOfBirth: new Date("1990-01-01"),
        age: 31,
        salary: 50000.0,
      },
      {
        name: "JohnDoe",
        dateOfBirth: new Date("1990-01-01"),
        age: 26,
        salary: 60000.0,
      },
    ];

    await Employee.bulkCreate(employees);

    const response = await request(app).get("/api/employees");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("should get a single employee by ID", async () => {
    const newEmployee = {
      name: "JohnDoe",
      dateOfBirth: new Date("1990-01-01"),
      age: 31,
      salary: 50000.0,
    };

    const createdEmployee = await Employee.create(newEmployee);

    const response = await request(app).get(
      `/api/employees/${createdEmployee.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(newEmployee.name);
    expect(response.body.dateOfBirth).toBe(
      newEmployee.dateOfBirth.toISOString()
    );
    expect(response.body.age).toBe(newEmployee.age);
    expect(response.body.salary).toBe(newEmployee.salary);
  });

  it("should update an employee by ID", async () => {
    const newEmployee = {
      name: "JohnDoe",
      dateOfBirth: new Date("1990-01-01"),
      age: 31,
      salary: 50000.0,
    };

    const createdEmployee = await Employee.create(newEmployee);

    const updatedEmployeeData = {
      name: "DhruvJoshi",
      dateOfBirth: new Date("1991-01-01"),
      age: 30,
      salary: 55000.0,
    };

    const response = await request(app)
      .put(`/api/employees/${createdEmployee.id}`)
      .send(updatedEmployeeData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Employee updated successfully"
    );

    const updatedEmployee = await Employee.findByPk(createdEmployee.id);
    expect(updatedEmployee.name).toBe(updatedEmployeeData.name);
    expect(updatedEmployee.dateOfBirth.toISOString()).toBe(
      new Date(updatedEmployeeData.dateOfBirth).toISOString()
    );
    expect(updatedEmployee.age).toBe(updatedEmployeeData.age);
    expect(updatedEmployee.salary).toBe(updatedEmployeeData.salary);
  });

  it("should delete an employee by ID", async () => {
    const newEmployee = {
      name: "JohnDoe",
      dateOfBirth: new Date("1990-01-01"),
      age: 31,
      salary: 50000.0,
    };

    const createdEmployee = await Employee.create(newEmployee);

    const response = await request(app).delete(
      `/api/employees/${createdEmployee.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Employee deleted successfully"
    );

    const deletedEmployee = await Employee.findByPk(createdEmployee.id);
    expect(deletedEmployee).toBeNull();
  });
});
