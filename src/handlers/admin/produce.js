const AppError = require('../error/error');
const knex = require('../../db/knexConfig');
const { convertColorNameToHex } = require('../../utils/helper-functions');

exports.getAllProduces = async (req, res, next) => {
    try {
        const produces = await knex.raw(`SELECT * FROM Product_tbl;`)
        if (produces[0].length < 1) return next(new AppError('No produce exist', 404));

        return res.status(200).json({
            status: 'success',
            message: 'getting all produces',
            data:  { produces: produces[0] } 
        }); 
    } catch (error) {
        next(error)
    }
}

exports.addSingleProduce = async (req, res, next) => {
    const { producename, color, unit1, unit2, conversionrate } = req.body
    try {
        const produce = await knex.raw(`
            SELECT * FROM Product_tbl
            WHERE Product_tbl.producename = '${producename}' AND Product_tbl.color = '${color}';
        `);
        if (produce[0].length > 0) return next(new AppError('Produce already exist', 422));

        const hexColor = convertColorNameToHex(color);

        const newProduce = await knex.raw(`
            INSERT INTO Product_tbl(producename, status, statusname, color, hexcolor, unit1, unit2, conversionrate)
            VALUES('${producename.toLowerCase()}', 1, 'Active', '${color.toLowerCase()}', '${hexColor}', '${unit1.toLowerCase()}', '${unit2.toLowerCase()}', ${conversionrate});
        `);
        if (newProduce[0].affectedRows !== 1) return next(new AppError('Produce not created', 500));

        return res.status(201).json({
            status: 'success',
            message: 'New produce added successfully',
            data: {
                newProduce: newProduce[0]
            }
        });
        
    } catch (error) {
        next(error)
    }
}

exports.updateProduce = async (req, res, next) => {
    const reqObject = req.body;
    const produceId = req.params.produceId
    try {
        const produce = await knex.raw(`SELECT * FROM Product_tbl WHERE id = '${produceId}';`);
        if (produce[0].length < 1) return next(new AppError('No produce found with produce id', 404));
        const produceObject = produce[0][0]
        
        for (const field in reqObject) {
            if (typeof reqObject[`${field}`] === 'string' || reqObject[`${field}`] instanceof String) {
                produceObject[field] = reqObject[`${field}`].toLowerCase()
                if (field === 'color'.toLowerCase()) {
                    produceObject['hexcolor'] = convertColorNameToHex(reqObject[`${field}`]) ?? '';
                }
            } else {
                produceObject[field] = reqObject[`${field}`];
            }
        }

        const updatedProduce = await knex('Product_tbl').update(produceObject).where('id', produceId);
        if (updatedProduce !== 1) return next(new AppError('Produce updated failed', 500));

        return res.status(200).json({
            status: 'success',
            message: 'An existing produce updated successfully',
            data: { updatedProduce: produce[0]}
        });
    } catch (error) {
        next(error);
    }
}