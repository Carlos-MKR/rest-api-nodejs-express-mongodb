
const { ObjectId } = require('mongodb');
const { Database } = require('../database/index');
const { ProductsUtils } = require('./utils');

const COLLECTION = 'products';

const getAll = async() => {
    const collection = await Database(COLLECTION);
    return await collection.find().toArray();
}

const getById = async(id) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({ _id: new ObjectId(id) });
}

const create = async(product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const update = async(id, product) => {
    const collection = await Database(COLLECTION);
    return await collection.updateOne({ _id: new ObjectId(id) }, { $set: product });
}

const remove = async(id) => {
    const collection = await Database(COLLECTION);
    return await collection.deleteOne({ _id: new ObjectId(id) });
}

const generateReport = async(name, res) => {
    let products = await getAll();    
    ProductsUtils.excelGenerator(products, name ,res);
}

module.exports.ProductsServices = {
    getAll,
    getById,
    create,
    update,
    remove,
    generateReport
}