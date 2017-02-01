var recentTime = 5*60*1000; //5 minutes

var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();

var username, email;
var loggedin;

var bellKey = null;
var lastBell = null;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    username = user.displayName;
    email = user.email;
    loggedin=true;
  } else {
    username = null;
    email = null;
    loggedin=false;
  }
});

$(document).ready(function() {

  $('#opendoor').click(function() {
    if (username == null) { 
      $('#status').text('Trying to log in..');
      appAuth();

    } else {
      $('#status').text('Opening door..');
      $('#status').text(username);
      openDoor();
    }
  });
});


var bellRef = firebase.database().ref('ring');

bellRef.once('value', function(snapshot) {
  $('#status').text('Initialized');
  snapshot.forEach(function(childSnapshot) {
    bellKey = childSnapshot.key;
    lastBell = childSnapshot;
  });

  if (isRecent(lastBell.val().time) && !lastBell.val().doorOpener) {
    enableButton();
    $('#status').text('Bell rang in the last 5 minutes');
    //toUTCString();
    var ringDate = new Date(lastBell.val().time);

    $('#substatus').text(ringDate.toString('hh:mm:ss'));
  }  else {
    disableButton();
  }


});

bellRef.on('child_added', function(data) {
  if (isRecent(data.val().time)) {
    $('#status').text('Ding dong!');
    $('#substatus').text(data.val().time);
    lastBell = data;
    enableButton();
  }
});

bellRef.on('child_changed', function(data) {
  if (isRecent(data.val().time)) {
    if (data.val().doorOpener) {
      $('#substatus').text('opened the door');
      $('#status').text(data.val().doorOpener);

      disableButton();
    }
  }
});

function disableButton() {
  $('#opendoor').removeClass('btn-success');
  $('#opendoor').addClass('btn-danger');
  $('#opendoor').text('--');
  $('#opendoor').attr('disabled', true);
  $('#opendoor').hide();
}

function enableButton() {
  $('#opendoor').removeClass('btn-danger');
  $('#opendoor').addClass('btn-success');
  $('#opendoor').text('I\'m on it!');
  $('#opendoor').attr('disabled', false);
  $('#opendoor').show();

}

function openDoor() {
  firebase.database().ref('ring/'+lastBell.key).set({
    time: lastBell.val().time,
    doorOpener: username
  });
}

function isRecent(timeValue) {
  if (Date.now() - timeValue < recentTime)
    return true;
  return false; 
}

function appAuth() {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    $('#substatus').val('Welcome' + user.displayName+'!');
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    
  });
}

