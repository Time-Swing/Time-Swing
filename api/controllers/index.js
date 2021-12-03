const express = require('express');
const router = express.Router();


// Load each controller
const postsController = require('./posts.js');
const agendaController = require('./agendaController.js')
const appConfigController = require('./appConfig.js');
const userController = require('./userController.js')
// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/posts', postsController);
router.use('/agenda',agendaController)
router.use('/application-configuration', appConfigController);
router.use('/auth',userController)


module.exports = router;