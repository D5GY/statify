const express = require('express');
const { Config } = require('../../config');
const { Logger } = require('../../Logger');
const app = express();
const Database = require('./Utils/database');
const mysql = new Database(Config.API.DATABASE, Logger);
const HttpStatusCodes = { // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}
/**
 * @param { app } app 
 */
module.exports = (app) => {
  Logger.GREEN('API', 'online');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  require('./Utils/Routes/staff')(app, HttpStatusCodes, Logger, mysql, Config);

}