const { default: mongoose } = require('mongoose');
const mangoose = require('mongoose');

const userSchema = new mangoose.Schema({
    email: {
        type: mangoose.SchemaTypes.String,
        required: [true, "Email is required"],
    },
    password: {
        type: mangoose.SchemaTypes.String,
        required: [true, "Password is required"],
    },
    phoneNumber: {
        number: {
            type: mangoose.SchemaTypes.String, 
            required: [true, "Phone number is required"],
        },
        code: {
            type: mangoose.SchemaTypes.Number, 
            required: [true, "Phone number is required"]
        },
        required: true,
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
    addresses :{
        type: [mongoose.SchemaTypes.String],
        required: [true, "at least one ddress is required"],
    },
});


const User = mongoose.model("User", userSchema);

module.exports = User;