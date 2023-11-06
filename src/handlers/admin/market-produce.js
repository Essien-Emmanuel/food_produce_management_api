const AppError = require('../error/error');
const knex = require('../../db/knexConfig');

exports.getMarketProduces = async (req, res, next) => {
    try {
        const marketProduces = await knex.raw(`
            SELECT  Produce_tbl.*, Market_tbl.*, MarketProduce_tbl.*  FROM MarketProduce_tbl
            JOIN Produce_tbl ON MarketProduce_tbl.produce_id = Produce_tbl.id
            JOIN market_tbl on MarketProduce_tbl.market_id = Market_tbl.id;
        `);
        if (marketProduces[0].length < 1) return next(new AppError('No market produce found', 404));

        return res.status(200).json({
            status: 'success',
            message: 'fetched all Market Produce successfully',
            data: { marketProduces: marketProduces[0] }
        });
    } catch (error) {
        next(error);
    }
}

exports.getMarketProduce = async (req, res, next) => {
    const { marketId, produceId } = req.params;
    try {
        const marketProduce = await knex.raw(`
        SELECT  Produce_tbl.*, Market_tbl.*, MarketProduce_tbl.*  FROM MarketProduce_tbl
        JOIN Produce_tbl ON MarketProduce_tbl.produce_id = Produce_tbl.id
        JOIN market_tbl on MarketProduce_tbl.market_id = Market_tbl.id
        WHERE MarketProduce_tbl.market_id = ${marketId} AND MarketProduce_tbl.produce_id = ${produceId};
    `);
    if (marketProduce[0].length < 1) return next(new AppError('No market produce  with id found', 404));

    return res.status(200).json({
        status: 'success',
        message: 'fetched a single Market Produce successfully',
        data: { marketProduce: marketProduce[0] }
    });
    } catch (error) {
        next(error);
    }
}

exports.addMarketProduce = async (req, res, next) => {
    const { produceId, marketId } = req.params;
    const { price, unit1, unit2, produceDescription} = req.body;
    try {
        const marketProduce = await knex.raw(`SELECT * FROM MarketProduce_tbl WHERE produce_id = ${produceId} AND market_id = ${marketId};`);
        if (marketProduce[0].length > 0) return next(new AppError('Market Prouce already exist', 422));

        await knex.raw(`
            INSERT INTO MarketProduce_tbl(produce_id, market_id, price, unit1, unit2, producedescription)
            VALUES(${produceId}, ${marketId}, ${price}, '${unit1.toLowerCase()}', '${unit2.toLowerCase()}', '${produceDescription}');
        `);

        const mktProd = await knex.raw(`SELECT * FROM MarketProduce_tbl WHERE produce_id = ${produceId} AND market_id = ${marketId};`);

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
    const {produceId, marketId} = req.params?.marketId
    const reqObject = req.body;
    try {
        const marketProduce = await knex.raw(`SELECT * FROM MarketProduce_tbl WHERE produce_id = ${produceId} AND market_id = ${marketId};`);;
        if (marketProduce[0].length < 1) return next(new AppError('MarketProduce not found', 404));
        const marketProduceObject = marketProduce[0][0];

        for (const field in reqObject) {
            if (typeof reqObject[`${field}`] === 'string' || reqObject[`${field}`] instanceof String) {
                marketProduceObject[field] = reqObject[`${field}`].toLowerCase();
            } else {
                marketProduceObject[field] = reqObject[`${field}`];
            }
        }

        const updateMarketProduce = await knex('MarketProduce_tbl').update(marketProduceObject).where({produceId: produceId, 'marketId': marketId});
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

exports.deleteMarketProduce = async (req, res, next) => {
    const { produceId, marketId } = req.params;
    try {
        const marketProduce = await knex.raw(`SELECT * FROM MarketProduce_tbl WHERE produce_id = ${produceId} AND market_id = ${marketId};`);;
        if (marketProduce[0].length < 1) return next(new AppError('Market Produce not found', 404));
        const marketProduceObject = marketProduce[0][0];

        const deletedMarketProduce = await knex.raw(`DELETE FROM MarketProduce_tbl WHERE  produce_id = ${produceId} AND market_id = ${marketId};`);
        if (deletedMarketProduce[0].affectedRows !== 1) return next(new AppError('Market Produce could not be deleted', 500))

        console.log('deleted market produce ', deletedMarketProduce)

        return res.status(200).json({
            status: "success",
            message: "deleted an existing Produce",
            data: {
                items_deleted: marketProduceObject,
            },
        }); 
    } catch (error) {
        next(error);
    }
}