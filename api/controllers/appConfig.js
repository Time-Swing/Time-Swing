const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {//main page for back-end   //localhost:8080/api/
  res.json({
    title: 'APP TITLE',
    description: 'A short description about this app',
  });
});


module.exports = router;