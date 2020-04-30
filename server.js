const path = require('path')
const rootPath = path.normalize(__dirname)
const webPush = require('web-push');

//FIREBASE API_KEY
webPush.setGCMAPIKey('')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser())
app.use(express.static(rootPath))

app.post('/send', function (req, res) {
     setTimeout(function() {
      webPush.sendNotification({
        endpoint: req.body.endpoint,
        TTL: req.body.ttl,
        keys: {
          p256dh: req.body.key,
          auth: req.body.authSecret
        }
      }, 'hola')
      .then(function() {
        res.sendStatus(201);
      })
      .catch(function(error) {
        console.log(error);
        res.sendStatus(500);
      });
    }, 1 * 1000);
})


app.listen(3000, function () {
  console.log('Server listening on port 3000')
})



