/**
 * for:Local Test or Single Dog use
 * author:ado
 */
class LocalServer extends egret.HashObject{
	private tables = {};
	private players = {};
	private playerIds = [1];
	private tableIds = [];
	public constructor() {
		super();
		this.initSomeFakeTableAndPlayer();
	}

	public send(data){
		let proto = data.p;
		switch(proto){
			case Proto.PROTO_INIT:
			let player = {id:1,name:"小明",money:999999,pos:0,status:GameConsts.STATE_FREE, table:-1};
			this.players[1] = player;
			GameMgr.getInstance().onData({p:proto, r:player});
			break;
			case Proto.PROTO_LOBBY:
			let tables = [];
			let len = this.tableIds.length;
			for(let i = 0; i < len; i++){
				tables.push(this.tables[this.tableIds[i]]);
			}
			GameMgr.getInstance().onData({p:proto, r:tables});
			break;
			case Proto.PROTO_JOIN:
			let id = data.id;
			if( this.tableIds.indexOf(id) == -1){
				GameMgr.getInstance().onData({p:proto,errId:404,errMsg:"Table not exsit."});
				return;
			}
			
			this.tables[id].players.push(1);
			this.getPos(this.tables[id], this.players[1]);
			this.players[1].table = id;
			let players = [];
			len = this.tables[id].players.length;
			for( let i = 0; i < len; i++){
				players.push(this.players[this.tables[id].players[i]]);
			}
			GameMgr.getInstance().onData({p:proto,r:{t:this.tables[id],p:players}});
			break
			case Proto.PROTO_LEAVE:
			player = this.players[1];
			if( player.table != -1){
				let table = this.tables[player.table];
				let index = table.players.indexOf(player.id);
				if( index != -1){
					table.players.splice(index, 1);
				}
				player.table = -1;
				player.status = GameConsts.STATE_FREE;
				GameMgr.getInstance().onData({p:Proto.PROTO_LEAVE,r:player});
			}else{
				GameMgr.getInstance().onData({p:Proto.PROTO_LEAVE,errId:501,errMsg:"not on table"});
			}
			break;
			default:
			egret.warn('cannot find protocal:',proto)		
		}
	}

	private join(playerId, tableId){
		let player = this.players[playerId];
		let table = this.tables[tableId];
		if( player == undefined || player == null){
			GameMgr.getInstance().onData({p:Proto.PROTO_JOIN,errId:404,errMsg:"player not exsit"});
			return;
		}
		if( table == undefined || table == null){
			GameMgr.getInstance().onData({p:Proto.PROTO_JOIN,errId:404,errMsg:"table not exsit"});
			return;
		}
		if( table.players.length >= table.max){
			GameMgr.getInstance().onData({p:Proto.PROTO_JOIN,errId:405,errMsg:"table if full"});
			return;
		}
	}

	private initSomeFakeTableAndPlayer(){
		for( let i = 0; i < 10; i++){
			let id = i+1;
			let table = {id:id,players:[],max:7,turn:0,pos:0,num:0};
			this.tableIds.push(id);
			this.tables[id] = table;
		}

		for(let i =0; i < 50; i++){
			let id = Math.random() * 10000 >> 0;
			while(this.playerIds.indexOf(id) != -1){
				id = Math.random() * 10000 >> 0;
			} 
			let name = "player"+id;
			let money = Math.random() * 100000 >> 0; 
			let player = {id:id, name:name, money:money,status:GameConsts.STATE_FREE,pos:0,table:-1};
			this.playerIds.push(id);
			this.players[id] = player;
			
			//join random table
			let needJoin = Math.random() < 0.7;
			if( needJoin){
				let tableId = this.tableIds[Math.random()*10 >> 0];
				let table = this.tables[tableId];
				if( table.players.length >= table.max - 1){
					continue;
				}
				table.players.push(id);
				table.num = table.players.length;
				player.table = tableId;
				this.getPos(table, player);
			}
			
		}
	}

	private getPos(table,player){
		for(let i = 0; i < 6; i++){
			if(!( table.pos & (1 << i))){
				player.pos = i;
				table.pos = table.pos | (1 << i);
				egret.log("Generate Position:",table.id, table.pos);
				break;
			}
		}
	}

	private static _instance:LocalServer;
	public static getInstance():LocalServer{
		if( LocalServer._instance === undefined){
			LocalServer._instance = new LocalServer();
		}
		return LocalServer._instance;
	}
}