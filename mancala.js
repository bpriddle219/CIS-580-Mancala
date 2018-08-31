const colors = ['turq', 'pink'];
var turn = 0;
var board = [
  [0, 0, 0, 0],
  [0],
  [0, 0, 0, 0],
  [0]
];
var scores = [0,0];
var pebblesPerCup = 6;

/** @function displayTurn
* Displays whose turn it is in a ui element
*/
function displayTurn() {
	displayMessage("It is <div class='" + colors[turn] + " block'></div>'s turn");
}

/** @function displayMessage
* Displays a message in the ui element. Basically useless since only displayTurn
* calls it, but I'm too lazy to change it
* @param {string} message the message to be displayed
*/
function displayMessage(message) {
	document.getElementById('ui').innerHTML = message;
}

// function animatePebble(pebble) {
//   var y = parseInt(pebble.style.top);
//   y += 5;
//   pebble.style.top = y + 'px';
//   if (y > 15)
//     pebble.style.top = '15px';
//   else animatePebble(pebble);
// }

/** @function displayPebble
* Creates and adds the pebble to the proper bucket. Also increments the counts
* of the buckets and the score.
* @param {div} bucket the bucket the pebble is being placed in
*/
function displayPebble(bucket) {
	var pebble = document.createElement('div');
	pebble.classList.add("pebble");
  //I tried.
  // pebble.style.top = "-50px";
  // animatePebble(pebble);
  if (bucket < 4) {
    board[0][bucket]++;
  }
  else if (bucket > 4 && bucket < 9) {
    board[2][bucket - 5]++;
  }
  else if (bucket === 4) {
    board[3][0]++;
    scores[0]++;
  }
  else if (bucket === 9) {
    board[1][0]++;
    scores[1]++;
  }
  var b, i;
  if ((bucket < 4 || bucket > 4) && bucket < 9) {
     //i = adjustPebbles(bucket);
	   b = document.getElementById("bucket" + bucket);
  }
  else if (bucket === 4) {
    //i = adjustPebbles(bucket);
    b = document.getElementById("scoring_bucket1");
  }
  else {
    //i = adjustPebbles(bucket);
    b = document.getElementById("scoring_bucket0");
  }
	b.appendChild(pebble);

}

/** @function displayScore
* Creates the score boxes and then displays the scores in addition to
* the counts of each bucket.
*/
function displayScore() {
  if (document.getElementById('reset').innerHTML === "Start") {
    var pinkbox = document.createElement('div');
    pinkbox.classList.add('pink_score_box');
    pinkbox.innerHTML = "Score:"
    var turqbox = document.createElement('div');
    turqbox.classList.add('turq_score_box');
    turqbox.innerHTML = "Score:"
    document.body.appendChild(pinkbox);
    document.body.appendChild(turqbox);
    var pinkscore = document.createElement('div');
    pinkscore.classList.add('pink_score');
    pinkscore.setAttribute('id', 'pinkscore');
    var turqscore = document.createElement('div');
    turqscore.classList.add('turq_score');
    turqscore.setAttribute('id', 'turqscore');
    pinkbox.appendChild(pinkscore);
    turqbox.appendChild(turqscore);

    for (var i = 0; i < 4; i++) {
      document.getElementById('s' + i).innerHTML = board[0][i];
    }
    for (var j = 5; j < 9; j++) {
      document.getElementById('s' + j).innerHTML = board[2][j - 5];
    }
  }
  else {
    document.getElementById('turqscore').innerHTML = scores[0];
    document.getElementById('pinkscore').innerHTML = scores[1];
    for (var i = 0; i < 4; i++) {
      document.getElementById('s' + i).innerHTML = board[0][i];
    }
    for (var j = 5; j < 9; j++) {
      document.getElementById('s' + j).innerHTML = board[2][j - 5];
    }
  }
}

