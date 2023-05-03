import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
// postgres
const ormConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "mouse.db.elephantsql.com",
    port: 5432,
    username: "jvqcspox",
    password: "2UAlcEteZfOgUHZfCULOjI-itMYAvbRg",
    database: "jvqcspox",
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
