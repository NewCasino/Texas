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
        _this.addEventListener(eui.UIEvent.CREATION_COMPLETE, _this.onCreated, _this);
        _this.skinName = "resource/eui_skins/custom/MainViewSkin.exml";
        return _this;
    }
    MainView.prototype.onCreated = function (evt) {
        console.log("on created complete");
        this.addChild(new Player());
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