import Command from './command.js';

export default class CommandBlackout extends Command{
  // addには-も指定できる その場合、ブラックアウトした状態から復帰するものと扱われる
  constructor(alpha_add, object_black_screen, command_manager, stage, object_message_box){
    super(false, false, false);

    this.alpha_add = alpha_add;
    this.black_screen = object_black_screen;
    // this.black_screen.alpha = 0.0;
    this.black_screen.visible = true;

    // この時点で登録しておく
    stage.removeChild(this.black_screen);
    stage.addChildAt(this.black_screen, stage.getChildIndex(object_message_box));
  }

  update(){
    let alpha = this.black_screen.alpha + this.alpha_add;
    if(alpha > 1.0 && this.alpha_add > 0){
      alpha = 1.0;
      this.command_end();
    }else if(alpha < 0.0 && this.alpha_add < 0){
      alpha = 0.0;
      this.command_end();
    }
    this.black_screen.alpha = alpha;
  }
}
