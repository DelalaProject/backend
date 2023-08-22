const Listing = require('../models/listing');
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

module.exports = {checkListingExistance,valideListingValues}