/**
 * DeskTile for the Lobby
 */
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
		console.log("Join",this.table.id);
		GameMgr.getInstance().send({p:Proto.PROTO_JOIN,id:this.table.id});
		// GameVars.Root.removeChild(Lobby.getInstance());
		// GameVars.Root.addChild(Desk.getInstance());
	}
	private table:DeskData;
	public setData(data:DeskData){
		this.table = data;
		this["lab"].text = "人数："+this.table.curNum+"/"+this.table.max;
	}

	private static _pool:DeskTile[] = [];
	public static recycle(tile:DeskTile){
		if( tile.parent != null){
			egret.warn("DeskTile.recycle:please remove from stage before recycle");
			return;
		}	
		if( DeskTile._pool.indexOf(tile) == -1){
			DeskTile._pool.push(tile);
		}
	}

	public static gain():DeskTile{
		if( DeskTile._pool.length != 0){
			return DeskTile._pool.pop();
		}
		return new DeskTile();
	}
}