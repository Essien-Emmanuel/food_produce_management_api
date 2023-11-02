const express = require('express');
const multer = require('multer');

const adminProduceHandler = require('../handlers/admin/produce');
const adminMarketHandler = require('../handlers/admin/market');

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

router.put('/upload-single-marketimage/:marketId', uploadImage.single('image'), adminMarketHandler.uploadSingleMarketImage);

router.delete('/delete-single-marketimage/:publicId', adminMarketHandler.deleteMarketImage);

router.delete('/delete-market/:marketId', adminMarketHandler.deleteMarket);


module.exports = router;