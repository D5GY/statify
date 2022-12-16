module.exports = (app, HttpStatusCodes, logger, mysql, Config) => {
  app.post('/API/staff', async (req, res) => {
    console.log(req)
    console.log(req.body);
    console.log(Object.keys(req.body).length);
    let api = req.headers['statify-api-key'];
    if (!api) {
      return res.json({ status: HttpStatusCodes.BAD_REQUEST, message: 'No API Key provided' });
    } else if (api !== Config.API.KEY) {
      return res.json({ status: HttpStatusCodes.FORBIDDEN, message: 'Invalid API Key provided' });
    } else if (Object.keys(req.body).length !== 3) {
      return res.json({ status: HttpStatusCodes.BAD_REQUEST, message: 'No valid JSON body was found' });
    }
    const body = JSON.parse(JSON.stringify(req.body));
    if (!mysql.connected) mysql.connect();
    let query = undefined;
    try {
      query = await mysql.query(
        'INSERT INTO staff (discordID, permissions, name) VALUES (?, ?, ?)',
        body.discordID,
        body.perms,
        body.name
      );
  
      res.json({ status: HttpStatusCodes.CREATED, response: query });
    } catch (error) {
      logger.RED('api', `STAFF POST MYSQL: ${error}`);
      res.json({ status: HttpStatusCodes.INTERNAL_SERVER_ERROR, error: error });
    }
  });
  
  app.delete('/API/staff/:discordID', async (req, res) => {
    let api = req.headers['statify-api-key'];
    let ID = req.params.discordID;
    if (!api) {
      return res.json({ status: HttpStatusCodes.BAD_REQUEST, message: 'No API Key provided' });
    } else if (api !== Config.API.KEY) {
      return res.json({ status: HttpStatusCodes.FORBIDDEN, message: 'Invalid API Key provided' });
    } else if (!ID) {
      return res.json({ status: HttpStatusCodes.BAD_REQUEST, message: 'No discordID was passed.' });
    }
    let query = undefined;
    if (!mysql.connected) mysql.connect();
    try {
      query = await mysql.query(
        'DELETE FROM staff WHERE discordID = ?',
        ID
      );
      res.json({ status: HttpStatusCodes.OK, response: query });
    } catch (error) {
      logger.RED('API', `MYSQL STAFF DELETE: ${error}`);
      res.json({ status: HttpStatusCodes.INTERNAL_SERVER_ERROR, error: error });
    }
  });
  
  app.get('/API/staff', async (req, res) => {
    let api = req.headers['statify-api-key'];
    if (!api) {
      return res.json({ status: HttpStatusCodes.BAD_REQUEST, message: 'No API Key provided' });
    } else if (api !== Config.API.KEY) {
      return res.json({ status: HttpStatusCodes.FORBIDDEN, message: 'Invalid API Key provided' });
    }
      let query = undefined;
      if (!mysql.connected) mysql.connect();
      try {
        query = await mysql.query(
          'SELECT * FROM staff',
        );
        res.json({ status: HttpStatusCodes.OK, response: query });
      } catch (error) {
        logger.RED('API', `MYSQL STAFF GET: ${error}`);
        res.json({ status: HttpStatusCodes.INTERNAL_SERVER_ERROR, error: error });
      }
  });
}