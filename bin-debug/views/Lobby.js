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
        _this.inited = false;
        _this.dataFlag = false;
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onCreated, _this);
        _this.skinName = "resource/eui_skins/custom/LobbySkin.exml";
        return _this;
    }
    Lobby.prototype.onCreated = function (evt) {
        this.inited = true;
        if (this.dataFlag) {
            this.appleTables();
        }
        console.log("Lobby on created complete");
    };
    Lobby.prototype.setup = function (tables) {
        this.tables = tables;
        if (this.inited) {
            this.appleTables();
        }
        else {
            this.dataFlag = true;
        }
    };
    Lobby.prototype.appleTables = function () {
        this.dataFlag = false;
        var len = this.tables.length;
        for (var i = 0; i < len; i++) {
            var deskTile = DeskTile.gain();
            deskTile.setData(this.tables[i]);
            this["desk_con"].addChild(deskTile);
        }
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
