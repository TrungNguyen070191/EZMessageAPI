"use strict";
var uuid = require("uuid"),
  errors = require("../common/errorMessage"),
  CustomerRepository = require("../repositories/customerRepository"),
  customerRepo = new CustomerRepository();

// USING FOR server.js
exports.GetAllCustomers = async function(req, res) {
  let customers = await customerRepo.GetAllAsync();
  if (!customers) {
    res.status(500).json({
      status: 500,
      message: errors.serverNotFound
    });
    return false;
  }
  res.status(200).json({
    status: 200,
    message: "Fetching Customers successfully!",
    results: customers
  });
  console.log("Running GetAllCustomers()");
  return true;
};

exports.GetCustomerById = async function(req, res) {
  let customer = await customerRepo.GetOneAsync(req.body._id);
  if (!customer) {
    res.status(404).json({
      status: 404,
      message: errors.serverNotFound
    });
    return false;
  }
  res.status(200).json({
    status: 200,
    message: "Fetching Customer successfully!",
    results: customer
  });
  res.end(JSON.stringify(customer));
  console.log("Running GetCustomerById()");
  return true;
};

exports.AddNewCustomer = async function(req, res) {
  // Generate a v1 (time-based) id
  req.body.hash = uuid.v1();
  let result = await customerRepo.AddNewAsync(req.body);
  if (!result) {
    res.status(500).json({
      status: 500,
      message: "Create new customer is not working!"
    });
    return false;
  }
  res.status(201).json({
    status: 201,
    message: "Customer added successfully",
    result: {
      ...result,
      id: result._id
    }
  });
  console.log("Running Create New customer");
  return true;
};

exports.UpdateCustomer = async (req, res, next) => {
  let customer = await customerRepo.UpdateOneAsync(req.body);
  console.log(customer);
  if (customer.n <= 0) {
    res.status(401).json({
      status: 401,
      message: "Not authorized!"
    });
    return false;
  } else {
    res.status(200).json({
      status: 200,
      message: "Update successful!"
    });
  }
};

exports.GetCustomersByFilter = async function(req, res) {
  let customers = await customerRepo.GetManyAsync(req.body);
  if (!customers) {
    res.status(401).json({
      status: 401,
      message: "Not authorized!"
    });
    return false;
  }
  res.status(200).json({
    status: 200,
    message: "Fetching customer successfully!",
    results: customers
  });
  console.log("Running GetCustomersByFilter()");
  return true;
};
