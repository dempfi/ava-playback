"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modules = { http: require('http'), https: require('https') };
exports.default = function (overrider) {
    return Object.keys(modules).forEach(function (protocol) {
        var module = modules[protocol];
        var overriddenGet = module.get;
        var overriddenRequest = module.request;
        module.request = function (options, callback) {
            return overrider(protocol, overriddenRequest.bind(module), options, callback);
        };
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcnJpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbW9uL292ZXJyaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsSUFBTSxPQUFPLEdBQVksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQTtBQUUzRSxrQkFBZSxVQUFDLFNBQW9CO0lBQ2xDLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO1FBQ25DLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNoQyxJQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFBO1FBQ2hDLElBQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQTtRQUV4QyxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQUMsT0FBTyxFQUFFLFFBQVE7WUFDakMsT0FBQSxTQUFTLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO1FBQXRFLENBQXNFLENBQUE7SUFDMUUsQ0FBQyxDQUFDO0FBUEYsQ0FPRSxDQUFBIn0=