/** @function checkForWin
* Checks to see if there is a winner. If so, moves all pebbles to the appropriate
* location and announces a winner.
*/
function checkForWin() {
  var flag = 0;
  var total = 0;
  for (var r = 5; r < 9; r++) {
    var p1 = document.getElementById('bucket'+ r).children;
    if (p1.length !== undefined) {
      total += p1.length;
    }
  }
  if (total === 0) {
    for (var r = 0; r < 4; r++) {
      var p = document.getElementById('bucket'+ r).children;
      if (p.length !== undefined) {
        for (var i = 0; i < p.length; i++) {
          displayPebble(4);
        }
      }
      while (p[0] !== undefined || p.length !== 0) {
        p[0].parentNode.removeChild(p[0]);
      }
    }
    flag = 1;
  }

  var tot = 0;
  for (var s = 0; s < 4; s++) {
    var p2 = document.getElementById('bucket'+ s).children
    if (p2.length !== undefined) {
      tot += p2.length;
    }
  }
  if (tot === 0) {
    for (var t = 5; t < 9; t++) {
      var p3 = document.getElementById('bucket'+ t).children;
      if (p3.length !== undefined) {
        for (var j = 0; j < p3.length; j++) {
          displayPebble(9);
        }
      }
      while (p3[0] !== undefined || p3.length !== 0) {
        p3[0].parentNode.removeChild(p3[0]);
      }
    }
    flag = 1;
  }

  if (flag) {
    displayScore();
    if (scores[1] > scores[0]) {
      document.getElementById('final').innerHTML = "Pink \nwins!";
      document.getElementById('final').style.top = '400px';
    }
    else {
      document.getElementById('final').innerHTML = "Turquoise \nwins!";
      document.getElementById('final').style.top = '200px';
    }
    displayMessage('');
  }
}

/** @function reset
* Resets the board. Clears and redraws all pebbles, resets the turn, and clears
* the score.
*/
function reset() {
  var pebbles = document.getElementsByClassName('pebble');
  while (pebbles[0] !== undefined || pebbles.length !== 0) {
    pebbles[0].parentNode.removeChild(pebbles[0]);
  }
  for (var k = 0; k < 4; k++) {
    for (var l = 0; l < board[k].length; l++) {
      board[k][l] = 0;
    }
  }
  for (var i = 0; i < 9; i++) {
    if (i === 4) continue;
    for (var j = 0; j < pebblesPerCup; j++) {
      displayPebble(i);
    }
  }
  scores[0] = 0;
  scores[1] = 0;
  displayScore();
  displayMessage('');
  document.getElementById('final').innerHTML = "";
  document.getElementById('reset').innerHTML = "Reset";
  turn = 0;
  displayTurn();
}

/** @function move
* Calculates the proper move for each pebble in the chosen bucket. Clears that
* bucket and changes the turn if necessary.
* @param {div} buc the bucket the pebbles are being moved from
*/
function move(buc) {
  var pebbles = document.getElementById('bucket'+ buc).children;
  if (pebbles === undefined || pebbles.length === 0) return;
  if (buc < 4 && turn === 0) {
    for (var c = buc; c < buc + pebbles.length; c++) {
      var f = c % 10;
      displayPebble(f);
    }
    while (pebbles[0] !== undefined || pebbles.length !== 0) {
      pebbles[0].parentNode.removeChild(pebbles[0]);
    }
    if (f != 4) {
      turn = (turn + 1) % 2;
    }
    board[0][buc] = 0;
    displayScore();
    checkForWin();
    displayTurn();
  }
  else if (buc > 4 && turn === 1) {
    var d = 0;
    var b = buc;
    while (d < pebbles.length) {
      b = b % 10;
      displayPebble(b);
      d++;
      b++;
    }
    while (pebbles[0] !== undefined || pebbles.length !== 0) {
      pebbles[0].parentNode.removeChild(pebbles[0]);
    }
    if ((b-1) != 9) {
      turn = (turn + 1) % 2;
    }
    board[2][buc - 5] = 0;
    displayScore();
    checkForWin();
    displayTurn();
  }
}

//Watches the button for a click event
document.getElementById('reset')
  .addEventListener('click', function(event) {
    event.preventDefault();
    reset();
});

//Watches the appropriate buckets for click events
for (var j = 0; j < 4; j++) {
  const buc = j;
  document.getElementById('bucket' + buc)
    .addEventListener('click', function(event) {
      event.preventDefault();
      move(buc);
  });
}
for (var k = 5; k < 9; k++) {
  const buck = k;
  document.getElementById('bucket' + buck)
    .addEventListener('click', function(event) {
      event.preventDefault();
      move(buck);
  });
}
