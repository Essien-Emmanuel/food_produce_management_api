const streamifier = require('streamifier'); 

const AppError = require('../error/error');
const knex = require('../../db/knexConfig');
const cloudinary = require('../../configs/cloudinary');
const { uploadSingleRecordImage, deleteRecordImage } = require('./common');

exports.getMarkets = async (req, res, next) => {
    try {
        const markets = await knex.raw(`SELECT * FROM Market_tbl;`);
        if (markets[0].length < 1) return next(new AppError('No market found', 404));

        return res.status(200).json({
            status: 'success',
            message: 'Fetched all market successfully',
            data: { markets: markets[0] }
        });
    } catch (error) {
        next(error);
    }
}

exports.getMarket = async (req, res, next) => {
    try {
        const market = await knex.raw(`SELECT * FROM Market_tbl WHERE id = ${req.params.marketId}`);
        if (market[0].length < 1) return next(new AppError('Market not found', 404));

        return res.status(200).json({
            status: 'success', 
            message: 'Fetched single Market record successfully',
            data: { market: market[0] }
        })
    } catch (error) {
        next(error);
    }
}

exports.addMarket = async (req, res, next) => {
    const { lgaId, stateId, countryId } = req.params;
    const { name, size, address, description} = req.body;
    try {
        const market = await knex.raw(`SELECT market_tbl.id FROM Market_tbl WHERE market_tbl.name = '${name}';`);
        if (market[0].length > 0) return next(new AppError('Market already exist', 422));

        await knex.raw(`
            INSERT INTO Market_tbl(name, size, address, description, LgaId, StateId, CountryId)
            VALUES('${name}', ${size}, '${address}', '${description}', ${lgaId}, ${stateId}, ${countryId});
        `);

        const mkt = await knex.raw(`SELECT * FROM Market_tbl WHERE id = ${req.params.marketId}`);

        return res.status(200).json({
            status: 'success',
            message: 'Added a new market successfully',
            data: { newMarket: mkt[0] }
        });
    } catch (error) {
        next(error);
    }
}

exports.updateMarket = async (req, res, next) => {
    const marketId = req.params.marketId
    const reqObject = req.body;
    try {
        const market = await knex.raw(`SELECT * FROM Market_tbl WHERE id = ${marketId}`);
        if (market[0].length < 1) return next(new AppError('Market not found', 404));
        const marketObject = market[0][0];

        for (const field in reqObject) {
            if (typeof reqObject[`${field}`] === 'string' || reqObject[`${field}`] instanceof String) {
                marketObject[field] = reqObject[`${field}`].toLowerCase();
            } else {
                marketObject[field] = reqObject[`${field}`];
            }
        }

        const updateMarket = await knex('Market_tbl').update(marketObject).where('id', marketId);
        if (updateMarket !== 1) return next(new AppError('Market updated failed', 500));

        return res.status(200).json({
            status: 'success',
            message: 'An existing market updated successfully',
            data: { updatedProduce: market[0][0]}
        });
    } catch (error) {
        next(error);
    }
}

exports.uploadSingleMarketImage = async (req, res, next) => {
    const dbTableName = 'Market_tbl';
    const tableName = 'market';
    const rowId = req.params?.marketId
    uploadSingleRecordImage(req, res, next, dbTableName, tableName, rowId);

    // const file = req.file;
    // if (!file) return next(new AppError('No file uploaded', 404));
    // try {
    //     const market = await knex.raw(`SELECT * FROM Market_tbl WHERE id = ${req.params.marketId}`);
    //     if (market[0].length < 1) return next(new AppError('Market not found', 404));
    //     const targetMarket = market[0][0];

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

    //     const updateMarketImageUrl = await knex.raw(`
    //         UPDATE market_tbl 
    //         SET marketimageurl = '${ result.secure_url}', marketimageid = '${result.public_id}' 
    //         WHERE id = ${targetMarket.id}
    //     `);
    //     if (updateMarketImageUrl[0].affectedRows !== 1) return next(new AppError('Market imageurl update failed', 500));

    //     const mkt = await knex.raw(`SELECT * FROM Market_tbl WHERE id = ${req.params.marketId}`);

    //     return res.status(200).json({
    //         status: 'success',
    //         message: 'Image uploaded successfully',
    //         data: { market: mkt[0][0] }
    //     })
    // } catch (error) {
    //     next(error)
    // }
}


