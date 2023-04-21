const { Sequelize } = require("sequelize");
function DatabaseConnection(){
    this.sequelize = new Sequelize(
      process.env.DATABASE_NAME,
      process.env.DATABASE_USERNAME,
      process.env.DATABASE_PASSWORD,
      { host: "localhost", dialect: "mysql",port:3306 }
    );

    this.testConnection = async()=>{
        try{

            await this.sequelize.authenticate();
            console.log("connection has been stablished successfully")
        }catch(error){
            console.log("Unable to connect to the database: ",error);
        }
    }
    this.testConnection();
}
            

module.exports = {connection : new DatabaseConnection()}