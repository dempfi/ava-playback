![ava-playback-logo](http://i.imgur.com/FP71xh5.png)

___

Dealing with HTTP requests in the tests can be painful and what is more important error prone, since you have to stub everything by hand. There are few libraries to help with this situation, like [node-nock](https://github.com/node-nock/nock) but their setup in tests is something complicated(IDK why) and they require manual setup in your tests. Ava-playback tries to help here. In record mode, when you write your test, you just allow your app to call real APIs and when you ready, you just turn off your `record` mode and it's done.


### Installation
First things first

```
yarn add ava-playback
```

or

```
npm i ava-playback --save
```

Then in you `package.json` where you store your ava config just add a requirement of `ava-playback`.

```json
  // ...
  "ava": {
    "require": [
      "ava-playback"
    ]
  },
  // ...
```

🎉 that's it.

### Playbacks location

By default playbacks will be stored in root of your project in `/playbacks` folder, if you want to change the location just add `playbacks` settings in your `package.json`.

```json
  // ...
  "ava": {
    "require": [
      "ava-playback"
    ]
    "playbacks": "tests/fixtures"
  },
  // ...
```
