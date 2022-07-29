import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: String,
    firstname: {
        type: String,
        required: [true, "Prenom obligatoire"]
    },
    mail: {
        type: String,
        required: [true, "Mail obligatoire"]
    },
    password: {
        type: String,
        required: [true, "Mot de passe obligatoire"]
    }
})

const userModel = mongoose.model("users", userSchema)
export default userModel