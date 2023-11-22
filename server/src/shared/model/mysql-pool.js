import mysql2 from "mysql2/promise"

const mysqlCredentials = {
    host: 'localhost',
    user: 'root',
    port : 3306,
    database : 'ancci'
};




export default mysql2.createPool(mysqlCredentials)
