var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    Utils.shuffle = function (arr, times, span) {
        if (times === void 0) { times = 15; }
        if (span === void 0) { span = 5; }
        times = times == undefined ? 15 : times;
        span = span == undefined ? 5 : span;
        var index0;
        var index1;
        var len = arr.length;
        var i = 0;
        var temp;
        var r0;
        var r1;
        while (times > 0) {
            index0 = Math.floor(Math.random() * len);
            index1 = Math.floor(Math.random() * len);
            while (index0 == index1) {
                index1 = Math.floor(Math.random() * len);
            }
            for (i = 0; i < span; i++) {
                r0 = index0 % len;
                r1 = index1 % len;
                temp = arr[r0];
                arr[r0] = arr[r1];
                arr[r1] = temp;
                index0++;
                index1++;
            }
            times--;
        }
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
