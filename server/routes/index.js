const authController = require('../controllers').auth;

module.exports = (app) => {
    app.post('/register', authController.create);
};

// const todosController = require('../controllers').todos;

// module.exports = (app) => {
//   app.get('/api', (req, res) => res.status(200).send({
//     message: 'Welcome to the Todos API!',
//   }));

//   app.post('/api/todos', todosController.create);
// };

// GET home page.
// app.get('/', function(req, res) {
//     res.redirect('/catalog');
//   });