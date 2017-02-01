var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();

var name, email;
var loggedin;



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    name = user.displayName;
    email = user.email;
    loggedin=true;
  } else {
    // No user is signed in.
  }
});

$(document).ready(function() {
  $('#bellRing').click(function() {
    ringBell();
  });
})

function ringBell() {
  /*
  firebase.database().ref('ring/' + Date.now()).set({
    dooropener: 'Nobody'
  });
  */

  var newRef = firebase.database().ref('ring/').push();
  newRef.set({
    time: Date.now(),
    dooropener: null
  });
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

