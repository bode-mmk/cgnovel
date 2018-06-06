import MovePattern from './move_pattern.js';

export default class MoveSlide extends MovePattern{
  constructor(x_limit, x_add){
    super();

    this.x_limit = x_limit;
    this.x_add = x_add;
  }

  // 横スライド的な動き
  // (縦スライドは無いっしょｗ)
  update(position){
    // 一応カウンター
    this.counter++;

    // 足していくだけ
    position.x += this.x_add;

    // リミットが来たらやめる
    if( ((this.x_add < 0) && (position.x < this.x_limit)) ||
        ((this.x_add > 0) && (position.x > this.x_limit)) ){
      position.x = this.x_limit;
      this.is_end = true;
    }

    return position;
  }
};
