const express = require('express');
const {drugsCtrl} = require('../controller/drugs');
const router = express.Router();

router.get("/drugs", drugsCtrl.viewDrugs);

router.get("/drug/:id", drugsCtrl.viewDrug);

router.post("/adddrugs", drugsCtrl.addDrug);

router.put("/editgeneric", drugsCtrl.editGeneric);

router.put("/addbrand", drugsCtrl.addBrand);

router.put("/editbrand", drugsCtrl.editBrand);

router.delete("/deletemanygenerics", drugsCtrl.deleteManyGenerics);

router.delete("/deleteonegeneric", drugsCtrl.deleteOneGeneric);

router.delete("/deleteonebrand", drugsCtrl.deleteOneBrand);

router.delete("/deletemanybrands", drugsCtrl.deleteManyBrands);



module.exports = router

