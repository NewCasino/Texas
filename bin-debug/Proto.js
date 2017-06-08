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
Proto.PROTO_LEAVE = 3;
Proto.PROTO_TURN = 4;
Proto.PROTO_GIVEUP = 5;
Proto.PROTO_CALL = 6;
Proto.PROTO_RAISE = 7;
Proto.PROTO_PLAYER = 8;
Proto.PROTO_START = 9;
Proto.PROTO_BET = 10;
__reflect(Proto.prototype, "Proto");
