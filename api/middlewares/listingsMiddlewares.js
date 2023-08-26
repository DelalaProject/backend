const Listing = require('../models/Listing.js');
const {subCategoryValidator} = require('../tools/inputValidators.js');



const checkListingExistance = async (req, res, next) => {
    try {
            
            await Listing.findById(req.query.listingId).then((listing) => {
                
                if (listing) next();
                else return res.status(400).json({ msg: "listing not found" });
            }).catch((err) => {
                console.log(err);
                return res.status(400).json({ msg: "an error has occured" });
            });
            
    
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "an error has occured" });
    }
}

const valideListingValues = async (req, res, next) => {
    try {

        if ((req.body.type && !Listing.schema.path('type').enumValues.includes(req.body.type)) || req.body.type == "") {
            return res.status(400).json({ message: "invalid listing type" });
        }

        let categoryValidated = !((req.body.category && !Listing.schema.path('category').enumValues.includes(req.body.category)) || req.body.category == "");
        if (!categoryValidated) {
            return res.status(400).json({ message: "invalid listing category" });
        }
        
        let category;
        if (categoryValidated && req.body.category) {
            category = req.body.category;
        } else {
            await Listing.findById(req.query.listingId)
            .then((listing) => {
                
                category = listing.category;
                
            });
        }

        if ((req.body.subCategory && !subCategoryValidator(req.body.subCategory, category)) || req.body.subCategory == "") {
            return res.status(400).json({ message: "invalid listing sub-category" });
        }

        if ((req.body.condition && !Listing.schema.path('condition').enumValues.includes(req.body.condition)) || req.body.condition == "") {
            return res.status(400).json({ message: "invalid listing condition" });
        }

        if ((req.body.wholesaleOrRetail && !Listing.schema.path('wholesaleOrRetail').enumValues.includes(req.body.wholesaleOrRetail)) || req.body.wholesaleOrRetail == "") {
            return res.status(400).json({ message: "invalid listing wholesale or retail state" });
        }

        if ((req.body.offerOrRequest && !Listing.schema.path('offerOrRequest').enumValues.includes(req.body.offerOrRequest)) || req.body.offerOrRequest == "") {
            return res.status(400).json({ message: "invalid listing offer or request state" });
        }

        if ((req.body.priceType && !Listing.schema.path('priceType').enumValues.includes(req.body.priceType)) || req.body.priceType == "") {
            return res.status(400).json({ message: "invalid listing price type" });
        }

        
        if ((req.body.price && !(req.body.price>0)) || req.body.price == "") {
            return res.status(400).json({ message: "invalid listing price" });
        }

        

        

        

        next();
    
    } catch (err) {

        console.log(err);
        return res.status(400).json({ message: "an error has occured" });
    }
}


const searchQueryBuilder = (req, res, next) => {
    let query = {
        $text: {$search: req.query.search},
    };

    if (req.query.category) {
        query.category = req.query.category;
    }

    
    if (req.query.category && req.query.subCategory) {
        query.subCategory = req.query.subCategory;
    }

    if (req.query.date) {
        query.date = {$gte: new Date(req.query.date)};
    }

    if (req.query.type) {
        query.type = req.query.type;
    }

    if (req.query.condition) {
        query.condition = req.query.condition;
    }

    if (req.query.wholesaleOrRetail) {
        query.wholesaleOrRetail = req.query.wholesaleOrRetail;
    }

    if (req.query.inStock) {
        query.inStock = req.query.inStock;
    }

    if (req.query.anonymous) {
        query.anonymous = req.query.anonymous;
    }

    if (req.query.offerOrRequest) {
        query.offerOrRequest = req.query.offerOrRequest;
    }

    if (req.query.minPrice && req.query.maxPrice) {
        query.price = { $gte: parseFloat(req.query.minPrice), $lte:req.query. parseFloat(req.query.maxPrice) };
    } else if (req.query.minPrice) {
        query.price = { $gte: parseFloat(req.query.minPrice) };
    } else if (req.query.maxPrice) {
        query.price = { $lte: parseFloat(req.query.maxPrice) };
    }

    if (req.query.priceType) {
        query.priceType = req.query.priceType;
    }

    req.searchQuery = query;
    
    next();

}

module.exports = {checkListingExistance,valideListingValues, searchQueryBuilder}