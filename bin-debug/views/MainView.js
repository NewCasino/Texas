var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onSkinLoaded, _this);
        _this.addEventListener(egret.Event.COMPLETE, _this.onComplete, _this);
        _this.skinName = "resource/eui_skins/custom/MainViewSkin.exml";
        return _this;
    }
    MainView.prototype.onComplete = function (evt) {
        console.log("onComplete.");
    };
    MainView.prototype.onSkinLoaded = function (evt) {
        console.log("Skin is loaded.");
    };
    MainView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        console.log(partName);
    };
    MainView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        console.log("childrenCreated");
    };
    MainView.getInstance = function () {
        if (MainView._instance === undefined) {
            MainView._instance = new MainView();
        }
        return MainView._instance;
    };
    return MainView;
}(eui.Component));
__reflect(MainView.prototype, "MainView");
