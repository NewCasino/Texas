class PlayerData extends egret.HashObject{
	public constructor() {
		super();
	}
	public id:string;
	public name:string;
	public money:number;
	public joinRate:number;
	public winRate:number;
	public totalTimes:number;
	public status:number;
	public pos:number;
	public table:number = -1;
	public fromData(data){
		this.id = data.id;
		this.name = data.name;
		this.money = data.money;
		this.pos = data.pos;
		this.table = data.table;
		this.status = data.status;
	}

	private static pool:PlayerData[] = [];
	public static recycle(data:PlayerData){
		if( PlayerData.pool.indexOf(data) == -1){
			PlayerData.pool.push(data);
		}
	}

	public static gain():PlayerData{
		if( PlayerData.pool.length != 0){
			return PlayerData.pool.pop();
		}
		return new PlayerData();
	}
}