exports.updateMarketType = async (req, res, next) => {
    try {
        const market = await knex.raw(`SELECT * FROM Market_tbl WHERE id = ${req.params.marketId}`);
        if (market[0].length < 1) return next(new AppError('Market not found', 404));
        const targetMarket = market[0][0];

        const updateMarketType = await knex.raw(`
            UPDATE Market_tbl 
            SET type = 'major' 
            WHERE id = ${targetMarket.id}
        `);
        if (updateMarketType[0].affectedRows !== 1) return next(new AppError('Market type update failed', 500));

        const mkt = await knex.raw(`SELECT * FROM Market_tbl WHERE id = ${req.params.marketId}`);

        return res.status(200).json({
            status: 'success',
            message: 'Market type set to major successfully',
            data: { market: mkt[0][0] }
        })
    } catch (error) {
        next(error);
    }
}

exports.deleteMarketImage = async (req, res, next) => {
    const dbTableName = 'Market_tbl';
    const tableName = 'market';
    const rowPublicId = req.params.publicId
    deleteRecordImage(req, res, next, dbTableName, tableName, rowPublicId)
    // try {
    //     const market = await knex.raw(`SELECT * FROM Market_tbl WHERE marketimageid = '${req.params.publicId}'`);
    //     if (market[0].length < 1) return next(new AppError('No Market with public id found', 404));
    //     const targetMarket= market[0][0];

    //     await cloudinary.uploader.destroy(targetMarket.marketimageid, async (err, result) => {
    //         if (!err) {
    //             const updateMarketImageUrl = await knex.raw(`
    //                 UPDATE Market_tbl 
    //                 SET marketimageurl = '', marketimageid = '' 
    //                 WHERE id = ${targetMarket.id}
    //             `);
    //             if (updateMarketImageUrl[0].affectedRows !== 1) return next(new AppError('Market imageurl update failed', 500));

    //             const mkt = await knex.raw(`SELECT * FROM Market_tbl WHERE marketimageid = '${req.params.publicId}'`);

    //             return res.status(200).json({
    //                 status: 'success',
    //                 message: 'Deleted image from cloudinary',
    //                 data: {
    //                     result: await result,
    //                     market: mkt[0][0]
    //                 }
    //             });
    //         }
    //         return next(new AppError('Could not delete image from cloudinary due to poor network', 500))
    //     });
    // } catch(error) {
    //     next(error);
    // }
}

exports.deleteMarket = async (req, res, next) => {
    try {
        const market = await knex.raw(`SELECT * FROM Market_tbl WHERE id = ${req.params.marketId}`);
        if (market[0].length < 1) return next(new AppError('Market not found', 404));
        const targetMarket = market[0][0];

        const deletedMarket = await knex.raw(`DELETE FROM Market_tbl WHERE id = ${targetMarket.id}`);
        if (deletedMarket[0].affectedRows !== 1) return next(new AppError('Market could not be deleted', 500))

        if (!targetMarket.marketimageid) return res.status(200).json({
            status: "success",
            message: "deleted an existing Market",
            data: {
                items_deleted: targetMarket,
            },
        }); 

        await cloudinary.uploader.destroy(targetMarket.marketimageid, async (error, result) => {
            if (error) return next(new AppError('Poor network', 400)); 

            return res.status(200).json({
                status: "success",
                message: "deleted an existing Market and image file from cloudinary",
                data: {
                    items_deleted: targetMarket,
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