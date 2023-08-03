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
        enum: {
            values: () => {
                switch (category) {
                    case "tops":
                        return ["t-shirts", "shirts", "sweaters", "hoodies", "jackets", "other"]; 
                    case "lower boddy":
                        return ["trousers","jeans", "joggers", "skirts", "shorts", "other"];
                    case "underwear":
                        return ["boxers", "panties", "bras", "other"];
                    case "hats":
                        return ["caps", "hats", "beanies" ,"other"];
                    case "accessories":
                        return ["gloves", "belts", "sunglasses", "watches", "jewelry", "ries", "hair clips", "other"];
                    case "full body":
                        return ["outfits", "suits", "dresses", "coats", "sportwear", "other", "other"];
                    case "shoes":
                        return ["sneakers", "boots", "sandals", "heels", "loafers", "flats", "socks", "other"];
                    case "infant wear":
                        return [];
                    case "other":
                        return [];
                    default:
                        break;
                }
            },
            message: "Subcategory must be valid",
        }
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
    }
});

const Listing = mongoose.model("Listing", listingSchema);

modules.exports = Listing;