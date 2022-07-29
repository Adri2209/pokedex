import mongoose from "mongoose"

const pokemonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nom obligatoire"]
    },
    type: {
        type: String,
        required: [true, "Type obligatoire"]
    },
    level: {
        type: Number,
        required: [true, "Level obligatoire"]
    },
    user:  {
        type: String,
        required: [true, "User obligatoire"]
    },
})

const pokemonModel = mongoose.model("pokemons", pokemonSchema)
export default pokemonModel