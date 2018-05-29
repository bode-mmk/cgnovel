export default class Circle{
	constructor(x, y, d, stage){
		this.shape = new createjs.Shape();
		this.shape.graphics.beginFill("Red").drawCircle(x, y, d);
	}
};