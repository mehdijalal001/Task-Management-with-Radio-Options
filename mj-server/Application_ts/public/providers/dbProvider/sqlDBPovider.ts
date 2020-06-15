import * as sql from 'mssql';
const dotenv = require('dotenv');
dotenv.config();

// This is the database's driver.

// It contains methods that executes queries or stored procedures.

export class SQLDBProvider {
  private config: any;

  constructor() {
    //let envConstants = new ServerConstants();

    this.config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      server: process.env.DB_HOST, 
      database: process.env.DB_Database,
      options:{ 
        encrypt: true
      }
    };
  }

  public async getConnection(): Promise<any> {
    //console.log("connection parameters are:" + this.config.server + " " + this.config.database);

    return new sql.ConnectionPool(this.config).connect();
  }

  public async executeQuery(insertQuery, inputParameters = []): Promise<any> {
    const pool = await this.getConnection();

    let request = pool.request();

    inputParameters.forEach(function(p) {
      request.input(p.name, p.dataType, p.value);
    });

    return request.query(insertQuery);
  }
  public async executeSP(procedureName: string): Promise<any> {
    const pool = await this.getConnection();

    let request = pool.request();

    return request.query(procedureName);
  }

  public async executeSPWithParameters(procedureName: string, inputParameters: any[]): Promise<any> {
    const pool = await this.getConnection();

    let request = pool.request();

    inputParameters.forEach(function(p) {
      request.input(p.name, p.dataType, p.value);
    });

    return request.execute(procedureName);
  }

  public async executeSPWithParametersAndOutputParameter(
    procedureName: string,
    inputParameters: any[],
    outputParameters: any[]
  ): Promise<any> {
    const pool = await this.getConnection();

    let request = pool.request();

    inputParameters.forEach(function(p) {
      request.input(p.name, p.dataType, p.value);
    });

    outputParameters.forEach(function(p) {
      request.output(p.name, p.dataType, p.value);
    });

    return request.execute(procedureName);
  }
}
