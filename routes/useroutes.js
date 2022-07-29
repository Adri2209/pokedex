import { Router } from "express"
import pokemonModel from "../models/pokemonsmodel.js"
import userModel from "../models/usermodel.js"
import authGuard from "../authGuard.js"
import UserController from "../controller/userController.js";

const userRouter = Router()

// CREER UN NOUVEL UTILISATEUR (page formulaire d'inscription)

userRouter.get("/subscribe", async (req, res) => {
    res.render("subscribe.twig", {
    })
})

userRouter.post("/subscribe", async (req, res) => {
    try {
        await UserController.subscribe(req)
        res.redirect("/page")
    } catch (e) {
        console.log(e);
        res.redirect("/subscribe")
    }
})
// CONNECTER UN UTILISATEUR (page connexion)

userRouter.get('/login', async (req, res) => {
    try {
        res.render('connect.twig', {
            action: 'connexion'
        })
    } catch (error) {
        res.send(error);
    }
})
userRouter.post("/login", async (req, res) => {
    try {
        let user = await UserController.login(req)
        if (user) {
            req.session.user = user._id
            res.redirect("/page")
        } else {
            res.redirect("/login")
        }
    } catch (error) {
        res.send(error);
    }
})
// CONNEXION A LA LISTE DES POKEMONS (page liste Pokemons)
userRouter.get("/page", authGuard, async (req, res) => {
    let pokemons = await UserController.getPokemons(req)
    res.render("page.twig", {
        pokemons: pokemons
    })
})

// route d'ajout de pokemon
userRouter.post("/addPokemon", authGuard, async (req, res) => {
    try {
        await UserController.addPokemon(req)
        res.redirect("/page")

    } catch (error) {
        console.log(error);
        res.redirect("/addPokemon")
    }
})

userRouter.get("/addPokemon", authGuard, async (req, res) => {
    try {
        res.render('pokemon.twig')
    } catch (error) {
        console.log(error);
    }
})
// route pour supprimer les Pokemons
userRouter.get("/deletePokemon/:id", authGuard, async (req, res) => {
    try {
        await UserController.deletePokemon(req)
        res.redirect("/page")
    } catch (error) {
        res.send(error)
    }
})
// ROUTE POUR MODIFIER LES POKEMONS
userRouter.get("/updatePokemon/:id", authGuard, async (req, res) => {
    try {

        let pokemon = await UserController.getPokemon(req)
        console.log(pokemon);
        res.render("pokemon.twig", {
            pokemon: pokemon,
            action: "update"
        })
    } catch (error) {
    }
})

userRouter.post("/updatePokemon/:id", authGuard, async (req, res) => {
    try {
        await UserController.updatePokemon(req)
        res.redirect("/page")
    } catch (error) {
        res.send(error)
    }
})
//ROUTE DECONNEXION POKEMONS

userRouter.get("/destroyPokemon", authGuard, async (req, res) => {
    try {
        req.session.destroy()
        res.redirect("/login")
    } catch (error) {
        res.send(error);
    }
})
export default userRouter