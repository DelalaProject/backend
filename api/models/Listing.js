const mongoose = require('mongoose');


const listingSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You can't create a listing without a user"],
    },
    title: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Title is required"],
    },
    description: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Description is required"]
    },
    //pictures will be stored in the cloudinary server
    //we'll use the listing "_id" to find the pictures
    type: {
       type: mongoose.SchemaTypes.String,
       required: [true, "Type is required"],
       enum: {
        values: ["rent", "sale", "give away"],
        message: "Type must be either rent, sale or give_away",
       }
    },
    date: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now(),
    },
    dateModified: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now(),
    },
    category: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Category is required"],
        default: "other",
        enum: {
            values: ["tops", "lower boddy", "underwear", "hats", "accessories", "full body", "shoes","infant wear" ,"other"],
            message: "Category must be either tops, lower boddy, underwear, hats, accessories, full body, shoes or other",
        }
    },
    subCategory: {
        type: mongoose.SchemaTypes.String,
        default: "other",
        validate : {
            validator : subCategoryCalculator,
            message   : 'Subcategory is not valid for this category'
        },
    },
    condition: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Condition is required"],
        enum: {
            values: ["new", "used - good as new", "used - good shape", "heavily used"],
            message: "Condition must be either new, used - good as new, used - good shape or heavily used",
        }
    },
    wholesaleOrRetail: {
        type: mongoose.SchemaTypes.String,
        enum: {
            values: ["wholesale", "retail"],
            message: "wholesaleOrRetail must be either wholesale or retail",
        }
    },
    inStock: {
        type: mongoose.SchemaTypes.Boolean,
        default: false,  
    },
    anonymous: {
        type: mongoose.SchemaTypes.Boolean,
        default: false,
    },
    views: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
    },
    offerOrRequest: {
        type: mongoose.SchemaTypes.String,
        required: [true, "you must precise if you're offering or requesting"],
        enum: {
            values: ["offer", "request"],
            message: "offerOrRequest must be either offer or request",
        }
    },
    price: {
        type: mongoose.SchemaTypes.Decimal128,
    },  
    priceType: {
        type: mongoose.SchemaTypes.String,
        enum: {
            values: ["fixed", "negotiable"],
            message: "priceType must be either fixed or negotiable",
        }
    
    },
    customSpecs: {
        type: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "CustomSpec",
        }],
        default: [],
    },
    location: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Location is required"],
    }

});

function subCategoryCalculator() {
    const subCategories = 
    this.category == "tops" ? ["t-shirts", "shirts", "sweaters", "hoodies", "jackets", "other"] 
     :  this.category == "lower body" ? ["trousers","jeans", "joggers", "skirts", "shorts", "other"]
     : this.category == "underwear" ? ["boxers", "panties", "bras", "other"]
    : this.category == "hats" ? ["caps", "hats", "beanies" ,"other"]
    : this.category == "accessories" ? ["gloves", "belts", "sunglasses", "watches", "jewelry", "ries", "hair clips", "other"]
    : this.category == "full body" ? ["outfits", "suits", "dresses", "coats", "sportwear", "other"]
    : this.category == "shoes" ? ["sneakers", "boots", "sandals", "heels", "loafers", "flats", "socks", "other"]
    : this.category == "infant wear" ? ["other"]
    : this.category == "other" ? ["other"] : [];
    
    return false;
}

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;