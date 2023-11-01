const express = require('express');
const multer = require('multer');

const adminProduceHandler = require('../handlers/admin/produce');

const router = express.Router();
const uploadImage = multer();

router.get('/get-produces', adminProduceHandler.getAllProduces);

router.post('/add-produce', adminProduceHandler.addSingleProduce);

router.put('/update-produce/:produceId', adminProduceHandler.updateProduce);

router.put('/upload-single-produceimage/:produceId', uploadImage.single('image'), adminProduceHandler.uploadProduceImage)

module.exports = router;