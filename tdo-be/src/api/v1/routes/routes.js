//import controllers
const testController = require('../controllers/TestController');
// const userController = require('../controllers/UsersController');
const auth = require('../middlewares/auth');

module.exports = function(app) {
    app.get('/', (req, res) => {
        res.send({ message: 'TDO BE' });
    });
    // example
    // app.post('/sign-in', userController.createAccount);
};
