![ava-playback-logo](http://i.imgur.com/FP71xh5.png)

___

Dealing with HTTP requests in the tests can be painful and what is more important error prone, since we have to stub everything by hand. There are few libraries to help with this situation, like [node-nock](https://github.com/node-nock/nock). But their setup is something complicated (I didn't manage to setup [node-nock](https://github.com/node-nock/nock) to record requests and play them back) and they require a lot of manual steps to write single test.

**`ava-playback`** is here to help. In `record` mode, when you write your test, you just allow your app to call real APIs and when you ready, you just switch from `record`([how?]()) to playback mode and it's done 🎉


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
  }
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
    ],
    "playbacks": "tests/fixtures"
  },
  // ...
```

### Usage

