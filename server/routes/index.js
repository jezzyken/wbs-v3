const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const routeFiles = fs.readdirSync(__dirname)
  .filter(file => 
    file !== 'index.js' && 
    file.endsWith('.js')
  );

routeFiles.forEach(file => {
  const route = require(path.join(__dirname, file));
  const routePath = `/${file.replace('Routes.js', 's').toLowerCase()}`;
  console.log(routePath)
  router.use(routePath, route);
});

module.exports = router;