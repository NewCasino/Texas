var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DeskData = (function (_super) {
    __extends(DeskData, _super);
    function DeskData() {
        return _super.call(this) || this;
    }
    DeskData.prototype.fromData = function (data) {
        this.id = data.id;
        this.max = data.max;
        this.curTurn = data.turn;
        this.curNum = data.num;
    };
    DeskData.prototype.join = function (player) {
    };
    DeskData.prototype.leave = function (player) {
    };
    DeskData.prototype.reset = function () {
    };
    DeskData.recycle = function (data) {
        if (DeskData.pool.indexOf(data) == -1) {
            DeskData.pool.push(data);
        }
    };
    DeskData.gain = function () {
        if (DeskData.pool.length != 0) {
            return DeskData.pool.pop();
        }
        return new DeskData();
    };
    return DeskData;
}(egret.EventDispatcher));
DeskData.pool = [];
__reflect(DeskData.prototype, "DeskData");
