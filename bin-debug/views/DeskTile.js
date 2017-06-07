var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * DeskTile for the Lobby
 */
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
        console.log("Join", this.table.id);
        GameMgr.getInstance().send({ p: Proto.PROTO_JOIN, id: this.table.id });
        // GameVars.Root.removeChild(Lobby.getInstance());
        // GameVars.Root.addChild(Desk.getInstance());
    };
    DeskTile.prototype.setData = function (data) {
        this.table = data;
        this["lab"].text = "人数：" + this.table.curNum + "/" + this.table.max;
    };
    DeskTile.recycle = function (tile) {
        if (tile.parent != null) {
            egret.warn("DeskTile.recycle:please remove from stage before recycle");
            return;
        }
        if (DeskTile._pool.indexOf(tile) == -1) {
            DeskTile._pool.push(tile);
        }
    };
    DeskTile.gain = function () {
        if (DeskTile._pool.length != 0) {
            return DeskTile._pool.pop();
        }
        return new DeskTile();
    };
    return DeskTile;
}(eui.Component));
DeskTile._pool = [];
__reflect(DeskTile.prototype, "DeskTile");
