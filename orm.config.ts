import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
// postgres
const ormConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "dpg-ceju2epa6gdkdn6m248g-a",
    port: 5432,
    username: "cherry_developer",
    password: "EMAmaMMCMgT5wi22CLQaX9gLFfjQ5byy",
    database: "cherry_central_db",
    entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
    synchronize: true
}

export default ormConfig;

// mysql
// import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

// const ormConfig: MysqlConnectionOptions = {
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "developer",
//     password: "developer",
//     database: "cherry_central_db",
//     entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
//     synchronize: true
// }

// export default ormConfig;
