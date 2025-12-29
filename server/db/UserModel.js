const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// const passwordComplexity = require('joi-password-complexity');
const UserSchema = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    number: Number,
})
// UserSchema.methods.generateAuthToken = async function () {
//     const token = jwt.sign({ _id: this._id }, process.env.PRIVATEKEY, { expiresIn: '1h' });
//     return token;
// }

const User=mongoose.model("Users",UserSchema)
module.exports = User;

/*
const validate=(data)=>{
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: passwordComplexity().required(),
        number: Joi.number().min(10).required()
    })
    return schema.validate(data)
}
*/