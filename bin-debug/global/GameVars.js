var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameVars = (function () {
    function GameVars() {
    }
    return GameVars;
}());
GameVars.Version = "dev-th-0.0.1";
__reflect(GameVars.prototype, "GameVars");
