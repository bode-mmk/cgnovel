import Circle from './object/circle.js';
import Message from './object/message.js';
import Name from './object/name.js';
import Character from './object/character.js';
import CommandManager from './command/command_manager.js';
import CommandMessage from './command/command_message.js';
import CommandLoad from './command/command_load.js';
import CommandShow from './command/command_show.js';
import CommandMove from './command/command_move.js';

export default class CGNovel{
  constructor(window_width, window_height){
    this.constants = {};
    this.constants.width = window_width;
    this.constants.height = window_height;

    this.object = {};

    // キャラクターらへんは将来もっとスマートに管理できるようにする
    this.object.character = {};
    this.object.character_current_key = {};

    this.data = {};
    this.data.is_loaded = false;
    this.data.content = [];

    this.manager = new CommandManager();
  }

  read_file(file_name){
    let file = new XMLHttpRequest();
    file.open("GET", file_name, true);
    file.onreadystatechange = function(){
      if(file.readyState === 4 && file.status === 200){
        this.data.content = file.responseText.split('\n');
        // |は改行に
        for(let i = 0; i < this.data.content.length; ++i){
          this.data.content[i] = this.data.content[i].replace("|", "\n");
        }
        this.data.is_loaded = true;
      }
    }.bind(this);
    file.send(null);
  }

  get width(){
    return this.constants.width;
  }

  get height(){
    return this.constants.height;
  }

  init(){
    // Stageオブジェクトの作成
    this.stage = new createjs.Stage("main_canvas");

    // 各描画オブジェクトの用意

    // 背景
    this.object.background = new createjs.Bitmap("./img/background/background.png");
    this.stage.addChild(this.object.background);

    // 黒背景
    this.object.black_screen = new createjs.Shape();
    this.object.black_screen.graphics.beginFill();
    this.object.black_screen.graphics.drawRect(0, 0,this.width, this.height);
    this.object.black_screen.visible = false;
    this.stage.addChild(this.object.black_screen);

    // 台詞の枠
    this.object.message_box = new createjs.Bitmap("./img/tips/message.png");
    this.stage.addChild(this.object.message_box);

    // 名前
    this.object.message_name = new Name("");
    this.stage.addChild(this.object.message_name.text);

    // 文章部分
    this.object.message = new Message("");
    this.stage.addChild(this.object.message.text);

    // Ticker登録
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", function(){this.main_loop()}.bind(this));
    createjs.Ticker.addEventListener("tick", this.stage);

    // クリック
    this.object.background.addEventListener("click", function(){this.on_click()}.bind(this));
  }

  main_loop(){
    // 終了待ちでもクリック待ちでもなければ
    // (あとデータがきちんと読み込まれているか)
    if(!this.manager.is_wait_end && !this.manager.is_wait_click && this.data.is_loaded){
      // 1行読み込み
      let command = this.data.content.shift();

      // 解析
      // これもしかしてshiftとか使ったほうが綺麗にかけたりするかな？
      let strings = command.split(",");
      if(strings[0] === ":message"){
        this.manager.push_command(strings[0], new CommandMessage(strings[1], strings[2], 2, this.object.message_name, this.object.message, this.manager));
      }else if(strings[0] === ":load"){
        this.manager.push_command(strings[0], new CommandLoad(strings[1], strings[2], this.object.character, this.manager, this.stage, this.object.message_box));
      }else if(strings[0] === ":show"){
        this.manager.push_command(strings[0], new CommandShow(strings[1], strings[2], strings[3], strings[4], this.object.character, this.object.character_current_key, this.manager));
      }else if(strings[0] === ":move"){
        this.manager.push_command(strings[0], new CommandMove(this.object.character[strings[1]][this.object.character_current_key[strings[1]]], strings[2], strings.slice(3),this.manager));
      }
    }

    // これはやんちゃ
    for(let key in this.manager.command_list){
      if(!this.manager.command_list[key].is_end){
        this.manager.command_list[key].update();
      }
    }
  }

  on_click(){
    this.manager.on_click();
  }
};
