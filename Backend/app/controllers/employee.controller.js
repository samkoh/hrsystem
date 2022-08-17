const db = require("../models");
const Employee = db.employees;

//Create and Save a new Employee
exports.create = (req, res) => {
    //Output Validation
    if (!req.body.name) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }
    //Create an Employee
    const employee = new Employee({
        name: req.body.name,
        loginId: req.body.loginId,
        salary: req.body.salary
    });

    //Save Employee in the database
    employee.save(employee).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Employee."
            });
        });
};

//Retrieve all Employees
exports.findAll = (req, res) => {
    const loginId = req.query.loginId;
    var condition = loginId ? { loginId: { $regex: new RegExp(loginId), $options: "i" } } : {};
    Employee.find(condition).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials"
            });
        });
};

//FInd a single Tutorial with an id
exports.findOne = (req, res) => {
    const loginId = req.params.id;
    Employee.findById(loginId)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Employee with Empid " + loginId });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Employee with Empid=" + loginId });
        });
};

//Update an Employee by the EmpID
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const loginId = req.params.id;
    Employee.findByIdAndUpdate(loginId, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot update Employee with EmpID=${loginId}. Maybe Employee was not found!`
            });
        } else res.send({ message: "Employee was updated successfully" });
    })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Employee with EmpID=" + loginId
            });
        });
};

//Delete an Employee
exports.delete = (req, res) => {
    const loginId = req.params.id;
    Employee.findByIdAndRemove(loginId)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Employee with EmpID=${loginId}. Maybe Employee was not found!`
                });
            } else {
                res.send({
                    message: "Employee was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Employee with EmpID=" + loginId
            });
        });
};

