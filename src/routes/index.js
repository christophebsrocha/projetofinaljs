const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const employeeController = require('../controllers/employeeController');

// Middleware para proteger rotas e controlar acesso
const checkAuth = (roles) => { 
    return (req, res, next) => { 
        if (!req.session.user) { 
        return res.redirect('/login');
     } if (!roles.includes(req.session.user.role)) { 
    return res.status(403).render('error', {
        message: 'Acesso negado! Você não tem permissão para acessar esta área.' 
    }); 
}
next();
 }; 
};

// Página de login
router.get('/login', (req, res) => {
    res.render('login');
});

// Rota para login 
router.post('/login', authController.login);

// Rota de logout
router.get('/logout', authController.logout);

// Painel Admin (Somente Admin)
router.get('/admin', checkAuth(['admin']), (req, res) => {
    res.render('admin', { user: req.session.user });
});

// Página de Contato (Somente Vendedor)
router.get('/contato', checkAuth(['vendedor', 'admin']), (req, res) => {
    res.render('contato', { user: req.session.user });
});

// Relatórios (Somente Fornecedor)
router.get('/relatorios', checkAuth(['fornecedor', 'admin']), (req, res) => {
    res.render('relatorios', { user: req.session.user });
});

// Painel de Controle Geral
router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    switch (req.session.user.role) { 
        case 'admin': 
        return res.redirect('/admin'); 
        case 'vendedor': 
        return res.redirect('/contato'); 
        case 'fornecedor': 
        return res.redirect('/relatorios'); 
        default: 
        return res.status(403).send('Acesso não permitido'); 
    }
});

// Rota de erro (opcional, para facilitar o gerenciamento de erros)
router.get('/error', (req, res) => {
    res.render('error', { message: 'Página não encontrada!' });
});

// Rota para obter os funcionários (com RLS) 
router.get('/employees', employeeController.getEmployees);

module.exports = router;