


const emailValidator = (email) => {
    if (!email) {
        throw new Error("Email is required");
    } else if (email.toString().includes("@") === false || email.toString().includes(".") === false) {
        throw new Error("Email must be valid");
    }
}

const passwordValidator = (password) => {
    const testPassword = (regex) => {
        return regex.test(password);
    }
    if (!password) {

        //testing if password is empty
        throw new Error("Password is required");

    } else if (!testPassword(/^.{8,}$/)) {

        //testing if password is at least 8 characters long
        throw new Error("Password must at least contain 8 characters");

    } else if (!testPassword(/^(?=.*[a-z]).{8,}$/)) {

        //testing if password contains at least one lowercase letter
        throw new Error("Password must contain at least one lowercase letter");

    } else if (!testPassword(/^(?=.*[A-Z]).{8,}$/)) {

        //testing if password contains at least one uppercase letter
        throw new Error("Password must contain at least one uppercase letter");

    }  else if (!testPassword(/^(?=.*\d).{8,}$/)) {

        //testing if password contains at least one numerical character
        throw new Error("Password must contain at least one numerical character");

    } else if (!testPassword(/^(?=.*[@$!%*?&]).{8,}$/)) {

        //testing if password contains at least one special character
        throw new Error("Password must contain at least one od these special characters: @, $, !, %, *, ?, &");

    } else if (!testPassword(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {

        //testing if password contains other characters than the ones specified above
        throw new Error("Password must not contain other characters than the ones specified: alphabetic, numeric, special characters: @, $, !, %, *, ?, &");
    }
}

//for now the phone number validator only supports algerian numbers
const phoneNumberValidator = (phoneNumber) => {
    
}


const subCategoryValidator = (subCategory, category) => {
    if (!subCategory) return true;
    const subCategories = 
    category == "tops" ? ["t-shirts", "shirts", "sweaters", "hoodies", "jackets", "other"] 
     :  category == "lower body" ? ["trousers","jeans", "joggers", "skirts", "shorts", "other"]
     : category == "underwear" ? ["boxers", "panties", "bras", "other"]
    : category == "hats" ? ["caps", "hats", "beanies" ,"other"]
    : category == "accessories" ? ["gloves", "belts", "sunglasses", "watches", "jewelry", "ries", "hair clips", "other"]
    : category == "full body" ? ["outfits", "suits", "dresses", "coats", "sportwear", "other"]
    : category == "shoes" ? ["sneakers", "boots", "sandals", "heels", "loafers", "flats", "socks", "other"]
    : category == "infant wear" ? ["other"]
    : category == "other" ? ["other"] : [];
    
    return subCategories.includes(subCategory);
}

module.exports = {emailValidator, passwordValidator, subCategoryValidator}