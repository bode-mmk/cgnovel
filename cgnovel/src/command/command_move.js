import Command from './command.js';
import MovePattern from "../move_pattern/move_pattern.js";
import MoveJump from "../move_pattern/jump.js";
import MoveSlide from "../move_pattern/slide.js";

export default class CommandMove extends Command{
  // character[name][current_key]を渡す
  constructor(object_character, move_pattern_string, parameters, command_manager){
    super(false, false, false, command_manager);

    //move_pattern判定
    if(move_pattern_string === ':jump'){
      //jumpはy方向のlimitとy方向の増加値
      this.move_pattern = new MoveJump(Number(parameters[0]), Number(parameters[1]));
    }else if(move_pattern_string === ':slide'){
      //slideはx方向のlimitとx方向の増加値(-でも良い)
      this.move_pattern = new MoveSlide(Number(parameters[0]), Number(parameters[1]));
    }

    this.character = object_character;
  }

  update(){
    let pos = this.move_pattern.update( this.character.get_xy() );
    this.character.set_xy(pos.x, pos.y);
    if(this.move_pattern.is_end){
      this.command_end();
    }
  }
};
