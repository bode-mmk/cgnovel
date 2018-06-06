import MovePattern from './move_pattern.js';

export default class MoveJump extends MovePattern{
  constructor(y_limit, y_add){
    super();

    this.y_limit = y_limit;
    this.y_add = y_add;
    this.y_first = 0;
  }

  // jump的な動き
  update(position){
    // 初期位置の記録
    if(this.counter == 0){
      this.y_first = position.y;
    }

    this.counter++;

    position.y += this.y_add;

    // limitからも引く
    this.y_limit -= this.y_add;
    // 0以下になったら反転
    if(this.y_limit <= 0){
      this.y_add *= -1;
    }
    // 初期位置を下回ったらやめ
    if(position.y <= this.y_first){
      position.y = this.y_first;
      this.is_end = true;
    }

    return position;
  }
};
