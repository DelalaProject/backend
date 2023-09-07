const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const userSchema = new mangoose.Schema({
    email: {
        type: mangoose.SchemaTypes.String,
        required: [true, "Email is required"],
        validator: [(val) => val != undefined && val.toString().includes("@") && val.toString().includes("."), "Email is invalid"],
        validate:  [{
            validator: (val) => val != undefined && val.toString().includes("@") && val.toString().includes("."),
            message: "Email is invalid",
        }],
    },
    password: {
        type: mangoose.SchemaTypes.String,
        required: [true, "Password is required"],
    },
    firstName: {
        type: mangoose.SchemaTypes.String,
        required: [true, "First name is required"],
    },
    lastName: {
        type: mangoose.SchemaTypes.String,
        required: [true, "Last name is required"],
    },
    //profile picture will be stored in the cloudinary server
    //and will be found using the "_id" of the user
    rating: {
        type: mangoose.SchemaTypes.Decimal128,
        default: 0,
        min: 0,
        max: 5,
    
    },
});


userSchema.index({firstName: 'text', lastName: 'text'});


const User = mongoose.model("User", userSchema);

module.exports = User;