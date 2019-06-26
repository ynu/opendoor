export const config = {
    database: {
        dialect: 'mysql',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        logging: false,
    },
    backendHost1: process.env.BACKEND_HOST_1,
    backendHost2: process.env.BACKEND_HOST_2,
    backendPort: process.env.BACKEND_PORT,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
};
