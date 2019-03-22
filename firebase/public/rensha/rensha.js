//初期化
enchant();
//ゲーム画面
var game = new Core(640, 640);
//FPS
game.fps = 60;
//背景色
game.rootScene.backgroundColor = "red";
//アセットプリロード
game.preload('enchantjs/images/chara1.png');
game.preload('images/title.png');
game.preload('images/button_master.png');
game.preload('images/button_beginner.png');
game.preload('images/meijin.png');
game.preload('images/watermelon.png');
game.preload('images/explosion.png');
game.preload('images/cutin.png');
game.preload('images/cutin_face.png');

//ゲームスタート
game.start(); // start your game!

//onLoad
game.onload = function () {
    startTitleScene();
};

//タイトル
function startTitleScene() {
    var title = new Sprite(640, 640);
    title.image = game.assets["images/title.png"];
    game.rootScene.addChild(title);

    var button_master = new Sprite(600, 100);
    button_master.image = game.assets["images/button_master.png"];
    button_master.x = 20;
    button_master.y = 300;
    button_master.on('touchstart', function (e) {
        this.touchEnabled = false;
        this.tl.scaleTo(0.95, 0.95, 3);
        this.tl.scaleTo(1, 1, 3);
        this.tl.then(function () {
            //シーン遷移
            startGameScene(16);
        });
    });
    game.rootScene.addChild(button_master);

    var button_beginner = new Sprite(600, 100);
    button_beginner.image = game.assets["images/button_beginner.png"];
    button_beginner.x = 20;
    button_beginner.y = 420;
    button_beginner.on('touchstart', function (e) {
        this.tl.scaleTo(0.95, 0.95, 3);
        this.tl.scaleTo(1, 1, 3);
        this.tl.then(function () {
            //シーン遷移
            startGameScene(8);
        });
    });
    game.rootScene.addChild(button_beginner);
}

//ゲームシーン
function startGameScene(tap) {
    var tapCount = 0;
    //シーン作成
    var gameScene = new Scene();
    gameScene.backgroundColor = "white";
    gameScene.on('touchstart', function (e) {
        tapCount++;
        label.text = tapCount + "tap/sec";
        indicator.width = (indicator_back.width / tap) * tapCount;
        console.log(indicator.width);
        if (indicator.width == indicator_back.width) {
            cutin(gameScene);
        }
        meijin.tl.moveBy(0, 3, 1);
    });
    gameScene.on('touchend', function (e) {
        meijin.tl.moveBy(0, -3, 1);
    });
    gameScene.tl.delay(60);
    gameScene.tl.then(function () {
        tapCount = 0;
        indicator.width = (indicator_back.width / tap) * tapCount;
        label.text = tapCount + "tap/sec";
    });
    gameScene.tl.loop();
    game.pushScene(gameScene);

    //インジケーター
    var indicator_panel = new Sprite(600, 40);
    indicator_panel.backgroundColor = "#444444";
    indicator_panel.borderStyle = "solid";
    indicator_panel.borderColor = "white";
    indicator_panel.x = 20;
    indicator_panel.y = 20;
    gameScene.addChild(indicator_panel);

    var indicator_back = new Sprite(596, 36);
    indicator_back.backgroundColor = "#ffffff";
    indicator_back.x = 22;
    indicator_back.y = 22;
    gameScene.addChild(indicator_back);

    var indicator = new Sprite(596, 36);
    indicator.backgroundColor = "#999999";
    indicator.x = 22;
    indicator.y = 22;
    gameScene.addChild(indicator);


    //インジケーターのラベル
    var label = new Label();
    label.width = 110;
    label.textAlign = "right";
    label.color = "#444444";
    label.text = "0tap/sec";
    label.font = "20px osaka";
    label.x = 20;
    label.y = 30;
    gameScene.addChild(label);

    //プレイヤー
    var meijin = new Sprite(416, 476);
    meijin.image = game.assets["images/meijin.png"];
    meijin.x = 100;
    meijin.y = 100;
    gameScene.addChild(meijin);

    //アイテム
    var item = new Sprite(234, 232);
    item.image = game.assets["images/watermelon.png"];
    item.x = 283;
    item.y = 383;
    gameScene.addChild(item);
}


function gameClear(gameScene) {
    gameScene.touchEnabled = false;
    var explosion = new Sprite(640, 480);
    explosion.image = game.assets["images/explosion.png"];
    explosion.tl.scaleTo(0.8, 0.8, 0);
    explosion.rotation = -90;
    explosion.x = 90;
    explosion.y = 250;
    gameScene.addChild(explosion);

    explosion.frame = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, null];
    explosion.addEventListener(Event.ANIMATION_END, function () {
        this.remove();
    });

    //    game.stop();
}

function cutin(gameScene) {
    var cutinGroup = new Group();
    cutinGroup.x = 640;
    cutinGroup.y = 0;
    gameScene.addChild(cutinGroup);
    cutinGroup.tl.moveTo(0, 0, 6);
    cutinGroup.tl.delay(60);
    cutinGroup.tl.then(function () {
        cutinGroup.remove();
        gameClear(gameScene);
    });


    var back = new Sprite(640, 240);
    back.image = game.assets["images/cutin.png"];
    back.frame = [0, 1, 2, 3];
    back.tl.scaleTo(1.2, 1.288, 0);
    back.rotation = -10;
    back.x = 0;
    back.y = 239;
    cutinGroup.addChild(back);

    var face = new Sprite(640, 518);
    face.image = game.assets["images/cutin_face.png"];
    face.tl.scaleTo(0.6, 0.6, 0);
    face.rotation = -10;
    face.x = 0;
    face.y = 100;
    cutinGroup.addChild(face);
}