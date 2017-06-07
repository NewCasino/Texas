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
        _this.skinName = "resource/eui_skins/custom/DeskSkin.exml";
        return _this;
    }
    Desk.prototype.onCreated = function (evt) {
        for (var i = 0; i <= 6; i++) {
            var player = this["player" + i];
            player.setCardPlay(this["cards" + i]);
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
            var player = GameMgr.getInstance().getPlayerData(this.players[i]);
            if (player) {
                var pos = player.pos;
                var playerDisplay = this.playersDisplay[pos];
                playerDisplay.setPlayerData(player);
            }
        }
    };
    Desk.prototype.setData = function (table, playerIds) {
        this.table = table;
        this.players = playerIds;
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
