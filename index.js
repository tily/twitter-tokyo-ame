require("dotenv").load()
var twit = require("twit")
var zwpad = require("zwpad")
var ame = require("tokyo-ame")
var cron = require("cron").CronJob

var config = {
  schedule: process.env.SCHEDULE,
  around: process.env.AROUND,
  latitude: process.env.LATITUDE, 
  longitude: process.env.LONGITUDE,
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
}

var INTENSITIES = [
  "降雨なし",
  "より弱い雨",
  "弱い雨",
  "並の雨",
  "やや強い雨",
  "強い雨",
  "やや激しい雨",
  "激しい雨",
  "より激しい雨",
  "非常に激しい雨",
  "猛烈な雨",
  "デバッグ",
]

var prev = null

if(process.env.DEBUG == "1") {
  prev = 11
}

var main = ()=> {
  validate()
  new cron({cronTime: config.schedule, onTick: crawl}).start()
}

var validate = ()=> {
  for (k in config) {
    if(config[k] == undefined) {
      console.error(`env ${k.toUpperCase()} is not defined`) 
      process.exit(1)
    }
  }
}

var crawl = ()=> {
  ame.getIntensity(config, (intensity)=> {
    var curr = intensity
    if(prev != null && prev != curr) {
      var message = `Rainfall intensity changed from ${INTENSITIES[prev]} to ${INTENSITIES[curr]} around ${config.around}`
      message = zwpad.pad(message, 140)
      console.log(`Updating status with ${message}`)
      update(message)
    } else {
      console.log("Intensity did not change. Skipping")
    }
    prev = curr
  })
}

var update = (status)=> {
  var t = new twit(config)
  t.post('statuses/update', {status: status}, function(err, data, response) {
    if(err) {
      console.log(`Twitter status update failed: ${err}`)
    }
  })
}

main()
