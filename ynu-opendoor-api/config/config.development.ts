export const config = {
    database: {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nest',
        logging: false,
    },
    backendHost1: process.env.BACKEND_HOST_1,
    backendHost2: process.env.BACKEND_HOST_2,
    backendPort: process.env.BACKEND_PORT,
    jwtPrivateKey: 'jwtPrivateKey',
};
