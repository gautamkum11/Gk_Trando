import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
    mobile: {
        type: Number,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    howknowus: {
        type: String,
        required: true
    },
    whylearning: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User',Userschema);

export default User;
