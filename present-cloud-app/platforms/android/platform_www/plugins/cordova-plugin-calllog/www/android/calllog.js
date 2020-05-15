cordova.define("cordova-plugin-calllog.CallLogAndroid", function(require, exports, module) {
module.exports = {
  hasReadPermission: function(successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'CallLog', 'hasReadPermission', []);
  },
  requestReadPermission: function(successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'CallLog', 'requestReadPermission', []);
  }
};
});
