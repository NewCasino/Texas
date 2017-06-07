/**
 * Player's Card holder
 */
class Cards extends eui.Component{
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onCreated, this);
		this.skinName = "resource/eui_skins/custom/CardsSkin.exml";
	}

	private onCreated(evt:eui.UIEvent){
		console.log("Cards created complete");
	}
}