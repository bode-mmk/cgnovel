export default class Message{
	constructor(message_text){
    this.message_text = message_text;
    this.text = new createjs.Text("","bold 32px ニューロダン", "Black");
    this.text.x = 175;
    this.text.y = 565;
    this.clock = 0;
    this.counter = 0;
    this.is_end = false;
		this.speed = 0;
	}

  tick_update(){
    if(this.is_end){
      return 0;
    }
    this.clock++;

    if(this.clock > this.speed){
      this.counter++;
      this.text.text = this.message_text.slice(0, this.counter);
      if(this.counter == this.message_text.length){
        this.is_end = true;
      }
      this.clock = 0;

      // もし、改行が入ったら一呼吸おきたいね
			// 特殊文字種は増やしたい感あるしエスケープシーケンスも入れないといけないかも
			// パース処理欲しい
      if(this.message_text.substr(this.counter - 1, 1) === '\n'){
        this.clock = -30;
      // =が入っても一呼吸おく
      }else if(this.message_text.substr(this.counter, 1) === '='){
        this.clock = -30;
        this.message_text = this.message_text.slice(0, this.counter) + this.message_text.slice(this.counter + 1);
      }
    }
  }

	skip(){
		this.counter = this.message_text.length - 1;

		// 後文字も変えておく必要がある
		this.message_text = this.message_text.replace(/=/g,'');
	}

  set_message(message_text, speed){
    this.message_text = message_text;
    this.clock = 0;
    this.counter = 0;
    this.is_end = false;
		this.speed = speed;
  }
};
