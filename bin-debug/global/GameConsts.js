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
GameConsts.TABLE_JOIN = "join_table";
GameConsts.TABLE_LEAVE = "leave_table";
GameConsts.TABLE_START = "start_table";
GameConsts.ROUND_END = "round_end";
__reflect(GameConsts.prototype, "GameConsts");
