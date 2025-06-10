
const debug = require('debug')('app:products-controller');
const { ProductsServices } = require('./services');
const { Response } = require('../common/response');
const { createError } = require('http-errors');

module.exports.ProductsController = {
    getProducts: async (req, res) => {
        try {
            let products = await ProductsServices.getAll();
            Response.success(res, 200, 'Products found successfully', products);
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },
    getProduct: async(req, res) => {
        try {
            const { params: { id } } = req;
            const product = await ProductsServices.getById(id);
            if (!product) {
                Response.error(res, createError.NotFound());
                return;
            }
            Response.success(res, 200, 'Product found successfully', product);
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },
    createProduct: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
                return;
            }
            const insertedId = await ProductsServices.create(body);
            Response.success(res, 201, 'Product created successfully', { id: insertedId });
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },
    updateProduct: (req, res) => {
        try {
            const { body } = req;
            const { params: { id } } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
                return;
            }
            
            ProductsServices.update(id, body);
            Response.success(res, 200, 'Product updated successfully');
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },
    deleteProduct: (req, res) => {
        try {
            const { params: { id } } = req;
            ProductsServices.remove(id);
            Response.success(res, 200, 'Product deleted successfully');
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    },

    generateReport: async (req, res) => {
        try {
            // const { params: { name } } = req;
            await ProductsServices.generateReport('Inventario', res);
        } catch (error) {
            debug(error);
            Response.error(res, error);
        }
    }
}