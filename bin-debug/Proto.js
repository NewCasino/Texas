var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Proto = (function () {
    function Proto() {
    }
    return Proto;
}());
Proto.PROTO_INIT = 0;
Proto.PROTO_LOBBY = 1;
Proto.PROTO_JOIN = 2;
Proto.PROTO_TURN = 3;
Proto.PROTO_GIVEUP = 4;
Proto.PROTO_CALL = 5;
Proto.PROTO_RAISE = 6;
__reflect(Proto.prototype, "Proto");
