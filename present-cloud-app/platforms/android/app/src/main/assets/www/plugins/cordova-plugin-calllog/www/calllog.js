cordova.define("cordova-plugin-calllog.CallLog", function(require, exports, module) {
module.exports = {
  getCallLog: function(filters, successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, "CallLog", "getCallLog", [filters]);
  }
};
  
});
