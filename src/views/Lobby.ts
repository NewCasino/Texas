class Lobby extends eui.Component{
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onCreated, this);
		this.skinName = "resource/eui_skins/custom/LobbySkin.exml";
	}
	private inited = false;
	private dataFlag = false;
	private updateFlag = false;

	private onCreated(evt:eui.UIEvent){
		this.inited = true;
		if( this.dataFlag){
			this.appleTables();
		}
		console.log("Lobby on created complete");
	}
	private tables ;
	public setup(tables){
		this.tables = tables;
		if( this.inited){
			this.appleTables();
		}else{
			this.dataFlag = true;
		}
	}

	private appleTables(){
		this.dataFlag = false;
		let len = this.tables.length;
		for(let i =0; i < len; i++){
			let deskTile = DeskTile.gain();
			deskTile.setData(this.tables[i]);
			this["desk_con"].addChild(deskTile);
		}
		
	}

	public checkUpdate(){
		
	}
	private static _instance:Lobby;
	public static getInstance():Lobby{
		if( Lobby._instance === undefined){
			Lobby._instance = new Lobby();
		}
		return Lobby._instance;
	}
}