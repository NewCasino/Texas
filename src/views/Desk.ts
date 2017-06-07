class Desk extends eui.Component{
	private playersDisplay = {};
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onCreated, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
		this.skinName = "resource/eui_skins/custom/DeskSkin.exml";
	}

	private onRemoved(evt:egret.Event){
		for(let i = 0; i<=6; i++){
			this["cards"+i].visible = false;
			this["player"+i].visible = false;
		}
	}
	
	private onExit(evt:egret.TouchEvent){
		GameMgr.getInstance().send({p:Proto.PROTO_LEAVE});
	}

	private initFlag = false;
	private dataFlag = false;
	private onCreated(evt:eui.UIEvent){
		this["btn_exit"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExit, this);
		for(let i = 0; i<=6; i++){
			let player:Player = this["player"+i];
			player.setCardPlay(this["cards"+i]);
			this["cards"+i].visible = false;
			player.visible = false;
			this.playersDisplay[i] = player;
		}
		this.initFlag = true;
		if( this.dataFlag ){
			this.applyData();
		}
		console.log("Desk on created complete");
	}

	private applyData(){
		this.dataFlag = false;
		let len = this.players.length;
		for(let i=0; i<len; i++){
			let player:PlayerData = this.players[i];//GameMgr.getInstance().getPlayerData(this.players[i]);
			let pos = player.pos;
			let playerDisplay:Player = this.playersDisplay[pos];
			playerDisplay.setPlayerData(player);
			playerDisplay.visible = true;
		}
	}

	private table:DeskData;
	private players:PlayerData[];
	public setData(table:DeskData,players){
		this.table = table;
		this.players = players;
		if( this.initFlag){
			this.applyData();
		}else{
			this.dataFlag = true;
		}
	}

	private static _instance:Desk;
	public static getInstance():Desk{
		if( Desk._instance === undefined){
			Desk._instance = new Desk();
		}
		return Desk._instance;
	}
}