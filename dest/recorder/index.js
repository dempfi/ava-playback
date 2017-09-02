"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var URL = require("url");
var common = require("../common");
var response_wrapper_1 = require("./response-wrapper");
var records = new Set();
var currentRecordingId = 0;
var normalizeOptions = function (options) {
    if (typeof options !== 'string')
        return options;
    var _a = URL.parse(options), hostname = _a.hostname, port = _a.port, path = _a.path;
    return { hostname: hostname, method: 'GET', port: Number(port), path: path };
};
// const prepareRecord = (req: ClientRequest, requestBody) => ({
// })
exports.default = function () {
    currentRecordingId += 1;
    common.override(function (protocol, overriddenRequest, rawOptions, callback) {
        var requestBodyChunks = [];
        var options = normalizeOptions(rawOptions);
        var request = overriddenRequest(options, function (response) {
            var wrapper = response_wrapper_1.ResponseWrapper.wrap(response);
            wrapper.onEnd(function (chunks) {
                console.log(requestBodyChunks);
                console.log(Buffer.concat(chunks).toString('utf8'));
            });
            if (callback)
                callback(response);
            else
                response.resume();
        });
        var write = request.write;
        request.write = function (chunk, encoding) {
            if (typeof chunk === 'undefined')
                return write.apply(request, arguments);
            if (!Buffer.isBuffer(chunk))
                chunk = new Buffer(chunk, encoding);
            requestBodyChunks.push(chunk);
            return write.apply(request, arguments);
        };
        return request;
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVjb3JkZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx5QkFBMEI7QUFDMUIsa0NBQW1DO0FBQ25DLHVEQUFvRDtBQUVwRCxJQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFBO0FBQ3pCLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxDQUFBO0FBRTFCLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxPQUFnQztJQUN4RCxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUM7UUFBQyxNQUFNLENBQUMsT0FBTyxDQUFBO0lBQ3pDLElBQUEsdUJBQTZDLEVBQTNDLHNCQUFRLEVBQUUsY0FBSSxFQUFFLGNBQUksQ0FBdUI7SUFDbkQsTUFBTSxDQUFDLEVBQUUsUUFBUSxVQUFBLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLENBQUE7QUFDOUQsQ0FBQyxDQUFBO0FBRUQsZ0VBQWdFO0FBRWhFLEtBQUs7QUFFTCxrQkFBZTtJQUNiLGtCQUFrQixJQUFJLENBQUMsQ0FBQTtJQUN2QixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxRQUFRO1FBQ2hFLElBQU0saUJBQWlCLEdBQWEsRUFBRSxDQUFBO1FBQ3RDLElBQU0sT0FBTyxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRTVDLElBQU0sT0FBTyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxVQUFBLFFBQVE7WUFDakQsSUFBTSxPQUFPLEdBQUcsa0NBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFFOUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFBLE1BQU07Z0JBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtnQkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1lBQ3JELENBQUMsQ0FBQyxDQUFBO1lBRUYsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNoQyxJQUFJO2dCQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUN4QixDQUFDLENBQUMsQ0FBQTtRQUVGLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUE7UUFDM0IsT0FBTyxDQUFDLEtBQUssR0FBRyxVQUFVLEtBQXNCLEVBQUUsUUFBYztZQUM5RCxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxXQUFXLENBQUM7Z0JBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBQ3hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFBQyxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQ2hFLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFDeEMsQ0FBQyxDQUFBO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQTtJQUNoQixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQSJ9