var koa = require('koa'),
  common = require('koa-common'),
  http = require('http'),
  route = require('koa-route'),
  serve = require('koa-static'),
  path = require('path'),
  app = koa(),
  homeController = require('./src/controllers/home'),
  patientController = require('./src/controllers/patient'),
  scheduleController = require('./src/controllers/schedule');

app.use(common.logger());
app.use(common.responseTime());

app.use(serve(path.join(__dirname, '/dist')));

app.use(route.get('/', homeController));
app.use(route.get('/patients', patientController));
app.use(route.get('/schedule', scheduleController));

http.createServer(app.callback()).listen(3000);
//https.createServer(app.callback()).listen(3001);
console.log('listening on port 3000');