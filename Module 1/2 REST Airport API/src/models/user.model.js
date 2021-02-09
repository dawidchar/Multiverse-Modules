import bcrypt from 'bcrypt'
import mongoose from "mongoose"
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre("save", function (next) {
    // get the current user	
    const user = this;

    // hash the password	
    bcrypt.hash(user.password, 10, (error, hash) => {
        if (error) {
            console.log(error);
        }
        user.password = hash;
        next();
    });
});


const User = mongoose.model("User", UserSchema, 'Users');

export default User;