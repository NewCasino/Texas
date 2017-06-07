var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Desk = (function (_super) {
    __extends(Desk, _super);
    function Desk() {
        var _this = _super.call(this) || this;
        _this.playersDisplay = {};
        _this.initFlag = false;
        _this.dataFlag = false;
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onCreated, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
        _this.skinName = "resource/eui_skins/custom/DeskSkin.exml";
        return _this;
    }
    Desk.prototype.onRemoved = function (evt) {
        for (var i = 0; i <= 6; i++) {
            this["cards" + i].visible = false;
            this["player" + i].visible = false;
        }
    };
    Desk.prototype.onExit = function (evt) {
        GameMgr.getInstance().send({ p: Proto.PROTO_LEAVE });
    };
    Desk.prototype.onCreated = function (evt) {
        this["btn_exit"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExit, this);
        for (var i = 0; i <= 6; i++) {
            var player = this["player" + i];
            player.setCardPlay(this["cards" + i]);
            this["cards" + i].visible = false;
            player.visible = false;
            this.playersDisplay[i] = player;
        }
        this.initFlag = true;
        if (this.dataFlag) {
            this.applyData();
        }
        console.log("Desk on created complete");
    };
    Desk.prototype.applyData = function () {
        this.dataFlag = false;
        var len = this.players.length;
        for (var i = 0; i < len; i++) {
            var player = this.players[i]; //GameMgr.getInstance().getPlayerData(this.players[i]);
            var pos = player.pos;
            var playerDisplay = this.playersDisplay[pos];
            playerDisplay.setPlayerData(player);
            playerDisplay.visible = true;
        }
    };
    Desk.prototype.setData = function (table, players) {
        this.table = table;
        this.players = players;
        if (this.initFlag) {
            this.applyData();
        }
        else {
            this.dataFlag = true;
        }
    };
    Desk.getInstance = function () {
        if (Desk._instance === undefined) {
            Desk._instance = new Desk();
        }
        return Desk._instance;
    };
    return Desk;
}(eui.Component));
__reflect(Desk.prototype, "Desk");
