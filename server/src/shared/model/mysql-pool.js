import mysql2 from "mysql2/promise"
import config from "config"
// const mysqlCredentials = {
//     host: 'localhost',
//     user: 'root',
//     port : 3306,
//     database : 'ancci'
// };

// const mysqlCredentials = {
//     host: 'srv815.hstgr.io',
//     user: 'u970133903_BGMAdmin',
//     port : 3306,
//     database : 'u970133903_BGMDB',
//     password : "RKfwnmPhW1!l",
//     timezone : "+00:00"
// };

const mysqlCredentials = config.get("DB_CREDENTIALS")

export default mysql2.createPool(mysqlCredentials)
