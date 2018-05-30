export default class Command{
  // is_wait_click : クリックによってコマンドを終了とするかどうか
  // is_skippable  : クリックによってコマンドを終了状態までスキップできるかどうか
  // is_wait_end   : コマンドの終了を待つかどうか
  // command_manager : コマンドマネージャーのインスタンス
  constructor(is_wait_click, is_skippable, is_wait_end, command_manager){
    this.is_wait_click = is_wait_click;
    this.is_skippable = is_skippable;
    this.is_wait_end = is_wait_end;
    this.is_end = false;  // コマンドの終了
    this.command_manager = command_manager;
    // updateをtickに登録
    // createjs.Ticker.addEventListener("tick", function(){this.update()}.bind(this));
  }

  on_click(){
  }

  // 終了処理
  command_end(){
    // for debug
    // console.log("command_end");

    if(this.is_wait_end){
      this.command_manager.wait_end--;
    }
    // この時点でクリックによるコマンドの終了を判定して良い
    if(this.is_wait_click){
      this.command_manager.wait_click--;
    }
    this.is_end = true;

    // Listenerから削除
    // createjs.Ticker.removeEventListener("tick", function(){this.update()}.bind(this));
  }

  update(){
  }
};
