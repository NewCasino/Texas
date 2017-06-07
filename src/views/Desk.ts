class Desk extends eui.Component{
	private playersDisplay = {};
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onCreated, this);
		this.skinName = "resource/eui_skins/custom/DeskSkin.exml";
	}
	private initFlag = false;
	private dataFlag = false;
	private onCreated(evt:eui.UIEvent){
		for(let i = 0; i<=6; i++){
			let player:Player = this["player"+i];
			player.setCardPlay(this["cards"+i]);
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
			let player:PlayerData = GameMgr.getInstance().getPlayerData(this.players[i]);
			if( player ){
				let pos = player.pos;
				let playerDisplay:Player = this.playersDisplay[pos];
				playerDisplay.setPlayerData(player);
			}
		}
	}

	private table:DeskData;
	private players:number[];
	public setData(table:DeskData,playerIds){
		this.table = table;
		this.players = playerIds;
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