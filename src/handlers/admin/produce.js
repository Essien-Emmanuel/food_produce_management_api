const streamifier = require('streamifier'); 

const AppError = require('../error/error');
const knex = require('../../db/knexConfig');
const cloudinary = require('../../configs/cloudinary');
const { convertColorNameToHex } = require('../../utils/helper-functions');
const { uploadSingleRecordImage } = require('./common');

exports.getAllProduce = async (req, res, next) => {
    try {
        const produces = await knex.raw(`SELECT * FROM Produce_tbl;`)
        if (produces[0].length < 1) return next(new AppError('No produce exist', 404));

        return res.status(200).json({
            status: 'success',
            message: 'Fetched all produces successfully',
            data:  { produces: produces[0] } 
        }); 
    } catch (error) {
        next(error)
    }
}

exports.getProduce = async (req, res, next) => {
    try {
        const produce = await knex.raw(`SELECT * FROM Produce_tbl WHERE id = ${req.params.produceId}`);
        if (produce[0].length < 1) return next(new AppError('Produce not found', 404));

        return res.status(200).json({
            status: 'success', 
            message: 'Fetched single Produce record successfully',
            data: { produce: produce[0] }
        })
    } catch (error) {
        next(error);
    }
}

exports.addSingleProduce = async (req, res, next) => {
    const { producename, color, unit1, unit2, conversionrate } = req.body
    try {
        const produce = await knex.raw(`
            SELECT * FROM Produce_tbl
            WHERE Produce_tbl.producename = '${producename}' AND Produce_tbl.color = '${color}';
        `);
        if (produce[0].length > 0) return next(new AppError('Produce already exist', 422));

        const hexColor = convertColorNameToHex(color);

        const newProduce = await knex.raw(`
            INSERT INTO Produce_tbl(producename, status, statusname, color, hexcolor, unit1, unit2, conversionrate)
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
        const produce = await knex.raw(`SELECT * FROM Produce_tbl WHERE id = '${produceId}';`);
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

        const updatedProduce = await knex('Produce_tbl').update(produceObject).where('id', produceId);
        if (updatedProduce !== 1) return next(new AppError('Produce updated failed', 500));

        return res.status(200).json({
            status: 'success',
            message: 'An existing produce updated successfully',
            data: { updatedProduce: produce[0][0]}
        });
    } catch (error) {
        next(error);
    }
}

exports.uploadSingleProduceImage = async (req, res, next) => {
    const dbTableName = 'Produce_tbl';
    const tableName = 'produce';
    const rowId = req.params?.produceId
    uploadSingleRecordImage(req, res, next, dbTableName, tableName, rowId)

    // const file = req.file;
    // if (!file) return next(new AppError('No file uploaded', 404));
    // try {
    //     const produce = await knex.raw(`SELECT * FROM Produce_tbl WHERE id = ${req.params.produceId}`);
    //     if (produce[0].length < 1) return next(new AppError('Produce not found', 404));
    //     const targetProduce = produce[0][0];

    //     const imgBuffer = file.buffer;
    //     const streamUpload = new Promise((resolve, reject) => {
    //         const stream = cloudinary.uploader.upload_stream((err, result) => {
    //             if (result) resolve(result);
    //             else reject(result)
    //         });
    //         streamifier.createReadStream(imgBuffer).pipe(stream);
    //     });

    //     const result = await streamUpload;
    //     if (!result) return next(new AppError('getaddrinfo EAI_AGAIN api.cloudinary.com', -3001));

    //     const updateProduceImageUrl = await knex.raw(`
    //         UPDATE Produce_tbl 
    //         SET produceimageurl = '${ result.secure_url}', produceimageid = '${result.public_id}' 
    //         WHERE id = ${targetProduce.id}
    //     `);
    //     if (updateProduceImageUrl[0].affectedRows !== 1) return next(new AppError('Produce imageurl update failed', 500));

    //     const prod = await knex.raw(`SELECT * FROM Produce_tbl WHERE id = ${req.params.produceId}`);

    //     return res.status(200).json({
    //         status: 'success',
    //         message: 'Image uploaded successfully',
    //         data: { produce: prod[0][0] }
    //     });
    // } catch (error) {
    //     next(error)
    // }
}



exports.deleteProduceImage = async (req, res, next) => {
    const dbTableName = 'Produce_tbl';
    const tableName = 'produce';
    const rowPublicId = req.params.publicId
    deleteRecordImage(req, res, next, dbTableName, tableName, rowPublicId)
    // try {
    //     const produce = await knex.raw(`SELECT * FROM Produce_tbl WHERE produceimageid = '${req.params.publicId}'`);
    //     if (produce[0].length < 1) return next(new AppError('No Produce with public id found', 404));
    //     const targetProduce = produce[0][0];

    //     await cloudinary.uploader.destroy(targetProduce.produceimageid, async (err, result) => {
    //         if (!err) {
    //             const updateProduceImageUrl = await knex.raw(`
    //                 UPDATE Produce_tbl 
    //                 SET produceimageurl = '', produceimageid = '' 
    //                 WHERE id = ${targetProduce.id}
    //             `);
    //             if (updateProduceImageUrl[0].affectedRows !== 1) return next(new AppError('Produce imageurl update failed', 500));

    //             const prod = await knex.raw(`SELECT * FROM Produce_tbl WHERE produceimageid = '${req.params.publicId}'`);

    //             return res.status(200).json({
    //                 status: 'success',
    //                 message: 'Deleted image from cloudinary',
    //                 data: {
    //                     result: await result,
    //                     produce: prod[0][0]
    //                 }
    //             });
    //         }
    //         return next(new AppError('Could not delete image from cloudinary due to poor network', 500))
    //     });
    // } catch(error) {
    //     next(error);
    // }
}

exports.deleteProduce = async (req, res, next) => {
    try {
        const produce = await knex.raw(`SELECT * FROM Produce_tbl WHERE id = ${req.params.produceId}`);
        if (produce[0].length < 1) return next(new AppError('Produce not found', 404));
        const targetProduce = produce[0][0];

        const deletedProduce = await knex.raw(`DELETE FROM Produce_tbl WHERE id = ${targetProduce.id}`);
        if (deletedProduce[0].affectedRows !== 1) return next(new AppError('Produce could not be deleted', 500))

        if (!targetProduce.produceimageid) return res.status(200).json({
            status: "success",
            message: "deleted an existing Produce",
            data: {
                items_deleted: targetProduce,
            },
        }); 

        await cloudinary.uploader.destroy(targetProduce.produceimageid, async (error, result) => {
            if (error) return next(new AppError('Poor network', 400)); 

            return res.status(200).json({
                status: "success",
                message: "deleted an existing Produce and image file from cloudinary",
                data: {
                    items_deleted: targetProduce,
                    cloudinaryResult: {
                        result: await result
                    },
                },
            });
        });
    } catch(error) {
        next(error);
    }
}