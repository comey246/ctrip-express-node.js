const express = require('express');
const path = require('path')
// const router = require('./router');
// const index = require('./routes/index')
// const authRouter = require('./routes/auth')
// const recordMiddleware = require('./middlewares/record')
const userRoutes = require('./routes/userRoutes')
const app = express();

app.use(express.json())
app.user(useRoutes)
// app.use(authRouter);
// app.use(router);
// app.use(index);
// app.use(recordMiddleware)

// exports.cache = new Map();


//监听端口服务启动

app.listen(8000,()=>{
    console.log("服务已经启动，8000端口监听中...http://127.0.0.1:8000");
}) 