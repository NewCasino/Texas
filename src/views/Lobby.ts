class Lobby extends eui.Component{
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onCreated, this);
		this.skinName = "resource/eui_skins/custom/LobbySkin.exml";
	}

	private onCreated(evt:eui.UIEvent){
		console.log("Lobby on created complete");
	}

	private static _instance:Lobby;
	public static getInstance():Lobby{
		if( Lobby._instance === undefined){
			Lobby._instance = new Lobby();
		}
		return Lobby._instance;
	}
}