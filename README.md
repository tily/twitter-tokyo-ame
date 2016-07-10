# twitter-tokyo-ame

## Usage

Write your configuration to .env:

```
SCHEDULE="0 */5 * * * *"
LATITUDE=35.7100627
LONGITUDE=139.8085117
AROUND=スカイツリー
CONSUMER_KEY=<Your twitter consumer key>
CONSUMER_SECRET=<Your twitter consumer secret>
ACCESS_TOKEN=<Your twitter access token>
ACCESS_TOKEN_SECRET=<Your twitter access token secret>
```

You can get your API keys from here (https://apps.twitter.com/).

Then run index.js:

```
node index.js
```

If the intensity around the specified point changed, a tweet like this will be posted:

```
Rainfall intensity changed from 並の雨 to 弱い雨 around 自宅
```

## Debugging

You can debug the program by setting 'DEBUG' to 1.

```
SCHEDULE='* * * * * *' DEBUG=1 node index.js
```

With the command above, the previous intensity is set to デバッグ, so that you will get the following tweet when you run the program:

```
Rainfall intensity changed from デバッグ to 降雨なし around スカイツリー
```

## Docker Support

Build your image:

```
docker build -t tta .
```

And run (if you want, daemonize with `-d` option):

```
docker run \
  --env SCHEDULE="0 */5 * * * *" \
  --env LATITUDE=35.7100627 \
  --env LONGITUDE=139.8085117 \
  --env AROUND=スカイツリー \
  --env CONSUMER_KEY=<Your twitter consumer key> \
  --env CONSUMER_SECRET=<Your twitter consumer secret> \
  --env ACCESS_TOKEN=<Your twitter access token> \
  --env ACCESS_TOKEN_SECRET=<Your twitter access token secret> \
  --name tta tta
```
