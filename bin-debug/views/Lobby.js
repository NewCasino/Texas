var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lobby = (function (_super) {
    __extends(Lobby, _super);
    function Lobby() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onCreated, _this);
        _this.skinName = "resource/eui_skins/custom/LobbySkin.exml";
        return _this;
    }
    Lobby.prototype.onCreated = function (evt) {
        console.log("Lobby on created complete");
    };
    Lobby.getInstance = function () {
        if (Lobby._instance === undefined) {
            Lobby._instance = new Lobby();
        }
        return Lobby._instance;
    };
    return Lobby;
}(eui.Component));
__reflect(Lobby.prototype, "Lobby");
