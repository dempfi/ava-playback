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
var fs = require("fs");
var nock = require("nock");
var querystring_1 = require("querystring");
var path_1 = require("path");
var lodash_1 = require("lodash");
var bind = function (f) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return f.bind.apply(f, [null].concat(args));
};
var join = function (str1) { return function (str2) { return path_1.join(str1, str2); }; };
var definePersistent = function (defs) {
    return nock.define(defs).map(function (m) { return m.persist(); });
};
var skipAsterisk = function (s) {
    if (s === '*')
        return true;
};
var pathMatcher = function (path, queries, matching) {
    var _a = matching.split('?'), matchingPath = _a[0], matchingQueries = _a[1];
    if (path !== matchingPath)
        return false;
    var equality = lodash_1.isEqualWith(queries, querystring_1.parse(matchingQueries), skipAsterisk);
    return equality;
};
var asteriskToRx = function (value) {
    if (value === '*')
        return /.*/gi;
    if (lodash_1.isArray(value))
        return value.map(asteriskToRx);
    if (lodash_1.isPlainObject(value))
        return lodash_1.mapValues(value, asteriskToRx);
    return value;
};
var defineMatchers = function (_a) {
    var queries = _a.queries, def = __rest(_a, ["queries"]);
    return Object.assign(def, {
        path: bind(pathMatcher, def.path, queries),
        body: asteriskToRx(def.body)
    });
};
var readFile = function (filePath) {
    return fs.readFileSync(filePath, { encoding: 'utf8' });
};
var readRecord = function (recordPath) {
    return JSON.parse(readFile(recordPath));
};
var recordsByScope = function (scopeName) {
    return fs.readdirSync(scopeName)
        .map(join(scopeName))
        .map(readRecord)
        .map(defineMatchers);
};
exports.default = function (playbacksPath) {
    return fs.readdirSync(playbacksPath)
        .map(join(playbacksPath))
        .map(recordsByScope)
        .map(definePersistent);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGxheWJhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx1QkFBd0I7QUFDeEIsMkJBQTRCO0FBQzVCLDJDQUFtQztBQUNuQyw2QkFBbUM7QUFDbkMsaUNBTWU7QUFJZixJQUFNLElBQUksR0FBRyxVQUFDLENBQVc7SUFBRSxjQUFjO1NBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztRQUFkLDZCQUFjOztJQUFLLE9BQUEsQ0FBQyxDQUFDLElBQUksT0FBTixDQUFDLEdBQU0sSUFBSSxTQUFLLElBQUk7QUFBcEIsQ0FBcUIsQ0FBQTtBQUNuRSxJQUFNLElBQUksR0FBRyxVQUFDLElBQVksSUFBSyxPQUFBLFVBQUMsSUFBWSxJQUFLLE9BQUEsV0FBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBaEIsQ0FBZ0IsRUFBbEMsQ0FBa0MsQ0FBQTtBQUVqRSxJQUFNLGdCQUFnQixHQUFHLFVBQUMsSUFBMkI7SUFDbkQsT0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBWCxDQUFXLENBQUM7QUFBdkMsQ0FBdUMsQ0FBQTtBQUV6QyxJQUFNLFlBQVksR0FBRyxVQUFDLENBQU07SUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQztRQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUE7QUFDNUIsQ0FBQyxDQUFBO0FBRUQsSUFBTSxXQUFXLEdBQUcsVUFBQyxJQUFZLEVBQUUsT0FBWSxFQUFFLFFBQWdCO0lBQ3pELElBQUEsd0JBQXFELEVBQXBELG9CQUFZLEVBQUUsdUJBQWUsQ0FBdUI7SUFDM0QsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQztRQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUE7SUFDdkMsSUFBTSxRQUFRLEdBQUcsb0JBQU8sQ0FBQyxPQUFPLEVBQUUsbUJBQUssQ0FBQyxlQUFlLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUN2RSxNQUFNLENBQUMsUUFBUSxDQUFBO0FBQ2pCLENBQUMsQ0FBQTtBQUVELElBQU0sWUFBWSxHQUFHLFVBQUMsS0FBVTtJQUM5QixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDO1FBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQTtJQUNoQyxFQUFFLENBQUMsQ0FBQyxnQkFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDbEQsRUFBRSxDQUFDLENBQUMsc0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxrQkFBUyxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUMxRCxNQUFNLENBQUMsS0FBSyxDQUFBO0FBQ2QsQ0FBQyxDQUFBO0FBRUQsSUFBTSxjQUFjLEdBQUcsVUFBQyxFQUErQjtJQUE3QixJQUFBLG9CQUFPLEVBQUUsNkJBQU07SUFBbUIsTUFBTSxDQUFOLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQzdFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO1FBQzFDLElBQUksRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztLQUM3QixDQUFDLENBQUE7Q0FBQSxDQUFBO0FBRUYsSUFBTSxRQUFRLEdBQUcsVUFBQyxRQUFnQjtJQUNoQyxPQUFBLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQS9DLENBQStDLENBQUE7QUFFakQsSUFBTSxVQUFVLEdBQUcsVUFBQyxVQUFrQjtJQUNwQyxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQWhDLENBQWdDLENBQUE7QUFFbEMsSUFBTSxjQUFjLEdBQUcsVUFBQyxTQUFpQjtJQUN2QyxPQUFBLEVBQUUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO1NBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDcEIsR0FBRyxDQUFDLFVBQVUsQ0FBQztTQUNmLEdBQUcsQ0FBQyxjQUFjLENBQUM7QUFIdEIsQ0FHc0IsQ0FBQTtBQUV4QixrQkFBZSxVQUFDLGFBQXFCO0lBQ25DLE9BQUEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7U0FDMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN4QixHQUFHLENBQUMsY0FBYyxDQUFDO1NBQ25CLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUh4QixDQUd3QixDQUFBIn0=