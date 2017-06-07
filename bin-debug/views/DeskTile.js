var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DeskTile = (function (_super) {
    __extends(DeskTile, _super);
    function DeskTile() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onCreated, _this);
        _this.skinName = "resource/eui_skins/custom/DeskTileSkin.exml";
        return _this;
    }
    DeskTile.prototype.onCreated = function (evt) {
        console.log("DeskTile on created complete");
        this["btn_join"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoin, this);
    };
    DeskTile.prototype.onJoin = function (evt) {
        console.log("Join");
        GameVars.Root.removeChild(Lobby.getInstance());
        GameVars.Root.addChild(Desk.getInstance());
    };
    return DeskTile;
}(eui.Component));
__reflect(DeskTile.prototype, "DeskTile");
