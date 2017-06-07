var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameMgr = (function (_super) {
    __extends(GameMgr, _super);
    function GameMgr() {
        var _this = _super.call(this) || this;
        _this.server = LocalServer.getInstance();
        _this.tables = {};
        _this.players = {};
        return _this;
    }
    GameMgr.prototype.send = function (data) {
        this.server.send(data);
    };
    GameMgr.prototype.start = function () {
        this.server.send({ p: Proto.PROTO_INIT });
        this.server.send({ p: Proto.PROTO_LOBBY });
    };
    GameMgr.prototype.onData = function (data) {
        var proto = data.p;
        switch (proto) {
            case Proto.PROTO_INIT:
                this.me = PlayerData.gain();
                this.me.fromData(data.r);
                this.players[data.r.id] = this.me;
                break;
            case Proto.PROTO_LOBBY:
                var len = data.r.length;
                var tables = [];
                for (var i = 0; i < len; i++) {
                    var temp = data.r[i];
                    if (this.tables[temp.id] != undefined && this.tables[temp.id] != null) {
                        tables.push(this.tables[temp.id]);
                    }
                    else {
                        var table_1 = DeskData.gain();
                        table_1.fromData(temp);
                        tables.push(table_1);
                    }
                }
                Lobby.getInstance().setup(tables);
                break;
            case Proto.PROTO_JOIN:
                GameVars.Root.removeChild(Lobby.getInstance());
                GameVars.Root.addChild(Desk.getInstance());
                var table = void 0;
                if (this.tables[data.r.t.id]) {
                    table = this.tables[data.r.t.id];
                }
                else {
                    table = DeskData.gain();
                    this.tables[data.r.t.id] = table;
                }
                table.fromData(data.r.t);
                var players = data.r.p;
                len = players.length;
                for (var i = 0; i < len; i++) {
                    var player = void 0;
                    if (this.players[players[i]]) {
                        player = this.players[players[i]];
                    }
                    else {
                        player = PlayerData.gain();
                        this.players[players[i].id] = player;
                    }
                    player.fromData(players[i]);
                }
                Desk.getInstance().setData(table, data.r.p);
                break;
        }
    };
    GameMgr.prototype.getPlayerData = function (pid) {
        return this.players[pid];
    };
    GameMgr.getInstance = function () {
        if (GameMgr._instance === undefined) {
            GameMgr._instance = new GameMgr();
        }
        return GameMgr._instance;
    };
    return GameMgr;
}(egret.HashObject));
__reflect(GameMgr.prototype, "GameMgr");
