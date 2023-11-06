SELECT *
FROM MarketProduce_tbl
    JOIN Produce_tbl ON MarketProduce_tbl.produce_id = Produce_tbl.id
    JOIN market_tbl on MarketProduce_tbl.market_id = Market_tbl.id;