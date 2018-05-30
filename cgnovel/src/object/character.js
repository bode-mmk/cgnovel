export default class Character{
	constructor(file_path, x){
    this.bitmap = new createjs.Bitmap(file_path);
    this.bitmap.x = x;
    this.bitmap.y = 0;
    this.bitmap.visible = false;
	}

  set_visible(is_visible){
    this.bitmap.visible = is_visible;
  }

	set_xy(x, y){
		this.bitmap.x = x;
		this.bitmap.y = y;
	}

	get_xy(){
		return {x:this.bitmap.x, y:this.bitmap.y };
	}
};
