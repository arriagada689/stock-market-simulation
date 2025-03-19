import { Schema, model, models } from "mongoose";

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true 
    },
    description: {
        type: String,
        default: ''
    }
})

const Profile = models.Profile || model('Profile', ProfileSchema);

export default Profile