const streamifier = require('streamifier'); 

const AppError = require('../error/error');
const knex = require('../../db/knexConfig');
const cloudinary = require('../../configs/cloudinary');

exports.uploadSingleRecordImage = async (req, res, next, dbTableName, tableName, rowId) => { //tableName = 'market', rowId = req.params.marketId
    const file = req.file;
    if (!file) return next(new AppError('No file uploaded', 404));
    try {
        const table = await knex.raw(`SELECT * FROM ${dbTableName} WHERE id = ${rowId}`);
        if (table[0].length < 1) return next(new AppError(`${tableName} not found`, 404));
        const targetTable= table[0][0];

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
            SET ${tableName}imageurl = '${ result.secure_url}', ${tableName}imageid = '${result.public_id}' 
            WHERE id = ${targetTable.id}
        `);
        if (updateRecordImageUrl[0].affectedRows !== 1) return next(new AppError(`${tableName} imageurl update failed`, 500));

        const record = await knex.raw(`SELECT * FROM ${dbTableName} WHERE id = ${rowId}`);

        return res.status(200).json({
            status: 'success',
            message: 'Image uploaded successfully',
            data: { [tableName]: record[0][0] }
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteRecordImage = async (req, res, next, dbTableName, tableName, rowPublicId) => {
    try {
        const table = await knex.raw(`SELECT * FROM ${dbTableName} WHERE ${tableName}imageid = '${rowPublicId}'`);
        if (table[0].length < 1) return next(new AppError(`No ${tableName} with public id found`, 404));
        const targetTable = table[0][0];

        await cloudinary.uploader.destroy(targetTable[`${tableName}imageid`], async (err, result) => {
            if (!err) {
                const updateRecordImageUrl = await knex.raw(`
                    UPDATE ${dbTableName} 
                    SET ${tableName}imageurl = '', ${tableName}imageid = '' 
                    WHERE id = ${targetTable.id}
                `);
                if (updateRecordImageUrl[0].affectedRows !== 1) return next(new AppError(`${tableName} imageurl update failed`, 500));

                const record = await knex.raw(`SELECT * FROM ${dbTableName} WHERE ${tableName}imageid = '${rowPublicId}'`);
                console.log('record ', record[0])

                return res.status(200).json({
                    status: 'success',
                    message:    `Deleted ${tableName} image from cloudinary`,
                    data: {
                        [ tableName ]: record[0][0],
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