import MovePattern from './move_pattern.js';

export default class MoveJump extends MovePattern{
  constructor(y_limit, y_add){
    super();

    this.y_limit = y_limit;
    this.y_add = y_add;
  }

  // jump的な動き
  update(position){
    this.counter++;

    let add = this.y_add * this.counter;
    if(add > this.y_limit){
      add = 2 * this.y_limit - add; // this.y_limit - (add - this.y_limit);
      console.log("add:"+add);
    }
    if(add < 0){
      this.is_end = true;
      add = 0;
    }
    //position.y += add; ??????????
    position.y = Number(position.y) + Number(add);

    return position;
  }
};
