const knex = require('../../db/knexConfig');
const AppError = require('../error/error');


exports.getMarketProducesByUnit = async (req, res, next) => {
    const { stateId, countryId } = req.params;
    const { unit, produceId, marketId} = req.body;
    try {
        const marketProduce = await knex.raw(`
            SELECT  Produce_tbl.*, Market_tbl.*, MarketProduce_tbl.*  FROM MarketProduce_tbl
            JOIN Produce_tbl ON MarketProduce_tbl.produce_id = Produce_tbl.id
            JOIN market_tbl on MarketProduce_tbl.market_id = Market_tbl.id
            WHERE MarketProduce_tbl.produce_id = ${produceId} AND MarketProduce_tbl.market_id = ${marketId} AND MarketProduce_tbl.unit1 = '${unit.toLowerCase()}' OR MarketProduce_tbl.unit2 = '${unit}' 
            AND Market_tbl.StateId = ${stateId} AND Market_tbl.CountryId = ${countryId};
        `);
        if (marketProduce[0].length < 1) return next(new AppError(`No market produce  with unit in ${unit} found`, 404));

        return res.status(200).json({
            status: 'success',
            message: `fetched  Market Produces with unit in ${unit} successfully`,
            data: { marketProduce: marketProduce[0] }
        });
    } catch (error) {
        next(error);
    }
}

exports.getMarketProducesByState = async (req, res, next) => {
    const { countryId, stateId, produceId } = req.params;
    try {
        const marketProduce = await knex.raw(`
        SELECT Produce_tbl.*, Market_tbl.*,  MarketProduce_tbl.* FROM MarketProduce_tbl
        JOIN Produce_tbl ON MarketProduce_tbl.produce_id = Produce_tbl.id
        JOIN Market_tbl ON MarketProduce_tbl.market_id = Market_tbl.id
        WHERE MarketProduce_tbl.produce_id = ${produceId} AND Market_tbl.StateId = ${stateId} AND Market_tbl.CountryId = ${countryId};
        `);
        if (marketProduce[0].length < 1) return next(new AppError(`No market produce  with stateId ${stateId} and country id ${countryId} found`, 404));
        
        return res.status(200).json({
            status: 'success',
            message: `fetched  Market Produces with statedId ${stateId} and  country id ${countryId} successfully`,
            data: { marketProduce: marketProduce[0] }
        });
    } catch (error) {
        next(error);
    }
}
