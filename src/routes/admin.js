const express = require('express');
const multer = require('multer');

const adminProduceHandler = require('../handlers/admin/produce');
const adminMarketHandler = require('../handlers/admin/market');
const adminMarketProduceHandler = require('../handlers/admin/market-produce');
const adminSearchMarketProduceHandler = require('../handlers/admin/search-produce');

const router = express.Router();
const uploadImage = multer();

/** Produces */
router.get('/get-produces', adminProduceHandler.getAllProduce);

router.get('/get-produce/:produceId', adminProduceHandler.getProduce);

router.post('/add-produce', adminProduceHandler.addSingleProduce);

router.put('/update-produce/:produceId', adminProduceHandler.updateProduce);

router.put('/upload-single-produceimage/:produceId', uploadImage.single('image'), adminProduceHandler.uploadSingleProduceImage);

router.delete('/delete-single-produceimage/:publicId', adminProduceHandler.deleteProduceImage);

router.delete('/delete-produce/:produceId', adminProduceHandler.deleteProduce);


/** Market */
router.get('/get-markets', adminMarketHandler.getMarkets);

router.get('/get-market/:marketId', adminMarketHandler.getMarket);

router.post('/add-market/:countryId/:stateId/:lgaId', adminMarketHandler.addMarket);

router.put('/update-market/:marketId', adminMarketHandler.updateMarket);

router.put('/update-markettype-major/:marketId', adminMarketHandler.updateMarketType);

router.put('/upload-single-marketimage/:marketId', uploadImage.single('image'), adminMarketHandler.uploadSingleMarketImage);

router.delete('/delete-single-marketimage/:publicId', adminMarketHandler.deleteMarketImage);

router.delete('/delete-market/:marketId', adminMarketHandler.deleteMarket);


/** market produce */
router.get('/get-marketproduce-by-unit/:countryId/:stateId', adminSearchMarketProduceHandler.getMarketProducesByUnit);

router.get('/get-marketproduce-by-state/:countryId/:stateId/:produceId', adminSearchMarketProduceHandler.getMarketProducesByState);

router.get('/get-marketproduce-avg-price/:countryId/:stateId/:produceId', adminSearchMarketProduceHandler.getMarketProduceAvgPrice);

router.get('/get-marketproduces', adminMarketProduceHandler.getMarketProduces);

router.get('/get-marketproduce/:marketId/:produceId', adminMarketProduceHandler.getMarketProduce);

router.post('/add-marketproduce/:marketId/:produceId', adminMarketProduceHandler.addMarketProduce);

router.put('/update-marketproduce/:marketId/:produceId', adminMarketProduceHandler.updateMarketProduce);

router.delete('/delete-marketproduce/:marketId/:produceId', adminMarketProduceHandler.deleteMarketProduce);

module.exports = router;