var sketch = function(p) {

  var GENESIS = 0;
  var REVELATION = 1;
  var INFLUENCE = 2;

  var adj, adv, n, v, sel, output;

  var title = "genesis";

  var ADV_PROB = .3;
  var ADJ_PROB = .6;
  var USE_MODIFIERS = true;

  p.preload = function() {
  	adj = p.loadStrings('data/'+ title + '_adj.txt');
    adv = p.loadStrings('data/'+ title + '_adv.txt');
    n = p.loadStrings('data/'+ title + '_n.txt');
    v = p.loadStrings('data/'+ title + '_v.txt');
  };

  p.setup = function() {
    sel = p.createSelect();
    sel.parent('holder');
    sel.option('genesis');
    sel.option('revelation');
    sel.option('influencepeople');
    sel.option('dictionary')
    sel.changed(mySelectEvent);
    sel.class('form-control');
    generateFortune();
    $('#output').click(generateFortune);
    $('#output').bind("animationend", listener);
  };

  var mySelectEvent = function() {
    title = sel.value();
    adj = p.loadStrings('data/'+ title + '_adj.txt');
    adv = p.loadStrings('data/'+ title + '_adv.txt');
    n = p.loadStrings('data/'+ title + '_n.txt');
    v = p.loadStrings('data/'+ title + '_v.txt');
}

function listener(e) {
  if (e.type == "animationend") {
    $('#output').removeClass('target');
  }
}

  var generateFortune = function() {
    $('#output').addClass('target');
    var random = Math.random();
    if (USE_MODIFIERS) {
      if (random <= .5) output = RiTa.randomItem(v) + " " + RiTa.randomItem(adj) + " " + RiTa.randomItem(n);
      else output = RiTa.randomItem(v) + " " + RiTa.randomItem(n) + " " + RiTa.randomItem(adv) ;
    } else {
      random = Math.random();
      output = RiTa.randomItem(v).toString();
      if (random < ADJ_PROB) output += " " + RiTa.randomItem(adj);
      output += " " + RiTa.randomItem(n);
      random = Math.random();
      if (random < ADV_PROB) output += " " + RiTa.randomItem(adv);
    }
    $("#output").html(output);
  };

  p.draw = function() {
  };

  p.touchEnded = function() {
  };

  p.mouseReleased = function() {
    if (turnAxis == 'Z'){
    generateFortune();
  }
};

  p.deviceTurned = function() {
};
};

var myp5 = new p5(sketch);