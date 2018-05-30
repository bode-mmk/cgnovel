import Command from './command.js';

export default class CommandShow extends Command{
  constructor(character_name, key, x, y, object_character, object_character_current_key, command_manager){
    super(false, false, true, command_manager);

    this.show(x, y, key, character_name, object_character, object_character_current_key);
  }

  show(x, y, key, character_name, object_character, object_character_current_key){
    // 現在のものを非表示に
    // なんつーかここアホみたいなコードじゃない？そんな事無い？
    let current = object_character[character_name][object_character_current_key[character_name]];
    if(current){
      current.set_visible(false);
    }

    let next = object_character[character_name][key];

    // 次の画像を表示
    next.set_xy(x, y);
    next.set_visible(true);
    object_character_current_key[character_name] = key;

    // コマンド終了
    this.command_end();
  }
};
