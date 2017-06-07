var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * for:Local Test or Single Dog use
 * author:ado
 */
var LocalServer = (function (_super) {
    __extends(LocalServer, _super);
    function LocalServer() {
        var _this = _super.call(this) || this;
        _this.tables = {};
        _this.players = {};
        _this.playerIds = [1];
        _this.tableIds = [];
        _this.initSomeFakeTableAndPlayer();
        return _this;
    }
    LocalServer.prototype.send = function (data) {
        var proto = data.p;
        switch (proto) {
            case Proto.PROTO_INIT:
                var player = { id: 1, name: "小明", money: 999999, pos: 0, status: GameConsts.STATE_FREE, table: -1 };
                this.players[1] = player;
                GameMgr.getInstance().onData({ p: proto, r: player });
                break;
            case Proto.PROTO_LOBBY:
                var tables = [];
                var len = this.tableIds.length;
                for (var i = 0; i < len; i++) {
                    tables.push(this.tables[this.tableIds[i]]);
                }
                GameMgr.getInstance().onData({ p: proto, r: tables });
                break;
            case Proto.PROTO_JOIN:
                var id = data.id;
                if (this.tableIds.indexOf(id) == -1) {
                    GameMgr.getInstance().onData({ p: proto, errId: 404, errMsg: "Table not exsit." });
                    return;
                }
                this.tables[id].players.push(1);
                this.getPos(this.tables[id], this.players[1]);
                this.players[1].table = id;
                var players = [];
                len = this.tables[id].players.length;
                for (var i = 0; i < len; i++) {
                    players.push(this.players[this.tables[id].players[i]]);
                }
                GameMgr.getInstance().onData({ p: proto, r: { t: this.tables[id], p: players } });
                break;
            case Proto.PROTO_LEAVE:
                player = this.players[1];
                if (player.table != -1) {
                    var table = this.tables[player.table];
                    var index = table.players.indexOf(player.id);
                    if (index != -1) {
                        table.players.splice(index, 1);
                    }
                    player.table = -1;
                    player.status = GameConsts.STATE_FREE;
                    GameMgr.getInstance().onData({ p: Proto.PROTO_LEAVE, r: player });
                }
                else {
                    GameMgr.getInstance().onData({ p: Proto.PROTO_LEAVE, errId: 501, errMsg: "not on table" });
                }
                break;
            default:
                egret.warn('cannot find protocal:', proto);
        }
    };
    LocalServer.prototype.join = function (playerId, tableId) {
        var player = this.players[playerId];
        var table = this.tables[tableId];
        if (player == undefined || player == null) {
            GameMgr.getInstance().onData({ p: Proto.PROTO_JOIN, errId: 404, errMsg: "player not exsit" });
            return;
        }
        if (table == undefined || table == null) {
            GameMgr.getInstance().onData({ p: Proto.PROTO_JOIN, errId: 404, errMsg: "table not exsit" });
            return;
        }
        if (table.players.length >= table.max) {
            GameMgr.getInstance().onData({ p: Proto.PROTO_JOIN, errId: 405, errMsg: "table if full" });
            return;
        }
    };
    LocalServer.prototype.initSomeFakeTableAndPlayer = function () {
        for (var i = 0; i < 10; i++) {
            var id = i + 1;
            var table = { id: id, players: [], max: 7, turn: 0, pos: 0, num: 0 };
            this.tableIds.push(id);
            this.tables[id] = table;
        }
        for (var i = 0; i < 50; i++) {
            var id = Math.random() * 10000 >> 0;
            while (this.playerIds.indexOf(id) != -1) {
                id = Math.random() * 10000 >> 0;
            }
            var name_1 = "player" + id;
            var money = Math.random() * 100000 >> 0;
            var player = { id: id, name: name_1, money: money, status: GameConsts.STATE_FREE, pos: 0, table: -1 };
            this.playerIds.push(id);
            this.players[id] = player;
            //join random table
            var needJoin = Math.random() < 0.7;
            if (needJoin) {
                var tableId = this.tableIds[Math.random() * 10 >> 0];
                var table = this.tables[tableId];
                if (table.players.length >= table.max - 1) {
                    continue;
                }
                table.players.push(id);
                table.num = table.players.length;
                player.table = tableId;
                this.getPos(table, player);
            }
        }
    };
    LocalServer.prototype.getPos = function (table, player) {
        for (var i = 0; i < 6; i++) {
            if (!(table.pos & (1 << i))) {
                player.pos = i;
                table.pos = table.pos | (1 << i);
                egret.log("Generate Position:", table.id, table.pos);
                break;
            }
        }
    };
    LocalServer.getInstance = function () {
        if (LocalServer._instance === undefined) {
            LocalServer._instance = new LocalServer();
        }
        return LocalServer._instance;
    };
    return LocalServer;
}(egret.HashObject));
__reflect(LocalServer.prototype, "LocalServer");
