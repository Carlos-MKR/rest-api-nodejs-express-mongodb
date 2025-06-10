

const excelGenerator = (products, name, res) => {
    const xl = require('excel4node');

    products = products.map(product => {
        let id = product._id.toString();
        delete product._id;
        return{
            id,
            ...product
        }
    });

    let wb = new xl.Workbook();
    let ws = wb.addWorksheet('Inventario');

    for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < Object.keys(products[i]).length; j++) {
            ws.cell(i + 1, j + 1).string(Object.values(products[i])[j]);
        }
    }

    wb.write(`${name}.xlsx`, res);
}

module.exports.ProductsUtils = { excelGenerator }