var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PlayerData = (function (_super) {
    __extends(PlayerData, _super);
    function PlayerData() {
        return _super.call(this) || this;
    }
    PlayerData.prototype.fromData = function (data) {
        this.id = data.id;
        this.name = data.name;
        this.money = data.money;
        this.pos = data.pos;
        this.status = data.status;
    };
    PlayerData.recycle = function (data) {
        if (PlayerData.pool.indexOf(data) == -1) {
            PlayerData.pool.push(data);
        }
    };
    PlayerData.gain = function () {
        if (PlayerData.pool.length != 0) {
            return PlayerData.pool.pop();
        }
        return new PlayerData();
    };
    return PlayerData;
}(egret.HashObject));
PlayerData.pool = [];
__reflect(PlayerData.prototype, "PlayerData");
