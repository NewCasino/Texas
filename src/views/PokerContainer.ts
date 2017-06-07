/**
 * Two poker hoder for player on desk
 */
class PokerContainer extends eui.Component{
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onCreated, this);
		this.skinName = "resource/eui_skins/custom/PokerContainerSkin.exml";
	}
	
	private onCreated(evt:eui.UIEvent){
		console.log("PokerContainer on created complete");
	}
}