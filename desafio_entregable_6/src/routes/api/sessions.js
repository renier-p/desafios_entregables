import { Router } from 'express';
import passport from 'passport';
import userService from '../../models/user.js';
import { createHash } from '../../utils.js';

const router = Router();

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    try {
        const hashedPassword = createHash(password);

        let role = 'usuario';
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            role = 'admin';
        }
        
        const newUser = new userService({ first_name, last_name, email, age, password: hashedPassword, role: 'usuario' });
        await newUser.save();
        res.redirect('/login');

    } catch (err) {
        res.status(500).send('Error al registrar usuario');
    }
});

router.post('/login', passport.authenticate('login', {
    
    successRedirect: '/products',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});

router.get("/github", passport.authenticate("github",{scope:["user:email"]}),async(req,res)=>{})


router.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/login"}),async(req,res)=>{
    req.session.user=req.user
    res.redirect("/products")
})

export default router;
