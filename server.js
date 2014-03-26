var koa = require('koa'),
  common = require('koa-common'),
  http = require('http'),
  route = require('koa-route'),
  serve = require('koa-static'),
  path = require('path'),
  app = koa(),
  loginController = require('./src/controllers/login'),
  homeController = require('./src/controllers/home'),
  marController = require('./src/controllers/mar'),
  patientController = require('./src/controllers/patient'),
  scheduleController = require('./src/controllers/schedule'),
  medicationController = require('./src/controllers/medication');

app.use(common.logger());
app.use(common.responseTime());

app.use(serve(path.join(__dirname, '/dist')));

app.use(route.get('/', homeController));
app.use(route.get('/mar', marController));
app.use(route.get('/login', loginController));
app.use(route.get('/patients', patientController.list));
app.use(route.get('/patients/:id', patientController.show));
app.use(route.get('/schedules', scheduleController.list));
app.use(route.get('/schedules/:patientId', scheduleController.show));
app.use(route.get('/medications', medicationController.list));
app.use(route.get('/medications/:id', medicationController.show));

http.createServer(app.callback()).listen(1337);
console.log('listening on port 1337');