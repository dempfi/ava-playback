<p align="center"><img src="http://i.imgur.com/1vrCZff.png" width="360"/></p>

___

Dealing with HTTP requests in the tests can be painful and what is more important error prone, since we have to stub everything by hand. There are few libraries to help with this situation, like [node-nock](https://github.com/node-nock/nock). But their setup is something complicated (I didn't manage to setup [node-nock](https://github.com/node-nock/nock) to record requests and play them back) and they require a lot of manual steps to write single test.

📼 **`ava-playback`** is here to help. In `record` mode, when you write your test, you just allow your app to call real APIs and when you ready, you just switch from `record` to playback mode and it's done 🎉. In background `ava-playback` will record new requests and use already existing playbacks for the rest.


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

### Recording

When you write a new test, you have to turn `ava-playback` into `record` mode. It's really easy, you just need to specify `env` variable `AVA_PLAYBACK` in `record`, like this.

```sh
NODE_ENV=test AVA_PLAYBACK=record ava "new-test-file.js"
```

But you need to turn `ava-playback` off when you finish writing a new test. Just run ava without `AVA_PLAYBACK=record` env variable.

```sh
NODE_ENV=test ava
```

### Wildcards and security

By default `ava-playback` stores and plays back your requests by taking into account all queries and body. However, you can change this option to hide security information, like tokens in queries.

For example, Slack API allows tokens to be in query params, like `slack.com/api/users.list?token=xoxb-XXXXXXXXXX-Z7RKNoLIKOXLPKqtxUy5IhJ5`. It's totally fine unless you don't want this token to be stored in git or be available in Travis ci. For those cases, you can use wildcards feature of `ava-playback`.

After recording the playback, in you playbacks folder you can find the file matching that request and edit a `path` entry from

```
"/api/users.list?token=xoxb-XXXXXXXXXX-Z7RKNoLIKOXLPKqtxUy5IhJ5"
```

to

```
"/api/users.list?token=*"
```

so the file will look like this
```json
{
  "body": "",
  "method": "POST",
  "path": "/api/users.list?token=*",
  "scope": "https://slack.com:443",
  "status": 200,
}
```

and all future requests to slack api with anything in place of actual token will be catched by `ava-playback`.

<details>
  <summary><strong>Wildcard substitution rules</strong></summary>
  <p>

`ava-playback` support wildcards only for queries, however, this may change over. Wildcards can only catch whole strings as values or as part of an array like in the examples below.

Whole word match
```js
"/api/users.list?token=*"
```
will match these paths
```
"/api/users.list?token=34"
"/api/users.list?token=xoxb-XXXXXXXXXX-Z7RKNoLIKOXLPKqtxUy5IhJ5"
```

In array match
```js
"/api/users.list?tokens=78&tokens=*&tokens=some-token"
```
will match anything in the same position, like
```js
"/api/users.list?tokens=78&tokens=anything-here&tokens=some-token"
```
</p></details>


<div align="right"><sup>
  made with ❤️ by <a href="https://github.com/dempfi">@dempfi</a>
</sup></div>
