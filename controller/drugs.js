const mongoose = require("mongoose");
const Drugs = mongoose.model('Drugs');
const createDOMPurify = require('dompurify');
const {JSDOM} = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window)


const drugsCtrl = {
    
    viewDrugs: async(req, res)=>{
        try{
            const drugs = await Drugs.find({});
            res.status(200).json({status: true, msg: "Successfull", data: drugs})
        }
        catch(err){
            return res.status(500).json({status: false, msg: "Server error, please contact the admin"})
        }
    },

    addDrug: async(req, res)=>{
        try{
            const genericData = {
                category: DOMPurify.sanitize(req.body.category),
                genericName: DOMPurify.sanitize(req.body.genericName),
                moa: DOMPurify.sanitize(req.body.moa),
                indications: DOMPurify.sanitize(req.body.indications),
                sideEffects: DOMPurify.sanitize(req.body.sideEffects),
                dosage: DOMPurify.sanitize(req.body.dosage),
                composition: DOMPurify.sanitize(req.body.composition),
            }

            if(!genericData.category || !genericData.genericName){
                return res.status(400).json({status: false, msg: "Please fill all required fields"});
            }

            //purify the data before saving in database
            const newDrugs = new Drugs(genericData);
            
            await newDrugs.save();
            return res.status(200).json({status: true, msg: "A generic drug added"})
        }
        catch(err){
            return res.status(500).json({status: false, msg: "Server error! Please contact the admin"})
        }
    },

    viewDrug: async(req, res)=>{
        try{
            const {id} = req.params;
            const drugs = await Drugs.findOne({_id: id})
            return res.status(200).json({status: true, msg: "Successfull", data: drugs})
        }
        catch(err){
            return res.status(500).json({status: false, msg: "Server error! Please contact the admin"})
        }
    },

    editGeneric: async(req, res)=>{
        try{
            // const {id, type, editbrand} = req.params;
            const {genericid} = req.query;

            const genericData = {
                category: DOMPurify.sanitize(req.body.category),
                genericName: DOMPurify.sanitize(req.body.genericName),
                moa: DOMPurify.sanitize(req.body.moa),
                indications: DOMPurify.sanitize(req.body.indications),
                sideEffects: DOMPurify.sanitize(req.body.sideEffects),
                dosage: DOMPurify.sanitize(req.body.dosage),
                composition: DOMPurify.sanitize(req.body.composition),
            }
            
            //check if genericid exist in the url
            if(genericid){

                //check if id is mongoose valid id
                if(mongoose.isValidObjectId(genericid)){

                    //check if id exist in collections
                    const drugs = await Drugs.findById({_id: genericid});
                    if(!drugs){
                        return res.status(400).json({status: false, msg: "Invalid Generic ID"})
                    }else{
                        //logic here

                        //edit generic
                        if(!genericData.category || !genericData.genericName){
                            res.status(400).json({status: false, msg: "Please fill all required fields"});
                        }

                        await Drugs.findByIdAndUpdate({_id: genericid},
                            {
                                $set: genericData
                            },
                            {
                                new: true
                            }
                        );
                        return res.status(200).json({status: true, msg: "Edited successfully"})
                    }
                    
                }else{
                    return res.status(400).json({status: false, msg: "Invalid drug ID"})
                }
            }else{

                return res.status(400).json({status: false, msg: "Invalid operation! Check the URL?"})
            }
        }
        catch(err){
            return res.status(500).json({status: false, msg: "Server error! Please contact the admin"})
        }
    },

    addBrand: async(req, res)=>{
        try{
            const {genericid} = req.query;

            const brandData = {
                brandName: DOMPurify.sanitize(req.body.brandName),
                salesRepInfo: DOMPurify.sanitize(req.body.salesRepInfo),
                otherInfo: DOMPurify.sanitize(req.body.otherInfo),
                purchase_unitPrice: DOMPurify.sanitize(req.body.purchase_unitPrice),
                purchase_qty: DOMPurify.sanitize(req.body.purchase_qty),
                purchase_totalPrice: DOMPurify.sanitize(req.body.purchase_totalPrice),
                selling_wp: DOMPurify.sanitize(req.body.selling_wp),
                selling_rp: DOMPurify.sanitize(req.body.selling_rp)
            }

            if(isNaN(brandData.purchase_unitPrice)){
                return res.status(400).json({status: false, msg: "Unit price must be a number"});

            }else if(isNaN(brandData.purchase_qty)){
                return res.status(400).json({status: false, msg: "Quantity must be a number"});

            }else if(isNaN(brandData.purchase_totalPrice)){
                return res.status(400).json({status: false, msg: "Purchase total price must be a number"});

            }else if(isNaN(brandData.selling_wp)){
                return res.status(400).json({status: false, msg: "Whilesale price must be a number"});

            }else if(isNaN(brandData.selling_rp)){
                return res.status(400).json({status: false, msg: "Retail price must be a number"});
            }

            //check if genericid exist in the url
            if(genericid){

                //check if id is mongoose valid id
                if(mongoose.isValidObjectId(genericid)){

                    //check if id exist in collections
                    const drugs = await Drugs.findById({_id: genericid});
                    if(!drugs){
                        return res.status(400).json({status: false, msg: "Invalid Generic ID"});

                    }else{
                        //add brand
        
                        //find the drug with the id and push new data into the array
                        await Drugs.findByIdAndUpdate({_id: genericid},
                            {
                                $push: {brands: brandData}
                            }
                        );
                        
                        return res.status(200).json({status: true, msg: "A brand added"})
                    }
                    
                }else{
                    return res.status(400).json({status: false, msg: "Invalid drug ID"})
                }
            }else{

                return res.status(400).json({status: false, msg: "Invalid operation! Check the URL?"})
            }
        }
        catch(err){
            console.log(err.message)
            return res.status(500).json({status: false, msg: "Server error! Please contact the admin"})
        }
    },

    editBrand: async(req, res)=>{
        try{
            // const {id, type, editbrand} = req.params;
            const {genericid, brandid} = req.query;

            const brandData = {
                brandName: DOMPurify.sanitize(req.body.brandName),
                salesRepInfo: DOMPurify.sanitize(req.body.salesRepInfo),
                otherInfo: DOMPurify.sanitize(req.body.otherInfo),
                purchase_unitPrice: DOMPurify.sanitize(req.body.purchase_unitPrice),
                purchase_qty: DOMPurify.sanitize(req.body.purchase_qty),
                purchase_totalPrice: DOMPurify.sanitize(req.body.purchase_totalPrice),
                selling_wp: DOMPurify.sanitize(req.body.selling_wp),
                selling_rp: DOMPurify.sanitize(req.body.selling_rp)
            }

            if(isNaN(brandData.purchase_unitPrice)){
                return res.status(400).json({status: false, msg: "Unit price must be a number"});

            }else if(isNaN(brandData.purchase_qty)){
                return res.status(400).json({status: false, msg: "Quantity must be a number"});

            }else if(isNaN(brandData.purchase_totalPrice)){
                return res.status(400).json({status: false, msg: "Purchase total price must be a number"});

            }else if(isNaN(brandData.selling_wp)){
                return res.status(400).json({status: false, msg: "Whilesale price must be a number"});

            }else if(isNaN(brandData.selling_rp)){
                return res.status(400).json({status: false, msg: "Retail price must be a number"});
            }

            //check if genericid exist in the url
            if(genericid){

                //check if id is mongoose valid id
                if(mongoose.isValidObjectId(genericid) && mongoose.isValidObjectId(brandid)){

                    //check if id exist in collections
                    const drugs = await Drugs.findById({_id: genericid});
                    if(!drugs){
                        return res.status(400).json({status: false, msg: "Invalid Generic ID"});

                    }else{

                        //edit brand

                        //find the drug by id, find the particular brand from the brand arrays and edit
                        const result = await Drugs.findByIdAndUpdate({_id: genericid}, 
                            {
                                $set: {'brands.$[elem]': brandData}
                            },
                            {
                                arrayFilters: [{'elem._id': brandid}],
                                new: true
                            }
                        );
    
                        if(!result){
                            return res.status(400).json({status: false, msg: "Invalid drug ID"})
    
                        }else{
                            return res.status(200).json({status: true, msg: "Brand editted"});
                        }
                    }
                    
                }else{
                    return res.status(400).json({status: false, msg: "Invalid drug ID"})
                }
            }else{

                return res.status(400).json({status: false, msg: "Invalid operation! Check the URL?"})
            }
        }
        catch(err){
            return res.status(500).json({status: false, msg: "Server error! Please contact the admin"})
        }
    },

    deleteManyGenerics: async(req, res)=>{
        try{
            const {genericids} = req.query;

            //check to makesure the genericids is defined
            if(genericids){
                const idArray = genericids.split(',');
                const genericids_ = idArray.slice(0, idArray.length-1);

                //check to makesure the genericids is not empty
                if(genericids_.length > 0){

                    //check if all the id are mongoose valid id
                    const isValid = genericids_.every(id=>mongoose.isValidObjectId(id));
                    if(isValid){
                        
                        //remove all the fields with the ids
                        await Drugs.deleteMany({_id: genericids_});
                        return res.status(200).json({status: true, msg: "All the selected drugs have been deleted"});
                        
                    }else{
                        return res.status(400).json({status: false, msg: "Some or all the operations are not valid! Check the URL?"})
                    }
                }else{
                    return res.status(400).json({status: false, msg: "Invalid operation! Check the URL"})
                }
            }else{
                return res.status(400).json({status: false, msg: "Invalid operation! Check the URL"})
            }
        }
        catch(err){
            return res.status(500).json({status: false, msg: "Server error! Please contact the admin"})
        }
    },

    deleteOneGeneric: async(req, res)=>{
        try{
            const {genericid} = req.query;

            //check to makesure the genericids is defined
            if(genericid){

                //check if the id is a valid mongoose id
                const isValid = mongoose.isValidObjectId(genericid);
                if(isValid){
                    
                    //remove the field with the ids
                    await Drugs.deleteOne({_id: genericid});
                    return res.status(400).json({status: true, msg: "Deleted successfully"});
                    
                }else{
                    return res.status(400).json({status: false, msg: "Invalid operation! Check the URL"})
                }
            }else{
                return res.status(400).json({status: false, msg: "Invalid operation! Check the URL"})
            }
        }
        catch(err){
            return res.status(500).json({status: false, msg: "Server error! Please contact the admin"})
        }
    },

    deleteOneBrand: async(req, res)=>{
        try{
            const {genericid, brandid} = req.query;

            //check to makesure the genericids is defined
            if(genericid && brandid){

                //check if the id is a valid mongoose id
                const isValid = mongoose.isValidObjectId(genericid) && mongoose.isValidObjectId(brandid);
                if(isValid){
                    
                    //find the drug with the id and pull the data from the array
                    const result = await Drugs.findByIdAndUpdate({_id: genericid},
                        {
                            $pull: {brands: {_id: brandid}}
                        },
                        {
                            safe: true
                        }
                    );
                    res.status(200).json({status: true, msg: "Brand deleted successfully"})
                    
                }else{
                    return res.status(400).json({status: false, msg: "Invalid operation! Check the URL"})
                }
            }else{
                return res.status(400).json({status: false, msg: "Invalid operation! Check the URL"})
            }
        }
        catch(err){
            return res.status(500).json({status: false, msg: "Server error! Please contact the admin"})
        }
    },

    deleteManyBrands: async(req, res)=>{
        try{
            const {genericid, brandid} = req.query;
            //brandid is an array, loop through

            //check to makesure the genericids is defined
            if(genericid && brandid){

                //brandid is an array, loop through
                const idArray = brandid.split(',');
                const brandid_ = idArray.slice(0, idArray.length-1);

                //check to makesure the genericids is not empty
                if(brandid_.length > 0){

                    //check if all the id are mongoose valid id
                    const isValid = brandid_.every(id=>mongoose.isValidObjectId(id));
                    
                    //check if genericid id is a valid mongoose id
                    const isValidGen = mongoose.isValidObjectId(genericid)

                    if(isValid && isValidGen){
                        
                        //find the drug with the id and pull the data from the array
                        await Drugs.findByIdAndUpdate({_id: genericid},
                            {
                                $pull: {brands: {_id: brandid_}}
                            },
                            {
                                safe: true
                            }
                        );
                        res.status(200).json({status: true, msg: "Selected brands deleted successfully"})
                        
                    }else{
                        return res.status(400).json({status: false, msg: "Some or all the operations are not valid! Check the URL?"})
                    }
                }else{
                    return res.status(400).json({status: false, msg: "Invalid operation! Check the URL"})
                }
            }else{
                return res.status(400).json({status: false, msg: "Invalid operation! Check the URL"})
            }
        }
        catch(err){
            return res.status(500).json({status: false, msg: "Server error! Please contact the admin"})
        }
    },

}

module.exports = {drugsCtrl}

