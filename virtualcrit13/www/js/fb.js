var database = firebase.database();

//speed
function listenRounds() {
  console.log('Listen for Rounds Changes');
  var roundsRef = firebase.database().ref('rounds/' + getTodaysDate());
  roundsRef.limitToLast(10).orderByChild('a_speedRoundLast').on('value', function (snapshot) {
    //console.log('RoundsDB\n'+JSON.stringify(snapshot));
    arrRounds = [];
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      arrRounds.push(childData);
    });
    //console.log('\n\narrRounds:\n', JSON.stringify(arrRounds));
    console.log('arrRounds.length:  ', arrRounds.length);


    let v = _.values(arrRounds);
    if (arrRounds.length < 1) { return; }

    //let arrScore = _.orderBy(v, 'a_scoreRoundLast', 'desc');
    let arrSpeed = _.orderBy(v, 'a_speedRoundLast', 'desc');

    //console.log('New Rounds Leader');
    //console.log('arrRounds, arrScore[0]', arrScore[0].fb_timName, arrScore[0].a_scoreRoundLast);
    console.log('arrRounds, arrSpeed[0]', arrSpeed[0].fb_timName, arrSpeed[0].a_speedRoundLast);

    $$('.main-status-alerts').html('LEADING:  ' + String(arrSpeed[0].fb_timName).toUpperCase() + ",   " + ret1string(arrSpeed[0].a_speedRoundLast) + ' MPH');
    $$('.item-crit-speed-name').html(String(arrSpeed[0].fb_timName).toUpperCase());
    $$('.item-crit-speed-value').html(ret1string(arrSpeed[0].a_speedRoundLast) + ' MPH');

    if (fastestRoundSpeed) {
      console.log('a local fastestRoundSpeed does exist, check for new leader/score');
      if (fastestRoundName !== String(arrSpeed[0].fb_timName).toUpperCase() || fastestRoundSpeed !== ret1string(arrSpeed[0].a_speedRoundLast)) {
        console.log('this is a unique name or speed, continue');
        fastestRoundName = String(arrSpeed[0].fb_timName).toUpperCase();
        fastestRoundSpeed = fastestRoundSpeed != ret1string(arrSpeed[0].a_speedRoundLast);
        console.log('if audio is on, will speak');
        
        if (tim.timAudio == "ON") {
          setTimeout(() => {

            TTS.speak({
              text: 'New Leader, ' + String(arrSpeed[0].fb_timName) + '.  at , ' + ret1string(arrSpeed[0].a_speedRoundLast) + '  Miles per hour.',
              locale: 'en-US',
              rate: 1.5
            }, function () {
              console.log('tts success');
            }, function (reason) {
              console.log('tts failed:  ', reason);
            });
          }, 5000);
        }
      } else {
        console.log('not a new leader, no speaking');
        
      }
    } else {
      console.log('local leaderboard is empty, speak');
      fastestRoundName = String(arrSpeed[0].fb_timName).toUpperCase();
      fastestRoundSpeed = ret1string(arrSpeed[0].a_speedRoundLast);
      if (tim.timAudio == "ON") {
        setTimeout(() => {

          TTS.speak({
            text: 'New Leader, ' + String(arrSpeed[0].fb_timName) + '.  at , ' + ret1string(arrSpeed[0].a_speedRoundLast) + '  Miles per hour.',
            locale: 'en-US',
            rate: 1.5
          }, function () {
            console.log('tts success');
          }, function (reason) {
            console.log('tts failed:  ', reason);
          });
        }, 5000);
      }
    }




    $('#leaderboardTable tbody tr').remove();
    var e = 1;
    _.forEach(arrSpeed, function (value) {
      t2Content = '<tr>' +
        '<td class="label-cell">' + String(value.fb_timName).toUpperCase() + '</td>' +
        '<td class="numeric-cell">' + ret1string(value.a_speedRoundLast) + ' MPH' + '</td>' +
        '<td class="numeric-cell">' + ret1string(value.a_scoreRoundLast) + ' %MAX' + '</td>' +
        '</tr>';
      $('#leaderboardTable').append(t2Content);
      e++;

    });
  });

}

