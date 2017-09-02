"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var stringify = require("json-stable-stringify");
var shorthash_1 = require("shorthash");
var qs = require("querystring");
var nock = require("nock");
var path_1 = require("path");
var fs = require("fs");
var lower = function (s) { return s.toLowerCase(); };
var bind = function (f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return f.bind.apply(f, [null].concat(args));
};
var hash = function (obj) { return shorthash_1.unique(stringify(obj)); };
var escapePath = function (path) {
    return lower(path.replace(/\W+?/g, '_'));
};
var domain = function (s) {
    return s.match(/^https?:\/\/[w.]*([\S][^\/:]+)/)[1];
};
var parse = function (raw) {
    try {
        return JSON.parse(raw);
    }
    catch (e) {
        return qs.parse(raw);
    }
};
var title = function (_a) {
    var method = _a.method, path = _a.path, body = _a.body, queries = _a.queries;
    return "" + lower(method) + escapePath(path) + "-" + hash(queries) + "-" + hash(body) + ".json";
};
var prepareRecord = function (_a) {
    var path = _a.path, body = _a.body, rest = __rest(_a, ["path", "body"]);
    return Object.assign(rest, {
        queries: qs.parse(path.split('?')[1]),
        body: body ? parse(body) : body,
        path: path.split('?')[0]
    });
};
var saveRecord = function (collection, record) {
    var scopeFolder = path_1.join(collection, domain(record.scope));
    if (!fs.existsSync(scopeFolder))
        fs.mkdirSync(scopeFolder);
    record = prepareRecord(record);
    var recordPath = path_1.join(scopeFolder, title(record));
    if (fs.existsSync(recordPath))
        return;
    console.log("\uD83D\uDCFC  [ava-playback] new playback is recorded: " + recordPath);
    fs.writeFileSync(recordPath, stringify(record, { space: 2 }), { encoding: 'utf8' });
};
exports.default = function (collection) {
    console.log('📼  [ava-playback] running in record mode');
    nock.recorder.rec({ output_objects: true, dont_print: true });
    process.on('message', function (_a) {
        var name = _a.name;
        if (name === 'ava-teardown')
            nock.recorder.play().map(bind(saveRecord, collection));
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JlY29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGlEQUFrRDtBQUNsRCx1Q0FBK0M7QUFDL0MsZ0NBQWlDO0FBQ2pDLDJCQUE0QjtBQUM1Qiw2QkFBMkI7QUFDM0IsdUJBQXdCO0FBSXhCLElBQU0sS0FBSyxHQUFHLFVBQUMsQ0FBUyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFmLENBQWUsQ0FBQTtBQUM1QyxJQUFNLElBQUksR0FBRyxVQUFDLENBQVc7SUFBRSxjQUFjO1NBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztRQUFkLDZCQUFjOztJQUFLLE9BQUEsQ0FBQyxDQUFDLElBQUksT0FBTixDQUFDLEdBQU0sSUFBSSxTQUFLLElBQUk7QUFBcEIsQ0FBcUIsQ0FBQTtBQUNuRSxJQUFNLElBQUksR0FBRyxVQUFDLEdBQVEsSUFBSyxPQUFBLGtCQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQXpCLENBQXlCLENBQUE7QUFFcEQsSUFBTSxVQUFVLEdBQUcsVUFBQyxJQUFZO0lBQzlCLE9BQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQWpDLENBQWlDLENBQUE7QUFFbkMsSUFBTSxNQUFNLEdBQUcsVUFBQyxDQUFTO0lBQ3ZCLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBRSxDQUFDLENBQUMsQ0FBQztBQUE3QyxDQUE2QyxDQUFBO0FBRS9DLElBQU0sS0FBSyxHQUFHLFVBQUMsR0FBVztJQUN4QixJQUFJLENBQUM7UUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUFDLENBQUM7SUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEVB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