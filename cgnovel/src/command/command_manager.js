export default class CommandManager{
  constructor(){
    this.command_list = {};
    // クリック待ちのコマンドの数
    this.wait_click = 0;
    // 終了を待たねばならないコマンドの数
    this.wait_end = 0;
  }

  push_command(key, command){
    if(command.is_wait_click){
      this.wait_click++;
    }
    if(command.is_wait_end){
      this.wait_end++;
    }

    this.command_list[key] = command;
  }

  on_click(){
    // クリックイベントの通知
    for(let key in this.command_list){
      this.command_list[key].on_click();
    }
  }

  get is_wait_click(){
    return (this.wait_click !== 0);
  }

  get is_wait_end(){
    return (this.wait_end !== 0);
  }
};
