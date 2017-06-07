class GameMgr extends egret.HashObject{
	
	private server:LocalServer = LocalServer.getInstance();
	private me:PlayerData;
	private tables;
	private players;
	public constructor() {
		super();
		this.tables = {};
		this.players = {};
	}

	public send(data){
		this.server.send(data);
	}

	public start(){
		this.server.send({p:Proto.PROTO_INIT});
		this.server.send({p:Proto.PROTO_LOBBY});
	}

	public onData(data){
		let proto = data.p;
		switch(proto){
			case Proto.PROTO_INIT:
			this.me = PlayerData.gain();
			this.me.fromData(data.r);
			this.players[data.r.id] = this.me;
			break;
			case Proto.PROTO_LOBBY:
			let len = data.r.length;
			let tables = [];
			for(let i = 0; i < len; i++){
				let temp = data.r[i];
				if( this.tables[temp.id] != undefined && this.tables[temp.id] != null){
					tables.push(this.tables[temp.id])
				}else{
					let table = DeskData.gain();
					table.fromData(temp);
					tables.push(table);
				}
			}
			Lobby.getInstance().setup(tables);
			break;
			case Proto.PROTO_JOIN:
			GameVars.Root.removeChild(Lobby.getInstance());
			GameVars.Root.addChild(Desk.getInstance());
			let table:DeskData;
			if( this.tables[data.r.t.id]){
				table = this.tables[data.r.t.id];
			}else{
				table = DeskData.gain();
				this.tables[data.r.t.id] = table;
			}
			table.fromData(data.r.t);
			let players = data.r.p;
			len = players.length;
			let p = [];
			for( let i =0; i < len; i++){
				let player:PlayerData;
				if( this.players[players[i]]){
					player = this.players[players[i]];
				}else{
					player = PlayerData.gain();
					this.players[players[i].id] = player;
				}
				player.fromData(players[i]);
				p.push(player);
			}
			Desk.getInstance().setData(table, p);
			break;
			case Proto.PROTO_LEAVE:
			this.me.fromData(data.r);
			GameVars.Root.removeChild(Desk.getInstance());
			GameVars.Root.addChild(Lobby.getInstance());
			break;
		}
	}
	public getPlayerData(pid):PlayerData{
		return this.players[pid];
	}
	private static _instance:GameMgr;
	public static getInstance():GameMgr{
		if( GameMgr._instance === undefined){
			GameMgr._instance = new GameMgr();
		}
		return GameMgr._instance;
	}
}