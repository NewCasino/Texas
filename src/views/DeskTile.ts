class DeskTile extends eui.Component{
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onCreated, this);
		this.skinName = "resource/eui_skins/custom/DeskTileSkin.exml";
	}
	
	private onCreated(evt:eui.UIEvent){
		console.log("DeskTile on created complete");
		this["btn_join"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJoin, this);
	}


	private onJoin(evt:egret.TouchEvent){
		console.log("Join");
		GameVars.Root.removeChild(Lobby.getInstance());
		GameVars.Root.addChild(Desk.getInstance());
	}
}