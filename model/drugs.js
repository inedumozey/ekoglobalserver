const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const drugSchema = new mongoose.Schema({
    category: {
        type: String,
        require: true,
        trim: true
    },
    genericName: {
        type: String,
        require: true,
        trim: true
    },
    moa: {
        type: String /*markdown*/
    },
    indications: {
        type: String
    },
    sideEffects: {
        type: String /*markdown*/
    },
    dosage: {
        type: String /*markdown*/
    },
    compositions: {
        type: String /*markdown*/
    },
    brands: [{
        brandName: {
            type: String,
            trim: true
        },
        salesRepInfo: {
            type: String,
            trim: true
        },
        otherInfo: {
            type: String /*markdown*/
        },
        purchase_unitPrice: {
            type: Number
        },
        purchase_qty: {
            type: Number
        },
        purchase_totalPrice: {
            type: Number
        },
        selling_wp: {
            type: Number
        },
        selling_rp: {
            type: Number
        }
    }]
});

mongoose.model('Drugs', drugSchema);
