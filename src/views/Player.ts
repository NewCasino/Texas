class Player extends eui.Component{
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onCreated, this);
		this.skinName = "resource/eui_skins/custom/PlayerSkin.exml";
	}

	public setPlayerData(playerData:PlayerData){
		this["lab_status"].text = "等待中";
		this["lab_balance"].text = playerData.money;
	}
	
	private cardDisplay:Cards;
	public setCardPlay(card:Cards){
		this.cardDisplay = card;
	}

	private onCreated(evt:eui.UIEvent){
		console.log("on created complete");
	}
}