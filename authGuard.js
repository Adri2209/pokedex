import UserModel from "./models/usermodel.js";
// function qui verifie si l'utilisateur connecté existe dans la base de données
let authGuard = async (req, res, next) =>{
    let user = await UserModel.findOne({_id: req.session.user})
    if (user) {  //si l'utilisateur est connecté 
        next()  // next permet d'executer le code 
    }else{ // sinon
        res.redirect("/login") // il redirige vers la route login
    }
}

export default authGuard


/**protege les routes en leur donnant l'exclusivité sur la session **/