var fastestRoundSpeed;
var fastestRoundName;



var arrRounds = [];
var arrRoundsHR = [];

function listenRoundsHR() {
  console.log('Listen for Rounds Changes, sorted by HR');
  var roundsRefHR = firebase.database().ref('rounds/' + getTodaysDate());
  roundsRefHR.limitToLast(3).orderByChild('a_scoreRoundLast').on('value', function (snapshot) {
    //console.log('RoundsDB\n'+JSON.stringify(snapshot));
    arrRoundsHR = [];
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      arrRoundsHR.push(childData);
    });
    //console.log('\n\narrRounds:\n', JSON.stringify(arrRounds));
    console.log('arrRoundsHR.length:  ', arrRoundsHR.length);


    let v = _.values(arrRoundsHR);
    if (arrRoundsHR.length < 1) { return; }

    let arrScoreHR = _.orderBy(v, 'a_scoreRoundLast', 'desc');
    //let arrSpeed = _.orderBy(v, 'a_speedRoundLast', 'desc');

    //console.log('New Rounds Leader');
    console.log('arrRoundsHR, arrScore[0]', arrScoreHR[0].fb_timName, arrScoreHR[0].a_scoreRoundLast);
    //console.log('arrRounds, arrSpeed[0]', arrSpeed[0].fb_timName, arrSpeed[0].a_speedRoundLast);
    $$('.item-crit-score-name').html(String(arrScoreHR[0].fb_timName).toUpperCase());
    $$('.item-crit-score-value').html(ret1string(arrScoreHR[0].a_scoreRoundLast) + '%');

    //$$('.main-status-alerts').html(String(arrSpeed[0].fb_timName).toUpperCase() + ",  "+ ret1string(arrSpeed[0].a_speedRoundLast) + ' MPH' );

    // if (popupTab1) {
    //   $$('#tab1a').html(String(arrScoreHR[0].fb_timName).toUpperCase() +'\n'+ String(arrScoreHR[0].fb_timName).toUpperCase() + ' %MAX' +
    //   '\n' +   String(arrSpeed[0].fb_timName).toUpperCase() + '\n' + ret1string(arrSpeed[0].a_speedRoundLast) + ' MPH');
    // }

  });

}



function listenTotals() {
  console.log('Listen for Totals Changes ' + getTodaysDate());
  //var totalsRef = database.ref('totals/' + getTodaysDate());
  var totalsRef = firebase.database().ref('totals/' + getTodaysDate());
  totalsRef.on('value', function (snapshot) {
    //console.log('TotalsDB\n'+JSON.stringify(snapshot));
    arrTotals = [];
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      //console.log('Each Child: ' + JSON.stringify(childSnapshot));
      arrTotals.push(childData);
    });

    //console.log('\narrTotals\n' + JSON.stringify(arrTotals));
    if (arrTotals.length < 1) { return; }

    let i = _.orderBy(arrTotals, ['a_speedTotal'], ['desc']);
    console.log('arrTotals, i.name, i.a_speedTotal, ' + i[0].a_speedTotal + ' MPH, ' + i[0].fb_timName);

    let s = _.orderBy(arrTotals, ['a_scoreHRTotal'], ['desc']);
    console.log('arrTotals, i.name, i.a_scoreHRTotal, ' + s[0].a_scoreHRTotal + ' %MAX, ' + s[0].fb_timName);

  });
}



var arrTotals = [];

