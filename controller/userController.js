import pokemonModel from "../models/pokemonsmodel.js";
import userModel from "../models/usermodel.js";
import {comparePassword, cryptPassword} from "../cryprto.js"

//fichier pour exporter les routes qui concerne usermodel avec les "find" ou "save" en static//
export class UserController {

    //export route inscription
    static async subscribe(req) {
        req.body.password = await cryptPassword(req.body.password)
        let user = new userModel(req.body)
        await user.save()
        console.log(user);
        req.session.user = user._id
        return user
    }
    //export route login
    static async login(req){
        let user = await userModel.findOne({ mail: req.body.mail })
        if (user) {
            if (await comparePassword(req.body.password, user.password)) {
                return user
            }
            
        }
       return null
    }
    static async getPokemons(req){
        let pokemons = await pokemonModel.find({user: req.session.user})
        return pokemons;
    }
    //export route ajout de pokemon
    static async addPokemon(req) {
        req.body.user = req.session.user
        let pokemon = new pokemonModel(req.body)
        await pokemon.save()
    }
    //export route supprimer pokemon
    static async deletePokemon(req) {
        let pokemon = await pokemonModel.deleteOne({_id: req.params.id });
        return pokemon;
    }
    static async getPokemon(req) {
       let pokemon = await pokemonModel.findOne({_id: req.params.id}) 
        return pokemon;
    }
    //export route modifier pokemon
    static async updatePokemon(req) {
        await pokemonModel.updateOne({_id: req.params.id },req.body);
        

}
}

export default UserController
