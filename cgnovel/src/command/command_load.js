import Command from './command.js';
import Character from '../object/character.js';

export default class CommandLoad extends Command{
  constructor(character_name,path,object_character, command_manager, stage, object_message){
    super(false, false, true, command_manager);

    this.character = object_character;
    this.load(character_name, path, stage, object_message);
  }

  load(character_name, path, stage, object_message){
    let c = new Character("./img/" + character_name + "/" + path + ".png", 0);
    stage.addChildAt(c.bitmap, stage.getChildIndex(object_message));

    if( !this.character[character_name] ){
      this.character[character_name] = {};
    }

    this.character[character_name][path] = c;

    // 読み込みが終わったらコマンド終了
    this.command_end();
  }
};
