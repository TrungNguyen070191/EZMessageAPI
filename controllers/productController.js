'use strict';
var jwt = require('jsonwebtoken'),
  jsonwebtoken = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  uuid = require('uuid'),
  config = require('../common/config'),
  errors = require('../common/errorMessage'),
  Helpers = require('../common/helpers'),
  ProductRepository = require('../repositories/productRepository'),
  productRepo = new ProductRepository(),
  multer = require('multer'),
  MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
  },
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error('Invalid mime type');
      if (isValid) {
        error = null;
      }
      cb(error, 'assets/images');
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(' ')
        .join('-');
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext);
    }
  }),
  cpUpload = multer({ storage: storage }).single('image');

// USING FOR server.js
exports.GetAllProducts = async function(req, res) {
  let products = await productRepo.GetAllAsync();
  if (!products) {
    res.end(errors.serverNotFound);
    return false;
  }
  res.end(JSON.stringify(products));
  console.log('Running GetAllProducts()');
  return true;
};

exports.GetProductDetail = async function(req, res) {
  let product = await productRepo.GetOneAsync(req.body.hash);
  if (!product) {
    res.end(errors.serverNotFound);
    return false;
  }
  res.end(JSON.stringify(product));
  console.log('Running GetProductDetail()');
  return true;
};

exports.GetProductByCategory = async function(req, res) {
  let products = await productRepo.GetManyAsync(req.body.hash);
  if (!products) {
    res.end(errors.serverNotFound);
    return false;
  }
  res.end(JSON.stringify(products));
  console.log('Running GetProductDetail()');
  return true;
};

exports.AddNewProduct = async function(req, res) {
  // Generate a v1 (time-based) id
  req.body.hash = uuid.v1();
  let result = await productRepo.AddNewAsync(req.body);
  if (!result) {
    res.end('Create new product is not working!');
    return false;
  }
  res.end(JSON.stringify(result));
  console.log('Running Create New Product');
  return true;
};

/**
 * Upload image
 */
exports.uploadImage = async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const imagePath = url + '/assets/images/' + req.file.filename;
  res.end(
    res.status(201).json({
      message: 'Image add success',
      imagePath: imagePath
    })
  );
  console.log('Running Upload Image()');
  return true;
};

exports.AddImageToDirectory = cpUpload;
