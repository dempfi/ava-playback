"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseWrapper = (function () {
    function ResponseWrapper(response) {
        this.response = response;
        this.chunks = [];
        this.subscribe();
        this.mockPush();
        this.mockSetEncoding();
    }
    ResponseWrapper.wrap = function (response) {
        return new ResponseWrapper(response);
    };
    ResponseWrapper.prototype.onEnd = function (cb) {
        this.whenDone = cb;
    };
    /**
     * We need to be aware of changes to the stream's encoding so that we
     * don't accidentally mangle the data.
     */
    ResponseWrapper.prototype.mockSetEncoding = function () {
        var _this = this;
        var original = this.response.setEncoding;
        this.response.setEncoding = function (encoding) {
            _this.encoding = encoding;
            return original.call(_this.response, encoding);
        };
    };
    ResponseWrapper.prototype.mockPush = function () {
        var _this = this;
        var original = this.response.push;
        this.response.push = function (chunk, encoding) {
            if (!chunk)
                return original.call(_this.response, chunk, encoding);
            if (_this.encoding)
                chunk = new Buffer(chunk, _this.encoding);
            _this.chunks.push(chunk);
            return original.call(_this.response, chunk, encoding);
        };
    };
    ResponseWrapper.prototype.subscribe = function () {
        var _this = this;
        this.response.once('end', function () { return _this.whenDone(_this.chunks); });
    };
    return ResponseWrapper;
}());
exports.ResponseWrapper = ResponseWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2Utd3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWNvcmRlci9yZXNwb25zZS13cmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFLRSx5QkFBNEIsUUFBeUI7UUFBekIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFIN0MsV0FBTSxHQUFhLEVBQUUsQ0FBQTtRQUkzQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2YsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO0lBQ3hCLENBQUM7SUFFTSxvQkFBSSxHQUFYLFVBQVksUUFBeUI7UUFDbkMsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFFRCwrQkFBSyxHQUFMLFVBQU0sRUFBOEI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUVEOzs7T0FHRztJQUNLLHlDQUFlLEdBQXZCO1FBQUEsaUJBTUM7UUFMQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQTtRQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxVQUFDLFFBQWdCO1lBQzNDLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1lBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDL0MsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUVPLGtDQUFRLEdBQWhCO1FBQUEsaUJBUUM7UUFQQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQTtRQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxVQUFDLEtBQVUsRUFBRSxRQUFpQjtZQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUNoRSxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDO2dCQUFDLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQzNELEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3ZCLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ3RELENBQUMsQ0FBQTtJQUNILENBQUM7SUFFTyxtQ0FBUyxHQUFqQjtRQUFBLGlCQUVDO1FBREMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0M7QUE1Q1ksMENBQWUifQ==