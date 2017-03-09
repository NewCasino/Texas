class MainView extends eui.Component{
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.onCreated, this);
		this.skinName = "resource/eui_skins/custom/MainViewSkin.exml";
	}

	private onCreated(evt:eui.UIEvent){
		console.log("on created complete");
		this.addChild(new Player());
	}

	private static _instance:MainView;
	public static getInstance():MainView{
		if( MainView._instance === undefined){
			MainView._instance = new MainView();
		}
		return MainView._instance;
	}
}