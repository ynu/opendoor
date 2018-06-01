# opendoor

### How to use

1. git clone https://github.com/ynu/opendoor.git
2. cd opendoor

##### start opendoor backend

1. cd opendoor-backend
2. modify `docker-compose.yml` to set `BACKEND_HOST`/`BACKEND_PORT`
3. `docker-compose up -d`

##### start wechat minapp server

1. cd server
2. copy `config.js.default` to `config.js`, and modify `<your_server_host>`
3. npm i
4. npm start

##### start wechat minapp client

1. open client in `wechat-dev-tools`
2. copy `config.js.default` to `config.js`, and modify `<your_app_id>`/`<your_app_secret>`/`<your_backend_opendoor_host>`
3. upload

### License

MIT