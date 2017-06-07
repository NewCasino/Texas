class Desk extends eui.Component{
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onCreated, this);
		this.skinName = "resource/eui_skins/custom/DeskSkin.exml";
	}

	private onCreated(evt:eui.UIEvent){
		console.log("Desk on created complete");
	}

	private static _instance:Desk;
	public static getInstance():Desk{
		if( Desk._instance === undefined){
			Desk._instance = new Desk();
		}
		return Desk._instance;
	}
}