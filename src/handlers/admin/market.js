const AppError = require('../error/error');

const knex = require('../../db/knexConfig');

exports.getMarkets = async (req, res, next) => {
    try {
        const markets = await knex.raw(`SELECT * FROM Market_tbl`);
        console.log('markets ', markets)
        if (markets[0].length < 1) return next(new AppError('No market found', 404));

        return res.status(200).json({
            status: 'success',
            message: 'Fetched all market successfully',
            data: { markets: markets[0] }
        })
    } catch (error) {
        next(error);
    }
}
