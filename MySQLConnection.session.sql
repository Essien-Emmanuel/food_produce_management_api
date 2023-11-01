CREATE TABLE MarketProduce_tbl (
    produce_id INT NOT NULL UNSIGNED,
    market_id INT NOT NULL,
    price FLOAT,
    unit1 VARCHAR(20),
    unit2 VARCHAR(20),
    PRIMARY KEY(produce_id, market_id) -- FOREIGN KEY(produce_id) REFERENCES Produce_tbl(id) ON DELETE CASCADE,
    -- FOREIGN KEY(market_id) REFERENCES Market_tbl(id) ON DELETE CASCADE
);
-- DROP TABLE marketproduce_tbl;