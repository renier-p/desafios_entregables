import { Router } from 'express';
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js';

const router = Router();

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login');
});

router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('register');
});

// router.get('/profile', isAuthenticated, (req, res) => {
//     res.render('profile', { user: req.session.user });
// });

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});

router.get('/products', isAuthenticated, (req, res) => {
    res.render('products', { user: req.session.user });
});

export default router;