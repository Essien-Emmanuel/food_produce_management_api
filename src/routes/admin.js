const express = require('express');

const adminProduceHandler = require('../handlers/admin/produce');


const router = express.Router();

router.get('/get-produces', adminProduceHandler.getAllProduces);

router.post('/add-produce', adminProduceHandler.addSingleProduce);

router.put('/update-produce/:produceId', adminProduceHandler.updateProduce)

module.exports = router;