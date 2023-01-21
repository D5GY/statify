const { createConnection } = require('mysql2');

class Database {
  constructor(DATABASE_CONFIG, logger) {
    this._mysqlConnection = createConnection({
      host: DATABASE_CONFIG.host,
      user: DATABASE_CONFIG.user,
      password: DATABASE_CONFIG.password,
      port: DATABASE_CONFIG.port,
      database: DATABASE_CONFIG.database
    });
    this.connected = false;
    this.logger = logger;
  }
  connect() {
    return new Promise((resolve, reject) => {
      if (this.connected) return this.logger.YELLOW('API', 'database is already connected.');
      this._mysqlConnection.connect(error => {
        if (error) {
          this.connected = false;
          return this.logger.RED('API', `DATABASE CONNECT: ${error}`)
        } else {
          this.logger.BLUE('API', `database connected`);
          this.connected = true;
          return resolve(this);
        }
      });
    });
  }
  disconnect() {
    return new Promise((resolve, reject) => {
      if (!this.connected) return this.logger.YELLOW('API', 'database is already disconnected');
      this._mysqlConnection.destroy(error => {
        if (error) {
          this.connected = true;
          return this.logger.RED('API', `DATABASE DISCONNECT: ${error}`)
        } else {
          this.logger.BLUE('API', 'disconnect from database');
          this.connected = false;
          return resolve(this);
        }
      });
    });
  }
  query(sql, ...args) {
    return new Promise(async(resolve, reject) => {
      if (!this.connected) {
        this.logger.YELLOW('API', 'database not connected for query');
      }
      try {
        this._mysqlConnection.query(sql, args, async(error, results) => {
          if (error)
            reject(error);
          else
            resolve(results);
        });
      } catch (error) {
        this.logger.RED('API', `DATABASE QUERY: ${error}`);
      }
    });
  }
  keepAlive() {
    this._mysqlConnection.ping(error => {
      if (error) {
        this.connected = false;
        this.connect();
      } else return;
    });
  }
}
module.exports = Database;