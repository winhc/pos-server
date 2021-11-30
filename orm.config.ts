import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
// postgres
const ormConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
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
