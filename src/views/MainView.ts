class MainView extends eui.Component{
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE,this.onSkinLoaded,this);
		this.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
		this.skinName = "resource/eui_skins/custom/MainViewSkin.exml";
	}

	private onComplete(evt:egret.Event){
		console.log("onComplete.")
	}
	
	private onSkinLoaded(evt:eui.UIEvent){
		console.log("Skin is loaded.");
	}

	public partAdded(partName:string, instance:any){
		super.partAdded(partName, instance);
		console.log(partName);
	}

	public childrenCreated(){
		super.childrenCreated();
		console.log("childrenCreated")
	}

	private static _instance:MainView;
	public static getInstance():MainView{
		if( MainView._instance === undefined){
			MainView._instance = new MainView();
		}
		return MainView._instance;
	}
}