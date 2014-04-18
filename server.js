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
  demographicsController = require('./src/controllers/demographics'),
  patientController = require('./src/controllers/patient'),
  scheduleController = require('./src/controllers/schedule'),
  medicationController = require('./src/controllers/medication'),
  port;

app.use(common.logger());
app.use(common.responseTime());

app.use(serve(path.join(__dirname, '/dist')));

app.use(route.get('/', homeController));
app.use(route.get('/login', loginController));
app.use(route.get('/demographics', demographicsController.list));
app.use(route.get('/demographics/:id', demographicsController.show));
app.use(route.get('/mar', marController.list));
app.use(route.get('/mar/:id', marController.show));
app.use(route.get('/mar/:id/json', marController.showJSON));
app.use(route.get('/patients', patientController.list));
app.use(route.get('/patients/:id', patientController.show));
app.use(route.get('/schedules', scheduleController.list));
app.use(route.get('/schedules/:patientId', scheduleController.show));
app.use(route.get('/medications', medicationController.list));
app.use(route.get('/medications/:id', medicationController.show));

port = Number(process.env.PORT || 5000);
http.createServer(app.callback()).listen(port, function() {
  console.log('listening on ' + port);
});
