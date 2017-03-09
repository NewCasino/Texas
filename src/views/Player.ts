class Player extends eui.Component{
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onCreated, this);
		this.skinName = "resource/eui_skins/custom/PlayerSkin.exml";
	}

	public setPlayerData(playerData){
		this["lab_name"].text = playerData.name;
		this["lab_balance"].text = playerData.balance;
	}

	private onCreated(evt:eui.UIEvent){
		console.log("on created complete");
	}
}