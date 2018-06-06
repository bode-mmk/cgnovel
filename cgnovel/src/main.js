import CGNovel from './core.js';

// APP instance
var CGNOVEL = new CGNovel(window.innerWidth, window.innerHeight, "main_canvas");

// スクリプトファイルの読み込み
CGNOVEL.read_file("./script/indigo.src");

// 初期化処理
window.addEventListener("load", function(){ CGNOVEL.init() });
