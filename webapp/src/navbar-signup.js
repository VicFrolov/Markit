$( () => {
    console.log('WHAT IS UP!?');
    const anonymousSignIn = require('./firebase.js')["anonymousSignIn"];
    anonymousSignIn();
});