function postTotals() {
  console.log('postTotals');

  firebase.database().ref('totals/' + getTodaysDate() + '/' + tim.timName + '/').set({
    a_scoreHRTotal: getScoreFromHeartate(totals.heartrate),
    a_scoreHRRoundLast: getScoreFromHeartate(totals.heartrate),
    a_speedTotal: totals.speed,
    a_speedLast: totals.speed,
    a_calcDurationPost: timer.msToTimecode(totalElapsedTime),
    fb_timName: tim.timName,
    fb_timGroup: tim.timGroup,
    fb_timTeam: tim.timTeam,
    fb_Date: getTodaysDate(),
    fb_DateNow: Date.now(),
    fb_timAvgCADtotal: totals.cadence,
    fb_timDistanceTraveled: totals.distance,
    fb_maxHRTotal: tim.timMaxHeartate,
    fb_scoreHRTotal: getScoreFromHeartate(totals.heartrate),
    fb_scoreHRRoundLast: getScoreFromHeartate(totals.heartrate),
    fb_timAvgSPDtotal: totals.speed,
    fb_timLastSPD: totals.speed
  },
    function (error) {
      if (error) {
        console.log('postTotals failed');

      } else {
        console.log('postTotals success');
        console.log(JSON.stringify(totals));
      }
    });
}


function postRound() {
  console.log('postRound');

  // my rounds
  myRounds.push({ 'speed': round.speed, 'heartrate': round.heartrate, 'timer': timer.msToTimecode(totalElapsedTime), 'score': getScoreFromHeartate(round.heartrate) });
  console.log('myRounds: ', JSON.stringify(myRounds));

  //  UPDATE MYROUNDS UI
  $('#myroundsTable tbody tr').remove();
  // let v = _.values(arrRounds);
  // let arrSpeed = _.orderBy(v, 'a_speedRoundLast', 'desc');
  var e = 1;
  _.forEach(myRounds, function (value) {
    console.log('myRounds:');
    console.log(JSON.stringify(value));
    t3Content = '<tr>' +
      '<td class="label-cell">' + String(value.timer) + '</td>' +
      '<td class="numeric-cell">' + ret1string(value.speed) + ' MPH' + '</td>' +
      '<td class="numeric-cell">' + ret1string(value.heartrate) + ' BPM' + '</td>' +
      '<td class="numeric-cell">' + ret1string(value.score) + '%' + '</td>' +
      '</tr>';
    $('#leaderboardTable').append(t2Content);
    e++;

  });
  //  END UI UPDATE


  //TODO  CHANGE THESE VALUES TO PULL FROM LATEST OBJECT STORED IN rounds[]
  firebase.database().ref('rounds/' + getTodaysDate() + '/').push({
    a_scoreRoundLast: getScoreFromHeartate(round.heartrate),
    a_speedRoundLast: round.speed,
    a_calcDurationPost: timer.msToTimecode(totalElapsedTime),
    fb_timName: tim.timName,
    fb_timGroup: tim.timGroup,
    fb_timTeam: tim.timTeam,
    fb_RND: getScoreFromHeartate(round.heartrate),
    fb_Date: getTodaysDate(),
    fb_DateNow: Date.now(),
    fb_SPD: round.speed,
    fb_CAD: round.cadence,
    fb_HR: round.heartrate,
    fb_timDistanceTraveled: totals.distance,
    fb_maxHRTotal: tim.timMaxHeartate,
    fb_timAvgSPDtotal: totals.speed,
    fb_timAvgCADtotal: totals.cadence,
    fb_timAvgHRtotal: totals.heartrate,
    fb_scoreHRTotal: getScoreFromHeartate(totals.heartrate),
    fb_scoreHRRound: getScoreFromHeartate(round.heartrate),
    fb_scoreHRRoundLast: getScoreFromHeartate(round.heartrate),
  },
    function (error) {
      if (error) {
        console.log('postRound failed');

      } else {
        console.log('postRound success');
        console.log(JSON.stringify(round));
        postTotals();
      }
    });
}



function getScoreFromHeartate(hr) {
  return Math.round(totals.heartrate / tim.timMaxHeartate * 100 * 10) / 10;
}


var leaders = {
  roundSpeedValue: 0,
  roundScoreValue: 0,
  roundSpeedName: '',
  roundScoreName: '',
  totalSpeedValue: 0,
  totalScoreValue: 0,
  totalSpeedName: '',
  totalScoreName: '',
}