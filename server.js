const path = require('path')
const rootPath = path.normalize(__dirname)
console.log(rootPath)
const webPush = require('web-push');


webPush.setGCMAPIKey('AAAAmXDC0ag:APA91bFVUYyiCE6hvJq7X5g2CHBdIfsmsPgbECwhYRfgX_DBqO5nByeVehzdaM4HMzQ4y39FIXWJBnb_BbmCYXAXWjSWwx6IEIglS09tSxJTUf6PkrJCB-p7BQXyZNrg1ZPWi5iq76Jj');

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



