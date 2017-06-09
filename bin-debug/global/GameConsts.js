var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConsts = (function () {
    function GameConsts() {
    }
    return GameConsts;
}());
GameConsts.STATE_FREE = 0;
GameConsts.STATE_IN = 1;
GameConsts.STATE_WATCH = 2;
GameConsts.TABLE_READY = 0; //player not enough, ready phase
GameConsts.TABLE_BLIND_BET = 1; //start and blind bet
__reflect(GameConsts.prototype, "GameConsts");
