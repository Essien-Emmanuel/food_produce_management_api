const AppError = require('../error/error');
const knex = require('../../db/knexConfig');

exports.addMarketProduce = async (req, res, next) => {
    const { produceId, marketId } = req.params;
    const { price, unit1, unit2, produceDescription} = req.body;
    try {
        const marketProduce = await knex.raw(`SELECT * FROM MarketProduce_tbl WHERE produceId = '${produceId}' AND marketId = ${marketId};`);
        if (marketProduce[0].length > 0) return next(new AppError('Market Prouce already exist', 422));

        await knex.raw(`
            INSERT INTO MarketProduce_tbl(produceId, marketId, price, unit1, unit2, producedescription)
            VALUES(${produceId}, ${marketId}, ${price}, '${unit1}', '${unit2}', '${produceDescription}');
        `);

        const mktProd = await knex.raw(`SELECT * FROM MarketProduce_tbl WHERE produceId = '${produceId}' AND marketId = ${marketId};`);

        return res.status(200).json({
            status: 'success',
            message: 'Added a new market produce successfully',
            data: { newMarket: mktProd[0] }
        });
    } catch (error) {
        next(error);
    }
}

exports.updateMarketProduce = async (req, res, next) => {
    const {produceId, marketId} = req.params.marketId
    const reqObject = req.body;
    try {
        const marketProduce = await knex.raw(`SELECT * FROM MarketProduce_tbl WHERE produceId = '${produceId}' AND marketId = ${marketId};`);;
        if (marketProduce[0].length < 1) return next(new AppError('MarketProduce not found', 404));
        const marketProduceObject = marketProduce[0][0];

        for (const field in reqObject) {
            if (typeof reqObject[`${field}`] === 'string' || reqObject[`${field}`] instanceof String) {
                marketProduceObject[field] = reqObject[`${field}`].toLowerCase();
            } else {
                marketProduceObject[field] = reqObject[`${field}`];
            }
        }

        const updateMarketProduce = await knex('MarketProduce_tbl').update(marketProduceObject).where('id', marketId);
        if (updateMarketProduce !== 1) return next(new AppError('Market Produce updated failed', 500));

        return res.status(200).json({
            status: 'success',
            message: 'An existing market produce updated successfully',
            data: { updatedMarketProduce: marketProduce[0][0]}
        });
    } catch (error) {
        next(error);
    }
}