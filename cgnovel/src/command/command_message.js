import Command from './command.js';

export default class CommandMessage extends Command{
  constructor(name, message, speed, object_name, object_message, command_manager){
    super(true, true, false, command_manager);

    // 描画オブジェクトを持ってくる
    this.object = {};
    this.object.name = object_name;
    this.object.message = object_message;

    this.object.name.text.text = name;
    this.object.message.set_message(message, speed);
  }

  on_click(){
    // 現在表示中か？
    if(!this.object.message.is_end){
      // 最後まで飛ばす
      this.object.message.skip();
    }else{
      // コマンドが終了したことを示す
      this.command_end();
    }
  }

  update(){
    this.object.message.tick_update();
  }
};
