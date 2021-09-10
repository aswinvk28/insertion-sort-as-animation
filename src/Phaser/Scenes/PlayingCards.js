import Phaser from 'phaser';

export default class PlayingCards extends Phaser.Scene {

  init(data) {
    this.dataProps = data;
    this.objects = {};
    this.order = null;
  }

  LoadCards() {
    this.load.image('one', 'images/ace-card.png');
    this.load.image('two', 'images/two-card.png');
    this.load.image('three', 'images/three-card.png');
    this.load.image('four', 'images/four-card.png');
    this.load.image('five', 'images/five-card.png');
    this.load.image('six', 'images/six-card.png');
  }

  preload() {
    this.LoadCards();
  }

  create() {
    this.objects['5'] = this.add.image(120, 120, 'five');
    this.objects['5'].setData('num', 5);
    this.objects['2'] = this.add.sprite(220, 120, 'two');
    this.objects['2'].setData('num', 2);
    this.objects['4'] = this.add.sprite(320, 120, 'four');
    this.objects['4'].setData('num', 4);
    this.objects['6'] = this.add.sprite(420, 120, 'six');
    this.objects['6'].setData('num', 6);
    this.objects['1'] = this.add.sprite(520, 120, 'one');
    this.objects['1'].setData('num', 1);
    this.objects['3'] = this.add.sprite(620, 120, 'three');
    this.objects['3'].setData('num', 3);
    this.order = ['5', '2', '4', '6', '1', '3'];

    this.objects['1'].setInteractive();
    this.objects['2'].setInteractive();
    this.objects['3'].setInteractive();
    this.objects['4'].setInteractive();
    this.objects['5'].setInteractive();
    this.objects['6'].setInteractive();

    this.physics.add.existing(this.objects['1']);
    this.physics.add.existing(this.objects['2']);
    this.physics.add.existing(this.objects['3']);
    this.physics.add.existing(this.objects['4']);
    this.physics.add.existing(this.objects['5']);
    this.physics.add.existing(this.objects['6']);

    this.MoveCards();

  }

  MoveCards() {
    this.cards = [];
    var temp = null;
    function task(instance, i) {
      setTimeout(function(instance) {
        var key = instance.order[i];
        var j = i - 1;
        if(j >= 0 && (parseInt(instance.order[j]) > parseInt(key))) {
          instance.StartAnimate(instance.objects[key]);
          console.log(key);
        }
        while (j >= 0 && parseInt(instance.order[j]) > parseInt(key)) {
          instance.order[j+1] = instance.order[j];
          j--;
          instance.EndAnimate(instance.objects[instance.order[j+1]]);
        }
        instance.order[j+1] = key;
      }, 2000 * i, instance);
    }
    for(var i = 1; i < this.order.length; i++) {
      task(this, i);
    }
    this.cards = this.order.map(v => parseInt(v));

  }

  StartAnimate(object) {
    object.body.velocity.y = 50;
    object.angle = 5;
    var instance = this;
    if(object.getData('num') == 2) {
      setTimeout(function() {
        object.body.velocity.y = 0;
        object.x = 120;
        object.y = 120;
      }, 1960);
    } else if(object.getData('num') == 4) {
      setTimeout(function() {
        object.body.velocity.y = 0;
        object.x = 220;
        object.y = 120;
      }, 1960);
    } else if(object.getData('num') == 1) {
      setTimeout(function() {
        object.body.velocity.y = 0;
        object.x = 120;
        object.y = 120;
      }, 1960);
    } else if(object.getData('num') == 3) {
      setTimeout(function() {
        object.body.velocity.y = 0;
        object.x = 320;
        object.y = 120;
        for(var i in instance.objects) {
          instance.objects[i].angle = 0;
        }
      }, 1960);
    }
  }

  EndAnimate(object) {
    object.body.velocity.x += 50;
    setTimeout(function() {
      object.body.velocity.x = 0;
    }, 1960);
  }

  update() {

  }

}