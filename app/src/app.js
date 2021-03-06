import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
import apiRouter from "./routers/api/api.router.js"
import adminRouter from "./routers/admin/admin.router.js"
import authRouter from "./routers/auth/auth.router.js"
import frontRouter from "./routers/front/front.router.js"
import { authenticated, authorize } from "./middlewares/auth.js"
import profileRouter from "./routers/profile/profile.router.js"
import { notFound } from "./controllers/default.controller.js"
import path from "path"
import session from "express-session"
import { flash } from "express-flash-message"
import ConnectRedis from 'connect-redis'
import startup from './startup.js'
import redisClient from "./services/redis.js"


await startup()

const hostname = "0.0.0.0";
const port = 3000;
const __dirname = path.resolve()

const app = express()
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


const RedisStore = ConnectRedis(session)
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new RedisStore({
        client: redisClient,
    }),
    resave: false,
    saveUninitialized: false,
}));
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}))
app.set('view engine', 'ejs');
app.disable('view cache'); // for development

app.use('/api', apiRouter)
app.use('/admin', authorize, adminRouter)
app.use('/', authRouter)
app.use('/profile', authenticated, profileRouter)
app.use('/', frontRouter)

app.all("*", notFound);
app.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
});