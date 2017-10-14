
import path from 'path';
import express from 'express';
import consolidate from 'consolidate';
import swig from 'swig';

import configuration from './configuration';

let rootModule = new express();

rootModule.use(express.static(path.resolve('deploy/client')));

rootModule.get('/', (req, res) => {
  res.render("index.html");
});

rootModule.listen(configuration.port, () => {
  console.log("started serving the application on port - " + configuration.port);
});
