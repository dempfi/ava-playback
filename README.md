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

By default playbacks will be stored in the root of your project in `/playbacks` folder, if you want to change the location just add `playbacks` settings in your `package.json`.

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

### Modes
`ava-playback` uses env variable `AVA_PLAYBACK` to get information how it should run. If `AVA_PLAYBACK` isn't set, `ava-playback` will not do anything.

- `AVA_PLAYBACK=record` record all new outgoing requests from your tests
- `AVA_PLAYBACK=play` turn off HTTP/HTTPS connection and use playbacks to reply to the outgoing requests from the tests

### Usage

With `ava-playback` the flow of writing actual test can look like this.

1. You write a new test and don't activate `ava-playback` in any mode.
2. When the test is ready you run it one more time with `AVA_PLAYBACK=record` env variable. `ava-playback` will record only missing playbacks to playbacks location.
3. You edit new playbacks according to your needs ([wildcard](#wildcards-and-security) auth tokens in the body or in the queries).
4. Check all tests with `AVA_PLAYBACK=play` mode to verify they pass.
5. Done 🚀

To illustrate the flow take a look at this example

```sh
# Write new test file
NODE_ENV=test ava --watch 'new-test-file.js'

# Record all playbacks required for 'new-test-file.js'
NODE_ENV=test AVA_PLAYBACK=record ava 'new-test-file.js'

# Check all tests together
NODE_ENV=test AVA_PLAYBACK=play ava
```

### Wildcards and security

By default `ava-playback` stores and plays back your requests by taking into account all queries and body. However, you can change this option to hide security information, like tokens in queries.

For example, Slack API allows tokens to be in query params, like `slack.com/api/users.list?token=xoxb-XXXXXXXXXX-Z7RKNoLIKOXLPKqtxUy5IhJ5`. It's totally fine unless you don't want this token to be stored in git or be available in Travis-ci. For those cases, you can use wildcards feature of `ava-playback`.

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

and all future requests to slack API with anything in place of the actual token will be caught by `ava-playback`.

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
