import Command from './command.js';

export default class CommandWait extends Command{
  constructor(command_manager){
    super(true, false, true, command_manager);
  }

  update(){
    // 他の終了を全て観測する
    let end = true;
    for(let key in this.command_manager.command_list){
      if(key !== ":wait" && !this.command_manager.command_list[key].is_end){
        end = false;
      }
    }

    // 終了を観測できればコマンドは終わり クリック待ちへ
    if(end){
      this.command_end();
    }
  }
}
