const streamifier = require('streamifier'); 

const AppError = require('../error/error');
const knex = require('../../db/knexConfig');
const cloudinary = require('../../configs/cloudinary');

exports.uploadSingleRecordImage = async (req, res, next, dbTableName, recordName, rowId) => { //recordName = 'market', rowId = req.params.marketId
    const file = req.file;
    if (!file) return next(new AppError('No file uploaded', 404));
    try {
        const record = await knex.raw(`SELECT * FROM ${dbTableName} WHERE id = ${rowId}`);
        if (record[0].length < 1) return next(new AppError(`${recordName} not found`, 404));
        const targetRecord= record[0][0];

        const imgBuffer = file.buffer;
        const streamUpload = new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream((error, result) => {
                if (error) return next(new AppError('Error while streaming uploaded image', 500));
                if (result) resolve(result);
                else reject(result)
            });
            streamifier.createReadStream(imgBuffer).pipe(stream);
        });

        const result = await streamUpload;
        if (!result) return next(new AppError('getaddrinfo EAI_AGAIN api.cloudinary.com', -3001));

        const updateRecordImageUrl = await knex.raw(`
            UPDATE ${dbTableName} 
            SET ${recordName}imageurl = '${ result.secure_url}', ${recordName}imageid = '${result.public_id}' 
            WHERE id = ${targetRecord.id}
        `);
        if (updateRecordImageUrl[0].affectedRows !== 1) return next(new AppError(`${recordName} imageurl update failed`, 500));

        const retrievedRecord = await knex.raw(`SELECT * FROM ${dbTableName} WHERE id = ${rowId}`);

        return res.status(200).json({
            status: 'success',
            message: 'Image uploaded successfully',
            data: { [recordName]: retrievedRecord[0][0] }
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteRecordImage = async (req, res, next, dbTableName, recordName, rowPublicId) => {
    try {
        const record = await knex.raw(`SELECT * FROM ${dbTableName} WHERE ${recordName}imageid = '${rowPublicId}'`);
        if (record[0].length < 1) return next(new AppError(`No ${recordName} with public id found`, 404));
        const targetRecord = record[0][0];

        await cloudinary.uploader.destroy(targetRecord[`${recordName}imageid`], async (err, result) => {
            if (!err) {
                const updateRecordImageUrl = await knex.raw(`
                    UPDATE ${dbTableName} 
                    SET ${recordName}imageurl = '', ${recordName}imageid = '' 
                    WHERE id = ${targetRecord.id}
                `);
                if (updateRecordImageUrl[0].affectedRows !== 1) return next(new AppError(`${recordName} imageurl update failed`, 500));

                const retrievedRecord = await knex.raw(`SELECT * FROM ${dbTableName} WHERE ${recordName}imageid = '${rowPublicId}'`);

                console.log('record ', retrievedRecord[0]) //delete this log later

                return res.status(200).json({
                    status: 'success',
                    message:    `Deleted ${recordName} image from cloudinary`,
                    data: {
                        [ recordName ]: retrievedRecord[0][0],
                        result: await result,
                    }
                });
            }
            return next(new AppError('Could not delete image from cloudinary due to poor network', 500))
        });
    } catch(error) {
        next(error);
    }
}

exports.deleteRecord = async (req, res, next, dbTableName, recordName, rowId) => {
    try {
        const record = await knex.raw(`SELECT * FROM ${dbTableName} WHERE id = ${rowId}`);
        if (record[0].length < 1) return next(new AppError(`${recordName} not found`, 404));
        const targetRecord = record[0][0];

        const deletedRecord = await knex.raw(`DELETE FROM ${ dbTableName } WHERE id = ${targetRecord.id}`);
        if (deletedRecord[0].affectedRows !== 1) return next(new AppError(`${recordName} could not be deleted`, 500))

        if (!targetRecord[`${recordName}imageid`]) return res.status(200).json({
            status: "success",
            message: `deleted an existing ${recordName}`,
            data: {
                items_deleted: targetRecord,
            },
        }); 

        await cloudinary.uploader.destroy(targetRecord[`${recordName}imageid`], async (error, result) => {
            if (error) return next(new AppError('Poor network', 400)); 

            return res.status(200).json({
                status: "success",
                message: `deleted an existing ${recordName} and image file from cloudinary`,
                data: {
                    items_deleted: targetRecord,
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