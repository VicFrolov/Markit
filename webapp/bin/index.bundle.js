/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(2);
	__webpack_require__(15);
	__webpack_require__(16);
	module.exports = __webpack_require__(17);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	$(function() {
	    var auth = __webpack_require__(2)["auth"];
	    let uid;
	    let navbarProfilePic;
	    let profilePic;
	    let profileName;
	    let searchNavbar = $('.search-navbar');
	    
	    var getProfilePicture = __webpack_require__(2)["getProfilePicture"];
	    var getUserInfo = __webpack_require__(2)["getUserInfoProper"];
	 
	    var updateNavbarName = function (profileName) {
	        Promise.resolve(getUserInfo(uid)).then(userData => {
	            profileName.text(userData.username);
	        });        
	    };

	    var updateNavbarPic = function (navbarProfilePic) {
	        Promise.resolve(getProfilePicture(uid)).then(url => {
	            navbarProfilePic.attr('src', url);
	        });
	    }

	    var highlightPage = function() {
	        $('#navbar-placeholder a').each(function(){
	            if ($(this).prop('href') == window.location.href) {
	                $(this).addClass('active'); $(this).addClass('active-navbar-li');
	            }
	        });
	    }

	    var useQuickSearchBar = () => {
	        window.location = `/find/find.html`;

	    }

	    auth.onAuthStateChanged(function(user) {
	        if (user) {
	            uid = auth.currentUser.uid;

	            if (window.location.pathname === "/signup/signup.html") {
	                window.location.href = '/'
	            }
	            
	            $("#navbar-placeholder").load("../navbar/navbar-logged-in.html", function () {
	                navbarProfilePic = $('#navbar-user-photo');
	                profileName = $('#profile-name');

	                $(".dropdown-button").dropdown();

	                $(".button-collapse").sideNav({
	                    menuWidth: 300, // Default is 240
	                    edge: 'right', // Choose the horizontal origin
	                    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
	                    draggable: true // Choose whether you can drag to open on touch screens
	                });

	                $("#navbar-logout-button").click(function () {
	                    auth.signOut();
	                });

	                $('#navbar-message').click(function()  {
	                    $('ul.tabs').tabs('select_tab', 'profile-messages');
	                });

	                $('#navbar-notifications').click(function () {
	                    $('ul.tabs').tabs('select_tab', 'profile-tagslist');
	                });

	                $('#navbar-settings').click(function () {
	                    $('ul.tabs').tabs('select_tab', 'profile-settings');
	                });

	                // $('.search-navbar').on("keyup", function(e) {
	                //     let searchQuery = searchNavbar.val();
	                //     if (e.keyCode == 13 && searchQuery) {
	                //         alert("shit")
	                //     }
	                // });

	                updateNavbarName(profileName);
	                updateNavbarPic(navbarProfilePic);
	                highlightPage();
	            });
	        } else {
	            $("#navbar-placeholder").load("../navbar/navbar-signup.html", function () {
	                $(".dropdown-button").dropdown();
	                $(".button-collapse").sideNav({
	                    menuWidth: 300, // Default is 240
	                    edge: 'right', // Choose the horizontal origin
	                    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
	                    draggable: true // Choose whether you can drag to open on touch screens
	                });                
	            });
	        }
	    });

	    module.exports = {
	        updateNavbarName,
	        updateNavbarPic
	    }

	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	var firebase = __webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);

	firebase.initializeApp({
	    // serviceAccount: "./MarkIt-3489756f4a28.json",
	    apiKey: "AIzaSyCaA6GSHA0fw1mjjncBES6MVd7OIVc8JV8",
	    authDomain: "markit-80192.firebaseapp.com",
	    databaseURL: "https://markit-80192.firebaseio.com",
	    storageBucket: "markit-80192.appspot.com",
	    messagingSenderId: "4085636156"
	});

	var database = firebase.database();
	var auth = firebase.auth();
	var itemsRef = database.ref('items/');
	var itemImagesRef = firebase.storage().ref('images/itemImages/');
	var userImagesRef = firebase.storage().ref('images/profileImages/');
	var usersRef = database.ref('users/');
	const fbProvider = new firebase.auth.FacebookAuthProvider();
	const googleProvider = new firebase.auth.GoogleAuthProvider();


	var addProfilePicture = function (uid, image) {
	    return new Promise(function(resolve, reject) {
	        image = image.replace(/^.*base64,/g, '');
	        var profilePicName = "imageOne";
	        var uploadTask = userImagesRef.child(uid + '/' + profilePicName).putString(image, 'base64');

	        uploadTask.on('state_changed', function(snapshot) {
	            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	            console.log('Upload is ' + progress + '% done');

	            switch (snapshot.state) {
	                case firebase.storage.TaskState.PAUSED: // or 'paused'
	                    console.log('Upload is paused');
	                    break;
	                case firebase.storage.TaskState.RUNNING: // or 'running'
	                    console.log('Upload is running');
	                    break;
	            }
	        }, function(error) {
	            reject(error);
	            console.log("error uploading image");
	        }, function() {
	            var downloadURL = uploadTask.snapshot.downloadURL;
	            resolve(downloadURL);
	            $('#profile-picture').attr('src', downloadURL);
	            $('#navbar-user-photo').attr('src', downloadURL);
	        });

	    });
	};

	var getProfilePicture = function (uid) {
	    return userImagesRef.child(uid).child('imageOne').getDownloadURL().then(function(url) {
	        return url;
	    }).catch(function(error) {
	        console.log("error image not found");
	        console.log("error either in item id, filename, or file doesn't exist");
	    });
	}

	var sendVerificationEmail = function () {
	    firebase.auth().onAuthStateChanged(function(user) {
	        if (user) {
	            user.sendEmailVerification();
	        }
	    });
	};

	var addListing = function (title, description, tags, price, hubs, uid, images) {
	    var imageNames = ["imageOne", "imageTwo", "imageThree", "imageFour"];
	    var myDate = Date();
	    var itemRef = itemsRef.push();
	    var itemKey = itemRef.key;
	    var lowerCasedTags = $.map(tags, function(n,i) {return n.toLowerCase();});

	    var itemData = {
	        title: title,
	        description: description,
	        tags: lowerCasedTags,
	        price: price,
	        uid: uid,
	        id: itemKey,
	        hubs: hubs,
	        date: myDate
	    };

	    addTags(lowerCasedTags);
	    addHubs(hubs);
	    addNewListingToProfile(uid, itemKey);
	    itemsRef.child(itemKey).set(itemData);
	    database.ref('itemsByUser/' + uid + '/').child(itemKey).set(itemData);

	    hubs.forEach(function(currentHub) {
	        database.ref('itemsByHub/' + currentHub + '/').child(itemKey).set(itemData);
	    });

	    // adding images to storage
	    for (var i = 0; i < images.length; i += 1) {
	        (function(x) {
	            images[x] = images[x].replace(/^.*base64,/g, '');
	            var uploadTask = itemImagesRef.child(itemKey + '/' +  imageNames[x]).putString(images[x], 'base64');

	            uploadTask.on('state_changed', function(snapshot) {
	                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	                console.log('Upload is ' + progress + '% done');

	                switch (snapshot.state) {
	                    case firebase.storage.TaskState.PAUSED: // or 'paused'
	                        console.log('Upload is paused');
	                        break;
	                    case firebase.storage.TaskState.RUNNING: // or 'running'
	                        console.log('Upload is running');
	                        break;
	                }
	            }, function(error) {
	                console.log("error uploading image");
	            }, function() {
	                var downloadURL = uploadTask.snapshot.downloadURL;
	            });
	        })(i);
	    }
	};


	var getListings = function () {
	    return itemsRef.once("value").then(function (snapshot) {
	        return snapshot.val();
	    }).catch(function (error) {
	        console.log(error);
	    });
	};

	var getRecentItemsInHub = function (hub, limit) {
	    return database.ref('itemsByHub/' + hub + '/').orderByKey().limitToLast(limit).once('value').then(function (snapshot) {
	        return snapshot.val();
	    }, function (error) {
	        console.log(error);
	    });
	};

	// Remove this function below and replace with the one after it
	// so that it returns a promise, rather than this anti-patern
	// of callback + promise
	var getFavorites = function (callback) {
	    auth.onAuthStateChanged(function(user) {
	        if (user) {
	            usersRef.child(auth.currentUser.uid + '/favorites/').once("value").then(function (snapshot) {
	                callback(snapshot.val());
	            }, function (error) {
	                console.log(error);
	            });
	        }
	    });
	};

	var getUserFavorites = function() {
	    return usersRef.child(auth.currentUser.uid + '/favorites/').once("value").then(function (snapshot) {
	        return snapshot.val();
	    }).catch(function (error) {
	        console.log(error);
	    });
	};

	var getUserSelling = function (uid) {
	    return usersRef.child(`${uid}/itemsForSale/`).once('value').then(function (snapshot) {
	        return snapshot.val();
	    }).catch(function (error) {
	        console.log(error);
	    });
	}

	// Adding proper promise, but not replacing the callback antipatern
	// as not to break profile code
	var getUserInfoProper = function(uid) {
	    return usersRef.child(uid + '/').once('value').then(function(snapshot) {
	        return snapshot.val();
	    });
	};

	var getUserInfo = function(uid, callback) {
	    usersRef.child(uid + '/').once('value').then(function(snapshot) {
	        var userInfo = snapshot.val();
	        callback(userInfo);
	    });
	};

	var updateUserInfo = function(uid, updatedInfo) {
	    for (var update in updatedInfo) {
	        usersRef.child(uid + '/' + update).set(updatedInfo[update]);
	    }
	};

	var getImage = function(address, callback) {
	    itemImagesRef.child(address).getDownloadURL().then(function(url) {
	        callback(url);
	    }).catch(function(error) {
	        console.log("error image not found");
	        console.log("error either in item id, filename, or file doesn't exist");
	    });
	};

	var getFavoriteObjects = function (callback) {
	    auth.onAuthStateChanged(function(user) {
	        // get user favorites
	        usersRef.child(auth.currentUser.uid + '/favorites/').once("value").then(function (snapshot) {
	            var favorites = snapshot.val();
	            // pull object of items that user has favorited
	            itemsRef.once('value').then(function (snapshotItems) {
	                var allItems = snapshotItems.val();
	                var userFavoritesMatch = [];
	                for (var item in allItems) {
	                    if (favorites && favorites.hasOwnProperty(item)) {
	                        userFavoritesMatch.push(allItems[item]);
	                    }
	                }
	                callback(userFavoritesMatch);
	            }, function (error) {
	                console.log(error);
	            });
	        }, function (error) {
	            console.log(error);
	        });
	    });
	};

	var removeFavorite = function (item) {
	    usersRef.child(auth.currentUser.uid + '/favorites/' + item).remove();
	    itemsRef.child(item + '/favorites/' + auth.currentUser.uid).remove();

	    itemsRef.child(item).once('value').then(function(snapshot) {
	        let item = snapshot.val()
	        let itemTags = item['tags']
	        for (let i = 0; i < itemTags.length; i += 1) {
	            usersRef.child(auth.currentUser.uid +
	                '/tagSuggestions/' + itemTags[i]).set(0.5);
	        }

	    });
	};

	var filterListings = function (keywords, hubs, tags, price_range) {
	    listingsRef.orderByChild();
	};

	var signIn = function (email, password) {
	    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
	        var errorCode = error.code;
	        var errorMessage = error.message;
	    });
	};

	var addNewListingToProfile = function(uid, itemID) {
	    usersRef.child(uid + '/itemsForSale/' + itemID).set(true);
	};

	var addFavoriteToProfile = function(uid, itemID) {
	    usersRef.child(uid + '/favorites/' + itemID).set(true);
	    itemsRef.child(itemID + '/favorites/').child(auth.currentUser.uid).set(true);

	    //update suggested tags
	    itemsRef.child(itemID).once('value').then(function(snapshot) {
	        let item = snapshot.val()
	        let itemTags = item['tags']
	        for (let i = 0; i < itemTags.length; i += 1) {
	            usersRef.child(uid + '/tagSuggestions/' + itemTags[i]).set(1);
	        }

	    });

	};

	var addTagToProfile = function (uid, tagObject) {
	    usersRef.child(uid + '/tagsList/' + Object.keys(tagObject)[0]).set(Object.values(tagObject)[0].slice(0,5));
	};

	var getProfileTags = function () {
	    return usersRef.child(auth.currentUser.uid + '/tagsList/').once("value").then(function (snapshot) {
	        return snapshot.val();
	    }).catch(function (error) {
	        console.log(error);
	    });
	};

	var removeProfileTag = function (itemTitle) {
	    usersRef.child(auth.currentUser.uid + '/tagsList/' + itemTitle).remove()
	};

	var createAccount = function () {
	    auth.createUserWithEmailAndPassword($("#sign-up-email").val(),
	        $("#sign-up-password").val()).then(function(user) {
	            var newUser = firebase.auth().currentUser;
	            newUserDBEntry(newUser);
	        }, function(error) {
	            var errorCode = error.code;
	            var errorMessage = error.message;
	            console.log(errorMessage);
	    });
	};

	var newUserDBEntry = function (user) {
	    var firstName = $("#sign-up-first-name").val();
	    var lastName = $("#sign-up-last-name").val();
	    var username = $("#sign-up-username").val();
	    var userHub = $("#sign-up-hub").val();
	    var defaultPreference = ["cash"];
	    var date =  Date();

	    var userInfo = {
	        uid: user.uid,
	        email: user.email,
	        username: username,
	        userHub: userHub,
	        firstName: firstName,
	        lastName: lastName,
	        paymentPreferences: defaultPreference,
	        dateCreated: date
	    };
	    usersRef.child(user.uid).set(userInfo);
	};

	var addTags = function(itemTags) {
	    database.ref('tags/').once('value', function(snapshot) {
	        var tagsInDB = snapshot.val();
	        itemTags.forEach(function (tag) {
	            if (tagsInDB.hasOwnProperty(tag)) {
	                database.ref('tags/').child(tag).set(tagsInDB[tag] + 1);
	            } else {
	                database.ref('tags/').child(tag).set(1);
	            }
	        });
	    }, function (errorObject) {
	        console.log(errorObject.code);
	    });
	};

	var addHubs = function(itemHubs) {
	    database.ref('tags/').once('value', function(snapshot) {
	        var hubsInDB = snapshot.val();
	        itemHubs.forEach(function (hub) {
	            if (hubsInDB.hasOwnProperty(hub)) {
	                database.ref('hubs/').child(hub).set(hubsInDB[hub] + 1);
	            } else {
	                database.ref('hubs/').child(hub).set(1);
	            }
	        });
	    }, function (errorObject) {
	        console.log(errorObject.code);
	    });
	};

	var initializeMessage = function (id, sellerId, uid, imageLink, message, otherUsername, myUsername) {
	    let chatKey = usersRef.push().key;
	    let date = (new Date()).toString();

	    let context = {
	        itemID: uid,
	        itemImageURL: imageLink,
	        otherUser: sellerId,
	        latestPost: date,
	        conversationID: chatKey,
	        otherUsername: otherUsername,
	        readMessages: true
	    };

	    let contextOther = {
	        itemID: uid,
	        itemImageURL: imageLink,
	        otherUser: id,
	        latestPost: date,
	        conversationID: chatKey,
	        otherUsername: myUsername,
	        readMessages: false

	    };

	    let messageObject = {
	        date: date,
	        text: message,
	        type: 'text',
	        user: id
	    };

	    let messageObjectOther = {
	        date: date,
	        text: message,
	        type: 'text',
	        user: id
	    };

	    usersRef.child(`/${id}/chats/${chatKey}/context`).set(context);
	    usersRef.child(`/${id}/chats/${chatKey}/messages`).push(messageObject);

	    usersRef.child(`/${sellerId}/chats/${chatKey}/context`).set(contextOther);
	    usersRef.child(`/${sellerId}/chats/${chatKey}/messages`).push(messageObjectOther);
	}

	var getLastMessage = function(messageObject) {
	    let listOfKeys = Object.keys(messageObject);
	    let lastMessage = messageObject[listOfKeys[listOfKeys.length - 1]].text;;

	    return lastMessage;
	}

	var sortConversations = function(uid, chatID) {
	    usersRef.child(`${uid}/chats/`).once('value').then(function(snapshot) {
	        let messages = snapshot.val()
	        var str = $('#messages-preview-template').text();
	        var compiled = _.template(str);

	        let previewMessages = [];
	        let promises = [];


	        for (let messageID in messages) {
	            let message = messages[messageID];
	            let messageObj = {};

	            var date = new Date(message.context.latestPost);
	            let hours = date.getHours();
	            var time = `${date.getUTCHours()}:${date.getMinutes()}`;
	            time += (hours >= 12) ? " PM" : " AM";

	            messageObj.timeStamp = message.context.latestPost;
	            messageObj.time = time
	            messageObj.lastMessage = getLastMessage(message['messages']);
	            messageObj.user = message.context.otherUsername;
	            messageObj.picture = message.context.itemImageURL;
	            messageObj.messageID = messageID
	            messageObj.readStatus = message.context.readMessages;

	            promises.push(getItemsById([message.context.itemID]).then(itemInfo => {
	                messageObj.title = itemInfo[Object.keys(itemInfo)[0]].title;
	            }));


	            previewMessages.push(messageObj);
	        }
	        // Wait for them all to complete
	        Promise.all(promises).then(() => {
	            previewMessages.sort(function(a, b){
	                return new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime()
	            });

	            for (var i = 0; i < previewMessages.length; i += 1) {
	                previewMessages[i].timeStamp = previewMessages[i].timeStamp.split(' ').slice(0,3).join(' ');
	            }

	            $('#messages-preview-holder').empty();
	            $('#messages-preview-holder').append(compiled({previewMessages: previewMessages}));
	        });

	    });
	}

	var displayConversations = function (uid) {
	    usersRef.child(`${uid}/chats/`).limitToLast(1).on('child_added', function(snapshot) {
	        updateExistingConversations(uid);
	    });
	}

	var updateExistingConversations = function(uid) {
	    usersRef.child(`${uid}/chats/`).once('value', function(snapshot) {
	        let chats = snapshot.val();
	        for (let chatID in chats) {
	            //turn off potential previous listeners
	            usersRef.child(`${uid}/chats/${chatID}/context/latestPost`).off();

	            usersRef.child(`${uid}/chats/${chatID}/context/latestPost`).on('value', function(timeStamp) {
	                sortConversations(uid)
	            });
	        }
	    });
	}

	// takes array of items
	var getItemsById = function (itemsToMatch) {
	    return database.ref('items/').once('value').then(function (snapshot) {
	        let allItems = snapshot.val();
	        let matchedItems = {};

	        for (let i = 0; i < itemsToMatch.length; i += 1) {
	            if (itemsToMatch[i] in allItems) {
	                matchedItems[itemsToMatch[i]] = allItems[itemsToMatch[i]];
	            }
	        }
	        return matchedItems;

	    }).catch(function (error) {
	        console.log(error);
	    });
	}


	var setItemAsSold = function(itemID) {
	    itemsRef.child(`${itemID}/sold/`).set(true);
	}

	var previousListener = [null, null];

	var shutOffMessageDetailListener = function(uid, chatID) {
	    usersRef.child(`${uid}/chats/${chatID}/messages`).off();
	}

	var displayMessagesDetail = function (uid, chatID) {
	    if (previousListener[0] !== null) {
	        shutOffMessageDetailListener(previousListener[0], previousListener[1]);
	    }

	    previousListener = [uid, chatID];

	    usersRef.child(`${uid}/chats/${chatID}/messages`).on('child_added', function(snapshot) {
	        let message = snapshot.val();
	        let userClass = (message.user === auth.currentUser.uid ?
	            'message-bubble-self' :
	            'message-bubble-other'
	        );

	        setTimeout(function() {
	            usersRef.child(`${uid}/chats/${chatID}/context/readMessages`).set(true);
	            $('#message-detail-content').append($('<p></p>').addClass(userClass).text(message.text));
	            $('#message-detail-content').fadeIn();

	            // sroll to bottom of chat
	            var wtf = $('#message-detail-content');
	            var height = wtf[0].scrollHeight;
	            wtf.scrollTop(height);
	        }, 100);
	    }, function() {
	        sortConversations(uid)
	    });


	};

	var getSpecificChat = function (uid, chatID) {
	    return usersRef.child(`${uid}/chats/${chatID}/`).once('value').then(function (snapshot) {
	        return snapshot.val();
	    });
	};

	var postNewMessage = function(uid, chatID, message) {
	    Promise.resolve(getSpecificChat(uid, chatID)).then(function(result) {
	        let otherUserID = result.context.otherUser;
	        let date = (new Date()).toString()

	        let messageObject = {
	            date: date,
	            text: message,
	            type: 'text',
	            user: uid
	        };

	        usersRef.child(`${uid}/chats/${chatID}/messages`).push(messageObject);
	        usersRef.child(`${otherUserID}/chats/${chatID}/messages`).push(messageObject);

	        usersRef.child(`${uid}/chats/${chatID}/context/latestPost`).set(date);
	        usersRef.child(`${otherUserID}/chats/${chatID}/context/latestPost`).set(date);

	        usersRef.child(`${otherUserID}/chats/${chatID}/context/readMessages`).set(false);

	    });
	};

	$('#message-send-button').on('click', function() {
	    postNewMessage(auth.currentUser.uid, $(this).attr('chatid'), $('#message-send-text').val());
	    $('#message-send-text').val('');
	});


	$("#message-send-text").keyup(function(event){
	    if (event.keyCode == 13) {
	        $("#message-send-button").click();
	    }
	});

	// AI algorithm functions for suggestions in hub
	// next 3 functions
	var getItemsInHub = function (hub) {
	    return database.ref('itemsByHub/' + hub + '/').once('value').then(function (snapshot) {
	        return snapshot.val();
	    });
	};

	var getUserSuggestions = function (uid) {
	    return usersRef.child(uid + '/tagSuggestions/').once('value').then(function (snapshot) {
	        return snapshot.val();
	    });
	};

	var populateSuggestionsInHub = function(hub, uid) {
	    return Promise.all([
	        getItemsInHub(hub),
	        getUserSuggestions(uid), getUserFavorites()]).then(function (results) {
	            let itemsInHub = results[0];
	            let userSuggestions = results[1];
	            let userFavorites = results[2];

	            // if user has favorites
	            if (userSuggestions) {
	                // for each item in the hub
	                for (let item in itemsInHub) {
	                    let itemTagCount = itemsInHub[item]['tags'].length;
	                    let tagMatches = {};
	                    let tagMatchCount = 0;
	                    let tagWeight = 0;
	                    let itemTags = itemsInHub[item]['tags'];

	                    // for each tag in each item
	                    itemTags.forEach(function (tag) {
	                        // calculate weights
	                        if (tag in userSuggestions) {
	                            tagMatches[tag] = userSuggestions[tag];
	                            tagMatchCount += 1;
	                            tagWeight += userSuggestions[tag];

	                        }
	                    });

	                    tagWeight /= itemTagCount;

	                    if (tagMatchCount === 0) {
	                        continue;
	                    }

	                    // for each tags in item
	                    itemTags.forEach(function(tag) {
	                        // set weights
	                        if (tag in userSuggestions && userSuggestions[tag] < 1) {
	                            usersRef.child(uid + '/tagSuggestions/' + tag).set((userSuggestions[tag]));
	                        } else if (!(tag in userSuggestions)) {
	                            usersRef.child(uid + '/tagSuggestions/' + tag).set(tagWeight);
	                        }
	                    });
	                }

	                // iterate through items and display items with highest values
	                let userItemSuggestions = {}
	                for (let item in itemsInHub) {
	                    // immediately check if the item is part of user favorites
	                    // if it is, skip since no need to suggest a favorited
	                    // item
	                    if (itemsInHub[item]['id'] in userFavorites) {
	                        continue;
	                    }
	                    let itemTags = itemsInHub[item]['tags'];
	                    let tagCount = itemsInHub[item]['tags'].length;
	                    let itemWeight = 0;
	                    itemTags.forEach(function (tag) {
	                        if (tag in userSuggestions) {
	                            itemWeight += userSuggestions[tag];
	                        }
	                    });
	                    itemWeight /= tagCount;
	                    userItemSuggestions[itemsInHub[item]['id']] = itemWeight;
	                }

	                // sorting results in an array, where each
	                // input is an array [key, value]
	                var sortedSuggestions = []

	                for (let item in userItemSuggestions) {
	                    sortedSuggestions.push(item)
	                }

	                sortedSuggestions.sort(function(a, b) {
	                    return b - a
	                });

	                return sortedSuggestions;
	            }

	        });
	};

	const facebookLogin = () => {
	    fbProvider.addScope('public_profile');
	    fbProvider.addScope('email');
	    fbProvider.addScope('user_education_history');
	    auth.signInWithPopup(fbProvider).then((result) => {
	        if (result.credential) {
	            const token = result.credential.accessToken;
	            let seperatedName = result.user.displayName.split(' ', 2);
	            let date = Date();
	            let defaultPreference = ['cash'];
	            let user = auth.currentUser;
	            console.log(result);

	            let userInfo = {
	                uid: user.uid,
	                email: result.user.email,
	                username: result.user.displayName,
	                userHub: null,
	                firstName: seperatedName[0],
	                lastName: seperatedName[1],
	                paymentPreferences: defaultPreference,
	                dateCreated: date
	            };
	            usersRef.child(user.uid).set(userInfo);
	        }
	    });
	};

	const googleLogin = () => {
	    auth.signInWithRedirect(googleProvider);
	};


	module.exports = {
	    auth,
	    signIn,
	    getListings,
	    addListing,
	    addHubs,
	    addTags,
	    filterListings,
	    createAccount,
	    itemImagesRef,
	    addFavoriteToProfile,
	    getFavorites,
	    getFavoriteObjects,
	    removeFavorite,
	    getImage,
	    getRecentItemsInHub,
	    getUserInfo,
	    updateUserInfo,
	    populateSuggestionsInHub,
	    addTagToProfile,
	    getProfileTags,
	    removeProfileTag,
	    getItemsById,
	    userImagesRef,
	    addProfilePicture,
	    getProfilePicture,
	    initializeMessage,
	    displayConversations,
	    getUserInfoProper,
	    displayMessagesDetail,
	    postNewMessage,
	    sendVerificationEmail,
	    getUserSelling,
	    setItemAsSold,
	    facebookLogin,
	    googleLogin
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var firebase = (function(){
	/*! @license Firebase v3.6.10
	    Build: 3.6.10-rc.1
	    Terms: https://firebase.google.com/terms/ */
	var firebase = null; (function() { var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},k="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,l=function(){l=function(){};k.Symbol||(k.Symbol=ba)},ca=0,ba=function(a){return"jscomp_symbol_"+(a||"")+ca++},n=function(){l();var a=k.Symbol.iterator;a||(a=k.Symbol.iterator=
	k.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&aa(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return m(this)}});n=function(){}},m=function(a){var b=0;return da(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})},da=function(a){n();a={next:a};a[k.Symbol.iterator]=function(){return this};return a},q=this,r=function(){},t=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);
	if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},v=function(a){return"function"==t(a)},ea=function(a,
	b,c){return a.call.apply(a.bind,arguments)},fa=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},w=function(a,b,c){w=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ea:fa;return w.apply(null,arguments)},x=function(a,b){var c=Array.prototype.slice.call(arguments,
	1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},y=function(a,b){function c(){}c.prototype=b.prototype;a.ea=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.ca=function(a,c,h){for(var e=Array(arguments.length-2),d=2;d<arguments.length;d++)e[d-2]=arguments[d];return b.prototype[c].apply(a,e)}};var A;A="undefined"!==typeof window?window:"undefined"!==typeof self?self:global;
	var __extends=function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)},__assign=Object.assign||function(a){for(var b,c=1,d=arguments.length;c<d;c++){b=arguments[c];for(var e in b)Object.prototype.hasOwnProperty.call(b,e)&&(a[e]=b[e])}return a},__rest=function(a,b){var c={},d;for(d in a)Object.prototype.hasOwnProperty.call(a,d)&&0>b.indexOf(d)&&(c[d]=a[d]);if(null!=a&&"function"===typeof Object.getOwnPropertySymbols){var e=
	0;for(d=Object.getOwnPropertySymbols(a);e<d.length;e++)0>b.indexOf(d[e])&&(c[d[e]]=a[d[e]])}return c},__decorate=function(a,b,c,d){var e=arguments.length,h=3>e?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d,g;g=A.Reflect;if("object"===typeof g&&"function"===typeof g.decorate)h=g.decorate(a,b,c,d);else for(var f=a.length-1;0<=f;f--)if(g=a[f])h=(3>e?g(h):3<e?g(b,c,h):g(b,c))||h;return 3<e&&h&&Object.defineProperty(b,c,h),h},__metadata=function(a,b){var c=A.Reflect;if("object"===typeof c&&"function"===
	typeof c.metadata)return c.metadata(a,b)},__param=function(a,b){return function(c,d){b(c,d,a)}},__awaiter=function(a,b,c,d){return new (c||(c=Promise))(function(e,h){function g(a){try{p(d.next(a))}catch(u){h(u)}}function f(a){try{p(d["throw"](a))}catch(u){h(u)}}function p(a){a.done?e(a.value):(new c(function(b){b(a.value)})).then(g,f)}p((d=d.apply(a,b)).next())})},__generator=function(a,b){function c(a){return function(b){return d([a,b])}}function d(c){if(h)throw new TypeError("Generator is already executing.");
	for(;e;)try{if(h=1,g&&(f=g[c[0]&2?"return":c[0]?"throw":"next"])&&!(f=f.call(g,c[1])).done)return f;if(g=0,f)c=[0,f.value];switch(c[0]){case 0:case 1:f=c;break;case 4:return e.label++,{value:c[1],done:!1};case 5:e.label++;g=c[1];c=[0];continue;case 7:c=e.F.pop();e.H.pop();continue;default:if(!(f=e.H,f=0<f.length&&f[f.length-1])&&(6===c[0]||2===c[0])){e=0;continue}if(3===c[0]&&(!f||c[1]>f[0]&&c[1]<f[3]))e.label=c[1];else if(6===c[0]&&e.label<f[1])e.label=f[1],f=c;else if(f&&e.label<f[2])e.label=f[2],
	e.F.push(c);else{f[2]&&e.F.pop();e.H.pop();continue}}c=b.call(a,e)}catch(z){c=[6,z],g=0}finally{h=f=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}var e={label:0,da:function(){if(f[0]&1)throw f[1];return f[1]},H:[],F:[]},h,g,f;return{next:c(0),"throw":c(1),"return":c(2)}};
	"undefined"!==typeof A.O&&A.O||(A.__extends=__extends,A.__assign=__assign,A.__rest=__rest,A.__extends=__extends,A.__decorate=__decorate,A.__metadata=__metadata,A.__param=__param,A.__awaiter=__awaiter,A.__generator=__generator);var B=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,B);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};y(B,Error);B.prototype.name="CustomError";var ga=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};var C=function(a,b){b.unshift(a);B.call(this,ga.apply(null,b));b.shift()};y(C,B);C.prototype.name="AssertionError";var ha=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),h=d;else a&&(e+=": "+a,h=b);throw new C(""+e,h||[]);},D=function(a,b,c){a||ha("",null,b,Array.prototype.slice.call(arguments,2))},E=function(a,b,c){v(a)||ha("Expected function but got %s: %s.",[t(a),a],b,Array.prototype.slice.call(arguments,2))};var F=function(a,b,c){this.V=c;this.P=a;this.W=b;this.s=0;this.o=null};F.prototype.get=function(){var a;0<this.s?(this.s--,a=this.o,this.o=a.next,a.next=null):a=this.P();return a};F.prototype.put=function(a){this.W(a);this.s<this.V&&(this.s++,a.next=this.o,this.o=a)};var G;a:{var ia=q.navigator;if(ia){var ja=ia.userAgent;if(ja){G=ja;break a}}G=""};var ka=function(a){q.setTimeout(function(){throw a;},0)},H,la=function(){var a=q.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&-1==G.indexOf("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+
	"//"+b.location.host,a=w(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&-1==G.indexOf("Trident")&&-1==G.indexOf("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.I;c.I=null;a()}};return function(a){d.next={I:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in
	document.createElement("SCRIPT")?function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){q.setTimeout(a,0)}};var I=function(){this.v=this.f=null},ma=new F(function(){return new J},function(a){a.reset()},100);I.prototype.add=function(a,b){var c=ma.get();c.set(a,b);this.v?this.v.next=c:(D(!this.f),this.f=c);this.v=c};I.prototype.remove=function(){var a=null;this.f&&(a=this.f,this.f=this.f.next,this.f||(this.v=null),a.next=null);return a};var J=function(){this.next=this.scope=this.B=null};J.prototype.set=function(a,b){this.B=a;this.scope=b;this.next=null};
	J.prototype.reset=function(){this.next=this.scope=this.B=null};var M=function(a,b){K||na();L||(K(),L=!0);oa.add(a,b)},K,na=function(){if(-1!=String(q.Promise).indexOf("[native code]")){var a=q.Promise.resolve(void 0);K=function(){a.then(pa)}}else K=function(){var a=pa;!v(q.setImmediate)||q.Window&&q.Window.prototype&&-1==G.indexOf("Edge")&&q.Window.prototype.setImmediate==q.setImmediate?(H||(H=la()),H(a)):q.setImmediate(a)}},L=!1,oa=new I,pa=function(){for(var a;a=oa.remove();){try{a.B.call(a.scope)}catch(b){ka(b)}ma.put(a)}L=!1};var O=function(a,b){this.b=0;this.N=void 0;this.j=this.g=this.u=null;this.m=this.A=!1;if(a!=r)try{var c=this;a.call(b,function(a){N(c,2,a)},function(a){try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}N(c,3,a)})}catch(d){N(this,3,d)}},qa=function(){this.next=this.context=this.h=this.c=this.child=null;this.w=!1};qa.prototype.reset=function(){this.context=this.h=this.c=this.child=null;this.w=!1};
	var ra=new F(function(){return new qa},function(a){a.reset()},100),sa=function(a,b,c){var d=ra.get();d.c=a;d.h=b;d.context=c;return d},ua=function(a,b,c){ta(a,b,c,null)||M(x(b,a))};O.prototype.then=function(a,b,c){null!=a&&E(a,"opt_onFulfilled should be a function.");null!=b&&E(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return va(this,v(a)?a:null,v(b)?b:null,c)};O.prototype.then=O.prototype.then;O.prototype.$goog_Thenable=!0;
	O.prototype.Z=function(a,b){return va(this,null,a,b)};var xa=function(a,b){a.g||2!=a.b&&3!=a.b||wa(a);D(null!=b.c);a.j?a.j.next=b:a.g=b;a.j=b},va=function(a,b,c,d){var e=sa(null,null,null);e.child=new O(function(a,g){e.c=b?function(c){try{var e=b.call(d,c);a(e)}catch(z){g(z)}}:a;e.h=c?function(b){try{var e=c.call(d,b);a(e)}catch(z){g(z)}}:g});e.child.u=a;xa(a,e);return e.child};O.prototype.$=function(a){D(1==this.b);this.b=0;N(this,2,a)};O.prototype.aa=function(a){D(1==this.b);this.b=0;N(this,3,a)};
	var N=function(a,b,c){0==a.b&&(a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.b=1,ta(c,a.$,a.aa,a)||(a.N=c,a.b=b,a.u=null,wa(a),3!=b||ya(a,c)))},ta=function(a,b,c,d){if(a instanceof O)return null!=b&&E(b,"opt_onFulfilled should be a function."),null!=c&&E(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),xa(a,sa(b||r,c||null,d)),!0;var e;if(a)try{e=!!a.$goog_Thenable}catch(g){e=!1}else e=!1;if(e)return a.then(b,c,d),
	!0;e=typeof a;if("object"==e&&null!=a||"function"==e)try{var h=a.then;if(v(h))return za(a,h,b,c,d),!0}catch(g){return c.call(d,g),!0}return!1},za=function(a,b,c,d,e){var h=!1,g=function(a){h||(h=!0,c.call(e,a))},f=function(a){h||(h=!0,d.call(e,a))};try{b.call(a,g,f)}catch(p){f(p)}},wa=function(a){a.A||(a.A=!0,M(a.S,a))},Aa=function(a){var b=null;a.g&&(b=a.g,a.g=b.next,b.next=null);a.g||(a.j=null);null!=b&&D(null!=b.c);return b};
	O.prototype.S=function(){for(var a;a=Aa(this);){var b=this.b,c=this.N;if(3==b&&a.h&&!a.w){var d;for(d=this;d&&d.m;d=d.u)d.m=!1}if(a.child)a.child.u=null,Ba(a,b,c);else try{a.w?a.c.call(a.context):Ba(a,b,c)}catch(e){Ca.call(null,e)}ra.put(a)}this.A=!1};var Ba=function(a,b,c){2==b?a.c.call(a.context,c):a.h&&a.h.call(a.context,c)},ya=function(a,b){a.m=!0;M(function(){a.m&&Ca.call(null,b)})},Ca=ka;function P(a,b){if(!(b instanceof Object))return b;switch(b.constructor){case Date:return new Date(b.getTime());case Object:void 0===a&&(a={});break;case Array:a=[];break;default:return b}for(var c in b)b.hasOwnProperty(c)&&(a[c]=P(a[c],b[c]));return a};O.all=function(a){return new O(function(b,c){var d=a.length,e=[];if(d)for(var h=function(a,c){d--;e[a]=c;0==d&&b(e)},g=function(a){c(a)},f=0,p;f<a.length;f++)p=a[f],ua(p,x(h,f),g);else b(e)})};O.resolve=function(a){if(a instanceof O)return a;var b=new O(r);N(b,2,a);return b};O.reject=function(a){return new O(function(b,c){c(a)})};O.prototype["catch"]=O.prototype.Z;var Q=O;"undefined"!==typeof Promise&&(Q=Promise);var Da=Q;function Ea(a,b){a=new R(a,b);return a.subscribe.bind(a)}var R=function(a,b){var c=this;this.a=[];this.M=0;this.task=Da.resolve();this.l=!1;this.D=b;this.task.then(function(){a(c)}).catch(function(a){c.error(a)})};R.prototype.next=function(a){S(this,function(b){b.next(a)})};R.prototype.error=function(a){S(this,function(b){b.error(a)});this.close(a)};R.prototype.complete=function(){S(this,function(a){a.complete()});this.close()};
	R.prototype.subscribe=function(a,b,c){var d=this,e;if(void 0===a&&void 0===b&&void 0===c)throw Error("Missing Observer.");e=Fa(a)?a:{next:a,error:b,complete:c};void 0===e.next&&(e.next=T);void 0===e.error&&(e.error=T);void 0===e.complete&&(e.complete=T);a=this.ba.bind(this,this.a.length);this.l&&this.task.then(function(){try{d.J?e.error(d.J):e.complete()}catch(h){}});this.a.push(e);return a};
	R.prototype.ba=function(a){void 0!==this.a&&void 0!==this.a[a]&&(delete this.a[a],--this.M,0===this.M&&void 0!==this.D&&this.D(this))};var S=function(a,b){if(!a.l)for(var c=0;c<a.a.length;c++)Ga(a,c,b)},Ga=function(a,b,c){a.task.then(function(){if(void 0!==a.a&&void 0!==a.a[b])try{c(a.a[b])}catch(d){"undefined"!==typeof console&&console.error&&console.error(d)}})};R.prototype.close=function(a){var b=this;this.l||(this.l=!0,void 0!==a&&(this.J=a),this.task.then(function(){b.a=void 0;b.D=void 0}))};
	function Fa(a){if("object"!==typeof a||null===a)return!1;var b;b=["next","error","complete"];n();var c=b[Symbol.iterator];b=c?c.call(b):m(b);for(c=b.next();!c.done;c=b.next())if(c=c.value,c in a&&"function"===typeof a[c])return!0;return!1}function T(){};var Ha=Error.captureStackTrace,V=function(a,b){this.code=a;this.message=b;if(Ha)Ha(this,U.prototype.create);else{var c=Error.apply(this,arguments);this.name="FirebaseError";Object.defineProperty(this,"stack",{get:function(){return c.stack}})}};V.prototype=Object.create(Error.prototype);V.prototype.constructor=V;V.prototype.name="FirebaseError";var U=function(a,b,c){this.X=a;this.Y=b;this.R=c;this.pattern=/\{\$([^}]+)}/g};
	U.prototype.create=function(a,b){void 0===b&&(b={});var c=this.R[a];a=this.X+"/"+a;var c=void 0===c?"Error":c.replace(this.pattern,function(a,c){a=b[c];return void 0!==a?a.toString():"<"+c+"?>"}),c=this.Y+": "+c+" ("+a+").",c=new V(a,c),d;for(d in b)b.hasOwnProperty(d)&&"_"!==d.slice(-1)&&(c[d]=b[d]);return c};var W=Q,X=function(a,b,c){var d=this;this.K=c;this.L=!1;this.i={};this.C=b;this.G=P(void 0,a);a="serviceAccount"in this.G;("credential"in this.G||a)&&"undefined"!==typeof console&&console.log("The '"+(a?"serviceAccount":"credential")+"' property specified in the first argument to initializeApp() is deprecated and will be removed in the next major version. You should instead use the 'firebase-admin' package. See https://firebase.google.com/docs/admin/setup for details on how to get started.");Object.keys(c.INTERNAL.factories).forEach(function(a){var b=
	c.INTERNAL.useAsService(d,a);null!==b&&(b=d.U.bind(d,b),d[a]=b)})};X.prototype.delete=function(){var a=this;return(new W(function(b){Y(a);b()})).then(function(){a.K.INTERNAL.removeApp(a.C);return W.all(Object.keys(a.i).map(function(b){return a.i[b].INTERNAL.delete()}))}).then(function(){a.L=!0;a.i={}})};X.prototype.U=function(a){Y(this);void 0===this.i[a]&&(this.i[a]=this.K.INTERNAL.factories[a](this,this.T.bind(this)));return this.i[a]};X.prototype.T=function(a){P(this,a)};
	var Y=function(a){a.L&&Z("app-deleted",{name:a.C})};k.Object.defineProperties(X.prototype,{name:{configurable:!0,enumerable:!0,get:function(){Y(this);return this.C}},options:{configurable:!0,enumerable:!0,get:function(){Y(this);return this.G}}});X.prototype.name&&X.prototype.options||X.prototype.delete||console.log("dc");
	function Ia(){function a(a){a=a||"[DEFAULT]";var b=d[a];void 0===b&&Z("no-app",{name:a});return b}function b(a,b){Object.keys(e).forEach(function(d){d=c(a,d);if(null!==d&&h[d])h[d](b,a)})}function c(a,b){if("serverAuth"===b)return null;var c=b;a=a.options;"auth"===b&&(a.serviceAccount||a.credential)&&(c="serverAuth","serverAuth"in e||Z("sa-not-supported"));return c}var d={},e={},h={},g={__esModule:!0,initializeApp:function(a,c){void 0===c?c="[DEFAULT]":"string"===typeof c&&""!==c||Z("bad-app-name",
	{name:c+""});void 0!==d[c]&&Z("duplicate-app",{name:c});a=new X(a,c,g);d[c]=a;b(a,"create");void 0!=a.INTERNAL&&void 0!=a.INTERNAL.getToken||P(a,{INTERNAL:{getToken:function(){return W.resolve(null)},addAuthTokenListener:function(){},removeAuthTokenListener:function(){}}});return a},app:a,apps:null,Promise:W,SDK_VERSION:"0.0.0",INTERNAL:{registerService:function(b,c,d,u){e[b]&&Z("duplicate-service",{name:b});e[b]=c;u&&(h[b]=u);c=function(c){void 0===c&&(c=a());return c[b]()};void 0!==d&&P(c,d);return g[b]=
	c},createFirebaseNamespace:Ia,extendNamespace:function(a){P(g,a)},createSubscribe:Ea,ErrorFactory:U,removeApp:function(a){b(d[a],"delete");delete d[a]},factories:e,useAsService:c,Promise:O,deepExtend:P}};g["default"]=g;Object.defineProperty(g,"apps",{get:function(){return Object.keys(d).map(function(a){return d[a]})}});a.App=X;return g}function Z(a,b){throw Ja.create(a,b);}
	var Ja=new U("app","Firebase",{"no-app":"No Firebase App '{$name}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$name}","duplicate-app":"Firebase App named '{$name}' already exists","app-deleted":"Firebase App named '{$name}' already deleted","duplicate-service":"Firebase service named '{$name}' already registered","sa-not-supported":"Initializing the Firebase SDK with a service account is only allowed in a Node.js environment. On client devices, you should instead initialize the SDK with an api key and auth domain"});"undefined"!==typeof firebase&&(firebase=Ia()); }).call(this);
	firebase.SDK_VERSION = "3.6.10";
	return firebase;}).call(typeof global !== undefined ? global : typeof self !== undefined ? self : typeof window !== undefined ? window : {});
	module.exports = firebase;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var firebase = __webpack_require__(3);
	(function(){
	/*! @license Firebase v3.6.10
	    Build: 3.6.10-rc.1
	    Terms: https://firebase.google.com/terms/ */
	(function(){var h,aa=aa||{},l=this,ba=function(){},m=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&
	!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b},ca=function(a){return null===a},da=function(a){return"array"==m(a)},ea=function(a){var b=m(a);return"array"==b||"object"==b&&"number"==typeof a.length},p=function(a){return"string"==typeof a},fa=function(a){return"number"==typeof a},q=function(a){return"function"==m(a)},ga=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},ha=function(a,b,
	c){return a.call.apply(a.bind,arguments)},ia=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},r=function(a,b,c){r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ha:ia;return r.apply(null,arguments)},ja=function(a,b){var c=Array.prototype.slice.call(arguments,
	1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},ka=Date.now||function(){return+new Date},t=function(a,b){function c(){}c.prototype=b.prototype;a.jd=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Bf=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};var u=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,u);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};t(u,Error);u.prototype.name="CustomError";var la=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},ma=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},na=/&/g,oa=/</g,pa=/>/g,qa=/"/g,ra=/'/g,sa=/\x00/g,ta=/[\x00&<>"']/,v=function(a,b){return-1!=a.indexOf(b)},ua=function(a,b){return a<b?-1:a>b?1:0};var va=function(a,b){b.unshift(a);u.call(this,la.apply(null,b));b.shift()};t(va,u);va.prototype.name="AssertionError";
	var wa=function(a,b,c,d){var e="Assertion failed";if(c)var e=e+(": "+c),f=d;else a&&(e+=": "+a,f=b);throw new va(""+e,f||[]);},w=function(a,b,c){a||wa("",null,b,Array.prototype.slice.call(arguments,2))},xa=function(a,b){throw new va("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));},ya=function(a,b,c){fa(a)||wa("Expected number but got %s: %s.",[m(a),a],b,Array.prototype.slice.call(arguments,2));return a},za=function(a,b,c){p(a)||wa("Expected string but got %s: %s.",[m(a),a],b,Array.prototype.slice.call(arguments,
	2))},Aa=function(a,b,c){q(a)||wa("Expected function but got %s: %s.",[m(a),a],b,Array.prototype.slice.call(arguments,2))};var Ba=Array.prototype.indexOf?function(a,b,c){w(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ca=Array.prototype.forEach?function(a,b,c){w(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Da=function(a,b){for(var c=p(a)?
	a.split(""):a,d=a.length-1;0<=d;--d)d in c&&b.call(void 0,c[d],d,a)},Ea=Array.prototype.map?function(a,b,c){w(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=p(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e},Fa=Array.prototype.some?function(a,b,c){w(null!=a.length);return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1},
	Ha=function(a){var b;a:{b=Ga;for(var c=a.length,d=p(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:p(a)?a.charAt(b):a[b]},Ia=function(a,b){return 0<=Ba(a,b)},Ka=function(a,b){b=Ba(a,b);var c;(c=0<=b)&&Ja(a,b);return c},Ja=function(a,b){w(null!=a.length);return 1==Array.prototype.splice.call(a,b,1).length},La=function(a,b){var c=0;Da(a,function(d,e){b.call(void 0,d,e,a)&&Ja(a,e)&&c++})},Ma=function(a){return Array.prototype.concat.apply(Array.prototype,
	arguments)},Na=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};var Oa=function(a,b){for(var c in a)b.call(void 0,a[c],c,a)},Pa=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},Qa=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},Ra=function(a){for(var b in a)return!1;return!0},Sa=function(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(c in b)if(!(c in a))return!1;return!0},Ta=function(a){var b={},c;for(c in a)b[c]=a[c];return b},Ua="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
	Va=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<Ua.length;f++)c=Ua[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var Xa;a:{var Ya=l.navigator;if(Ya){var Za=Ya.userAgent;if(Za){Xa=Za;break a}}Xa=""}var x=function(a){return v(Xa,a)};var $a=function(a){$a[" "](a);return a};$a[" "]=ba;var bb=function(a,b){var c=ab;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var cb=x("Opera"),y=x("Trident")||x("MSIE"),db=x("Edge"),eb=db||y,fb=x("Gecko")&&!(v(Xa.toLowerCase(),"webkit")&&!x("Edge"))&&!(x("Trident")||x("MSIE"))&&!x("Edge"),gb=v(Xa.toLowerCase(),"webkit")&&!x("Edge"),hb=function(){var a=l.document;return a?a.documentMode:void 0},ib;
	a:{var jb="",kb=function(){var a=Xa;if(fb)return/rv\:([^\);]+)(\)|;)/.exec(a);if(db)return/Edge\/([\d\.]+)/.exec(a);if(y)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(gb)return/WebKit\/(\S+)/.exec(a);if(cb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();kb&&(jb=kb?kb[1]:"");if(y){var lb=hb();if(null!=lb&&lb>parseFloat(jb)){ib=String(lb);break a}}ib=jb}
	var mb=ib,ab={},z=function(a){return bb(a,function(){for(var b=0,c=ma(String(mb)).split("."),d=ma(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",k=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];k=/(\d*)(\D*)(.*)/.exec(k)||["","","",""];if(0==g[0].length&&0==k[0].length)break;b=ua(0==g[1].length?0:parseInt(g[1],10),0==k[1].length?0:parseInt(k[1],10))||ua(0==g[2].length,0==k[2].length)||ua(g[2],k[2]);g=g[3];k=k[3]}while(0==b)}return 0<=b})},nb;var ob=l.document;
	nb=ob&&y?hb()||("CSS1Compat"==ob.compatMode?parseInt(mb,10):5):void 0;var pb=function(a){return Ea(a,function(a){a=a.toString(16);return 1<a.length?a:"0"+a}).join("")};var qb=null,rb=null,tb=function(a){var b="";sb(a,function(a){b+=String.fromCharCode(a)});return b},sb=function(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=rb[c];if(null!=e)return e;if(!/^[\s\xa0]*$/.test(c))throw Error("Unknown base64 encoding at char: "+c);}return b}ub();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),k=c(64);if(64===k&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=k&&b(g<<6&192|k))}},ub=function(){if(!qb){qb={};rb={};for(var a=0;65>a;a++)qb[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),
	rb[qb[a]]=a,62<=a&&(rb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)]=a)}};var vb=function(){this.ya=-1};var yb=function(a,b){this.ya=64;this.Rb=l.Uint8Array?new Uint8Array(this.ya):Array(this.ya);this.uc=this.Ya=0;this.h=[];this.Te=a;this.Dd=b;this.uf=l.Int32Array?new Int32Array(64):Array(64);void 0!==wb||(wb=l.Int32Array?new Int32Array(xb):xb);this.reset()},wb;t(yb,vb);for(var zb=[],Ab=0;63>Ab;Ab++)zb[Ab]=0;var Bb=Ma(128,zb);yb.prototype.reset=function(){this.uc=this.Ya=0;this.h=l.Int32Array?new Int32Array(this.Dd):Na(this.Dd)};
	var Cb=function(a){var b=a.Rb;w(b.length==a.ya);for(var c=a.uf,d=0,e=0;e<b.length;)c[d++]=b[e]<<24|b[e+1]<<16|b[e+2]<<8|b[e+3],e=4*d;for(b=16;64>b;b++){var e=c[b-15]|0,d=c[b-2]|0,f=(c[b-16]|0)+((e>>>7|e<<25)^(e>>>18|e<<14)^e>>>3)|0,g=(c[b-7]|0)+((d>>>17|d<<15)^(d>>>19|d<<13)^d>>>10)|0;c[b]=f+g|0}for(var d=a.h[0]|0,e=a.h[1]|0,k=a.h[2]|0,n=a.h[3]|0,A=a.h[4]|0,Wa=a.h[5]|0,Gb=a.h[6]|0,f=a.h[7]|0,b=0;64>b;b++)var dh=((d>>>2|d<<30)^(d>>>13|d<<19)^(d>>>22|d<<10))+(d&e^d&k^e&k)|0,g=A&Wa^~A&Gb,f=f+((A>>>6|
	A<<26)^(A>>>11|A<<21)^(A>>>25|A<<7))|0,g=g+(wb[b]|0)|0,g=f+(g+(c[b]|0)|0)|0,f=Gb,Gb=Wa,Wa=A,A=n+g|0,n=k,k=e,e=d,d=g+dh|0;a.h[0]=a.h[0]+d|0;a.h[1]=a.h[1]+e|0;a.h[2]=a.h[2]+k|0;a.h[3]=a.h[3]+n|0;a.h[4]=a.h[4]+A|0;a.h[5]=a.h[5]+Wa|0;a.h[6]=a.h[6]+Gb|0;a.h[7]=a.h[7]+f|0};
	yb.prototype.update=function(a,b){void 0===b&&(b=a.length);var c=0,d=this.Ya;if(p(a))for(;c<b;)this.Rb[d++]=a.charCodeAt(c++),d==this.ya&&(Cb(this),d=0);else if(ea(a))for(;c<b;){var e=a[c++];if(!("number"==typeof e&&0<=e&&255>=e&&e==(e|0)))throw Error("message must be a byte array");this.Rb[d++]=e;d==this.ya&&(Cb(this),d=0)}else throw Error("message must be string or array");this.Ya=d;this.uc+=b};
	yb.prototype.digest=function(){var a=[],b=8*this.uc;56>this.Ya?this.update(Bb,56-this.Ya):this.update(Bb,this.ya-(this.Ya-56));for(var c=63;56<=c;c--)this.Rb[c]=b&255,b/=256;Cb(this);for(c=b=0;c<this.Te;c++)for(var d=24;0<=d;d-=8)a[b++]=this.h[c]>>d&255;return a};
	var xb=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,
	4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];var Eb=function(){yb.call(this,8,Db)};t(Eb,yb);var Db=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];var Fb=!y||9<=Number(nb),Hb=y&&!z("9");!gb||z("528");fb&&z("1.9b")||y&&z("8")||cb&&z("9.5")||gb&&z("528");fb&&!z("8")||y&&z("9");var Ib=function(){this.Aa=this.Aa;this.hc=this.hc};Ib.prototype.Aa=!1;Ib.prototype.isDisposed=function(){return this.Aa};Ib.prototype.Ta=function(){if(this.hc)for(;this.hc.length;)this.hc.shift()()};var Jb=function(a,b){this.type=a;this.currentTarget=this.target=b;this.defaultPrevented=this.bb=!1;this.Od=!0};Jb.prototype.preventDefault=function(){this.defaultPrevented=!0;this.Od=!1};var Kb=function(a,b){Jb.call(this,a?a.type:"");this.relatedTarget=this.currentTarget=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.key="";this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.Ua=this.state=null;a&&this.init(a,b)};t(Kb,Jb);
	Kb.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.currentTarget=b;if(b=a.relatedTarget){if(fb){var e;a:{try{$a(b.nodeName);e=!0;break a}catch(f){}e=!1}e||(b=null)}}else"mouseover"==c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;null===d?(this.offsetX=gb||void 0!==a.offsetX?a.offsetX:a.layerX,this.offsetY=gb||void 0!==a.offsetY?a.offsetY:a.layerY,this.clientX=void 0!==a.clientX?a.clientX:
	a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0):(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.charCode=a.charCode||("keypress"==c?a.keyCode:0);this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.state=a.state;this.Ua=
	a;a.defaultPrevented&&this.preventDefault()};Kb.prototype.preventDefault=function(){Kb.jd.preventDefault.call(this);var a=this.Ua;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Hb)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};Kb.prototype.xe=function(){return this.Ua};var Lb="closure_listenable_"+(1E6*Math.random()|0),Mb=0;var Nb=function(a,b,c,d,e){this.listener=a;this.lc=null;this.src=b;this.type=c;this.capture=!!d;this.Zb=e;this.key=++Mb;this.hb=this.Qb=!1},Ob=function(a){a.hb=!0;a.listener=null;a.lc=null;a.src=null;a.Zb=null};var Pb=function(a){this.src=a;this.D={};this.Mb=0};Pb.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.D[f];a||(a=this.D[f]=[],this.Mb++);var g=Qb(a,b,d,e);-1<g?(b=a[g],c||(b.Qb=!1)):(b=new Nb(b,this.src,f,!!d,e),b.Qb=c,a.push(b));return b};Pb.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.D))return!1;var e=this.D[a];b=Qb(e,b,c,d);return-1<b?(Ob(e[b]),Ja(e,b),0==e.length&&(delete this.D[a],this.Mb--),!0):!1};
	var Rb=function(a,b){var c=b.type;c in a.D&&Ka(a.D[c],b)&&(Ob(b),0==a.D[c].length&&(delete a.D[c],a.Mb--))};Pb.prototype.Jc=function(a,b,c,d){a=this.D[a.toString()];var e=-1;a&&(e=Qb(a,b,c,d));return-1<e?a[e]:null};var Qb=function(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.hb&&f.listener==b&&f.capture==!!c&&f.Zb==d)return e}return-1};var Sb="closure_lm_"+(1E6*Math.random()|0),Tb={},Ub=0,Vb=function(a,b,c,d,e){if(da(b))for(var f=0;f<b.length;f++)Vb(a,b[f],c,d,e);else c=Wb(c),a&&a[Lb]?a.listen(b,c,d,e):Xb(a,b,c,!1,d,e)},Xb=function(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=!!e,k=Yb(a);k||(a[Sb]=k=new Pb(a));c=k.add(b,c,d,e,f);if(!c.lc){d=Zb();c.lc=d;d.src=a;d.listener=c;if(a.addEventListener)a.addEventListener(b.toString(),d,g);else if(a.attachEvent)a.attachEvent($b(b.toString()),d);else throw Error("addEventListener and attachEvent are unavailable.");
	Ub++}},Zb=function(){var a=ac,b=Fb?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b},bc=function(a,b,c,d,e){if(da(b))for(var f=0;f<b.length;f++)bc(a,b[f],c,d,e);else c=Wb(c),a&&a[Lb]?cc(a,b,c,d,e):Xb(a,b,c,!0,d,e)},dc=function(a,b,c,d,e){if(da(b))for(var f=0;f<b.length;f++)dc(a,b[f],c,d,e);else c=Wb(c),a&&a[Lb]?a.aa.remove(String(b),c,d,e):a&&(a=Yb(a))&&(b=a.Jc(b,c,!!d,e))&&ec(b)},ec=function(a){if(!fa(a)&&a&&!a.hb){var b=a.src;if(b&&
	b[Lb])Rb(b.aa,a);else{var c=a.type,d=a.lc;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent&&b.detachEvent($b(c),d);Ub--;(c=Yb(b))?(Rb(c,a),0==c.Mb&&(c.src=null,b[Sb]=null)):Ob(a)}}},$b=function(a){return a in Tb?Tb[a]:Tb[a]="on"+a},gc=function(a,b,c,d){var e=!0;if(a=Yb(a))if(b=a.D[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.capture==c&&!f.hb&&(f=fc(f,d),e=e&&!1!==f)}return e},fc=function(a,b){var c=a.listener,d=a.Zb||a.src;a.Qb&&ec(a);return c.call(d,
	b)},ac=function(a,b){if(a.hb)return!0;if(!Fb){if(!b)a:{b=["window","event"];for(var c=l,d;d=b.shift();)if(null!=c[d])c=c[d];else{b=null;break a}b=c}d=b;b=new Kb(d,this);c=!0;if(!(0>d.keyCode||void 0!=d.returnValue)){a:{var e=!1;if(0==d.keyCode)try{d.keyCode=-1;break a}catch(g){e=!0}if(e||void 0==d.returnValue)d.returnValue=!0}d=[];for(e=b.currentTarget;e;e=e.parentNode)d.push(e);a=a.type;for(e=d.length-1;!b.bb&&0<=e;e--){b.currentTarget=d[e];var f=gc(d[e],a,!0,b),c=c&&f}for(e=0;!b.bb&&e<d.length;e++)b.currentTarget=
	d[e],f=gc(d[e],a,!1,b),c=c&&f}return c}return fc(a,new Kb(b,this))},Yb=function(a){a=a[Sb];return a instanceof Pb?a:null},hc="__closure_events_fn_"+(1E9*Math.random()>>>0),Wb=function(a){w(a,"Listener can not be null.");if(q(a))return a;w(a.handleEvent,"An object listener must have handleEvent method.");a[hc]||(a[hc]=function(b){return a.handleEvent(b)});return a[hc]};var ic=/^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;var kc=function(){this.rc="";this.ee=jc};kc.prototype.cc=!0;kc.prototype.Xb=function(){return this.rc};kc.prototype.toString=function(){return"Const{"+this.rc+"}"};var lc=function(a){if(a instanceof kc&&a.constructor===kc&&a.ee===jc)return a.rc;xa("expected object of type Const, got '"+a+"'");return"type_error:Const"},jc={},mc=function(a){var b=new kc;b.rc=a;return b};mc("");var oc=function(){this.kc="";this.fe=nc};oc.prototype.cc=!0;oc.prototype.Xb=function(){return this.kc};oc.prototype.toString=function(){return"TrustedResourceUrl{"+this.kc+"}"};var nc={};var qc=function(){this.ma="";this.de=pc};qc.prototype.cc=!0;qc.prototype.Xb=function(){return this.ma};qc.prototype.toString=function(){return"SafeUrl{"+this.ma+"}"};
	var rc=function(a){if(a instanceof qc&&a.constructor===qc&&a.de===pc)return a.ma;xa("expected object of type SafeUrl, got '"+a+"' of type "+m(a));return"type_error:SafeUrl"},sc=/^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i,uc=function(a){if(a instanceof qc)return a;a=a.cc?a.Xb():String(a);sc.test(a)||(a="about:invalid#zClosurez");return tc(a)},pc={},tc=function(a){var b=new qc;b.ma=a;return b};tc("about:blank");var xc=function(a){var b=[];vc(new wc,a,b);return b.join("")},wc=function(){this.nc=void 0},vc=function(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(da(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),e=d[f],vc(a,a.nc?a.nc.call(d,String(f),e):e,c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");f="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(e=b[d],"function"!=typeof e&&(c.push(f),
	yc(d,c),c.push(":"),vc(a,a.nc?a.nc.call(b,d,e):e,c),f=","));c.push("}");return}}switch(typeof b){case "string":yc(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}},zc={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Ac=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,
	yc=function(a,b){b.push('"',a.replace(Ac,function(a){var b=zc[a];b||(b="\\u"+(a.charCodeAt(0)|65536).toString(16).substr(1),zc[a]=b);return b}),'"')};var Bc=function(){};Bc.prototype.md=null;var Cc=function(a){return a.md||(a.md=a.Oc())};var Dc,Ec=function(){};t(Ec,Bc);Ec.prototype.Sb=function(){var a=Fc(this);return a?new ActiveXObject(a):new XMLHttpRequest};Ec.prototype.Oc=function(){var a={};Fc(this)&&(a[0]=!0,a[1]=!0);return a};
	var Fc=function(a){if(!a.Cd&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.Cd=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.Cd};Dc=new Ec;var Gc=function(){};t(Gc,Bc);Gc.prototype.Sb=function(){var a=new XMLHttpRequest;if("withCredentials"in a)return a;if("undefined"!=typeof XDomainRequest)return new Hc;throw Error("Unsupported browser");};Gc.prototype.Oc=function(){return{}};
	var Hc=function(){this.pa=new XDomainRequest;this.readyState=0;this.onreadystatechange=null;this.responseText="";this.status=-1;this.statusText=this.responseXML=null;this.pa.onload=r(this.ye,this);this.pa.onerror=r(this.zd,this);this.pa.onprogress=r(this.ze,this);this.pa.ontimeout=r(this.Ae,this)};h=Hc.prototype;h.open=function(a,b,c){if(null!=c&&!c)throw Error("Only async requests are supported.");this.pa.open(a,b)};
	h.send=function(a){if(a)if("string"==typeof a)this.pa.send(a);else throw Error("Only string data is supported");else this.pa.send()};h.abort=function(){this.pa.abort()};h.setRequestHeader=function(){};h.ye=function(){this.status=200;this.responseText=this.pa.responseText;Ic(this,4)};h.zd=function(){this.status=500;this.responseText="";Ic(this,4)};h.Ae=function(){this.zd()};h.ze=function(){this.status=200;Ic(this,1)};var Ic=function(a,b){a.readyState=b;if(a.onreadystatechange)a.onreadystatechange()};var Kc=function(){this.ma="";this.ce=Jc};Kc.prototype.cc=!0;Kc.prototype.Xb=function(){return this.ma};Kc.prototype.toString=function(){return"SafeHtml{"+this.ma+"}"};var Lc=function(a){if(a instanceof Kc&&a.constructor===Kc&&a.ce===Jc)return a.ma;xa("expected object of type SafeHtml, got '"+a+"' of type "+m(a));return"type_error:SafeHtml"},Jc={};Kc.prototype.He=function(a){this.ma=a;return this};!fb&&!y||y&&9<=Number(nb)||fb&&z("1.9.1");y&&z("9");var Nc=function(a,b){Oa(b,function(b,d){"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:Mc.hasOwnProperty(d)?a.setAttribute(Mc[d],b):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,b):a[d]=b})},Mc={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};var Oc=function(a,b,c){this.Le=c;this.le=a;this.af=b;this.gc=0;this.$b=null};Oc.prototype.get=function(){var a;0<this.gc?(this.gc--,a=this.$b,this.$b=a.next,a.next=null):a=this.le();return a};Oc.prototype.put=function(a){this.af(a);this.gc<this.Le&&(this.gc++,a.next=this.$b,this.$b=a)};var Pc=function(a){l.setTimeout(function(){throw a;},0)},Qc,Rc=function(){var a=l.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!x("Presto")&&(a=function(){var a=document.createElement("IFRAME");a.style.display="none";a.src="";document.documentElement.appendChild(a);var b=a.contentWindow,a=b.document;a.open();a.write("");a.close();var c="callImmediate"+Math.random(),d="file:"==b.location.protocol?"*":b.location.protocol+"//"+b.location.host,
	a=r(function(a){if(("*"==d||a.origin==d)&&a.data==c)this.port1.onmessage()},this);b.addEventListener("message",a,!1);this.port1={};this.port2={postMessage:function(){b.postMessage(c,d)}}});if("undefined"!==typeof a&&!x("Trident")&&!x("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var a=c.pd;c.pd=null;a()}};return function(a){d.next={pd:a};d=d.next;b.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?
	function(a){var b=document.createElement("SCRIPT");b.onreadystatechange=function(){b.onreadystatechange=null;b.parentNode.removeChild(b);b=null;a();a=null};document.documentElement.appendChild(b)}:function(a){l.setTimeout(a,0)}};var Sc=function(){this.xc=this.Na=null},Uc=new Oc(function(){return new Tc},function(a){a.reset()},100);Sc.prototype.add=function(a,b){var c=Uc.get();c.set(a,b);this.xc?this.xc.next=c:(w(!this.Na),this.Na=c);this.xc=c};Sc.prototype.remove=function(){var a=null;this.Na&&(a=this.Na,this.Na=this.Na.next,this.Na||(this.xc=null),a.next=null);return a};var Tc=function(){this.next=this.scope=this.Ic=null};Tc.prototype.set=function(a,b){this.Ic=a;this.scope=b;this.next=null};
	Tc.prototype.reset=function(){this.next=this.scope=this.Ic=null};var Zc=function(a,b){Vc||Wc();Xc||(Vc(),Xc=!0);Yc.add(a,b)},Vc,Wc=function(){if(-1!=String(l.Promise).indexOf("[native code]")){var a=l.Promise.resolve(void 0);Vc=function(){a.then($c)}}else Vc=function(){var a=$c;!q(l.setImmediate)||l.Window&&l.Window.prototype&&!x("Edge")&&l.Window.prototype.setImmediate==l.setImmediate?(Qc||(Qc=Rc()),Qc(a)):l.setImmediate(a)}},Xc=!1,Yc=new Sc,$c=function(){for(var a;a=Yc.remove();){try{a.Ic.call(a.scope)}catch(b){Pc(b)}Uc.put(a)}Xc=!1};var ad=function(a){a.prototype.then=a.prototype.then;a.prototype.$goog_Thenable=!0},bd=function(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}};var B=function(a,b){this.M=0;this.na=void 0;this.Ra=this.ja=this.s=null;this.Yb=this.Hc=!1;if(a!=ba)try{var c=this;a.call(b,function(a){cd(c,2,a)},function(a){if(!(a instanceof dd))try{if(a instanceof Error)throw a;throw Error("Promise rejected.");}catch(e){}cd(c,3,a)})}catch(d){cd(this,3,d)}},ed=function(){this.next=this.context=this.$a=this.Fa=this.child=null;this.ob=!1};ed.prototype.reset=function(){this.context=this.$a=this.Fa=this.child=null;this.ob=!1};
	var fd=new Oc(function(){return new ed},function(a){a.reset()},100),gd=function(a,b,c){var d=fd.get();d.Fa=a;d.$a=b;d.context=c;return d},C=function(a){if(a instanceof B)return a;var b=new B(ba);cd(b,2,a);return b},D=function(a){return new B(function(b,c){c(a)})},id=function(a,b,c){hd(a,b,c,null)||Zc(ja(b,a))},jd=function(a){return new B(function(b){var c=a.length,d=[];if(c)for(var e=function(a,e,f){c--;d[a]=e?{ve:!0,value:f}:{ve:!1,reason:f};0==c&&b(d)},f=0,g;f<a.length;f++)g=a[f],id(g,ja(e,f,!0),
	ja(e,f,!1));else b(d)})};B.prototype.then=function(a,b,c){null!=a&&Aa(a,"opt_onFulfilled should be a function.");null!=b&&Aa(b,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");return kd(this,q(a)?a:null,q(b)?b:null,c)};ad(B);var md=function(a,b){b=gd(b,b,void 0);b.ob=!0;ld(a,b);return a};B.prototype.c=function(a,b){return kd(this,null,a,b)};B.prototype.cancel=function(a){0==this.M&&Zc(function(){var b=new dd(a);nd(this,b)},this)};
	var nd=function(a,b){if(0==a.M)if(a.s){var c=a.s;if(c.ja){for(var d=0,e=null,f=null,g=c.ja;g&&(g.ob||(d++,g.child==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.M&&1==d?nd(c,b):(f?(d=f,w(c.ja),w(null!=d),d.next==c.Ra&&(c.Ra=d),d.next=d.next.next):od(c),pd(c,e,3,b)))}a.s=null}else cd(a,3,b)},ld=function(a,b){a.ja||2!=a.M&&3!=a.M||qd(a);w(null!=b.Fa);a.Ra?a.Ra.next=b:a.ja=b;a.Ra=b},kd=function(a,b,c,d){var e=gd(null,null,null);e.child=new B(function(a,g){e.Fa=b?function(c){try{var e=b.call(d,c);a(e)}catch(A){g(A)}}:
	a;e.$a=c?function(b){try{var e=c.call(d,b);void 0===e&&b instanceof dd?g(b):a(e)}catch(A){g(A)}}:g});e.child.s=a;ld(a,e);return e.child};B.prototype.mf=function(a){w(1==this.M);this.M=0;cd(this,2,a)};B.prototype.nf=function(a){w(1==this.M);this.M=0;cd(this,3,a)};
	var cd=function(a,b,c){0==a.M&&(a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself")),a.M=1,hd(c,a.mf,a.nf,a)||(a.na=c,a.M=b,a.s=null,qd(a),3!=b||c instanceof dd||rd(a,c)))},hd=function(a,b,c,d){if(a instanceof B)return null!=b&&Aa(b,"opt_onFulfilled should be a function."),null!=c&&Aa(c,"opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),ld(a,gd(b||ba,c||null,d)),!0;if(bd(a))return a.then(b,c,d),!0;if(ga(a))try{var e=a.then;if(q(e))return sd(a,
	e,b,c,d),!0}catch(f){return c.call(d,f),!0}return!1},sd=function(a,b,c,d,e){var f=!1,g=function(a){f||(f=!0,c.call(e,a))},k=function(a){f||(f=!0,d.call(e,a))};try{b.call(a,g,k)}catch(n){k(n)}},qd=function(a){a.Hc||(a.Hc=!0,Zc(a.qe,a))},od=function(a){var b=null;a.ja&&(b=a.ja,a.ja=b.next,b.next=null);a.ja||(a.Ra=null);null!=b&&w(null!=b.Fa);return b};B.prototype.qe=function(){for(var a;a=od(this);)pd(this,a,this.M,this.na);this.Hc=!1};
	var pd=function(a,b,c,d){if(3==c&&b.$a&&!b.ob)for(;a&&a.Yb;a=a.s)a.Yb=!1;if(b.child)b.child.s=null,td(b,c,d);else try{b.ob?b.Fa.call(b.context):td(b,c,d)}catch(e){ud.call(null,e)}fd.put(b)},td=function(a,b,c){2==b?a.Fa.call(a.context,c):a.$a&&a.$a.call(a.context,c)},rd=function(a,b){a.Yb=!0;Zc(function(){a.Yb&&ud.call(null,b)})},ud=Pc,dd=function(a){u.call(this,a)};t(dd,u);dd.prototype.name="cancel";/*
	 Portions of this code are from MochiKit, received by
	 The Closure Authors under the MIT license. All other code is Copyright
	 2005-2009 The Closure Authors. All Rights Reserved.
	*/
	var vd=function(a,b){this.oc=[];this.Id=a;this.sd=b||null;this.rb=this.Wa=!1;this.na=void 0;this.fd=this.ld=this.Cc=!1;this.vc=0;this.s=null;this.Dc=0};vd.prototype.cancel=function(a){if(this.Wa)this.na instanceof vd&&this.na.cancel();else{if(this.s){var b=this.s;delete this.s;a?b.cancel(a):(b.Dc--,0>=b.Dc&&b.cancel())}this.Id?this.Id.call(this.sd,this):this.fd=!0;this.Wa||wd(this,new xd)}};vd.prototype.qd=function(a,b){this.Cc=!1;yd(this,a,b)};
	var yd=function(a,b,c){a.Wa=!0;a.na=c;a.rb=!b;zd(a)},Bd=function(a){if(a.Wa){if(!a.fd)throw new Ad;a.fd=!1}};vd.prototype.callback=function(a){Bd(this);Cd(a);yd(this,!0,a)};
	var wd=function(a,b){Bd(a);Cd(b);yd(a,!1,b)},Cd=function(a){w(!(a instanceof vd),"An execution sequence may not be initiated with a blocking Deferred.")},Gd=function(a){var b=Dd("https://apis.google.com/js/client.js?onload="+Ed);Fd(b,null,a,void 0)},Fd=function(a,b,c,d){w(!a.ld,"Blocking Deferreds can not be re-used");a.oc.push([b,c,d]);a.Wa&&zd(a)};vd.prototype.then=function(a,b,c){var d,e,f=new B(function(a,b){d=a;e=b});Fd(this,d,function(a){a instanceof xd?f.cancel():e(a)});return f.then(a,b,c)};
	ad(vd);
	var Hd=function(a){return Fa(a.oc,function(a){return q(a[1])})},zd=function(a){if(a.vc&&a.Wa&&Hd(a)){var b=a.vc,c=Id[b];c&&(l.clearTimeout(c.sb),delete Id[b]);a.vc=0}a.s&&(a.s.Dc--,delete a.s);for(var b=a.na,d=c=!1;a.oc.length&&!a.Cc;){var e=a.oc.shift(),f=e[0],g=e[1],e=e[2];if(f=a.rb?g:f)try{var k=f.call(e||a.sd,b);void 0!==k&&(a.rb=a.rb&&(k==b||k instanceof Error),a.na=b=k);if(bd(b)||"function"===typeof l.Promise&&b instanceof l.Promise)d=!0,a.Cc=!0}catch(n){b=n,a.rb=!0,Hd(a)||(c=!0)}}a.na=b;d&&
	(k=r(a.qd,a,!0),d=r(a.qd,a,!1),b instanceof vd?(Fd(b,k,d),b.ld=!0):b.then(k,d));c&&(b=new Jd(b),Id[b.sb]=b,a.vc=b.sb)},Ad=function(){u.call(this)};t(Ad,u);Ad.prototype.message="Deferred has already fired";Ad.prototype.name="AlreadyCalledError";var xd=function(){u.call(this)};t(xd,u);xd.prototype.message="Deferred was canceled";xd.prototype.name="CanceledError";var Jd=function(a){this.sb=l.setTimeout(r(this.lf,this),0);this.O=a};
	Jd.prototype.lf=function(){w(Id[this.sb],"Cannot throw an error that is not scheduled.");delete Id[this.sb];throw this.O;};var Id={};var Dd=function(a){var b=new oc;b.kc=a;return Kd(b)},Kd=function(a){var b={},c=b.document||document,d;a instanceof oc&&a.constructor===oc&&a.fe===nc?d=a.kc:(xa("expected object of type TrustedResourceUrl, got '"+a+"' of type "+m(a)),d="type_error:TrustedResourceUrl");var e=document.createElement("SCRIPT");a={Pd:e,Lb:void 0};var f=new vd(Ld,a),g=null,k=null!=b.timeout?b.timeout:5E3;0<k&&(g=window.setTimeout(function(){Md(e,!0);wd(f,new Nd(1,"Timeout reached for loading script "+d))},k),a.Lb=g);e.onload=
	e.onreadystatechange=function(){e.readyState&&"loaded"!=e.readyState&&"complete"!=e.readyState||(Md(e,b.Cf||!1,g),f.callback(null))};e.onerror=function(){Md(e,!0,g);wd(f,new Nd(0,"Error while loading script "+d))};a=b.attributes||{};Va(a,{type:"text/javascript",charset:"UTF-8",src:d});Nc(e,a);Od(c).appendChild(e);return f},Od=function(a){var b;return(b=(a||document).getElementsByTagName("HEAD"))&&0!=b.length?b[0]:a.documentElement},Ld=function(){if(this&&this.Pd){var a=this.Pd;a&&"SCRIPT"==a.tagName&&
	Md(a,!0,this.Lb)}},Md=function(a,b,c){null!=c&&l.clearTimeout(c);a.onload=ba;a.onerror=ba;a.onreadystatechange=ba;b&&window.setTimeout(function(){a&&a.parentNode&&a.parentNode.removeChild(a)},0)},Nd=function(a,b){var c="Jsloader error (code #"+a+")";b&&(c+=": "+b);u.call(this,c);this.code=a};t(Nd,u);var Pd=function(){Ib.call(this);this.aa=new Pb(this);this.he=this;this.Uc=null};t(Pd,Ib);Pd.prototype[Lb]=!0;h=Pd.prototype;h.addEventListener=function(a,b,c,d){Vb(this,a,b,c,d)};h.removeEventListener=function(a,b,c,d){dc(this,a,b,c,d)};
	h.dispatchEvent=function(a){Qd(this);var b,c=this.Uc;if(c){b=[];for(var d=1;c;c=c.Uc)b.push(c),w(1E3>++d,"infinite loop")}c=this.he;d=a.type||a;if(p(a))a=new Jb(a,c);else if(a instanceof Jb)a.target=a.target||c;else{var e=a;a=new Jb(d,c);Va(a,e)}var e=!0,f;if(b)for(var g=b.length-1;!a.bb&&0<=g;g--)f=a.currentTarget=b[g],e=Rd(f,d,!0,a)&&e;a.bb||(f=a.currentTarget=c,e=Rd(f,d,!0,a)&&e,a.bb||(e=Rd(f,d,!1,a)&&e));if(b)for(g=0;!a.bb&&g<b.length;g++)f=a.currentTarget=b[g],e=Rd(f,d,!1,a)&&e;return e};
	h.Ta=function(){Pd.jd.Ta.call(this);if(this.aa){var a=this.aa,b=0,c;for(c in a.D){for(var d=a.D[c],e=0;e<d.length;e++)++b,Ob(d[e]);delete a.D[c];a.Mb--}}this.Uc=null};h.listen=function(a,b,c,d){Qd(this);return this.aa.add(String(a),b,!1,c,d)};
	var cc=function(a,b,c,d,e){a.aa.add(String(b),c,!0,d,e)},Rd=function(a,b,c,d){b=a.aa.D[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.hb&&g.capture==c){var k=g.listener,n=g.Zb||g.src;g.Qb&&Rb(a.aa,g);e=!1!==k.call(n,d)&&e}}return e&&0!=d.Od};Pd.prototype.Jc=function(a,b,c,d){return this.aa.Jc(String(a),b,c,d)};var Qd=function(a){w(a.aa,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var Sd="StopIteration"in l?l.StopIteration:{message:"StopIteration",stack:""},Td=function(){};Td.prototype.next=function(){throw Sd;};Td.prototype.ge=function(){return this};var Ud=function(a,b){this.ba={};this.w=[];this.nb=this.o=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.addAll(a)};Ud.prototype.X=function(){Vd(this);for(var a=[],b=0;b<this.w.length;b++)a.push(this.ba[this.w[b]]);return a};Ud.prototype.ka=function(){Vd(this);return this.w.concat()};Ud.prototype.pb=function(a){return Wd(this.ba,a)};
	Ud.prototype.remove=function(a){return Wd(this.ba,a)?(delete this.ba[a],this.o--,this.nb++,this.w.length>2*this.o&&Vd(this),!0):!1};var Vd=function(a){if(a.o!=a.w.length){for(var b=0,c=0;b<a.w.length;){var d=a.w[b];Wd(a.ba,d)&&(a.w[c++]=d);b++}a.w.length=c}if(a.o!=a.w.length){for(var e={},c=b=0;b<a.w.length;)d=a.w[b],Wd(e,d)||(a.w[c++]=d,e[d]=1),b++;a.w.length=c}};h=Ud.prototype;h.get=function(a,b){return Wd(this.ba,a)?this.ba[a]:b};
	h.set=function(a,b){Wd(this.ba,a)||(this.o++,this.w.push(a),this.nb++);this.ba[a]=b};h.addAll=function(a){var b;a instanceof Ud?(b=a.ka(),a=a.X()):(b=Qa(a),a=Pa(a));for(var c=0;c<b.length;c++)this.set(b[c],a[c])};h.forEach=function(a,b){for(var c=this.ka(),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};h.clone=function(){return new Ud(this)};
	h.ge=function(a){Vd(this);var b=0,c=this.nb,d=this,e=new Td;e.next=function(){if(c!=d.nb)throw Error("The map has changed since the iterator was created");if(b>=d.w.length)throw Sd;var e=d.w[b++];return a?e:d.ba[e]};return e};var Wd=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var Xd=function(a){if(a.X&&"function"==typeof a.X)return a.X();if(p(a))return a.split("");if(ea(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return Pa(a)},Yd=function(a){if(a.ka&&"function"==typeof a.ka)return a.ka();if(!a.X||"function"!=typeof a.X){if(ea(a)||p(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return Qa(a)}},Zd=function(a,b){if(a.forEach&&"function"==typeof a.forEach)a.forEach(b,void 0);else if(ea(a)||p(a))Ca(a,b,void 0);else for(var c=Yd(a),d=Xd(a),
	e=d.length,f=0;f<e;f++)b.call(void 0,d[f],c&&c[f],a)};var $d=function(a,b,c,d,e){this.reset(a,b,c,d,e)};$d.prototype.ud=null;var ae=0;$d.prototype.reset=function(a,b,c,d,e){"number"==typeof e||ae++;d||ka();this.wb=a;this.Qe=b;delete this.ud};$d.prototype.Sd=function(a){this.wb=a};var be=function(a){this.Re=a;this.Ad=this.Ec=this.wb=this.s=null},ce=function(a,b){this.name=a;this.value=b};ce.prototype.toString=function(){return this.name};var de=new ce("SEVERE",1E3),ee=new ce("CONFIG",700),fe=new ce("FINE",500);be.prototype.getParent=function(){return this.s};be.prototype.Sd=function(a){this.wb=a};var ge=function(a){if(a.wb)return a.wb;if(a.s)return ge(a.s);xa("Root logger has no level set.");return null};
	be.prototype.log=function(a,b,c){if(a.value>=ge(this).value)for(q(b)&&(b=b()),a=new $d(a,String(b),this.Re),c&&(a.ud=c),c="log:"+a.Qe,l.console&&(l.console.timeStamp?l.console.timeStamp(c):l.console.markTimeline&&l.console.markTimeline(c)),l.msWriteProfilerMark&&l.msWriteProfilerMark(c),c=this;c;){var d=c,e=a;if(d.Ad)for(var f=0;b=d.Ad[f];f++)b(e);c=c.getParent()}};
	var he={},ie=null,je=function(a){ie||(ie=new be(""),he[""]=ie,ie.Sd(ee));var b;if(!(b=he[a])){b=new be(a);var c=a.lastIndexOf("."),d=a.substr(c+1),c=je(a.substr(0,c));c.Ec||(c.Ec={});c.Ec[d]=b;b.s=c;he[a]=b}return b};var E=function(a,b){a&&a.log(fe,b,void 0)};var ke=function(a,b,c){if(q(a))c&&(a=r(a,c));else if(a&&"function"==typeof a.handleEvent)a=r(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:l.setTimeout(a,b||0)},le=function(a){var b=null;return(new B(function(c,d){b=ke(function(){c(void 0)},a);-1==b&&d(Error("Failed to schedule timer."))})).c(function(a){l.clearTimeout(b);throw a;})};var me=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,ne=function(a,b){if(a){a=a.split("&");for(var c=0;c<a.length;c++){var d=a[c].indexOf("="),e,f=null;0<=d?(e=a[c].substring(0,d),f=a[c].substring(d+1)):e=a[c];b(e,f?decodeURIComponent(f.replace(/\+/g," ")):"")}}};var F=function(a){Pd.call(this);this.headers=new Ud;this.zc=a||null;this.qa=!1;this.yc=this.b=null;this.vb=this.Gd=this.fc="";this.Ca=this.Mc=this.dc=this.Gc=!1;this.kb=0;this.tc=null;this.Nd="";this.wc=this.Ye=this.be=!1};t(F,Pd);var oe=F.prototype,pe=je("goog.net.XhrIo");oe.T=pe;var qe=/^https?$/i,re=["POST","PUT"];
	F.prototype.send=function(a,b,c,d){if(this.b)throw Error("[goog.net.XhrIo] Object is active with another request="+this.fc+"; newUri="+a);b=b?b.toUpperCase():"GET";this.fc=a;this.vb="";this.Gd=b;this.Gc=!1;this.qa=!0;this.b=this.zc?this.zc.Sb():Dc.Sb();this.yc=this.zc?Cc(this.zc):Cc(Dc);this.b.onreadystatechange=r(this.Kd,this);this.Ye&&"onprogress"in this.b&&(this.b.onprogress=r(function(a){this.Jd(a,!0)},this),this.b.upload&&(this.b.upload.onprogress=r(this.Jd,this)));try{E(this.T,se(this,"Opening Xhr")),
	this.Mc=!0,this.b.open(b,String(a),!0),this.Mc=!1}catch(f){E(this.T,se(this,"Error opening Xhr: "+f.message));this.O(5,f);return}a=c||"";var e=this.headers.clone();d&&Zd(d,function(a,b){e.set(b,a)});d=Ha(e.ka());c=l.FormData&&a instanceof l.FormData;!Ia(re,b)||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e.forEach(function(a,b){this.b.setRequestHeader(b,a)},this);this.Nd&&(this.b.responseType=this.Nd);"withCredentials"in this.b&&this.b.withCredentials!==this.be&&(this.b.withCredentials=
	this.be);try{te(this),0<this.kb&&(this.wc=ue(this.b),E(this.T,se(this,"Will abort after "+this.kb+"ms if incomplete, xhr2 "+this.wc)),this.wc?(this.b.timeout=this.kb,this.b.ontimeout=r(this.Lb,this)):this.tc=ke(this.Lb,this.kb,this)),E(this.T,se(this,"Sending request")),this.dc=!0,this.b.send(a),this.dc=!1}catch(f){E(this.T,se(this,"Send error: "+f.message)),this.O(5,f)}};var ue=function(a){return y&&z(9)&&fa(a.timeout)&&void 0!==a.ontimeout},Ga=function(a){return"content-type"==a.toLowerCase()};
	F.prototype.Lb=function(){"undefined"!=typeof aa&&this.b&&(this.vb="Timed out after "+this.kb+"ms, aborting",E(this.T,se(this,this.vb)),this.dispatchEvent("timeout"),this.abort(8))};F.prototype.O=function(a,b){this.qa=!1;this.b&&(this.Ca=!0,this.b.abort(),this.Ca=!1);this.vb=b;ve(this);we(this)};var ve=function(a){a.Gc||(a.Gc=!0,a.dispatchEvent("complete"),a.dispatchEvent("error"))};
	F.prototype.abort=function(){this.b&&this.qa&&(E(this.T,se(this,"Aborting")),this.qa=!1,this.Ca=!0,this.b.abort(),this.Ca=!1,this.dispatchEvent("complete"),this.dispatchEvent("abort"),we(this))};F.prototype.Ta=function(){this.b&&(this.qa&&(this.qa=!1,this.Ca=!0,this.b.abort(),this.Ca=!1),we(this,!0));F.jd.Ta.call(this)};F.prototype.Kd=function(){this.isDisposed()||(this.Mc||this.dc||this.Ca?xe(this):this.Ve())};F.prototype.Ve=function(){xe(this)};
	var xe=function(a){if(a.qa&&"undefined"!=typeof aa)if(a.yc[1]&&4==ye(a)&&2==ze(a))E(a.T,se(a,"Local request error detected and ignored"));else if(a.dc&&4==ye(a))ke(a.Kd,0,a);else if(a.dispatchEvent("readystatechange"),4==ye(a)){E(a.T,se(a,"Request complete"));a.qa=!1;try{var b=ze(a),c;a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break a;default:c=!1}var d;if(!(d=c)){var e;if(e=0===b){var f=String(a.fc).match(me)[1]||null;if(!f&&l.self&&l.self.location)var g=l.self.location.protocol,
	f=g.substr(0,g.length-1);e=!qe.test(f?f.toLowerCase():"")}d=e}if(d)a.dispatchEvent("complete"),a.dispatchEvent("success");else{var k;try{k=2<ye(a)?a.b.statusText:""}catch(n){E(a.T,"Can not get status: "+n.message),k=""}a.vb=k+" ["+ze(a)+"]";ve(a)}}finally{we(a)}}};F.prototype.Jd=function(a,b){w("progress"===a.type,"goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");this.dispatchEvent(Ae(a,"progress"));this.dispatchEvent(Ae(a,b?"downloadprogress":"uploadprogress"))};
	var Ae=function(a,b){return{type:b,lengthComputable:a.lengthComputable,loaded:a.loaded,total:a.total}},we=function(a,b){if(a.b){te(a);var c=a.b,d=a.yc[0]?ba:null;a.b=null;a.yc=null;b||a.dispatchEvent("ready");try{c.onreadystatechange=d}catch(e){(a=a.T)&&a.log(de,"Problem encountered resetting onreadystatechange: "+e.message,void 0)}}},te=function(a){a.b&&a.wc&&(a.b.ontimeout=null);fa(a.tc)&&(l.clearTimeout(a.tc),a.tc=null)},ye=function(a){return a.b?a.b.readyState:0},ze=function(a){try{return 2<ye(a)?
	a.b.status:-1}catch(b){return-1}},Be=function(a){try{return a.b?a.b.responseText:""}catch(b){return E(a.T,"Can not get responseText: "+b.message),""}},se=function(a,b){return b+" ["+a.Gd+" "+a.fc+" "+ze(a)+"]"};var Ce=function(a,b){this.$=this.La=this.da="";this.ab=null;this.Ba=this.sa="";this.R=this.Ke=!1;var c;a instanceof Ce?(this.R=void 0!==b?b:a.R,De(this,a.da),c=a.La,G(this),this.La=c,Ee(this,a.$),Fe(this,a.ab),Ge(this,a.sa),He(this,a.V.clone()),a=a.Ba,G(this),this.Ba=a):a&&(c=String(a).match(me))?(this.R=!!b,De(this,c[1]||"",!0),a=c[2]||"",G(this),this.La=Ie(a),Ee(this,c[3]||"",!0),Fe(this,c[4]),Ge(this,c[5]||"",!0),He(this,c[6]||"",!0),a=c[7]||"",G(this),this.Ba=Ie(a)):(this.R=!!b,this.V=new H(null,
	0,this.R))};Ce.prototype.toString=function(){var a=[],b=this.da;b&&a.push(Je(b,Ke,!0),":");var c=this.$;if(c||"file"==b)a.push("//"),(b=this.La)&&a.push(Je(b,Ke,!0),"@"),a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.ab,null!=c&&a.push(":",String(c));if(c=this.sa)this.$&&"/"!=c.charAt(0)&&a.push("/"),a.push(Je(c,"/"==c.charAt(0)?Le:Me,!0));(c=this.V.toString())&&a.push("?",c);(c=this.Ba)&&a.push("#",Je(c,Ne));return a.join("")};
	Ce.prototype.resolve=function(a){var b=this.clone(),c=!!a.da;c?De(b,a.da):c=!!a.La;if(c){var d=a.La;G(b);b.La=d}else c=!!a.$;c?Ee(b,a.$):c=null!=a.ab;d=a.sa;if(c)Fe(b,a.ab);else if(c=!!a.sa){if("/"!=d.charAt(0))if(this.$&&!this.sa)d="/"+d;else{var e=b.sa.lastIndexOf("/");-1!=e&&(d=b.sa.substr(0,e+1)+d)}e=d;if(".."==e||"."==e)d="";else if(v(e,"./")||v(e,"/.")){for(var d=0==e.lastIndexOf("/",0),e=e.split("/"),f=[],g=0;g<e.length;){var k=e[g++];"."==k?d&&g==e.length&&f.push(""):".."==k?((1<f.length||
	1==f.length&&""!=f[0])&&f.pop(),d&&g==e.length&&f.push("")):(f.push(k),d=!0)}d=f.join("/")}else d=e}c?Ge(b,d):c=""!==a.V.toString();c?He(b,a.V.clone()):c=!!a.Ba;c&&(a=a.Ba,G(b),b.Ba=a);return b};Ce.prototype.clone=function(){return new Ce(this)};
	var De=function(a,b,c){G(a);a.da=c?Ie(b,!0):b;a.da&&(a.da=a.da.replace(/:$/,""))},Ee=function(a,b,c){G(a);a.$=c?Ie(b,!0):b},Fe=function(a,b){G(a);if(b){b=Number(b);if(isNaN(b)||0>b)throw Error("Bad port number "+b);a.ab=b}else a.ab=null},Ge=function(a,b,c){G(a);a.sa=c?Ie(b,!0):b},He=function(a,b,c){G(a);b instanceof H?(a.V=b,a.V.ed(a.R)):(c||(b=Je(b,Oe)),a.V=new H(b,0,a.R))},I=function(a,b,c){G(a);a.V.set(b,c)},Pe=function(a,b){return a.V.get(b)},Qe=function(a,b){G(a);a.V.remove(b)},G=function(a){if(a.Ke)throw Error("Tried to modify a read-only Uri");
	};Ce.prototype.ed=function(a){this.R=a;this.V&&this.V.ed(a);return this};
	var Re=function(a){return a instanceof Ce?a.clone():new Ce(a,void 0)},Se=function(a,b){var c=new Ce(null,void 0);De(c,"https");a&&Ee(c,a);b&&Ge(c,b);return c},Ie=function(a,b){return a?b?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""},Je=function(a,b,c){return p(a)?(a=encodeURI(a).replace(b,Te),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null},Te=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)},Ke=/[#\/\?@]/g,Me=/[\#\?:]/g,Le=/[\#\?]/g,Oe=/[\#\?@]/g,
	Ne=/#/g,H=function(a,b,c){this.o=this.l=null;this.N=a||null;this.R=!!c},Ue=function(a){a.l||(a.l=new Ud,a.o=0,a.N&&ne(a.N,function(b,c){a.add(decodeURIComponent(b.replace(/\+/g," ")),c)}))},We=function(a){var b=Yd(a);if("undefined"==typeof b)throw Error("Keys are undefined");var c=new H(null,0,void 0);a=Xd(a);for(var d=0;d<b.length;d++){var e=b[d],f=a[d];da(f)?Ve(c,e,f):c.add(e,f)}return c};h=H.prototype;
	h.add=function(a,b){Ue(this);this.N=null;a=this.P(a);var c=this.l.get(a);c||this.l.set(a,c=[]);c.push(b);this.o=ya(this.o)+1;return this};h.remove=function(a){Ue(this);a=this.P(a);return this.l.pb(a)?(this.N=null,this.o=ya(this.o)-this.l.get(a).length,this.l.remove(a)):!1};h.pb=function(a){Ue(this);a=this.P(a);return this.l.pb(a)};h.ka=function(){Ue(this);for(var a=this.l.X(),b=this.l.ka(),c=[],d=0;d<b.length;d++)for(var e=a[d],f=0;f<e.length;f++)c.push(b[d]);return c};
	h.X=function(a){Ue(this);var b=[];if(p(a))this.pb(a)&&(b=Ma(b,this.l.get(this.P(a))));else{a=this.l.X();for(var c=0;c<a.length;c++)b=Ma(b,a[c])}return b};h.set=function(a,b){Ue(this);this.N=null;a=this.P(a);this.pb(a)&&(this.o=ya(this.o)-this.l.get(a).length);this.l.set(a,[b]);this.o=ya(this.o)+1;return this};h.get=function(a,b){a=a?this.X(a):[];return 0<a.length?String(a[0]):b};var Ve=function(a,b,c){a.remove(b);0<c.length&&(a.N=null,a.l.set(a.P(b),Na(c)),a.o=ya(a.o)+c.length)};
	H.prototype.toString=function(){if(this.N)return this.N;if(!this.l)return"";for(var a=[],b=this.l.ka(),c=0;c<b.length;c++)for(var d=b[c],e=encodeURIComponent(String(d)),d=this.X(d),f=0;f<d.length;f++){var g=e;""!==d[f]&&(g+="="+encodeURIComponent(String(d[f])));a.push(g)}return this.N=a.join("&")};H.prototype.clone=function(){var a=new H;a.N=this.N;this.l&&(a.l=this.l.clone(),a.o=this.o);return a};H.prototype.P=function(a){a=String(a);this.R&&(a=a.toLowerCase());return a};
	H.prototype.ed=function(a){a&&!this.R&&(Ue(this),this.N=null,this.l.forEach(function(a,c){var b=c.toLowerCase();c!=b&&(this.remove(c),Ve(this,b,a))},this));this.R=a};var Xe=function(){var a=J();return y&&!!nb&&11==nb||/Edge\/\d+/.test(a)},Ye=function(){return l.window&&l.window.location.href||""},Ze=function(a,b){b=b||l.window;var c="about:blank";a&&(c=rc(uc(a)));b.location.href=c},$e=function(a,b){var c=[],d;for(d in a)d in b?typeof a[d]!=typeof b[d]?c.push(d):da(a[d])?Sa(a[d],b[d])||c.push(d):"object"==typeof a[d]&&null!=a[d]&&null!=b[d]?0<$e(a[d],b[d]).length&&c.push(d):a[d]!==b[d]&&c.push(d):c.push(d);for(d in b)d in a||c.push(d);return c},bf=function(){var a;
	a=J();a="Chrome"!=af(a)?null:(a=a.match(/\sChrome\/(\d+)/i))&&2==a.length?parseInt(a[1],10):null;return a&&30>a?!1:!y||!nb||9<nb},cf=function(a){a=(a||J()).toLowerCase();return a.match(/android/)||a.match(/webos/)||a.match(/iphone|ipad|ipod/)||a.match(/blackberry/)||a.match(/windows phone/)||a.match(/iemobile/)?!0:!1},df=function(a){a=a||l.window;try{a.close()}catch(b){}},ef=function(a,b,c){var d=Math.floor(1E9*Math.random()).toString();b=b||500;c=c||600;var e=(window.screen.availHeight-c)/2,f=(window.screen.availWidth-
	b)/2;b={width:b,height:c,top:0<e?e:0,left:0<f?f:0,location:!0,resizable:!0,statusbar:!0,toolbar:!1};c=J().toLowerCase();d&&(b.target=d,v(c,"crios/")&&(b.target="_blank"));"Firefox"==af(J())&&(a=a||"http://localhost",b.scrollbars=!0);var g;c=a||"about:blank";(d=b)||(d={});a=window;b=c instanceof qc?c:uc("undefined"!=typeof c.href?c.href:String(c));c=d.target||c.target;e=[];for(g in d)switch(g){case "width":case "height":case "top":case "left":e.push(g+"="+d[g]);break;case "target":case "noreferrer":break;
	default:e.push(g+"="+(d[g]?1:0))}g=e.join(",");(x("iPhone")&&!x("iPod")&&!x("iPad")||x("iPad")||x("iPod"))&&a.navigator&&a.navigator.standalone&&c&&"_self"!=c?(g=a.document.createElement("A"),"undefined"!=typeof HTMLAnchorElement&&"undefined"!=typeof Location&&"undefined"!=typeof Element&&(e=g&&(g instanceof HTMLAnchorElement||!(g instanceof Location||g instanceof Element)),f=ga(g)?g.constructor.displayName||g.constructor.name||Object.prototype.toString.call(g):void 0===g?"undefined":null===g?"null":
	typeof g,w(e,"Argument is not a HTMLAnchorElement (or a non-Element mock); got: %s",f)),b=b instanceof qc?b:uc(b),g.href=rc(b),g.setAttribute("target",c),d.noreferrer&&g.setAttribute("rel","noreferrer"),d=document.createEvent("MouseEvent"),d.initMouseEvent("click",!0,!0,a,1),g.dispatchEvent(d),g={}):d.noreferrer?(g=a.open("",c,g),d=rc(b),g&&(eb&&v(d,";")&&(d="'"+d.replace(/'/g,"%27")+"'"),g.opener=null,a=mc("b/12014412, meta tag with sanitized URL"),ta.test(d)&&(-1!=d.indexOf("&")&&(d=d.replace(na,
	"&amp;")),-1!=d.indexOf("<")&&(d=d.replace(oa,"&lt;")),-1!=d.indexOf(">")&&(d=d.replace(pa,"&gt;")),-1!=d.indexOf('"')&&(d=d.replace(qa,"&quot;")),-1!=d.indexOf("'")&&(d=d.replace(ra,"&#39;")),-1!=d.indexOf("\x00")&&(d=d.replace(sa,"&#0;"))),d='<META HTTP-EQUIV="refresh" content="0; url='+d+'">',za(lc(a),"must provide justification"),w(!/^[\s\xa0]*$/.test(lc(a)),"must provide non-empty justification"),g.document.write(Lc((new Kc).He(d))),g.document.close())):g=a.open(rc(b),c,g);if(g)try{g.focus()}catch(k){}return g},
	ff=function(a){return new B(function(b){var c=function(){le(2E3).then(function(){if(!a||a.closed)b();else return c()})};return c()})},gf=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,hf=function(){var a=null;return(new B(function(b){"complete"==l.document.readyState?b():(a=function(){b()},bc(window,"load",a))})).c(function(b){dc(window,"load",a);throw b;})},kf=function(){return jf(void 0)?hf().then(function(){return new B(function(a,b){var c=l.document,d=setTimeout(function(){b(Error("Cordova framework is not ready."))},
	1E3);c.addEventListener("deviceready",function(){clearTimeout(d);a()},!1)})}):D(Error("Cordova must run in an Android or iOS file scheme."))},jf=function(a){a=a||J();return!("file:"!==lf()||!a.toLowerCase().match(/iphone|ipad|ipod|android/))},mf=function(){var a=l.window;try{return!(!a||a==a.top)}catch(b){return!1}},K=function(){return firebase.INTERNAL.hasOwnProperty("reactNative")?"ReactNative":firebase.INTERNAL.hasOwnProperty("node")?"Node":"Browser"},nf=function(){var a=K();return"ReactNative"===
	a||"Node"===a},af=function(a){var b=a.toLowerCase();if(v(b,"opera/")||v(b,"opr/")||v(b,"opios/"))return"Opera";if(v(b,"iemobile"))return"IEMobile";if(v(b,"msie")||v(b,"trident/"))return"IE";if(v(b,"edge/"))return"Edge";if(v(b,"firefox/"))return"Firefox";if(v(b,"silk/"))return"Silk";if(v(b,"blackberry"))return"Blackberry";if(v(b,"webos"))return"Webos";if(!v(b,"safari/")||v(b,"chrome/")||v(b,"crios/")||v(b,"android"))if(!v(b,"chrome/")&&!v(b,"crios/")||v(b,"edge/")){if(v(b,"android"))return"Android";
	if((a=a.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/))&&2==a.length)return a[1]}else return"Chrome";else return"Safari";return"Other"},of=function(a){var b=K();return("Browser"===b?af(J()):b)+"/JsCore/"+a},J=function(){return l.navigator&&l.navigator.userAgent||""},L=function(a,b){a=a.split(".");b=b||l;for(var c=0;c<a.length&&"object"==typeof b&&null!=b;c++)b=b[a[c]];c!=a.length&&(b=void 0);return b},rf=function(){var a;if(a=(pf()||"chrome-extension:"===lf()||jf()&&!1)&&!nf())a:{try{var b=l.localStorage,
	c=qf();if(b){b.setItem(c,"1");b.removeItem(c);a=Xe()?!!l.indexedDB:!0;break a}}catch(d){}a=!1}return a},pf=function(){return"http:"===lf()||"https:"===lf()},lf=function(){return l.location&&l.location.protocol||null},sf=function(a){a=a||J();return cf(a)||"Firefox"==af(a)?!1:!0},tf=function(a){return"undefined"===typeof a?null:xc(a)},uf=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&null!==a[c]&&void 0!==a[c]&&(b[c]=a[c]);return b},vf=function(a){if(null!==a)return JSON.parse(a)},qf=function(a){return a?
	a:""+Math.floor(1E9*Math.random()).toString()},wf=function(a){a=a||J();return"Safari"==af(a)||a.toLowerCase().match(/iphone|ipad|ipod/)?!1:!0},xf=function(){var a=l.___jsl;if(a&&a.H)for(var b in a.H)if(a.H[b].r=a.H[b].r||[],a.H[b].L=a.H[b].L||[],a.H[b].r=a.H[b].L.concat(),a.CP)for(var c=0;c<a.CP.length;c++)a.CP[c]=null},yf=function(){return l.navigator&&"boolean"===typeof l.navigator.onLine?l.navigator.onLine:!0},zf=function(a,b,c,d){if(a>b)throw Error("Short delay should be less than long delay!");
	this.hf=a;this.Pe=b;a=c||J();d=d||K();this.Je=cf(a)||"ReactNative"===d};zf.prototype.get=function(){return this.Je?this.Pe:this.hf};var Af;try{var Bf={};Object.defineProperty(Bf,"abcd",{configurable:!0,enumerable:!0,value:1});Object.defineProperty(Bf,"abcd",{configurable:!0,enumerable:!0,value:2});Af=2==Bf.abcd}catch(a){Af=!1}
	var M=function(a,b,c){Af?Object.defineProperty(a,b,{configurable:!0,enumerable:!0,value:c}):a[b]=c},Cf=function(a,b){if(b)for(var c in b)b.hasOwnProperty(c)&&M(a,c,b[c])},Df=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b},Ef=function(a,b){if(!b||!b.length)return!0;if(!a)return!1;for(var c=0;c<b.length;c++){var d=a[b[c]];if(void 0===d||null===d||""===d)return!1}return!0},Ff=function(a){var b=a;if("object"==typeof a&&null!=a){var b="length"in a?[]:{},c;for(c in a)M(b,c,
	Ff(a[c]))}return b};var Gf="oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version".split(" "),Hf=["client_id","response_type","scope","redirect_uri","state"],If={xf:{Ab:500,zb:600,providerId:"facebook.com",bd:Hf},yf:{Ab:500,zb:620,providerId:"github.com",bd:Hf},zf:{Ab:515,zb:680,providerId:"google.com",bd:Hf},Af:{Ab:485,zb:705,providerId:"twitter.com",bd:Gf}},Jf=function(a){for(var b in If)if(If[b].providerId==a)return If[b];return null};var N=function(a,b){this.code="auth/"+a;this.message=b||Kf[a]||""};t(N,Error);N.prototype.C=function(){return{code:this.code,message:this.message}};N.prototype.toJSON=function(){return this.C()};
	var Lf=function(a){var b=a&&a.code;return b?new N(b.substring(5),a.message):null},Kf={"argument-error":"","app-not-authorized":"This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.","app-not-installed":"The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.","cordova-not-ready":"Cordova framework is not ready.",
	"cors-unsupported":"This browser is not supported.","credential-already-in-use":"This credential is already associated with a different user account.","custom-token-mismatch":"The custom token corresponds to a different audience.","requires-recent-login":"This operation is sensitive and requires recent authentication. Log in again before retrying this request.","dynamic-link-not-activated":"Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.","email-already-in-use":"The email address is already in use by another account.",
	"expired-action-code":"The action code has expired. ","cancelled-popup-request":"This operation has been cancelled due to another conflicting popup being opened.","internal-error":"An internal error has occurred.","invalid-user-token":"The user's credential is no longer valid. The user must sign in again.","invalid-auth-event":"An internal error has occurred.","invalid-cordova-configuration":"The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
	"invalid-custom-token":"The custom token format is incorrect. Please check the documentation.","invalid-email":"The email address is badly formatted.","invalid-api-key":"Your API key is invalid, please check you have copied it correctly.","invalid-credential":"The supplied auth credential is malformed or has expired.","invalid-message-payload":"The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
	"invalid-oauth-provider":"EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.","unauthorized-domain":"This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.","invalid-action-code":"The action code is invalid. This can happen if the code is malformed, expired, or has already been used.","wrong-password":"The password is invalid or the user does not have a password.",
	"invalid-recipient-email":"The email corresponding to this action failed to send as the provided recipient email address is invalid.","invalid-sender":"The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.","missing-iframe-start":"An internal error has occurred.","auth-domain-config-required":"Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
	"app-deleted":"This instance of FirebaseApp has been deleted.","account-exists-with-different-credential":"An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.","network-request-failed":"A network error (such as timeout, interrupted connection or unreachable host) has occurred.","no-auth-event":"An internal error has occurred.","no-such-provider":"User was not linked to an account with the given provider.",
	"operation-not-allowed":"The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.","operation-not-supported-in-this-environment":'This operation is not supported in the environment this application is running on. "location.protocol" must be http or https and web storage must be enabled.',"popup-blocked":"Unable to establish a connection with the popup. It may have been blocked by the browser.","popup-closed-by-user":"The popup has been closed by the user before finalizing the operation.",
	"provider-already-linked":"User can only be linked to one identity for the given provider.","redirect-cancelled-by-user":"The redirect operation has been cancelled by the user before finalizing.","redirect-operation-pending":"A redirect sign-in operation is already pending.",timeout:"The operation has timed out.","user-token-expired":"The user's credential is no longer valid. The user must sign in again.","too-many-requests":"We have blocked all requests from this device due to unusual activity. Try again later.",
	"user-cancelled":"User did not grant your application the permissions it requested.","user-not-found":"There is no user record corresponding to this identifier. The user may have been deleted.","user-disabled":"The user account has been disabled by an administrator.","user-mismatch":"The supplied credentials do not correspond to the previously signed in user.","user-signed-out":"","weak-password":"The password must be 6 characters long or more.","web-storage-unsupported":"This browser is not supported or 3rd party cookies and data may be disabled."};var O=function(a,b,c,d,e){this.ga=a;this.F=b||null;this.mb=c||null;this.dd=d||null;this.O=e||null;if(this.mb||this.O){if(this.mb&&this.O)throw new N("invalid-auth-event");if(this.mb&&!this.dd)throw new N("invalid-auth-event");}else throw new N("invalid-auth-event");};O.prototype.Wb=function(){return this.dd};O.prototype.getError=function(){return this.O};O.prototype.C=function(){return{type:this.ga,eventId:this.F,urlResponse:this.mb,sessionId:this.dd,error:this.O&&this.O.C()}};
	var Mf=function(a){a=a||{};return a.type?new O(a.type,a.eventId,a.urlResponse,a.sessionId,a.error&&Lf(a.error)):null};var Nf=function(a){var b="unauthorized-domain",c=void 0,d=Re(a);a=d.$;d=d.da;"http"!=d&&"https"!=d?b="operation-not-supported-in-this-environment":c=la("This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.",a);N.call(this,b,c)};t(Nf,N);var Of=function(a){this.Oe=a.sub;ka();this.Tb=a.email||null};var Pf=function(a,b){if(b.idToken||b.accessToken)b.idToken&&M(this,"idToken",b.idToken),b.accessToken&&M(this,"accessToken",b.accessToken);else if(b.oauthToken&&b.oauthTokenSecret)M(this,"accessToken",b.oauthToken),M(this,"secret",b.oauthTokenSecret);else throw new N("internal-error","failed to construct a credential");M(this,"provider",a)};Pf.prototype.Vb=function(a){return Qf(a,Rf(this))};Pf.prototype.Hd=function(a,b){var c=Rf(this);c.idToken=b;return Sf(a,c)};
	var Rf=function(a){var b={};a.idToken&&(b.id_token=a.idToken);a.accessToken&&(b.access_token=a.accessToken);a.secret&&(b.oauth_token_secret=a.secret);b.providerId=a.provider;return{postBody:We(b).toString(),requestUri:"http://localhost"}};Pf.prototype.C=function(){var a={provider:this.provider};this.idToken&&(a.oauthIdToken=this.idToken);this.accessToken&&(a.oauthAccessToken=this.accessToken);this.secret&&(a.oauthTokenSecret=this.secret);return a};
	var Tf=function(a,b){this.$e=b||[];Cf(this,{providerId:a,isOAuthProvider:!0});this.rd={}};Tf.prototype.setCustomParameters=function(a){this.rd=Ta(a);return this};var P=function(a){Tf.call(this,a,Hf);this.cd=[]};t(P,Tf);P.prototype.addScope=function(a){Ia(this.cd,a)||this.cd.push(a);return this};P.prototype.yd=function(){return Na(this.cd)};
	P.prototype.credential=function(a,b){if(!a&&!b)throw new N("argument-error","credential failed: must provide the ID token and/or the access token.");return new Pf(this.providerId,{idToken:a||null,accessToken:b||null})};var Uf=function(){P.call(this,"facebook.com")};t(Uf,P);M(Uf,"PROVIDER_ID","facebook.com");var Vf=function(a){if(!a)throw new N("argument-error","credential failed: expected 1 argument (the OAuth access token).");return(new Uf).credential(null,a)},Wf=function(){P.call(this,"github.com")};
	t(Wf,P);M(Wf,"PROVIDER_ID","github.com");var Xf=function(a){if(!a)throw new N("argument-error","credential failed: expected 1 argument (the OAuth access token).");return(new Wf).credential(null,a)},Yf=function(){P.call(this,"google.com");this.addScope("profile")};t(Yf,P);M(Yf,"PROVIDER_ID","google.com");var Zf=function(a,b){return(new Yf).credential(a,b)},$f=function(){Tf.call(this,"twitter.com",Gf)};t($f,Tf);M($f,"PROVIDER_ID","twitter.com");
	var ag=function(a,b){if(!a||!b)throw new N("argument-error","credential failed: expected 2 arguments (the OAuth access token and secret).");return new Pf("twitter.com",{oauthToken:a,oauthTokenSecret:b})},bg=function(a,b){this.Tb=a;this.Vc=b;M(this,"provider","password")};bg.prototype.Vb=function(a){return Q(a,cg,{email:this.Tb,password:this.Vc})};bg.prototype.Hd=function(a,b){return Q(a,dg,{idToken:b,email:this.Tb,password:this.Vc})};bg.prototype.C=function(){return{email:this.Tb,password:this.Vc}};
	var eg=function(){Cf(this,{providerId:"password",isOAuthProvider:!1})};Cf(eg,{PROVIDER_ID:"password"});
	var fg=function(a){var b=a&&a.providerId;if(!b||"password"===b)return null;var c=a&&a.oauthAccessToken,d=a&&a.oauthTokenSecret;a=a&&a.oauthIdToken;try{switch(b){case "google.com":return Zf(a,c);case "facebook.com":return Vf(c);case "github.com":return Xf(c);case "twitter.com":return ag(c,d);default:return(new P(b)).credential(a,c)}}catch(e){return null}},gg=function(a){if(!a.isOAuthProvider)throw new N("invalid-oauth-provider");};var hg=function(a,b,c,d){N.call(this,a,d);M(this,"email",b);M(this,"credential",c)};t(hg,N);hg.prototype.C=function(){var a={code:this.code,message:this.message,email:this.email},b=this.credential&&this.credential.C();b&&(Va(a,b),a.providerId=b.provider,delete a.provider);return a};hg.prototype.toJSON=function(){return this.C()};var ig=function(a){if(a.code){var b=a.code||"";0==b.indexOf("auth/")&&(b=b.substring(5));return a.email?new hg(b,a.email,fg(a),a.message):new N(b,a.message||void 0)}return null};var jg=function(a){this.wf=a};t(jg,Bc);jg.prototype.Sb=function(){return new this.wf};jg.prototype.Oc=function(){return{}};
	var R=function(a,b,c){var d;d="Node"==K();d=l.XMLHttpRequest||d&&firebase.INTERNAL.node&&firebase.INTERNAL.node.XMLHttpRequest;if(!d)throw new N("internal-error","The XMLHttpRequest compatibility library was not found.");this.j=a;a=b||{};this.df=a.secureTokenEndpoint||"https://securetoken.googleapis.com/v1/token";this.ef=a.secureTokenTimeout||kg;this.Qd=Ta(a.secureTokenHeaders||lg);this.te=a.firebaseEndpoint||"https://www.googleapis.com/identitytoolkit/v3/relyingparty/";this.ue=a.firebaseTimeout||
	mg;this.wd=Ta(a.firebaseHeaders||ng);c&&(this.wd["X-Client-Version"]=c,this.Qd["X-Client-Version"]=c);this.ke=new Gc;this.vf=new jg(d)},og,kg=new zf(3E4,6E4),lg={"Content-Type":"application/x-www-form-urlencoded"},mg=new zf(3E4,6E4),ng={"Content-Type":"application/json"},qg=function(a,b,c,d,e,f,g){yf()?(bf()?a=r(a.gf,a):(og||(og=new B(function(a,b){pg(a,b)})),a=r(a.ff,a)),a(b,c,d,e,f,g)):c&&c(null)};
	R.prototype.gf=function(a,b,c,d,e,f){var g="Node"==K(),k=nf()?g?new F(this.vf):new F:new F(this.ke),n;f&&(k.kb=Math.max(0,f),n=setTimeout(function(){k.dispatchEvent("timeout")},f));k.listen("complete",function(){n&&clearTimeout(n);var a=null;try{a=JSON.parse(Be(this))||null}catch(Wa){a=null}b&&b(a)});cc(k,"ready",function(){n&&clearTimeout(n);this.Aa||(this.Aa=!0,this.Ta())});cc(k,"timeout",function(){n&&clearTimeout(n);this.Aa||(this.Aa=!0,this.Ta());b&&b(null)});k.send(a,c,d,e)};
	var Ed="__fcb"+Math.floor(1E6*Math.random()).toString(),pg=function(a,b){((window.gapi||{}).client||{}).request?a():(l[Ed]=function(){((window.gapi||{}).client||{}).request?a():b(Error("CORS_UNSUPPORTED"))},Gd(function(){b(Error("CORS_UNSUPPORTED"))}))};
	R.prototype.ff=function(a,b,c,d,e){var f=this;og.then(function(){window.gapi.client.setApiKey(f.j);var g=window.gapi.auth.getToken();window.gapi.auth.setToken(null);window.gapi.client.request({path:a,method:c,body:d,headers:e,authType:"none",callback:function(a){window.gapi.auth.setToken(g);b&&b(a)}})}).c(function(a){b&&b({error:{message:a&&a.message||"CORS_UNSUPPORTED"}})})};
	var sg=function(a,b){return new B(function(c,d){"refresh_token"==b.grant_type&&b.refresh_token||"authorization_code"==b.grant_type&&b.code?qg(a,a.df+"?key="+encodeURIComponent(a.j),function(a){a?a.error?d(rg(a)):a.access_token&&a.refresh_token?c(a):d(new N("internal-error")):d(new N("network-request-failed"))},"POST",We(b).toString(),a.Qd,a.ef.get()):d(new N("internal-error"))})},tg=function(a,b,c,d,e){var f=Re(a.te+b);I(f,"key",a.j);e&&I(f,"cb",ka().toString());var g="GET"==c;if(g)for(var k in d)d.hasOwnProperty(k)&&
	I(f,k,d[k]);return new B(function(b,e){qg(a,f.toString(),function(a){a?a.error?e(rg(a)):b(a):e(new N("network-request-failed"))},c,g?void 0:xc(uf(d)),a.wd,a.ue.get())})},ug=function(a){if(!ic.test(a.email))throw new N("invalid-email");},vg=function(a){"email"in a&&ug(a)},xg=function(a,b){return Q(a,wg,{identifier:b,continueUri:pf()?Ye():"http://localhost"}).then(function(a){return a.allProviders||[]})},zg=function(a){return Q(a,yg,{}).then(function(a){return a.authorizedDomains||[]})},Ag=function(a){if(!a.idToken)throw new N("internal-error");
	};R.prototype.signInAnonymously=function(){return Q(this,Bg,{})};R.prototype.updateEmail=function(a,b){return Q(this,Cg,{idToken:a,email:b})};R.prototype.updatePassword=function(a,b){return Q(this,dg,{idToken:a,password:b})};var Dg={displayName:"DISPLAY_NAME",photoUrl:"PHOTO_URL"};R.prototype.updateProfile=function(a,b){var c={idToken:a},d=[];Oa(Dg,function(a,f){var e=b[f];null===e?d.push(a):f in b&&(c[f]=e)});d.length&&(c.deleteAttribute=d);return Q(this,Cg,c)};
	R.prototype.sendPasswordResetEmail=function(a){return Q(this,Eg,{requestType:"PASSWORD_RESET",email:a})};R.prototype.sendEmailVerification=function(a){return Q(this,Fg,{requestType:"VERIFY_EMAIL",idToken:a})};
	var Hg=function(a,b,c){return Q(a,Gg,{idToken:b,deleteProvider:c})},Ig=function(a){if(!a.requestUri||!a.sessionId&&!a.postBody)throw new N("internal-error");},Jg=function(a){var b=null;a.needConfirmation?(a.code="account-exists-with-different-credential",b=ig(a)):"FEDERATED_USER_ID_ALREADY_LINKED"==a.errorMessage?(a.code="credential-already-in-use",b=ig(a)):"EMAIL_EXISTS"==a.errorMessage&&(a.code="email-already-in-use",b=ig(a));if(b)throw b;if(!a.idToken)throw new N("internal-error");},Qf=function(a,
	b){b.returnIdpCredential=!0;return Q(a,Kg,b)},Sf=function(a,b){b.returnIdpCredential=!0;return Q(a,Lg,b)},Mg=function(a){if(!a.oobCode)throw new N("invalid-action-code");};R.prototype.confirmPasswordReset=function(a,b){return Q(this,Ng,{oobCode:a,newPassword:b})};R.prototype.checkActionCode=function(a){return Q(this,Og,{oobCode:a})};R.prototype.applyActionCode=function(a){return Q(this,Pg,{oobCode:a})};
	var Pg={endpoint:"setAccountInfo",K:Mg,jb:"email"},Og={endpoint:"resetPassword",K:Mg,va:function(a){if(!a.email||!a.requestType)throw new N("internal-error");}},Qg={endpoint:"signupNewUser",K:function(a){ug(a);if(!a.password)throw new N("weak-password");},va:Ag,wa:!0},wg={endpoint:"createAuthUri"},Rg={endpoint:"deleteAccount",ib:["idToken"]},Gg={endpoint:"setAccountInfo",ib:["idToken","deleteProvider"],K:function(a){if(!da(a.deleteProvider))throw new N("internal-error");}},Sg={endpoint:"getAccountInfo"},
	Fg={endpoint:"getOobConfirmationCode",ib:["idToken","requestType"],K:function(a){if("VERIFY_EMAIL"!=a.requestType)throw new N("internal-error");},jb:"email"},Eg={endpoint:"getOobConfirmationCode",ib:["requestType"],K:function(a){if("PASSWORD_RESET"!=a.requestType)throw new N("internal-error");ug(a)},jb:"email"},yg={je:!0,endpoint:"getProjectConfig",De:"GET"},Ng={endpoint:"resetPassword",K:Mg,jb:"email"},Cg={endpoint:"setAccountInfo",ib:["idToken"],K:vg,wa:!0},dg={endpoint:"setAccountInfo",ib:["idToken"],
	K:function(a){vg(a);if(!a.password)throw new N("weak-password");},va:Ag,wa:!0},Bg={endpoint:"signupNewUser",va:Ag,wa:!0},Kg={endpoint:"verifyAssertion",K:Ig,va:Jg,wa:!0},Lg={endpoint:"verifyAssertion",K:function(a){Ig(a);if(!a.idToken)throw new N("internal-error");},va:Jg,wa:!0},Tg={endpoint:"verifyCustomToken",K:function(a){if(!a.token)throw new N("invalid-custom-token");},va:Ag,wa:!0},cg={endpoint:"verifyPassword",K:function(a){ug(a);if(!a.password)throw new N("wrong-password");},va:Ag,wa:!0},Q=
	function(a,b,c){if(!Ef(c,b.ib))return D(new N("internal-error"));var d=b.De||"POST",e;return C(c).then(b.K).then(function(){b.wa&&(c.returnSecureToken=!0);return tg(a,b.endpoint,d,c,b.je||!1)}).then(function(a){return e=a}).then(b.va).then(function(){if(!b.jb)return e;if(!(b.jb in e))throw new N("internal-error");return e[b.jb]})},rg=function(a){var b,c;c=(a.error&&a.error.errors&&a.error.errors[0]||{}).reason||"";var d={keyInvalid:"invalid-api-key",ipRefererBlocked:"app-not-authorized"};if(c=d[c]?
	new N(d[c]):null)return c;c=a.error&&a.error.message||"";d={INVALID_CUSTOM_TOKEN:"invalid-custom-token",CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_EMAIL:"invalid-email",INVALID_PASSWORD:"wrong-password",USER_DISABLED:"user-disabled",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",
	FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",INVALID_MESSAGE_PAYLOAD:"invalid-message-payload",INVALID_RECIPIENT_EMAIL:"invalid-recipient-email",INVALID_SENDER:"invalid-sender",EMAIL_NOT_FOUND:"user-not-found",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",
	CORS_UNSUPPORTED:"cors-unsupported",DYNAMIC_LINK_NOT_ACTIVATED:"dynamic-link-not-activated",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",WEAK_PASSWORD:"weak-password",OPERATION_NOT_ALLOWED:"operation-not-allowed",USER_CANCELLED:"user-cancelled"};b=(b=c.match(/^[^\s]+\s*:\s*(.*)$/))&&1<b.length?b[1]:void 0;for(var e in d)if(0===c.indexOf(e))return new N(d[e],b);!b&&a&&(b=tf(a));return new N("internal-error",b)};var Ug=function(a){this.U=a};Ug.prototype.value=function(){return this.U};Ug.prototype.Td=function(a){this.U.style=a;return this};var Vg=function(a){this.U=a||{}};Vg.prototype.value=function(){return this.U};Vg.prototype.Td=function(a){this.U.style=a;return this};var Xg=function(a){this.tf=a;this.bc=null;this.Tc=Wg(this)},Yg=function(a){var b=new Vg;b.U.where=document.body;b.U.url=a.tf;b.U.messageHandlersFilter=L("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER");b.U.attributes=b.U.attributes||{};(new Ug(b.U.attributes)).Td({position:"absolute",top:"-100px",width:"1px",height:"1px"});b.U.dontclear=!0;return b},Wg=function(a){return Zg().then(function(){return new B(function(b,c){L("gapi.iframes.getContext")().open(Yg(a).value(),function(d){a.bc=d;a.bc.restyle({setHideOnLeave:!1});
	var e=setTimeout(function(){c(Error("Network Error"))},$g.get()),f=function(){clearTimeout(e);b()};d.ping(f).then(f,function(){c(Error("Network Error"))})})})})};Xg.prototype.sendMessage=function(a){var b=this;return this.Tc.then(function(){return new B(function(c){b.bc.send(a.type,a,c,L("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))})})};
	var ah=function(a,b){a.Tc.then(function(){a.bc.register("authEvent",b,L("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"))})},bh=new zf(3E4,6E4),$g=new zf(5E3,15E3),Zg=function(){return new B(function(a,b){if(yf()){var c=function(){xf();L("gapi.load")("gapi.iframes",{callback:a,ontimeout:function(){xf();b(Error("Network Error"))},timeout:bh.get()})};if(L("gapi.iframes.Iframe"))a();else if(L("gapi.load"))c();else{var d="__iframefcb"+Math.floor(1E6*Math.random()).toString();l[d]=function(){L("gapi.load")?
	c():b(Error("Network Error"))};C(Dd("https://apis.google.com/js/api.js?onload="+d)).c(function(){b(Error("Network Error"))})}}else b(Error("Network Error"))})};var ch=function(a,b,c){this.v=a;this.j=b;this.B=c;this.Ma=null;this.Nb=Se(this.v,"/__/auth/iframe");I(this.Nb,"apiKey",this.j);I(this.Nb,"appName",this.B)};ch.prototype.setVersion=function(a){this.Ma=a;return this};ch.prototype.toString=function(){this.Ma?I(this.Nb,"v",this.Ma):Qe(this.Nb,"v");return this.Nb.toString()};var eh=function(a,b,c,d,e){this.v=a;this.j=b;this.B=c;this.ie=d;this.Ma=this.F=this.$c=null;this.Db=e};eh.prototype.setVersion=function(a){this.Ma=a;return this};
	eh.prototype.toString=function(){var a=Se(this.v,"/__/auth/handler");I(a,"apiKey",this.j);I(a,"appName",this.B);I(a,"authType",this.ie);if(this.Db.isOAuthProvider){I(a,"providerId",this.Db.providerId);var b=this.Db,c=uf(b.rd),d;for(d in c)c[d]=c[d].toString();b=b.$e;c=Ta(c);for(d=0;d<b.length;d++){var e=b[d];e in c&&delete c[e]}Ra(c)||I(a,"customParameters",tf(c))}"function"===typeof this.Db.yd&&(b=this.Db.yd(),b.length&&I(a,"scopes",b.join(",")));this.$c?I(a,"redirectUrl",this.$c):Qe(a,"redirectUrl");
	this.F?I(a,"eventId",this.F):Qe(a,"eventId");this.Ma?I(a,"v",this.Ma):Qe(a,"v");if(this.Ob)for(var f in this.Ob)this.Ob.hasOwnProperty(f)&&!Pe(a,f)&&I(a,f,this.Ob[f]);return a.toString()};
	var fh=function(a,b,c,d){this.v=a;this.j=b;this.B=c;this.we=(this.za=d||null)?of(this.za):null;d=this.za;this.Ee=(new ch(a,b,c)).setVersion(d).toString();this.ia=[];this.g=new R(b,null,this.we);this.ec=this.ra=null},gh=function(a){var b=Ye();return zg(a).then(function(a){a:{for(var c=Re(b),e=c.da,c=c.$,f=0;f<a.length;f++){var g;var k=a[f];g=c;var n=e;0==k.indexOf("chrome-extension://")?g=Re(k).$==g&&"chrome-extension"==n:"http"!=n&&"https"!=n?g=!1:gf.test(k)?g=g==k:(k=k.split(".").join("\\."),g=(new RegExp("^(.+\\."+
	k+"|"+k+")$","i")).test(g));if(g){a=!0;break a}}a=!1}if(!a)throw new Nf(Ye());})};h=fh.prototype;h.ub=function(){if(this.ec)return this.ec;var a=this;return this.ec=hf().then(function(){a.ac=new Xg(a.Ee);hh(a)})};h.Ib=function(a,b,c){var d=new N("popup-closed-by-user"),e=new N("web-storage-unsupported"),f=this,g=!1;return this.Da().then(function(){ih(f).then(function(c){c||(a&&df(a),b(e),g=!0)})}).c(function(){}).then(function(){if(!g)return ff(a)}).then(function(){if(!g)return le(c).then(function(){b(d)})})};
	h.Ud=function(){var a=J();return!sf(a)&&!wf(a)};h.Bd=function(){return!1};h.Bb=function(a,b,c,d,e,f,g){if(!a)return D(new N("popup-blocked"));if(g&&!sf())return this.Da().c(function(b){df(a);e(b)}),d(),C();this.ra||(this.ra=gh(this.g));var k=this;return this.ra.then(function(){var b=k.Da().c(function(b){df(a);e(b);throw b;});d();return b}).then(function(){gg(c);if(!g){var d=jh(k.v,k.j,k.B,b,c,null,f,k.za);Ze(d,a)}}).c(function(a){"auth/network-request-failed"==a.code&&(k.ra=null);throw a;})};
	h.Cb=function(a,b,c){this.ra||(this.ra=gh(this.g));var d=this;return this.ra.then(function(){gg(b);var e=jh(d.v,d.j,d.B,a,b,Ye(),c,d.za);Ze(e)})};h.Da=function(){var a=this;return this.ub().then(function(){return a.ac.Tc}).c(function(){a.ra=null;throw new N("network-request-failed");})};h.Xd=function(){return!0};
	var jh=function(a,b,c,d,e,f,g,k,n){a=new eh(a,b,c,d,e);a.$c=f;a.F=g;f=a.setVersion(k);f.Ob=Ta(n||null);return f.toString()},hh=function(a){if(!a.ac)throw Error("IfcHandler must be initialized!");ah(a.ac,function(b){var c={};if(b&&b.authEvent){var d=!1;b=Mf(b.authEvent);for(c=0;c<a.ia.length;c++)d=a.ia[c](b)||d;c={};c.status=d?"ACK":"ERROR";return C(c)}c.status="ERROR";return C(c)})},ih=function(a){var b={type:"webStorageSupport"};return a.ub().then(function(){return a.ac.sendMessage(b)}).then(function(a){if(a&&
	a.length&&"undefined"!==typeof a[0].webStorageSupport)return a[0].webStorageSupport;throw Error();})};fh.prototype.Oa=function(a){this.ia.push(a)};fh.prototype.Gb=function(a){La(this.ia,function(b){return b==a})};var kh=function(a){this.A=a||firebase.INTERNAL.reactNative&&firebase.INTERNAL.reactNative.AsyncStorage;if(!this.A)throw new N("internal-error","The React Native compatibility library was not found.");};h=kh.prototype;h.get=function(a){return C(this.A.getItem(a)).then(function(a){return a&&vf(a)})};h.set=function(a,b){return C(this.A.setItem(a,tf(b)))};h.remove=function(a){return C(this.A.removeItem(a))};h.Pa=function(){};h.Ja=function(){};var lh=function(){this.A={}};h=lh.prototype;h.get=function(a){return C(this.A[a])};h.set=function(a,b){this.A[a]=b;return C()};h.remove=function(a){delete this.A[a];return C()};h.Pa=function(){};h.Ja=function(){};var nh=function(){if(!mh()){if("Node"==K())throw new N("internal-error","The LocalStorage compatibility library was not found.");throw new N("web-storage-unsupported");}this.A=l.localStorage||firebase.INTERNAL.node.localStorage},mh=function(){var a="Node"==K(),a=l.localStorage||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.localStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}};h=nh.prototype;
	h.get=function(a){var b=this;return C().then(function(){var c=b.A.getItem(a);return vf(c)})};h.set=function(a,b){var c=this;return C().then(function(){var d=tf(b);null===d?c.remove(a):c.A.setItem(a,d)})};h.remove=function(a){var b=this;return C().then(function(){b.A.removeItem(a)})};h.Pa=function(a){l.window&&Vb(l.window,"storage",a)};h.Ja=function(a){l.window&&dc(l.window,"storage",a)};var oh=function(){this.A={}};h=oh.prototype;h.get=function(){return C(null)};h.set=function(){return C()};h.remove=function(){return C()};h.Pa=function(){};h.Ja=function(){};var qh=function(){if(!ph()){if("Node"==K())throw new N("internal-error","The SessionStorage compatibility library was not found.");throw new N("web-storage-unsupported");}this.A=l.sessionStorage||firebase.INTERNAL.node.sessionStorage},ph=function(){var a="Node"==K(),a=l.sessionStorage||a&&firebase.INTERNAL.node&&firebase.INTERNAL.node.sessionStorage;if(!a)return!1;try{return a.setItem("__sak","1"),a.removeItem("__sak"),!0}catch(b){return!1}};h=qh.prototype;
	h.get=function(a){var b=this;return C().then(function(){var c=b.A.getItem(a);return vf(c)})};h.set=function(a,b){var c=this;return C().then(function(){var d=tf(b);null===d?c.remove(a):c.A.setItem(a,d)})};h.remove=function(a){var b=this;return C().then(function(){b.A.removeItem(a)})};h.Pa=function(){};h.Ja=function(){};var rh=function(a,b,c,d,e,f){if(!window.indexedDB)throw new N("web-storage-unsupported");this.me=a;this.Sc=b;this.Fc=c;this.ae=d;this.nb=e;this.Y={};this.Jb=[];this.xb=0;this.Fe=f||l.indexedDB},sh,th=function(a){return new B(function(b,c){var d=a.Fe.open(a.me,a.nb);d.onerror=function(a){c(Error(a.target.errorCode))};d.onupgradeneeded=function(b){b=b.target.result;try{b.createObjectStore(a.Sc,{keyPath:a.Fc})}catch(f){c(f)}};d.onsuccess=function(a){b(a.target.result)}})},uh=function(a){a.Ed||(a.Ed=
	th(a));return a.Ed},vh=function(a,b){return b.objectStore(a.Sc)},wh=function(a,b,c){return b.transaction([a.Sc],c?"readwrite":"readonly")},xh=function(a){return new B(function(b,c){a.onsuccess=function(a){a&&a.target?b(a.target.result):b()};a.onerror=function(a){c(Error(a.target.errorCode))}})};h=rh.prototype;
	h.set=function(a,b){var c=!1,d,e=this;return md(uh(this).then(function(b){d=b;b=vh(e,wh(e,d,!0));return xh(b.get(a))}).then(function(f){var g=vh(e,wh(e,d,!0));if(f)return f.value=b,xh(g.put(f));e.xb++;c=!0;f={};f[e.Fc]=a;f[e.ae]=b;return xh(g.add(f))}).then(function(){e.Y[a]=b}),function(){c&&e.xb--})};h.get=function(a){var b=this;return uh(this).then(function(c){return xh(vh(b,wh(b,c,!1)).get(a))}).then(function(a){return a&&a.value})};
	h.remove=function(a){var b=!1,c=this;return md(uh(this).then(function(d){b=!0;c.xb++;return xh(vh(c,wh(c,d,!0))["delete"](a))}).then(function(){delete c.Y[a]}),function(){b&&c.xb--})};
	h.kf=function(){var a=this;return uh(this).then(function(b){var c=vh(a,wh(a,b,!1));return c.getAll?xh(c.getAll()):new B(function(a,b){var d=[],e=c.openCursor();e.onsuccess=function(b){(b=b.target.result)?(d.push(b.value),b["continue"]()):a(d)};e.onerror=function(a){b(Error(a.target.errorCode))}})}).then(function(b){var c={},d=[];if(0==a.xb){for(d=0;d<b.length;d++)c[b[d][a.Fc]]=b[d][a.ae];d=$e(a.Y,c);a.Y=c}return d})};h.Pa=function(a){0==this.Jb.length&&this.gd();this.Jb.push(a)};
	h.Ja=function(a){La(this.Jb,function(b){return b==a});0==this.Jb.length&&this.qc()};h.gd=function(){var a=this;this.qc();var b=function(){a.Wc=le(800).then(r(a.kf,a)).then(function(b){0<b.length&&Ca(a.Jb,function(a){a(b)})}).then(b).c(function(a){"STOP_EVENT"!=a.message&&b()});return a.Wc};b()};h.qc=function(){this.Wc&&this.Wc.cancel("STOP_EVENT")};var Bh=function(){this.td={Browser:yh,Node:zh,ReactNative:Ah}[K()]},Ch,yh={I:nh,kd:qh},zh={I:nh,kd:qh},Ah={I:kh,kd:oh};var Dh=function(a){var b={},c=a.email,d=a.newEmail;a=a.requestType;if(!c||!a)throw Error("Invalid provider user info!");b.fromEmail=d||null;b.email=c;M(this,"operation",a);M(this,"data",Ff(b))};var Eh="First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" "),S=function(a,b){return{name:a||"",fa:"a valid string",optional:!!b,ha:p}},Fh=function(a){return{name:a||"",fa:"a valid object",optional:!1,ha:ga}},Gh=function(a,b){return{name:a||"",fa:"a function",optional:!!b,ha:q}},Hh=function(){return{name:"",fa:"null",optional:!1,ha:ca}},Ih=function(){return{name:"credential",fa:"a valid credential",optional:!1,ha:function(a){return!(!a||!a.Vb)}}},Jh=function(){return{name:"authProvider",
	fa:"a valid Auth provider",optional:!1,ha:function(a){return!!(a&&a.providerId&&a.hasOwnProperty&&a.hasOwnProperty("isOAuthProvider"))}}},Kh=function(a,b,c,d){return{name:c||"",fa:a.fa+" or "+b.fa,optional:!!d,ha:function(c){return a.ha(c)||b.ha(c)}}};var T=function(a,b){for(var c in b){var d=b[c].name;a[d]=Lh(d,a[c],b[c].a)}},U=function(a,b,c,d){a[b]=Lh(b,c,d)},Lh=function(a,b,c){if(!c)return b;var d=Mh(a);a=function(){var a=Array.prototype.slice.call(arguments),e;a:{e=Array.prototype.slice.call(a);var k;k=0;for(var n=!1,A=0;A<c.length;A++)if(c[A].optional)n=!0;else{if(n)throw new N("internal-error","Argument validator encountered a required argument after an optional argument.");k++}n=c.length;if(e.length<k||n<e.length)e="Expected "+(k==n?1==
	k?"1 argument":k+" arguments":k+"-"+n+" arguments")+" but got "+e.length+".";else{for(k=0;k<e.length;k++)if(n=c[k].optional&&void 0===e[k],!c[k].ha(e[k])&&!n){e=c[k];if(0>k||k>=Eh.length)throw new N("internal-error","Argument validator received an unsupported number of arguments.");e=Eh[k]+" argument "+(e.name?'"'+e.name+'" ':"")+"must be "+e.fa+".";break a}e=null}}if(e)throw new N("argument-error",d+" failed: "+e);return b.apply(this,a)};for(var e in b)a[e]=b[e];for(e in b.prototype)a.prototype[e]=
	b.prototype[e];return a},Mh=function(a){a=a.split(".");return a[a.length-1]};var Nh=function(a,b,c,d){this.Se=a;this.Rd=b;this.bf=c;this.Hb=d;this.S={};Ch||(Ch=new Bh);a=Ch;try{var e;Xe()?(sh||(sh=new rh("firebaseLocalStorageDb","firebaseLocalStorage","fbase_key","value",1)),e=sh):e=new a.td.I;this.Ha=e}catch(f){this.Ha=new lh,this.Hb=!0}try{this.sc=new a.td.kd}catch(f){this.sc=new lh}this.hd=r(this.Vd,this);this.Y={}},Oh,Ph=function(){Oh||(Oh=new Nh("firebase",":",!wf(J())&&mf()?!0:!1,sf()));return Oh};h=Nh.prototype;
	h.P=function(a,b){return this.Se+this.Rd+a.name+(b?this.Rd+b:"")};h.get=function(a,b){return(a.I?this.Ha:this.sc).get(this.P(a,b))};h.remove=function(a,b){b=this.P(a,b);a.I&&!this.Hb&&(this.Y[b]=null);return(a.I?this.Ha:this.sc).remove(b)};h.set=function(a,b,c){var d=this.P(a,c),e=this,f=a.I?this.Ha:this.sc;return f.set(d,b).then(function(){return f.get(d)}).then(function(b){a.I&&!this.Hb&&(e.Y[d]=b)})};
	h.addListener=function(a,b,c){a=this.P(a,b);this.Hb||(this.Y[a]=l.localStorage.getItem(a));Ra(this.S)&&this.gd();this.S[a]||(this.S[a]=[]);this.S[a].push(c)};h.removeListener=function(a,b,c){a=this.P(a,b);this.S[a]&&(La(this.S[a],function(a){return a==c}),0==this.S[a].length&&delete this.S[a]);Ra(this.S)&&this.qc()};h.gd=function(){this.Ha.Pa(this.hd);this.Hb||Xe()||Qh(this)};
	var Qh=function(a){Rh(a);a.Rc=setInterval(function(){for(var b in a.S){var c=l.localStorage.getItem(b),d=a.Y[b];c!=d&&(a.Y[b]=c,c=new Kb({type:"storage",key:b,target:window,oldValue:d,newValue:c,Xe:!0}),a.Vd(c))}},1E3)},Rh=function(a){a.Rc&&(clearInterval(a.Rc),a.Rc=null)};Nh.prototype.qc=function(){this.Ha.Ja(this.hd);Rh(this)};
	Nh.prototype.Vd=function(a){if(a&&a.xe){var b=a.Ua.key;"undefined"!==typeof a.Ua.Xe?this.Ha.Ja(this.hd):Rh(this);if(this.bf){var c=l.localStorage.getItem(b);a=a.Ua.newValue;a!=c&&(a?l.localStorage.setItem(b,a):a||l.localStorage.removeItem(b))}this.Y[b]=l.localStorage.getItem(b);this.nd(b)}else Ca(a,r(this.nd,this))};Nh.prototype.nd=function(a){this.S[a]&&Ca(this.S[a],function(a){a()})};var Sh=function(a,b){this.u=a;this.i=b||Ph()},Th={name:"authEvent",I:!0},Uh=function(a){return a.i.get(Th,a.u).then(function(a){return Mf(a)})};Sh.prototype.Oa=function(a){this.i.addListener(Th,this.u,a)};Sh.prototype.Gb=function(a){this.i.removeListener(Th,this.u,a)};var Vh=function(a){this.i=a||Ph()},Wh={name:"sessionId",I:!1};Vh.prototype.Wb=function(a){return this.i.get(Wh,a)};var Xh=function(a,b,c,d,e,f){this.v=a;this.j=b;this.B=c;this.za=d||null;this.Wd=b+":"+c;this.cf=new Vh;this.xd=new Sh(this.Wd);this.Nc=null;this.ia=[];this.Ie=e||500;this.Ze=f||2E3;this.tb=this.ic=null},Yh=function(a){return new N("invalid-cordova-configuration",a)};
	Xh.prototype.Da=function(){return this.Pc?this.Pc:this.Pc=kf().then(function(){if("function"!==typeof L("universalLinks.subscribe",l))throw Yh("cordova-universal-links-plugin is not installed");if("undefined"===typeof L("BuildInfo.packageName",l))throw Yh("cordova-plugin-buildinfo is not installed");if("function"!==typeof L("cordova.plugins.browsertab.openUrl",l))throw Yh("cordova-plugin-browsertab is not installed");if("function"!==typeof L("cordova.InAppBrowser.open",l))throw Yh("cordova-plugin-inappbrowser is not installed");
	},function(){throw new N("cordova-not-ready");})};var Zh=function(){for(var a=20,b=[];0<a;)b.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62*Math.random()))),a--;return b.join("")},$h=function(a){var b=new Eb;b.update(a);return pb(b.digest())};h=Xh.prototype;h.Ib=function(a,b){b(new N("operation-not-supported-in-this-environment"));return C()};h.Bb=function(){return D(new N("operation-not-supported-in-this-environment"))};h.Xd=function(){return!1};h.Ud=function(){return!0};
	h.Bd=function(){return!0};
	h.Cb=function(a,b,c){if(this.ic)return D(new N("redirect-operation-pending"));var d=this,e=l.document,f=null,g=null,k=null,n=null;return this.ic=md(C().then(function(){gg(b);return ai(d)}).then(function(){return bi(d,a,b,c)}).then(function(){return(new B(function(a,b){g=function(){var b=L("cordova.plugins.browsertab.close",l);a();"function"===typeof b&&b();d.tb&&"function"===typeof d.tb.close&&(d.tb.close(),d.tb=null);return!1};d.Oa(g);k=function(){f||(f=le(d.Ze).then(function(){b(new N("redirect-cancelled-by-user"))}))};n=
	function(){var a=l.document;(a&&"undefined"!==typeof a.visibilityState?"visible"==a.visibilityState:1)&&k()};e.addEventListener("resume",k,!1);J().toLowerCase().match(/android/)||e.addEventListener("visibilitychange",n,!1)})).c(function(a){return ci(d).then(function(){throw a;})})}),function(){k&&e.removeEventListener("resume",k,!1);n&&e.removeEventListener("visibilitychange",n,!1);f&&f.cancel();g&&d.Gb(g);d.ic=null})};
	var bi=function(a,b,c,d){var e=Zh(),f=new O(b,d,null,e,new N("no-auth-event")),g=L("BuildInfo.packageName",l);if("string"!==typeof g)throw new N("invalid-cordova-configuration");var k=L("BuildInfo.displayName",l),n={};if(J().toLowerCase().match(/iphone|ipad|ipod/))n.ibi=g;else if(J().toLowerCase().match(/android/))n.apn=g;else return D(new N("operation-not-supported-in-this-environment"));k&&(n.appDisplayName=k);e=$h(e);n.sessionId=e;var A=jh(a.v,a.j,a.B,b,c,null,d,a.za,n);return a.Da().then(function(){var b=
	a.Wd;return a.cf.i.set(Th,f.C(),b)}).then(function(){var b=L("cordova.plugins.browsertab.isAvailable",l);if("function"!==typeof b)throw new N("invalid-cordova-configuration");var c=null;b(function(b){if(b){c=L("cordova.plugins.browsertab.openUrl",l);if("function"!==typeof c)throw new N("invalid-cordova-configuration");c(A)}else{c=L("cordova.InAppBrowser.open",l);if("function"!==typeof c)throw new N("invalid-cordova-configuration");b=c;var d;d=J();d=!(!d.match(/(iPad|iPhone|iPod).*OS 7_\d/i)&&!d.match(/(iPad|iPhone|iPod).*OS 8_\d/i));
	a.tb=b(A,d?"_blank":"_system","location=yes")}})})},di=function(a,b){for(var c=0;c<a.ia.length;c++)try{a.ia[c](b)}catch(d){}},ai=function(a){a.Nc||(a.Nc=a.Da().then(function(){return new B(function(b){var c=function(d){b(d);a.Gb(c);return!1};a.Oa(c);ei(a)})}));return a.Nc},ci=function(a){var b=null;return Uh(a.xd).then(function(c){b=c;c=a.xd;return c.i.remove(Th,c.u)}).then(function(){return b})},ei=function(a){var b=L("universalLinks.subscribe",l);if("function"!==typeof b)throw new N("invalid-cordova-configuration");
	var c=new O("unknown",null,null,null,new N("no-auth-event")),d=!1,e=le(a.Ie).then(function(){return ci(a).then(function(){d||di(a,c)})}),f=function(b){d=!0;e&&e.cancel();ci(a).then(function(d){var e=c;if(d&&b&&b.url){var e=null,f;f=b.url;var g=Re(f),k=Pe(g,"link"),n=Pe(Re(k),"link"),g=Pe(g,"deep_link_id");f=Pe(Re(g),"link")||g||n||k||f;-1!=f.indexOf("/__/auth/callback")&&(e=Re(f),e=vf(Pe(e,"error")||null),e=(e="object"===typeof e?Lf(e):null)?new O(d.ga,d.F,null,null,e):new O(d.ga,d.F,f,d.Wb()));e=
	e||c}di(a,e)})},g=l.handleOpenURL;l.handleOpenURL=function(a){0==a.indexOf(L("BuildInfo.packageName",l)+"://")&&f({url:a});if("function"===typeof g)try{g(a)}catch(n){console.error(n)}};b(null,f)};Xh.prototype.Oa=function(a){this.ia.push(a);ai(this).c(function(){})};Xh.prototype.Gb=function(a){La(this.ia,function(b){return b==a})};var fi=function(a){this.u=a;this.i=Ph()},gi={name:"pendingRedirect",I:!1},hi=function(a){return a.i.set(gi,"pending",a.u)},ii=function(a){return a.i.remove(gi,a.u)},ji=function(a){return a.i.get(gi,a.u).then(function(a){return"pending"==a})};var V=function(a,b,c){this.v=a;this.j=b;this.B=c;this.Kb=[];this.Za=!1;this.Bc=r(this.Lc,this);this.cb=new ki(this);this.Ld=new li(this);this.yb=new fi(this.j+":"+this.B);this.lb={};this.lb.unknown=this.cb;this.lb.signInViaRedirect=this.cb;this.lb.linkViaRedirect=this.cb;this.lb.signInViaPopup=this.Ld;this.lb.linkViaPopup=this.Ld;this.G=mi(this.v,this.j,this.B)},mi=function(a,b,c){var d=firebase.SDK_VERSION||null;return jf()?new Xh(a,b,c,d):new fh(a,b,c,d)};
	V.prototype.reset=function(){this.Za=!1;this.G.Gb(this.Bc);this.G=mi(this.v,this.j,this.B)};V.prototype.ub=function(){var a=this;this.Za||(this.Za=!0,this.G.Oa(this.Bc));var b=this.G;return this.G.Da().c(function(c){a.G==b&&a.reset();throw c;})};var pi=function(a){a.G.Ud()&&a.ub().c(function(b){var c=new O("unknown",null,null,null,new N("operation-not-supported-in-this-environment"));ni(b)&&a.Lc(c)});a.G.Bd()||oi(a.cb)};
	V.prototype.subscribe=function(a){Ia(this.Kb,a)||this.Kb.push(a);if(!this.Za){var b=this;ji(this.yb).then(function(a){a?ii(b.yb).then(function(){b.ub().c(function(a){var c=new O("unknown",null,null,null,new N("operation-not-supported-in-this-environment"));ni(a)&&b.Lc(c)})}):pi(b)}).c(function(){pi(b)})}};V.prototype.unsubscribe=function(a){La(this.Kb,function(b){return b==a})};
	V.prototype.Lc=function(a){if(!a)throw new N("invalid-auth-event");for(var b=!1,c=0;c<this.Kb.length;c++){var d=this.Kb[c];if(d.od(a.ga,a.F)){(b=this.lb[a.ga])&&b.Md(a,d);b=!0;break}}oi(this.cb);return b};var qi=new zf(2E3,1E4),ri=new zf(3E4,6E4);V.prototype.getRedirectResult=function(){return this.cb.getRedirectResult()};V.prototype.Bb=function(a,b,c,d,e){var f=this;return this.G.Bb(a,b,c,function(){f.Za||(f.Za=!0,f.G.Oa(f.Bc))},function(){f.reset()},d,e)};
	var ni=function(a){return a&&"auth/cordova-not-ready"==a.code?!0:!1};V.prototype.Cb=function(a,b,c){var d=this,e;return hi(this.yb).then(function(){return d.G.Cb(a,b,c).c(function(a){if(ni(a))throw new N("operation-not-supported-in-this-environment");e=a;return ii(d.yb).then(function(){throw e;})}).then(function(){return d.G.Xd()?new B(function(){}):ii(d.yb).then(function(){return d.getRedirectResult()}).then(function(){}).c(function(){})})})};
	V.prototype.Ib=function(a,b,c,d){return this.G.Ib(c,function(c){a.Ka(b,null,c,d)},qi.get())};var si={},ti=function(a,b,c){var d=b+":"+c;si[d]||(si[d]=new V(a,b,c));return si[d]},ki=function(a){this.i=a;this.gb=null;this.Fb=[];this.Eb=[];this.eb=null;this.Zc=!1};ki.prototype.reset=function(){this.gb=null;this.eb&&(this.eb.cancel(),this.eb=null)};
	ki.prototype.Md=function(a,b){if(!a)return D(new N("invalid-auth-event"));this.reset();this.Zc=!0;var c=a.ga,d=a.F,e=a.getError()&&"auth/web-storage-unsupported"==a.getError().code,f=a.getError()&&"auth/operation-not-supported-in-this-environment"==a.getError().code;"unknown"!=c||e||f?a=a.O?this.Xc(a,b):b.qb(c,d)?this.Yc(a,b):D(new N("invalid-auth-event")):(ui(this,!1,null,null),a=C());return a};var oi=function(a){a.Zc||(a.Zc=!0,ui(a,!1,null,null))};
	ki.prototype.Xc=function(a){ui(this,!0,null,a.getError());return C()};ki.prototype.Yc=function(a,b){var c=this,d=a.ga;b=b.qb(d,a.F);var e=a.mb;a=a.Wb();var f="signInViaRedirect"==d||"linkViaRedirect"==d;return b(e,a).then(function(a){ui(c,f,a,null)}).c(function(a){ui(c,f,null,a)})};
	var vi=function(a,b){a.gb=function(){return D(b)};if(a.Eb.length)for(var c=0;c<a.Eb.length;c++)a.Eb[c](b)},wi=function(a,b){a.gb=function(){return C(b)};if(a.Fb.length)for(var c=0;c<a.Fb.length;c++)a.Fb[c](b)},ui=function(a,b,c,d){b?d?vi(a,d):wi(a,c):wi(a,{user:null});a.Fb=[];a.Eb=[]};ki.prototype.getRedirectResult=function(){var a=this;return new B(function(b,c){a.gb?a.gb().then(b,c):(a.Fb.push(b),a.Eb.push(c),xi(a))})};
	var xi=function(a){var b=new N("timeout");a.eb&&a.eb.cancel();a.eb=le(ri.get()).then(function(){a.gb||ui(a,!0,null,b)})},li=function(a){this.i=a};li.prototype.Md=function(a,b){if(!a)return D(new N("invalid-auth-event"));var c=a.ga,d=a.F;return a.O?this.Xc(a,b):b.qb(c,d)?this.Yc(a,b):D(new N("invalid-auth-event"))};li.prototype.Xc=function(a,b){b.Ka(a.ga,null,a.getError(),a.F);return C()};
	li.prototype.Yc=function(a,b){var c=a.F,d=a.ga,e=b.qb(d,c),f=a.mb;a=a.Wb();return e(f,a).then(function(a){b.Ka(d,a,null,c)}).c(function(a){b.Ka(d,null,a,c)})};var yi=function(a){this.g=a;this.xa=this.W=null;this.Va=0};yi.prototype.C=function(){return{apiKey:this.g.j,refreshToken:this.W,accessToken:this.xa,expirationTime:this.Va}};
	var Ai=function(a,b){var c=b.idToken,d=b.refreshToken;b=zi(b.expiresIn);a.xa=c;a.Va=b;a.W=d},zi=function(a){return ka()+1E3*parseInt(a,10)},Bi=function(a,b){return sg(a.g,b).then(function(b){a.xa=b.access_token;a.Va=zi(b.expires_in);a.W=b.refresh_token;return{accessToken:a.xa,expirationTime:a.Va,refreshToken:a.W}}).c(function(b){"auth/user-token-expired"==b.code&&(a.W=null);throw b;})},Ci=function(a){return!(!a.xa||a.W)};
	yi.prototype.getToken=function(a){a=!!a;return Ci(this)?D(new N("user-token-expired")):a||!this.xa||ka()>this.Va-3E4?this.W?Bi(this,{grant_type:"refresh_token",refresh_token:this.W}):C(null):C({accessToken:this.xa,expirationTime:this.Va,refreshToken:this.W})};var Di=function(a,b,c,d,e){Cf(this,{uid:a,displayName:d||null,photoURL:e||null,email:c||null,providerId:b})},Ei=function(a,b){Jb.call(this,a);for(var c in b)this[c]=b[c]};t(Ei,Jb);
	var W=function(a,b,c){this.Z=[];this.j=a.apiKey;this.B=a.appName;this.v=a.authDomain||null;a=firebase.SDK_VERSION?of(firebase.SDK_VERSION):null;this.g=new R(this.j,null,a);this.ea=new yi(this.g);Fi(this,b.idToken);Ai(this.ea,b);M(this,"refreshToken",this.ea.W);Gi(this,c||{});Pd.call(this);this.jc=!1;this.v&&rf()&&(this.m=ti(this.v,this.j,this.B));this.pc=[];this.Ac=C()};t(W,Pd);
	W.prototype.ta=function(a,b){var c=Array.prototype.slice.call(arguments,1),d=this;return this.Ac=this.Ac.then(function(){return a.apply(d,c)},function(){return a.apply(d,c)})};
	var Fi=function(a,b){a.Fd=b;M(a,"_lat",b)},Hi=function(a,b){La(a.pc,function(a){return a==b})},Ii=function(a){for(var b=[],c=0;c<a.pc.length;c++)b.push(a.pc[c](a));return jd(b).then(function(){return a})},Ji=function(a){a.m&&!a.jc&&(a.jc=!0,a.m.subscribe(a))},Gi=function(a,b){Cf(a,{uid:b.uid,displayName:b.displayName||null,photoURL:b.photoURL||null,email:b.email||null,emailVerified:b.emailVerified||!1,isAnonymous:b.isAnonymous||!1,providerData:[]})};M(W.prototype,"providerId","firebase");
	var Ki=function(){},Li=function(a){return C().then(function(){if(a.oe)throw new N("app-deleted");})},Mi=function(a){return Ea(a.providerData,function(a){return a.providerId})},Oi=function(a,b){b&&(Ni(a,b.providerId),a.providerData.push(b))},Ni=function(a,b){La(a.providerData,function(a){return a.providerId==b})},Pi=function(a,b,c){("uid"!=b||c)&&a.hasOwnProperty(b)&&M(a,b,c)};
	W.prototype.copy=function(a){var b=this;b!=a&&(Cf(this,{uid:a.uid,displayName:a.displayName,photoURL:a.photoURL,email:a.email,emailVerified:a.emailVerified,isAnonymous:a.isAnonymous,providerData:[]}),Ca(a.providerData,function(a){Oi(b,a)}),this.ea=a.ea,M(this,"refreshToken",this.ea.W))};W.prototype.reload=function(){var a=this;return Li(this).then(function(){return Qi(a).then(function(){return Ii(a)}).then(Ki)})};
	var Qi=function(a){return a.getToken().then(function(b){var c=a.isAnonymous;return Ri(a,b).then(function(){c||Pi(a,"isAnonymous",!1);return b}).c(function(b){"auth/user-token-expired"==b.code&&(a.dispatchEvent(new Ei("userDeleted")),Si(a));throw b;})})};
	W.prototype.getToken=function(a){var b=this,c=Ci(this.ea);return Li(this).then(function(){return b.ea.getToken(a)}).then(function(a){if(!a)throw new N("internal-error");a.accessToken!=b.Fd&&(Fi(b,a.accessToken),b.Ea());Pi(b,"refreshToken",a.refreshToken);return a.accessToken}).c(function(a){if("auth/user-token-expired"==a.code&&!c)return Ii(b).then(function(){Pi(b,"refreshToken",null);throw a;});throw a;})};
	var Ti=function(a,b){b.idToken&&a.Fd!=b.idToken&&(Ai(a.ea,b),a.Ea(),Fi(a,b.idToken),Pi(a,"refreshToken",a.ea.W))};W.prototype.Ea=function(){this.dispatchEvent(new Ei("tokenChanged"))};var Ri=function(a,b){return Q(a.g,Sg,{idToken:b}).then(r(a.We,a))};
	W.prototype.We=function(a){a=a.users;if(!a||!a.length)throw new N("internal-error");a=a[0];Gi(this,{uid:a.localId,displayName:a.displayName,photoURL:a.photoUrl,email:a.email,emailVerified:!!a.emailVerified});for(var b=Ui(a),c=0;c<b.length;c++)Oi(this,b[c]);Pi(this,"isAnonymous",!(this.email&&a.passwordHash)&&!(this.providerData&&this.providerData.length))};
	var Ui=function(a){return(a=a.providerUserInfo)&&a.length?Ea(a,function(a){return new Di(a.rawId,a.providerId,a.email,a.displayName,a.photoUrl)}):[]};
	W.prototype.reauthenticate=function(a){var b=this;return this.f(a.Vb(this.g).then(function(a){var c;a:{var e=a.idToken.split(".");if(3==e.length){for(var e=e[1],f=(4-e.length%4)%4,g=0;g<f;g++)e+=".";try{var k=JSON.parse(tb(e));if(k.sub&&k.iss&&k.aud&&k.exp){c=new Of(k);break a}}catch(n){}}c=null}if(!c||b.uid!=c.Oe)throw new N("user-mismatch");Ti(b,a);return b.reload()}))};
	var Vi=function(a,b){return Qi(a).then(function(){if(Ia(Mi(a),b))return Ii(a).then(function(){throw new N("provider-already-linked");})})};h=W.prototype;h.Me=function(a){var b=this;return this.f(Vi(this,a.provider).then(function(){return b.getToken()}).then(function(c){return a.Hd(b.g,c)}).then(r(this.vd,this)))};h.link=function(a){return this.ta(this.Me,a)};h.vd=function(a){Ti(this,a);var b=this;return this.reload().then(function(){return b})};
	h.qf=function(a){var b=this;return this.f(this.getToken().then(function(c){return b.g.updateEmail(c,a)}).then(function(a){Ti(b,a);return b.reload()}))};h.updateEmail=function(a){return this.ta(this.qf,a)};h.rf=function(a){var b=this;return this.f(this.getToken().then(function(c){return b.g.updatePassword(c,a)}).then(function(a){Ti(b,a);return b.reload()}))};h.updatePassword=function(a){return this.ta(this.rf,a)};
	h.sf=function(a){if(void 0===a.displayName&&void 0===a.photoURL)return Li(this);var b=this;return this.f(this.getToken().then(function(c){return b.g.updateProfile(c,{displayName:a.displayName,photoUrl:a.photoURL})}).then(function(a){Ti(b,a);Pi(b,"displayName",a.displayName||null);Pi(b,"photoURL",a.photoUrl||null);return Ii(b)}).then(Ki))};h.updateProfile=function(a){return this.ta(this.sf,a)};
	h.pf=function(a){var b=this;return this.f(Qi(this).then(function(c){return Ia(Mi(b),a)?Hg(b.g,c,[a]).then(function(a){var c={};Ca(a.providerUserInfo||[],function(a){c[a.providerId]=!0});Ca(Mi(b),function(a){c[a]||Ni(b,a)});return Ii(b)}):Ii(b).then(function(){throw new N("no-such-provider");})}))};h.unlink=function(a){return this.ta(this.pf,a)};h.ne=function(){var a=this;return this.f(this.getToken().then(function(b){return Q(a.g,Rg,{idToken:b})}).then(function(){a.dispatchEvent(new Ei("userDeleted"))})).then(function(){Si(a)})};
	h["delete"]=function(){return this.ta(this.ne)};h.od=function(a,b){return"linkViaPopup"==a&&(this.la||null)==b&&this.ca||"linkViaRedirect"==a&&(this.mc||null)==b?!0:!1};h.Ka=function(a,b,c,d){"linkViaPopup"==a&&d==(this.la||null)&&(c&&this.Ga?this.Ga(c):b&&!c&&this.ca&&this.ca(b),this.J&&(this.J.cancel(),this.J=null),delete this.ca,delete this.Ga)};h.qb=function(a,b){return"linkViaPopup"==a&&b==(this.la||null)||"linkViaRedirect"==a&&(this.mc||null)==b?r(this.re,this):null};
	h.Ub=function(){return qf(this.uid+":::")};
	var Xi=function(a,b){if(!rf())return D(new N("operation-not-supported-in-this-environment"));var c=Jf(b.providerId),d=a.Ub(),e=null;(!sf()||mf())&&a.v&&b.isOAuthProvider&&(e=jh(a.v,a.j,a.B,"linkViaPopup",b,null,d,firebase.SDK_VERSION||null));var f=ef(e,c&&c.Ab,c&&c.zb),c=Vi(a,b.providerId).then(function(){return Ii(a)}).then(function(){Wi(a);return a.getToken()}).then(function(){return a.m.Bb(f,"linkViaPopup",b,d,!!e)}).then(function(){return new B(function(b,c){a.Ka("linkViaPopup",null,new N("cancelled-popup-request"),
	a.la||null);a.ca=b;a.Ga=c;a.la=d;a.J=a.m.Ib(a,"linkViaPopup",f,d)})}).then(function(a){f&&df(f);return a}).c(function(a){f&&df(f);throw a;});return a.f(c)};W.prototype.linkWithPopup=function(a){var b=Xi(this,a);return this.ta(function(){return b})};
	W.prototype.Ne=function(a){if(!rf())return D(new N("operation-not-supported-in-this-environment"));var b=this,c=null,d=this.Ub(),e=Vi(this,a.providerId).then(function(){Wi(b);return b.getToken()}).then(function(){b.mc=d;return Ii(b)}).then(function(a){b.Ia&&(a=b.Ia,a=a.i.set(Yi,b.C(),a.u));return a}).then(function(){return b.m.Cb("linkViaRedirect",a,d)}).c(function(a){c=a;if(b.Ia)return Zi(b.Ia);throw c;}).then(function(){if(c)throw c;});return this.f(e)};
	W.prototype.linkWithRedirect=function(a){return this.ta(this.Ne,a)};var Wi=function(a){if(!a.m||!a.jc){if(a.m&&!a.jc)throw new N("internal-error");throw new N("auth-domain-config-required");}};W.prototype.re=function(a,b){var c=this;this.J&&(this.J.cancel(),this.J=null);var d=null,e=this.getToken().then(function(d){return Sf(c.g,{requestUri:a,sessionId:b,idToken:d})}).then(function(a){d=fg(a);return c.vd(a)}).then(function(a){return{user:a,credential:d}});return this.f(e)};
	W.prototype.sendEmailVerification=function(){var a=this;return this.f(this.getToken().then(function(b){return a.g.sendEmailVerification(b)}).then(function(b){if(a.email!=b)return a.reload()}).then(function(){}))};var Si=function(a){for(var b=0;b<a.Z.length;b++)a.Z[b].cancel("app-deleted");a.Z=[];a.oe=!0;M(a,"refreshToken",null);a.m&&a.m.unsubscribe(a)};W.prototype.f=function(a){var b=this;this.Z.push(a);md(a,function(){Ka(b.Z,a)});return a};W.prototype.toJSON=function(){return this.C()};
	W.prototype.C=function(){var a={uid:this.uid,displayName:this.displayName,photoURL:this.photoURL,email:this.email,emailVerified:this.emailVerified,isAnonymous:this.isAnonymous,providerData:[],apiKey:this.j,appName:this.B,authDomain:this.v,stsTokenManager:this.ea.C(),redirectEventId:this.mc||null};Ca(this.providerData,function(b){a.providerData.push(Df(b))});return a};
	var $i=function(a){if(!a.apiKey)return null;var b={apiKey:a.apiKey,authDomain:a.authDomain,appName:a.appName},c={};if(a.stsTokenManager&&a.stsTokenManager.accessToken&&a.stsTokenManager.expirationTime)c.idToken=a.stsTokenManager.accessToken,c.refreshToken=a.stsTokenManager.refreshToken||null,c.expiresIn=(a.stsTokenManager.expirationTime-ka())/1E3;else return null;var d=new W(b,c,a);a.providerData&&Ca(a.providerData,function(a){if(a){var b={};Cf(b,a);Oi(d,b)}});a.redirectEventId&&(d.mc=a.redirectEventId);
	return d},aj=function(a,b,c){var d=new W(a,b);c&&(d.Ia=c);return d.reload().then(function(){return d})};var bj=function(a){this.u=a;this.i=Ph()},Yi={name:"redirectUser",I:!1},Zi=function(a){return a.i.remove(Yi,a.u)},cj=function(a,b){return a.i.get(Yi,a.u).then(function(a){a&&b&&(a.authDomain=b);return $i(a||{})})};var dj=function(a){this.u=a;this.i=Ph()},ej={name:"authUser",I:!0},fj=function(a,b){return a.i.set(ej,b.C(),a.u)},gj=function(a){return a.i.remove(ej,a.u)},hj=function(a,b){return a.i.get(ej,a.u).then(function(a){a&&b&&(a.authDomain=b);return $i(a||{})})};var Y=function(a){this.Sa=!1;M(this,"app",a);if(X(this).options&&X(this).options.apiKey)a=firebase.SDK_VERSION?of(firebase.SDK_VERSION):null,this.g=new R(X(this).options&&X(this).options.apiKey,null,a);else throw new N("invalid-api-key");this.Z=[];this.Qa=[];this.Ue=firebase.INTERNAL.createSubscribe(r(this.Ge,this));ij(this,null);this.oa=new dj(X(this).options.apiKey+":"+X(this).name);this.fb=new bj(X(this).options.apiKey+":"+X(this).name);this.Pb=this.f(jj(this));this.ua=this.f(kj(this));this.Qc=
	!1;this.Kc=r(this.jf,this);this.Zd=r(this.Xa,this);this.$d=r(this.Ce,this);this.Yd=r(this.Be,this);lj(this);this.INTERNAL={};this.INTERNAL["delete"]=r(this["delete"],this)};Y.prototype.toJSON=function(){return{apiKey:X(this).options.apiKey,authDomain:X(this).options.authDomain,appName:X(this).name,currentUser:Z(this)&&Z(this).C()}};
	var mj=function(a){return a.pe||D(new N("auth-domain-config-required"))},lj=function(a){var b=X(a).options.authDomain,c=X(a).options.apiKey;b&&rf()&&(a.pe=a.Pb.then(function(){if(!a.Sa)return a.m=ti(b,c,X(a).name),a.m.subscribe(a),Z(a)&&Ji(Z(a)),a.ad&&(Ji(a.ad),a.ad=null),a.m}))};h=Y.prototype;h.od=function(a,b){switch(a){case "unknown":case "signInViaRedirect":return!0;case "signInViaPopup":return this.la==b&&!!this.ca;default:return!1}};
	h.Ka=function(a,b,c,d){"signInViaPopup"==a&&this.la==d&&(c&&this.Ga?this.Ga(c):b&&!c&&this.ca&&this.ca(b),this.J&&(this.J.cancel(),this.J=null),delete this.ca,delete this.Ga)};h.qb=function(a,b){return"signInViaRedirect"==a||"signInViaPopup"==a&&this.la==b&&this.ca?r(this.se,this):null};
	h.se=function(a,b){var c=this;a={requestUri:a,sessionId:b};this.J&&(this.J.cancel(),this.J=null);var d=null,e=Qf(c.g,a).then(function(a){d=fg(a);return a});a=c.Pb.then(function(){return e}).then(function(a){return nj(c,a)}).then(function(){return{user:Z(c),credential:d}});return this.f(a)};h.Ub=function(){return qf()};
	h.signInWithPopup=function(a){if(!rf())return D(new N("operation-not-supported-in-this-environment"));var b=this,c=Jf(a.providerId),d=this.Ub(),e=null;(!sf()||mf())&&X(this).options.authDomain&&a.isOAuthProvider&&(e=jh(X(this).options.authDomain,X(this).options.apiKey,X(this).name,"signInViaPopup",a,null,d,firebase.SDK_VERSION||null));var f=ef(e,c&&c.Ab,c&&c.zb),c=mj(this).then(function(b){return b.Bb(f,"signInViaPopup",a,d,!!e)}).then(function(){return new B(function(a,c){b.Ka("signInViaPopup",null,
	new N("cancelled-popup-request"),b.la);b.ca=a;b.Ga=c;b.la=d;b.J=b.m.Ib(b,"signInViaPopup",f,d)})}).then(function(a){f&&df(f);return a}).c(function(a){f&&df(f);throw a;});return this.f(c)};h.signInWithRedirect=function(a){if(!rf())return D(new N("operation-not-supported-in-this-environment"));var b=this,c=mj(this).then(function(){return b.m.Cb("signInViaRedirect",a)});return this.f(c)};
	h.getRedirectResult=function(){if(!rf())return D(new N("operation-not-supported-in-this-environment"));var a=this,b=mj(this).then(function(){return a.m.getRedirectResult()});return this.f(b)};
	var nj=function(a,b){var c={};c.apiKey=X(a).options.apiKey;c.authDomain=X(a).options.authDomain;c.appName=X(a).name;return a.Pb.then(function(){return aj(c,b,a.fb)}).then(function(b){if(Z(a)&&b.uid==Z(a).uid)return Z(a).copy(b),a.Xa(b);ij(a,b);Ji(b);return a.Xa(b)}).then(function(){a.Ea()})},ij=function(a,b){Z(a)&&(Hi(Z(a),a.Zd),dc(Z(a),"tokenChanged",a.$d),dc(Z(a),"userDeleted",a.Yd));b&&(b.pc.push(a.Zd),Vb(b,"tokenChanged",a.$d),Vb(b,"userDeleted",a.Yd));M(a,"currentUser",b)};
	Y.prototype.signOut=function(){var a=this,b=this.ua.then(function(){if(!Z(a))return C();ij(a,null);return gj(a.oa).then(function(){a.Ea()})});return this.f(b)};
	var oj=function(a){var b=cj(a.fb,X(a).options.authDomain).then(function(b){if(a.ad=b)b.Ia=a.fb;return Zi(a.fb)});return a.f(b)},jj=function(a){var b=X(a).options.authDomain,c=oj(a).then(function(){return hj(a.oa,b)}).then(function(b){return b?(b.Ia=a.fb,b.reload().then(function(){return fj(a.oa,b).then(function(){return b})}).c(function(c){return"auth/network-request-failed"==c.code?b:gj(a.oa)})):null}).then(function(b){ij(a,b||null)});return a.f(c)},kj=function(a){return a.Pb.then(function(){return a.getRedirectResult()}).c(function(){}).then(function(){if(!a.Sa)return a.Kc()}).c(function(){}).then(function(){if(!a.Sa){a.Qc=
	!0;var b=a.oa;b.i.addListener(ej,b.u,a.Kc)}})};Y.prototype.jf=function(){var a=this;return hj(this.oa,X(this).options.authDomain).then(function(b){if(!a.Sa){var c;if(c=Z(a)&&b){c=Z(a).uid;var d=b.uid;c=void 0===c||null===c||""===c||void 0===d||null===d||""===d?!1:c==d}if(c)return Z(a).copy(b),Z(a).getToken();if(Z(a)||b)ij(a,b),b&&(Ji(b),b.Ia=a.fb),a.m&&a.m.subscribe(a),a.Ea()}})};Y.prototype.Xa=function(a){return fj(this.oa,a)};Y.prototype.Ce=function(){this.Ea();this.Xa(Z(this))};
	Y.prototype.Be=function(){this.signOut()};var pj=function(a,b){return a.f(b.then(function(b){return nj(a,b)}).then(function(){return Z(a)}))};h=Y.prototype;h.Ge=function(a){var b=this;this.addAuthTokenListener(function(){a.next(Z(b))})};h.onAuthStateChanged=function(a,b,c){var d=this;this.Qc&&firebase.Promise.resolve().then(function(){q(a)?a(Z(d)):q(a.next)&&a.next(Z(d))});return this.Ue(a,b,c)};
	h.getToken=function(a){var b=this,c=this.ua.then(function(){return Z(b)?Z(b).getToken(a).then(function(a){return{accessToken:a}}):null});return this.f(c)};h.signInWithCustomToken=function(a){var b=this;return this.ua.then(function(){return pj(b,Q(b.g,Tg,{token:a}))}).then(function(a){Pi(a,"isAnonymous",!1);return b.Xa(a)}).then(function(){return Z(b)})};h.signInWithEmailAndPassword=function(a,b){var c=this;return this.ua.then(function(){return pj(c,Q(c.g,cg,{email:a,password:b}))})};
	h.createUserWithEmailAndPassword=function(a,b){var c=this;return this.ua.then(function(){return pj(c,Q(c.g,Qg,{email:a,password:b}))})};h.signInWithCredential=function(a){var b=this;return this.ua.then(function(){return pj(b,a.Vb(b.g))})};h.signInAnonymously=function(){var a=Z(this),b=this;return a&&a.isAnonymous?C(a):this.ua.then(function(){return pj(b,b.g.signInAnonymously())}).then(function(a){Pi(a,"isAnonymous",!0);return b.Xa(a)}).then(function(){return Z(b)})};
	var X=function(a){return a.app},Z=function(a){return a.currentUser};h=Y.prototype;h.Ea=function(){if(this.Qc)for(var a=0;a<this.Qa.length;a++)if(this.Qa[a])this.Qa[a](Z(this)&&Z(this)._lat||null)};h.addAuthTokenListener=function(a){var b=this;this.Qa.push(a);this.f(this.ua.then(function(){b.Sa||Ia(b.Qa,a)&&a(Z(b)&&Z(b)._lat||null)}))};h.removeAuthTokenListener=function(a){La(this.Qa,function(b){return b==a})};
	h["delete"]=function(){this.Sa=!0;for(var a=0;a<this.Z.length;a++)this.Z[a].cancel("app-deleted");this.Z=[];this.oa&&(a=this.oa,a.i.removeListener(ej,a.u,this.Kc));this.m&&this.m.unsubscribe(this);return firebase.Promise.resolve()};h.f=function(a){var b=this;this.Z.push(a);md(a,function(){Ka(b.Z,a)});return a};h.fetchProvidersForEmail=function(a){return this.f(xg(this.g,a))};h.verifyPasswordResetCode=function(a){return this.checkActionCode(a).then(function(a){return a.data.email})};
	h.confirmPasswordReset=function(a,b){return this.f(this.g.confirmPasswordReset(a,b).then(function(){}))};h.checkActionCode=function(a){return this.f(this.g.checkActionCode(a).then(function(a){return new Dh(a)}))};h.applyActionCode=function(a){return this.f(this.g.applyActionCode(a).then(function(){}))};h.sendPasswordResetEmail=function(a){return this.f(this.g.sendPasswordResetEmail(a).then(function(){}))};T(Y.prototype,{applyActionCode:{name:"applyActionCode",a:[S("code")]},checkActionCode:{name:"checkActionCode",a:[S("code")]},confirmPasswordReset:{name:"confirmPasswordReset",a:[S("code"),S("newPassword")]},createUserWithEmailAndPassword:{name:"createUserWithEmailAndPassword",a:[S("email"),S("password")]},fetchProvidersForEmail:{name:"fetchProvidersForEmail",a:[S("email")]},getRedirectResult:{name:"getRedirectResult",a:[]},onAuthStateChanged:{name:"onAuthStateChanged",a:[Kh(Fh(),Gh(),"nextOrObserver"),
	Gh("opt_error",!0),Gh("opt_completed",!0)]},sendPasswordResetEmail:{name:"sendPasswordResetEmail",a:[S("email")]},signInAnonymously:{name:"signInAnonymously",a:[]},signInWithCredential:{name:"signInWithCredential",a:[Ih()]},signInWithCustomToken:{name:"signInWithCustomToken",a:[S("token")]},signInWithEmailAndPassword:{name:"signInWithEmailAndPassword",a:[S("email"),S("password")]},signInWithPopup:{name:"signInWithPopup",a:[Jh()]},signInWithRedirect:{name:"signInWithRedirect",a:[Jh()]},signOut:{name:"signOut",
	a:[]},toJSON:{name:"toJSON",a:[S(null,!0)]},verifyPasswordResetCode:{name:"verifyPasswordResetCode",a:[S("code")]}});
	T(W.prototype,{"delete":{name:"delete",a:[]},getToken:{name:"getToken",a:[{name:"opt_forceRefresh",fa:"a boolean",optional:!0,ha:function(a){return"boolean"==typeof a}}]},link:{name:"link",a:[Ih()]},linkWithPopup:{name:"linkWithPopup",a:[Jh()]},linkWithRedirect:{name:"linkWithRedirect",a:[Jh()]},reauthenticate:{name:"reauthenticate",a:[Ih()]},reload:{name:"reload",a:[]},sendEmailVerification:{name:"sendEmailVerification",a:[]},toJSON:{name:"toJSON",a:[S(null,!0)]},unlink:{name:"unlink",a:[S("provider")]},
	updateEmail:{name:"updateEmail",a:[S("email")]},updatePassword:{name:"updatePassword",a:[S("password")]},updateProfile:{name:"updateProfile",a:[Fh("profile")]}});T(B.prototype,{c:{name:"catch"},then:{name:"then"}});U(eg,"credential",function(a,b){return new bg(a,b)},[S("email"),S("password")]);T(Uf.prototype,{addScope:{name:"addScope",a:[S("scope")]},setCustomParameters:{name:"setCustomParameters",a:[Fh("customOAuthParameters")]}});U(Uf,"credential",Vf,[Kh(S(),Fh(),"token")]);
	T(Wf.prototype,{addScope:{name:"addScope",a:[S("scope")]},setCustomParameters:{name:"setCustomParameters",a:[Fh("customOAuthParameters")]}});U(Wf,"credential",Xf,[Kh(S(),Fh(),"token")]);T(Yf.prototype,{addScope:{name:"addScope",a:[S("scope")]},setCustomParameters:{name:"setCustomParameters",a:[Fh("customOAuthParameters")]}});U(Yf,"credential",Zf,[Kh(S(),Hh(),"idToken",!0),Kh(S(),Hh(),"accessToken",!0)]);T($f.prototype,{setCustomParameters:{name:"setCustomParameters",a:[Fh("customOAuthParameters")]}});
	U($f,"credential",ag,[Kh(S(),Fh(),"token"),S("secret",!0)]);T(N.prototype,{toJSON:{name:"toJSON",a:[S(null,!0)]}});T(hg.prototype,{toJSON:{name:"toJSON",a:[S(null,!0)]}});T(Nf.prototype,{toJSON:{name:"toJSON",a:[S(null,!0)]}});
	(function(){if("undefined"!==typeof firebase&&firebase.INTERNAL&&firebase.INTERNAL.registerService){var a={Auth:Y,Error:N};U(a,"EmailAuthProvider",eg,[]);U(a,"FacebookAuthProvider",Uf,[]);U(a,"GithubAuthProvider",Wf,[]);U(a,"GoogleAuthProvider",Yf,[]);U(a,"TwitterAuthProvider",$f,[]);firebase.INTERNAL.registerService("auth",function(a,c){a=new Y(a);c({INTERNAL:{getToken:r(a.getToken,a),addAuthTokenListener:r(a.addAuthTokenListener,a),removeAuthTokenListener:r(a.removeAuthTokenListener,a)}});return a},
	a,function(a,c){if("create"===a)try{c.auth()}catch(d){}});firebase.INTERNAL.extendNamespace({User:W})}else throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");})();}).call(this);
	}).call(typeof global !== undefined ? global : typeof self !== undefined ? self : typeof window !== undefined ? window : {});
	module.exports = firebase.auth;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var firebase = __webpack_require__(3);
	(function(){
	/*! @license Firebase v3.6.10
	    Build: 3.6.10-rc.1
	    Terms: https://firebase.google.com/terms/

	    ---

	    typedarray.js
	    Copyright (c) 2010, Linden Research, Inc.

	    Permission is hereby granted, free of charge, to any person obtaining a copy
	    of this software and associated documentation files (the "Software"), to deal
	    in the Software without restriction, including without limitation the rights
	    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	    copies of the Software, and to permit persons to whom the Software is
	    furnished to do so, subject to the following conditions:

	    The above copyright notice and this permission notice shall be included in
	    all copies or substantial portions of the Software.

	    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	    THE SOFTWARE. */
	(function() {var g,aa=this;function n(a){return void 0!==a}function ba(){}function ca(a){a.Vb=function(){return a.Ye?a.Ye:a.Ye=new a}}
	function da(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
	else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function ea(a){return"array"==da(a)}function fa(a){var b=da(a);return"array"==b||"object"==b&&"number"==typeof a.length}function p(a){return"string"==typeof a}function ga(a){return"number"==typeof a}function ha(a){return"function"==da(a)}function ia(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}function ja(a,b,c){return a.call.apply(a.bind,arguments)}
	function ka(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function q(a,b,c){q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?ja:ka;return q.apply(null,arguments)}
	function la(a,b){function c(){}c.prototype=b.prototype;a.wg=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.sg=function(a,c,f){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return b.prototype[c].apply(a,h)}};function ma(){this.Wa=-1};function na(){this.Wa=-1;this.Wa=64;this.M=[];this.Vd=[];this.Af=[];this.zd=[];this.zd[0]=128;for(var a=1;a<this.Wa;++a)this.zd[a]=0;this.Pd=this.$b=0;this.reset()}la(na,ma);na.prototype.reset=function(){this.M[0]=1732584193;this.M[1]=4023233417;this.M[2]=2562383102;this.M[3]=271733878;this.M[4]=3285377520;this.Pd=this.$b=0};
	function oa(a,b,c){c||(c=0);var d=a.Af;if(p(b))for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.M[0];c=a.M[1];for(var h=a.M[2],k=a.M[3],l=a.M[4],m,e=0;80>e;e++)40>e?20>e?(f=k^c&(h^k),m=1518500249):(f=c^h^k,m=1859775393):60>e?(f=c&h|k&(c|h),m=2400959708):(f=c^h^k,m=3395469782),f=(b<<
	5|b>>>27)+f+l+m+d[e]&4294967295,l=k,k=h,h=(c<<30|c>>>2)&4294967295,c=b,b=f;a.M[0]=a.M[0]+b&4294967295;a.M[1]=a.M[1]+c&4294967295;a.M[2]=a.M[2]+h&4294967295;a.M[3]=a.M[3]+k&4294967295;a.M[4]=a.M[4]+l&4294967295}
	na.prototype.update=function(a,b){if(null!=a){n(b)||(b=a.length);for(var c=b-this.Wa,d=0,e=this.Vd,f=this.$b;d<b;){if(0==f)for(;d<=c;)oa(this,a,d),d+=this.Wa;if(p(a))for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.Wa){oa(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.Wa){oa(this,e);f=0;break}}this.$b=f;this.Pd+=b}};function r(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function pa(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}function qa(a,b){for(var c in a)if(!b.call(void 0,a[c],c,a))return!1;return!0}function ra(a){var b=0,c;for(c in a)b++;return b}function sa(a){for(var b in a)return b}function ta(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function ua(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b}function va(a,b){for(var c in a)if(a[c]==b)return!0;return!1}
	function wa(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d}function xa(a,b){var c=wa(a,b,void 0);return c&&a[c]}function ya(a){for(var b in a)return!1;return!0}function za(a){var b={},c;for(c in a)b[c]=a[c];return b};function Aa(a){a=String(a);if(/^\s*$/.test(a)?0:/^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g,"")))try{return eval("("+a+")")}catch(b){}throw Error("Invalid JSON string: "+a);}function Ba(){this.Fd=void 0}
	function Ca(a,b,c){switch(typeof b){case "string":Da(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(ea(b)){var d=b.length;c.push("[");for(var e="",f=0;f<d;f++)c.push(e),e=b[f],Ca(a,a.Fd?a.Fd.call(b,String(f),e):e,c),e=",";c.push("]");break}c.push("{");d="";for(f in b)Object.prototype.hasOwnProperty.call(b,f)&&(e=b[f],"function"!=typeof e&&(c.push(d),Da(f,c),
	c.push(":"),Ca(a,a.Fd?a.Fd.call(b,f,e):e,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}}var Ea={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Fa=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g;
	function Da(a,b){b.push('"',a.replace(Fa,function(a){if(a in Ea)return Ea[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Ea[a]=e+b.toString(16)}),'"')};var t;a:{var Ga=aa.navigator;if(Ga){var Ha=Ga.userAgent;if(Ha){t=Ha;break a}}t=""};var v=Array.prototype,Ia=v.indexOf?function(a,b,c){return v.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},Ja=v.forEach?function(a,b,c){v.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Ka=v.filter?function(a,b,c){return v.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,h=p(a)?
	a.split(""):a,k=0;k<d;k++)if(k in h){var l=h[k];b.call(c,l,k,a)&&(e[f++]=l)}return e},La=v.map?function(a,b,c){return v.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=p(a)?a.split(""):a,h=0;h<d;h++)h in f&&(e[h]=b.call(c,f[h],h,a));return e},Ma=v.reduce?function(a,b,c,d){for(var e=[],f=1,h=arguments.length;f<h;f++)e.push(arguments[f]);d&&(e[0]=q(b,d));return v.reduce.apply(a,e)}:function(a,b,c,d){var e=c;Ja(a,function(c,h){e=b.call(d,e,c,h,a)});return e},Na=v.every?function(a,b,
	c){return v.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};function Oa(a,b){var c=Pa(a,b,void 0);return 0>c?null:p(a)?a.charAt(c):a[c]}function Pa(a,b,c){for(var d=a.length,e=p(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1}function Qa(a,b){var c=Ia(a,b);0<=c&&v.splice.call(a,c,1)}function Ra(a,b,c){return 2>=arguments.length?v.slice.call(a,b):v.slice.call(a,b,c)}
	function Sa(a,b){a.sort(b||Ta)}function Ta(a,b){return a>b?1:a<b?-1:0};var Ua=-1!=t.indexOf("Opera")||-1!=t.indexOf("OPR"),Va=-1!=t.indexOf("Trident")||-1!=t.indexOf("MSIE"),Wa=-1!=t.indexOf("Gecko")&&-1==t.toLowerCase().indexOf("webkit")&&!(-1!=t.indexOf("Trident")||-1!=t.indexOf("MSIE")),Xa=-1!=t.toLowerCase().indexOf("webkit");
	(function(){var a="",b;if(Ua&&aa.opera)return a=aa.opera.version,ha(a)?a():a;Wa?b=/rv\:([^\);]+)(\)|;)/:Va?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:Xa&&(b=/WebKit\/(\S+)/);b&&(a=(a=b.exec(t))?a[1]:"");return Va&&(b=(b=aa.document)?b.documentMode:void 0,b>parseFloat(a))?String(b):a})();var Ya=null,Za=null,$a=null;function ab(a,b){if(!fa(a))throw Error("encodeByteArray takes an array as a parameter");bb();for(var c=b?Za:Ya,d=[],e=0;e<a.length;e+=3){var f=a[e],h=e+1<a.length,k=h?a[e+1]:0,l=e+2<a.length,m=l?a[e+2]:0,u=f>>2,f=(f&3)<<4|k>>4,k=(k&15)<<2|m>>6,m=m&63;l||(m=64,h||(k=64));d.push(c[u],c[f],c[k],c[m])}return d.join("")}
	function bb(){if(!Ya){Ya={};Za={};$a={};for(var a=0;65>a;a++)Ya[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a),Za[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a),$a[Za[a]]=a,62<=a&&($a["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)]=a)}};function cb(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function w(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b]}function db(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])};function x(a,b,c,d){var e;d<b?e="at least "+b:d>c&&(e=0===c?"none":"no more than "+c);if(e)throw Error(a+" failed: Was called with "+d+(1===d?" argument.":" arguments.")+" Expects "+e+".");}function y(a,b,c){var d="";switch(b){case 1:d=c?"first":"First";break;case 2:d=c?"second":"Second";break;case 3:d=c?"third":"Third";break;case 4:d=c?"fourth":"Fourth";break;default:throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");}return a=a+" failed: "+(d+" argument ")}
	function A(a,b,c,d){if((!d||n(c))&&!ha(c))throw Error(y(a,b,d)+"must be a valid function.");}function eb(a,b,c){if(n(c)&&(!ia(c)||null===c))throw Error(y(a,b,!0)+"must be a valid context object.");};function fb(a){var b=[];db(a,function(a,d){ea(d)?Ja(d,function(d){b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))}):b.push(encodeURIComponent(a)+"="+encodeURIComponent(d))});return b.length?"&"+b.join("&"):""};var gb=firebase.Promise;function hb(){var a=this;this.reject=this.resolve=null;this.ra=new gb(function(b,c){a.resolve=b;a.reject=c})}function ib(a,b){return function(c,d){c?a.reject(c):a.resolve(d);ha(b)&&(jb(a.ra),1===b.length?b(c):b(c,d))}}function jb(a){a.then(void 0,ba)};function kb(a,b){if(!a)throw lb(b);}function lb(a){return Error("Firebase Database ("+firebase.SDK_VERSION+") INTERNAL ASSERT FAILED: "+a)};function mb(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);55296<=e&&56319>=e&&(e-=55296,d++,kb(d<a.length,"Surrogate pair missing trail surrogate."),e=65536+(e<<10)+(a.charCodeAt(d)-56320));128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(65536>e?b[c++]=e>>12|224:(b[c++]=e>>18|240,b[c++]=e>>12&63|128),b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b}function nb(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b++:2048>d?b+=2:55296<=d&&56319>=d?(b+=4,c++):b+=3}return b};function ob(a){return"undefined"!==typeof JSON&&n(JSON.parse)?JSON.parse(a):Aa(a)}function B(a){if("undefined"!==typeof JSON&&n(JSON.stringify))a=JSON.stringify(a);else{var b=[];Ca(new Ba,a,b);a=b.join("")}return a};function pb(a,b){this.committed=a;this.snapshot=b};function qb(){return"undefined"!==typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined"!==typeof navigator&&"string"===typeof navigator.userAgent?navigator.userAgent:"")};function rb(a){this.re=a;this.Bd=[];this.Qb=0;this.Xd=-1;this.Fb=null}function sb(a,b,c){a.Xd=b;a.Fb=c;a.Xd<a.Qb&&(a.Fb(),a.Fb=null)}function tb(a,b,c){for(a.Bd[b]=c;a.Bd[a.Qb];){var d=a.Bd[a.Qb];delete a.Bd[a.Qb];for(var e=0;e<d.length;++e)if(d[e]){var f=a;ub(function(){f.re(d[e])})}if(a.Qb===a.Xd){a.Fb&&(clearTimeout(a.Fb),a.Fb(),a.Fb=null);break}a.Qb++}};function vb(){this.pc={}}vb.prototype.set=function(a,b){null==b?delete this.pc[a]:this.pc[a]=b};vb.prototype.get=function(a){return cb(this.pc,a)?this.pc[a]:null};vb.prototype.remove=function(a){delete this.pc[a]};vb.prototype.Ze=!0;function wb(a){this.uc=a;this.Cd="firebase:"}g=wb.prototype;g.set=function(a,b){null==b?this.uc.removeItem(this.Cd+a):this.uc.setItem(this.Cd+a,B(b))};g.get=function(a){a=this.uc.getItem(this.Cd+a);return null==a?null:ob(a)};g.remove=function(a){this.uc.removeItem(this.Cd+a)};g.Ze=!1;g.toString=function(){return this.uc.toString()};function xb(a){try{if("undefined"!==typeof window&&"undefined"!==typeof window[a]){var b=window[a];b.setItem("firebase:sentinel","cache");b.removeItem("firebase:sentinel");return new wb(b)}}catch(c){}return new vb}var yb=xb("localStorage"),zb=xb("sessionStorage");function Ab(a,b,c){this.type=Bb;this.source=a;this.path=b;this.Ga=c}Ab.prototype.Mc=function(a){return this.path.e()?new Ab(this.source,C,this.Ga.Q(a)):new Ab(this.source,D(this.path),this.Ga)};Ab.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" overwrite: "+this.Ga.toString()+")"};function Cb(a,b){this.type=Db;this.source=a;this.path=b}Cb.prototype.Mc=function(){return this.path.e()?new Cb(this.source,C):new Cb(this.source,D(this.path))};Cb.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" listen_complete)"};function Eb(a){this.oc=a}Eb.prototype.getToken=function(a){return this.oc.INTERNAL.getToken(a).then(null,function(a){return a&&"auth/token-not-initialized"===a.code?(E("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(a)})};function Fb(a,b){a.oc.INTERNAL.addAuthTokenListener(b)};function Gb(){this.Jd=G}Gb.prototype.j=function(a){return this.Jd.P(a)};Gb.prototype.toString=function(){return this.Jd.toString()};function Hb(a,b,c,d,e){this.host=a.toLowerCase();this.domain=this.host.substr(this.host.indexOf(".")+1);this.Sc=b;this.ne=c;this.qg=d;this.gf=e||"";this.$a=yb.get("host:"+a)||this.host}function Ib(a,b){b!==a.$a&&(a.$a=b,"s-"===a.$a.substr(0,2)&&yb.set("host:"+a.host,a.$a))}
	function Jb(a,b,c){H("string"===typeof b,"typeof type must == string");H("object"===typeof c,"typeof params must == object");if("websocket"===b)b=(a.Sc?"wss://":"ws://")+a.$a+"/.ws?";else if("long_polling"===b)b=(a.Sc?"https://":"http://")+a.$a+"/.lp?";else throw Error("Unknown connection type: "+b);a.host!==a.$a&&(c.ns=a.ne);var d=[];r(c,function(a,b){d.push(b+"="+a)});return b+d.join("&")}
	Hb.prototype.toString=function(){var a=(this.Sc?"https://":"http://")+this.host;this.gf&&(a+="<"+this.gf+">");return a};function Kb(){this.tc={}}function Lb(a,b,c){n(c)||(c=1);cb(a.tc,b)||(a.tc[b]=0);a.tc[b]+=c}Kb.prototype.get=function(){return za(this.tc)};function Mb(a){this.Ef=a;this.rd=null}Mb.prototype.get=function(){var a=this.Ef.get(),b=za(a);if(this.rd)for(var c in this.rd)b[c]-=this.rd[c];this.rd=a;return b};function Nb(){this.vb=[]}function Ob(a,b){for(var c=null,d=0;d<b.length;d++){var e=b[d],f=e.Yb();null===c||f.Z(c.Yb())||(a.vb.push(c),c=null);null===c&&(c=new Pb(f));c.add(e)}c&&a.vb.push(c)}function Qb(a,b,c){Ob(a,c);Rb(a,function(a){return a.Z(b)})}function Sb(a,b,c){Ob(a,c);Rb(a,function(a){return a.contains(b)||b.contains(a)})}
	function Rb(a,b){for(var c=!0,d=0;d<a.vb.length;d++){var e=a.vb[d];if(e)if(e=e.Yb(),b(e)){for(var e=a.vb[d],f=0;f<e.jd.length;f++){var h=e.jd[f];if(null!==h){e.jd[f]=null;var k=h.Tb();Tb&&E("event: "+h.toString());ub(k)}}a.vb[d]=null}else c=!1}c&&(a.vb=[])}function Pb(a){this.qa=a;this.jd=[]}Pb.prototype.add=function(a){this.jd.push(a)};Pb.prototype.Yb=function(){return this.qa};function Ub(a,b,c,d){this.$d=b;this.Md=c;this.Dd=d;this.hd=a}Ub.prototype.Yb=function(){var a=this.Md.wb();return"value"===this.hd?a.path:a.getParent().path};Ub.prototype.ee=function(){return this.hd};Ub.prototype.Tb=function(){return this.$d.Tb(this)};Ub.prototype.toString=function(){return this.Yb().toString()+":"+this.hd+":"+B(this.Md.Qe())};function Vb(a,b,c){this.$d=a;this.error=b;this.path=c}Vb.prototype.Yb=function(){return this.path};Vb.prototype.ee=function(){return"cancel"};
	Vb.prototype.Tb=function(){return this.$d.Tb(this)};Vb.prototype.toString=function(){return this.path.toString()+":cancel"};function Wb(){}Wb.prototype.Te=function(){return null};Wb.prototype.de=function(){return null};var Xb=new Wb;function Yb(a,b,c){this.xf=a;this.Ka=b;this.yd=c}Yb.prototype.Te=function(a){var b=this.Ka.N;if(Zb(b,a))return b.j().Q(a);b=null!=this.yd?new $b(this.yd,!0,!1):this.Ka.w();return this.xf.qc(a,b)};Yb.prototype.de=function(a,b,c){var d=null!=this.yd?this.yd:ac(this.Ka);a=this.xf.Wd(d,b,1,c,a);return 0===a.length?null:a[0]};function I(a,b,c,d){this.type=a;this.Ja=b;this.Xa=c;this.oe=d;this.Dd=void 0}function bc(a){return new I(cc,a)}var cc="value";function $b(a,b,c){this.A=a;this.da=b;this.Sb=c}function dc(a){return a.da}function ec(a){return a.Sb}function fc(a,b){return b.e()?a.da&&!a.Sb:Zb(a,J(b))}function Zb(a,b){return a.da&&!a.Sb||a.A.Da(b)}$b.prototype.j=function(){return this.A};function gc(a,b){return hc(a.name,b.name)}function ic(a,b){return hc(a,b)};function K(a,b){this.name=a;this.R=b}function jc(a,b){return new K(a,b)};function kc(a,b){return a&&"object"===typeof a?(H(".sv"in a,"Unexpected leaf node or priority contents"),b[a[".sv"]]):a}function lc(a,b){var c=new mc;nc(a,new L(""),function(a,e){oc(c,a,pc(e,b))});return c}function pc(a,b){var c=a.C().H(),c=kc(c,b),d;if(a.J()){var e=kc(a.Ca(),b);return e!==a.Ca()||c!==a.C().H()?new qc(e,M(c)):a}d=a;c!==a.C().H()&&(d=d.fa(new qc(c)));a.O(N,function(a,c){var e=pc(c,b);e!==c&&(d=d.T(a,e))});return d};var rc=function(){var a=1;return function(){return a++}}(),H=kb,sc=lb;
	function tc(a){try{var b;bb();for(var c=$a,d=[],e=0;e<a.length;){var f=c[a.charAt(e++)],h=e<a.length?c[a.charAt(e)]:0;++e;var k=e<a.length?c[a.charAt(e)]:64;++e;var l=e<a.length?c[a.charAt(e)]:64;++e;if(null==f||null==h||null==k||null==l)throw Error();d.push(f<<2|h>>4);64!=k&&(d.push(h<<4&240|k>>2),64!=l&&d.push(k<<6&192|l))}if(8192>d.length)b=String.fromCharCode.apply(null,d);else{a="";for(c=0;c<d.length;c+=8192)a+=String.fromCharCode.apply(null,Ra(d,c,c+8192));b=a}return b}catch(m){E("base64Decode failed: ",
	m)}return null}function uc(a){var b=mb(a);a=new na;a.update(b);var b=[],c=8*a.Pd;56>a.$b?a.update(a.zd,56-a.$b):a.update(a.zd,a.Wa-(a.$b-56));for(var d=a.Wa-1;56<=d;d--)a.Vd[d]=c&255,c/=256;oa(a,a.Vd);for(d=c=0;5>d;d++)for(var e=24;0<=e;e-=8)b[c]=a.M[d]>>e&255,++c;return ab(b)}function vc(a){for(var b="",c=0;c<arguments.length;c++)b=fa(arguments[c])?b+vc.apply(null,arguments[c]):"object"===typeof arguments[c]?b+B(arguments[c]):b+arguments[c],b+=" ";return b}var Tb=null,wc=!0;
	function xc(a,b){kb(!b||!0===a||!1===a,"Can't turn on custom loggers persistently.");!0===a?("undefined"!==typeof console&&("function"===typeof console.log?Tb=q(console.log,console):"object"===typeof console.log&&(Tb=function(a){console.log(a)})),b&&zb.set("logging_enabled",!0)):ha(a)?Tb=a:(Tb=null,zb.remove("logging_enabled"))}function E(a){!0===wc&&(wc=!1,null===Tb&&!0===zb.get("logging_enabled")&&xc(!0));if(Tb){var b=vc.apply(null,arguments);Tb(b)}}
	function yc(a){return function(){E(a,arguments)}}function zc(a){if("undefined"!==typeof console){var b="FIREBASE INTERNAL ERROR: "+vc.apply(null,arguments);"undefined"!==typeof console.error?console.error(b):console.log(b)}}function Ac(a){var b=vc.apply(null,arguments);throw Error("FIREBASE FATAL ERROR: "+b);}function O(a){if("undefined"!==typeof console){var b="FIREBASE WARNING: "+vc.apply(null,arguments);"undefined"!==typeof console.warn?console.warn(b):console.log(b)}}
	function Bc(a){var b,c,d,e,f,h=a;f=c=a=b="";d=!0;e="https";if(p(h)){var k=h.indexOf("//");0<=k&&(e=h.substring(0,k-1),h=h.substring(k+2));k=h.indexOf("/");-1===k&&(k=h.length);b=h.substring(0,k);f="";h=h.substring(k).split("/");for(k=0;k<h.length;k++)if(0<h[k].length){var l=h[k];try{l=decodeURIComponent(l.replace(/\+/g," "))}catch(m){}f+="/"+l}h=b.split(".");3===h.length?(a=h[1],c=h[0].toLowerCase()):2===h.length&&(a=h[0]);k=b.indexOf(":");0<=k&&(d="https"===e||"wss"===e)}"firebase"===a&&Ac(b+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
	c&&"undefined"!=c||Ac("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");d||"undefined"!==typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&O("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");return{jc:new Hb(b,d,c,"ws"===e||"wss"===e),path:new L(f)}}function Cc(a){return ga(a)&&(a!=a||a==Number.POSITIVE_INFINITY||a==Number.NEGATIVE_INFINITY)}
	function Dc(a){if("complete"===document.readyState)a();else{var b=!1,c=function(){document.body?b||(b=!0,a()):setTimeout(c,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&c()}),window.attachEvent("onload",c))}}
	function hc(a,b){if(a===b)return 0;if("[MIN_NAME]"===a||"[MAX_NAME]"===b)return-1;if("[MIN_NAME]"===b||"[MAX_NAME]"===a)return 1;var c=Ec(a),d=Ec(b);return null!==c?null!==d?0==c-d?a.length-b.length:c-d:-1:null!==d?1:a<b?-1:1}function Fc(a,b){if(b&&a in b)return b[a];throw Error("Missing required key ("+a+") in object: "+B(b));}
	function Gc(a){if("object"!==typeof a||null===a)return B(a);var b=[],c;for(c in a)b.push(c);b.sort();c="{";for(var d=0;d<b.length;d++)0!==d&&(c+=","),c+=B(b[d]),c+=":",c+=Gc(a[b[d]]);return c+"}"}function Hc(a,b){if(a.length<=b)return[a];for(var c=[],d=0;d<a.length;d+=b)d+b>a?c.push(a.substring(d,a.length)):c.push(a.substring(d,d+b));return c}function Ic(a,b){if(ea(a))for(var c=0;c<a.length;++c)b(c,a[c]);else r(a,b)}
	function Jc(a){H(!Cc(a),"Invalid JSON number");var b,c,d,e;0===a?(d=c=0,b=-Infinity===1/a?1:0):(b=0>a,a=Math.abs(a),a>=Math.pow(2,-1022)?(d=Math.min(Math.floor(Math.log(a)/Math.LN2),1023),c=d+1023,d=Math.round(a*Math.pow(2,52-d)-Math.pow(2,52))):(c=0,d=Math.round(a/Math.pow(2,-1074))));e=[];for(a=52;a;--a)e.push(d%2?1:0),d=Math.floor(d/2);for(a=11;a;--a)e.push(c%2?1:0),c=Math.floor(c/2);e.push(b?1:0);e.reverse();b=e.join("");c="";for(a=0;64>a;a+=8)d=parseInt(b.substr(a,8),2).toString(16),1===d.length&&
	(d="0"+d),c+=d;return c.toLowerCase()}var Kc=/^-?\d{1,10}$/;function Ec(a){return Kc.test(a)&&(a=Number(a),-2147483648<=a&&2147483647>=a)?a:null}function ub(a){try{a()}catch(b){setTimeout(function(){O("Exception was thrown by user callback.",b.stack||"");throw b;},Math.floor(0))}}function Lc(a,b,c){Object.defineProperty(a,b,{get:c})}function Mc(a,b){var c=setTimeout(a,b);"object"===typeof c&&c.unref&&c.unref();return c};function Nc(a){var b={},c={},d={},e="";try{var f=a.split("."),b=ob(tc(f[0])||""),c=ob(tc(f[1])||""),e=f[2],d=c.d||{};delete c.d}catch(h){}return{tg:b,Ie:c,data:d,mg:e}}function Oc(a){a=Nc(a);var b=a.Ie;return!!a.mg&&!!b&&"object"===typeof b&&b.hasOwnProperty("iat")}function Pc(a){a=Nc(a).Ie;return"object"===typeof a&&!0===w(a,"admin")};function Qc(a,b,c){this.f=yc("p:rest:");this.L=a;this.Gb=b;this.$c=c;this.$={}}function Rc(a,b){if(n(b))return"tag$"+b;H(Sc(a.m),"should have a tag if it's not a default query.");return a.path.toString()}g=Qc.prototype;
	g.$e=function(a,b,c,d){var e=a.path.toString();this.f("Listen called for "+e+" "+a.ja());var f=Rc(a,c),h={};this.$[f]=h;a=Tc(a.m);var k=this;Uc(this,e+".json",a,function(a,b){var u=b;404===a&&(a=u=null);null===a&&k.Gb(e,u,!1,c);w(k.$,f)===h&&d(a?401==a?"permission_denied":"rest_error:"+a:"ok",null)})};g.uf=function(a,b){var c=Rc(a,b);delete this.$[c]};g.kf=function(){};g.pe=function(){};g.cf=function(){};g.xd=function(){};g.put=function(){};g.af=function(){};g.we=function(){};
	function Uc(a,b,c,d){c=c||{};c.format="export";a.$c.getToken(!1).then(function(e){(e=e&&e.accessToken)&&(c.auth=e);var f=(a.L.Sc?"https://":"http://")+a.L.host+b+"?"+fb(c);a.f("Sending REST request for "+f);var h=new XMLHttpRequest;h.onreadystatechange=function(){if(d&&4===h.readyState){a.f("REST Response for "+f+" received. status:",h.status,"response:",h.responseText);var b=null;if(200<=h.status&&300>h.status){try{b=ob(h.responseText)}catch(c){O("Failed to parse JSON response for "+f+": "+h.responseText)}d(null,
	b)}else 401!==h.status&&404!==h.status&&O("Got unsuccessful REST response for "+f+" Status: "+h.status),d(h.status);d=null}};h.open("GET",f,!0);h.send()})};function Vc(a,b,c){this.type=Wc;this.source=a;this.path=b;this.children=c}Vc.prototype.Mc=function(a){if(this.path.e())return a=this.children.subtree(new L(a)),a.e()?null:a.value?new Ab(this.source,C,a.value):new Vc(this.source,C,a);H(J(this.path)===a,"Can't get a merge for a child not on the path of the operation");return new Vc(this.source,D(this.path),this.children)};Vc.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"};function Xc(a,b){this.rf={};this.Vc=new Mb(a);this.va=b;var c=1E4+2E4*Math.random();Mc(q(this.lf,this),Math.floor(c))}Xc.prototype.lf=function(){var a=this.Vc.get(),b={},c=!1,d;for(d in a)0<a[d]&&cb(this.rf,d)&&(b[d]=a[d],c=!0);c&&this.va.we(b);Mc(q(this.lf,this),Math.floor(6E5*Math.random()))};var Yc={},Zc={};function $c(a){a=a.toString();Yc[a]||(Yc[a]=new Kb);return Yc[a]}function ad(a,b){var c=a.toString();Zc[c]||(Zc[c]=b());return Zc[c]};var bd=null;"undefined"!==typeof MozWebSocket?bd=MozWebSocket:"undefined"!==typeof WebSocket&&(bd=WebSocket);function cd(a,b,c,d){this.Yd=a;this.f=yc(this.Yd);this.frames=this.zc=null;this.pb=this.qb=this.De=0;this.Va=$c(b);a={v:"5"};"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");c&&(a.s=c);d&&(a.ls=d);this.Je=Jb(b,"websocket",a)}var dd;
	cd.prototype.open=function(a,b){this.ib=b;this.Xf=a;this.f("Websocket connecting to "+this.Je);this.wc=!1;yb.set("previous_websocket_failure",!0);try{this.Ia=new bd(this.Je)}catch(c){this.f("Error instantiating WebSocket.");var d=c.message||c.data;d&&this.f(d);this.bb();return}var e=this;this.Ia.onopen=function(){e.f("Websocket connected.");e.wc=!0};this.Ia.onclose=function(){e.f("Websocket connection was disconnected.");e.Ia=null;e.bb()};this.Ia.onmessage=function(a){if(null!==e.Ia)if(a=a.data,e.pb+=
	a.length,Lb(e.Va,"bytes_received",a.length),ed(e),null!==e.frames)fd(e,a);else{a:{H(null===e.frames,"We already have a frame buffer");if(6>=a.length){var b=Number(a);if(!isNaN(b)){e.De=b;e.frames=[];a=null;break a}}e.De=1;e.frames=[]}null!==a&&fd(e,a)}};this.Ia.onerror=function(a){e.f("WebSocket error.  Closing connection.");(a=a.message||a.data)&&e.f(a);e.bb()}};cd.prototype.start=function(){};
	cd.isAvailable=function(){var a=!1;if("undefined"!==typeof navigator&&navigator.userAgent){var b=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);b&&1<b.length&&4.4>parseFloat(b[1])&&(a=!0)}return!a&&null!==bd&&!dd};cd.responsesRequiredToBeHealthy=2;cd.healthyTimeout=3E4;g=cd.prototype;g.sd=function(){yb.remove("previous_websocket_failure")};function fd(a,b){a.frames.push(b);if(a.frames.length==a.De){var c=a.frames.join("");a.frames=null;c=ob(c);a.Xf(c)}}
	g.send=function(a){ed(this);a=B(a);this.qb+=a.length;Lb(this.Va,"bytes_sent",a.length);a=Hc(a,16384);1<a.length&&gd(this,String(a.length));for(var b=0;b<a.length;b++)gd(this,a[b])};g.Tc=function(){this.Ab=!0;this.zc&&(clearInterval(this.zc),this.zc=null);this.Ia&&(this.Ia.close(),this.Ia=null)};g.bb=function(){this.Ab||(this.f("WebSocket is closing itself"),this.Tc(),this.ib&&(this.ib(this.wc),this.ib=null))};g.close=function(){this.Ab||(this.f("WebSocket is being closed"),this.Tc())};
	function ed(a){clearInterval(a.zc);a.zc=setInterval(function(){a.Ia&&gd(a,"0");ed(a)},Math.floor(45E3))}function gd(a,b){try{a.Ia.send(b)}catch(c){a.f("Exception thrown from WebSocket.send():",c.message||c.data,"Closing connection."),setTimeout(q(a.bb,a),0)}};function hd(){this.fb={}}
	function jd(a,b){var c=b.type,d=b.Xa;H("child_added"==c||"child_changed"==c||"child_removed"==c,"Only child changes supported for tracking");H(".priority"!==d,"Only non-priority child changes can be tracked.");var e=w(a.fb,d);if(e){var f=e.type;if("child_added"==c&&"child_removed"==f)a.fb[d]=new I("child_changed",b.Ja,d,e.Ja);else if("child_removed"==c&&"child_added"==f)delete a.fb[d];else if("child_removed"==c&&"child_changed"==f)a.fb[d]=new I("child_removed",e.oe,d);else if("child_changed"==c&&
	"child_added"==f)a.fb[d]=new I("child_added",b.Ja,d);else if("child_changed"==c&&"child_changed"==f)a.fb[d]=new I("child_changed",b.Ja,d,e.oe);else throw sc("Illegal combination of changes: "+b+" occurred after "+e);}else a.fb[d]=b};function kd(a){this.V=a;this.g=a.m.g}function ld(a,b,c,d){var e=[],f=[];Ja(b,function(b){"child_changed"===b.type&&a.g.nd(b.oe,b.Ja)&&f.push(new I("child_moved",b.Ja,b.Xa))});md(a,e,"child_removed",b,d,c);md(a,e,"child_added",b,d,c);md(a,e,"child_moved",f,d,c);md(a,e,"child_changed",b,d,c);md(a,e,cc,b,d,c);return e}function md(a,b,c,d,e,f){d=Ka(d,function(a){return a.type===c});Sa(d,q(a.Ff,a));Ja(d,function(c){var d=nd(a,c,f);Ja(e,function(e){e.nf(c.type)&&b.push(e.createEvent(d,a.V))})})}
	function nd(a,b,c){"value"!==b.type&&"child_removed"!==b.type&&(b.Dd=c.Ve(b.Xa,b.Ja,a.g));return b}kd.prototype.Ff=function(a,b){if(null==a.Xa||null==b.Xa)throw sc("Should only compare child_ events.");return this.g.compare(new K(a.Xa,a.Ja),new K(b.Xa,b.Ja))};function od(a,b){this.Sd=a;this.Df=b}function pd(a){this.U=a}
	pd.prototype.eb=function(a,b,c,d){var e=new hd,f;if(b.type===Bb)b.source.ce?c=qd(this,a,b.path,b.Ga,c,d,e):(H(b.source.Se,"Unknown source."),f=b.source.Ce||ec(a.w())&&!b.path.e(),c=rd(this,a,b.path,b.Ga,c,d,f,e));else if(b.type===Wc)b.source.ce?c=sd(this,a,b.path,b.children,c,d,e):(H(b.source.Se,"Unknown source."),f=b.source.Ce||ec(a.w()),c=td(this,a,b.path,b.children,c,d,f,e));else if(b.type===ud)if(b.Id)if(b=b.path,null!=c.lc(b))c=a;else{f=new Yb(c,a,d);d=a.N.j();if(b.e()||".priority"===J(b))dc(a.w())?
	b=c.Aa(ac(a)):(b=a.w().j(),H(b instanceof P,"serverChildren would be complete if leaf node"),b=c.rc(b)),b=this.U.ya(d,b,e);else{var h=J(b),k=c.qc(h,a.w());null==k&&Zb(a.w(),h)&&(k=d.Q(h));b=null!=k?this.U.F(d,h,k,D(b),f,e):a.N.j().Da(h)?this.U.F(d,h,G,D(b),f,e):d;b.e()&&dc(a.w())&&(d=c.Aa(ac(a)),d.J()&&(b=this.U.ya(b,d,e)))}d=dc(a.w())||null!=c.lc(C);c=vd(a,b,d,this.U.Na())}else c=wd(this,a,b.path,b.Ob,c,d,e);else if(b.type===Db)d=b.path,b=a.w(),f=b.j(),h=b.da||d.e(),c=xd(this,new yd(a.N,new $b(f,
	h,b.Sb)),d,c,Xb,e);else throw sc("Unknown operation type: "+b.type);e=ta(e.fb);d=c;b=d.N;b.da&&(f=b.j().J()||b.j().e(),h=zd(a),(0<e.length||!a.N.da||f&&!b.j().Z(h)||!b.j().C().Z(h.C()))&&e.push(bc(zd(d))));return new od(c,e)};
	function xd(a,b,c,d,e,f){var h=b.N;if(null!=d.lc(c))return b;var k;if(c.e())H(dc(b.w()),"If change path is empty, we must have complete server data"),ec(b.w())?(e=ac(b),d=d.rc(e instanceof P?e:G)):d=d.Aa(ac(b)),f=a.U.ya(b.N.j(),d,f);else{var l=J(c);if(".priority"==l)H(1==Ad(c),"Can't have a priority with additional path components"),f=h.j(),k=b.w().j(),d=d.ad(c,f,k),f=null!=d?a.U.fa(f,d):h.j();else{var m=D(c);Zb(h,l)?(k=b.w().j(),d=d.ad(c,h.j(),k),d=null!=d?h.j().Q(l).F(m,d):h.j().Q(l)):d=d.qc(l,
	b.w());f=null!=d?a.U.F(h.j(),l,d,m,e,f):h.j()}}return vd(b,f,h.da||c.e(),a.U.Na())}function rd(a,b,c,d,e,f,h,k){var l=b.w();h=h?a.U:a.U.Ub();if(c.e())d=h.ya(l.j(),d,null);else if(h.Na()&&!l.Sb)d=l.j().F(c,d),d=h.ya(l.j(),d,null);else{var m=J(c);if(!fc(l,c)&&1<Ad(c))return b;var u=D(c);d=l.j().Q(m).F(u,d);d=".priority"==m?h.fa(l.j(),d):h.F(l.j(),m,d,u,Xb,null)}l=l.da||c.e();b=new yd(b.N,new $b(d,l,h.Na()));return xd(a,b,c,e,new Yb(e,b,f),k)}
	function qd(a,b,c,d,e,f,h){var k=b.N;e=new Yb(e,b,f);if(c.e())h=a.U.ya(b.N.j(),d,h),a=vd(b,h,!0,a.U.Na());else if(f=J(c),".priority"===f)h=a.U.fa(b.N.j(),d),a=vd(b,h,k.da,k.Sb);else{c=D(c);var l=k.j().Q(f);if(!c.e()){var m=e.Te(f);d=null!=m?".priority"===Bd(c)&&m.P(c.parent()).e()?m:m.F(c,d):G}l.Z(d)?a=b:(h=a.U.F(k.j(),f,d,c,e,h),a=vd(b,h,k.da,a.U.Na()))}return a}
	function sd(a,b,c,d,e,f,h){var k=b;Cd(d,function(d,m){var u=c.n(d);Zb(b.N,J(u))&&(k=qd(a,k,u,m,e,f,h))});Cd(d,function(d,m){var u=c.n(d);Zb(b.N,J(u))||(k=qd(a,k,u,m,e,f,h))});return k}function Dd(a,b){Cd(b,function(b,d){a=a.F(b,d)});return a}
	function td(a,b,c,d,e,f,h,k){if(b.w().j().e()&&!dc(b.w()))return b;var l=b;c=c.e()?d:Ed(Q,c,d);var m=b.w().j();c.children.ha(function(c,d){if(m.Da(c)){var F=b.w().j().Q(c),F=Dd(F,d);l=rd(a,l,new L(c),F,e,f,h,k)}});c.children.ha(function(c,d){var F=!Zb(b.w(),c)&&null==d.value;m.Da(c)||F||(F=b.w().j().Q(c),F=Dd(F,d),l=rd(a,l,new L(c),F,e,f,h,k))});return l}
	function wd(a,b,c,d,e,f,h){if(null!=e.lc(c))return b;var k=ec(b.w()),l=b.w();if(null!=d.value){if(c.e()&&l.da||fc(l,c))return rd(a,b,c,l.j().P(c),e,f,k,h);if(c.e()){var m=Q;l.j().O(Fd,function(a,b){m=m.set(new L(a),b)});return td(a,b,c,m,e,f,k,h)}return b}m=Q;Cd(d,function(a){var b=c.n(a);fc(l,b)&&(m=m.set(a,l.j().P(b)))});return td(a,b,c,m,e,f,k,h)};function Gd(a){this.g=a}g=Gd.prototype;g.F=function(a,b,c,d,e,f){H(a.yc(this.g),"A node must be indexed if only a child is updated");e=a.Q(b);if(e.P(d).Z(c.P(d))&&e.e()==c.e())return a;null!=f&&(c.e()?a.Da(b)?jd(f,new I("child_removed",e,b)):H(a.J(),"A child remove without an old child only makes sense on a leaf node"):e.e()?jd(f,new I("child_added",c,b)):jd(f,new I("child_changed",c,b,e)));return a.J()&&c.e()?a:a.T(b,c).nb(this.g)};
	g.ya=function(a,b,c){null!=c&&(a.J()||a.O(N,function(a,e){b.Da(a)||jd(c,new I("child_removed",e,a))}),b.J()||b.O(N,function(b,e){if(a.Da(b)){var f=a.Q(b);f.Z(e)||jd(c,new I("child_changed",e,b,f))}else jd(c,new I("child_added",e,b))}));return b.nb(this.g)};g.fa=function(a,b){return a.e()?G:a.fa(b)};g.Na=function(){return!1};g.Ub=function(){return this};function Hd(a){this.fe=new Gd(a.g);this.g=a.g;var b;a.ka?(b=Id(a),b=a.g.Ec(Jd(a),b)):b=a.g.Hc();this.Uc=b;a.na?(b=Kd(a),a=a.g.Ec(Ld(a),b)):a=a.g.Fc();this.vc=a}g=Hd.prototype;g.matches=function(a){return 0>=this.g.compare(this.Uc,a)&&0>=this.g.compare(a,this.vc)};g.F=function(a,b,c,d,e,f){this.matches(new K(b,c))||(c=G);return this.fe.F(a,b,c,d,e,f)};
	g.ya=function(a,b,c){b.J()&&(b=G);var d=b.nb(this.g),d=d.fa(G),e=this;b.O(N,function(a,b){e.matches(new K(a,b))||(d=d.T(a,G))});return this.fe.ya(a,d,c)};g.fa=function(a){return a};g.Na=function(){return!0};g.Ub=function(){return this.fe};function Md(a){this.sa=new Hd(a);this.g=a.g;H(a.xa,"Only valid if limit has been set");this.oa=a.oa;this.Ib=!Nd(a)}g=Md.prototype;g.F=function(a,b,c,d,e,f){this.sa.matches(new K(b,c))||(c=G);return a.Q(b).Z(c)?a:a.Eb()<this.oa?this.sa.Ub().F(a,b,c,d,e,f):Od(this,a,b,c,e,f)};
	g.ya=function(a,b,c){var d;if(b.J()||b.e())d=G.nb(this.g);else if(2*this.oa<b.Eb()&&b.yc(this.g)){d=G.nb(this.g);b=this.Ib?b.Zb(this.sa.vc,this.g):b.Xb(this.sa.Uc,this.g);for(var e=0;0<b.Pa.length&&e<this.oa;){var f=R(b),h;if(h=this.Ib?0>=this.g.compare(this.sa.Uc,f):0>=this.g.compare(f,this.sa.vc))d=d.T(f.name,f.R),e++;else break}}else{d=b.nb(this.g);d=d.fa(G);var k,l,m;if(this.Ib){b=d.We(this.g);k=this.sa.vc;l=this.sa.Uc;var u=Pd(this.g);m=function(a,b){return u(b,a)}}else b=d.Wb(this.g),k=this.sa.Uc,
	l=this.sa.vc,m=Pd(this.g);for(var e=0,z=!1;0<b.Pa.length;)f=R(b),!z&&0>=m(k,f)&&(z=!0),(h=z&&e<this.oa&&0>=m(f,l))?e++:d=d.T(f.name,G)}return this.sa.Ub().ya(a,d,c)};g.fa=function(a){return a};g.Na=function(){return!0};g.Ub=function(){return this.sa.Ub()};
	function Od(a,b,c,d,e,f){var h;if(a.Ib){var k=Pd(a.g);h=function(a,b){return k(b,a)}}else h=Pd(a.g);H(b.Eb()==a.oa,"");var l=new K(c,d),m=a.Ib?Qd(b,a.g):Rd(b,a.g),u=a.sa.matches(l);if(b.Da(c)){for(var z=b.Q(c),m=e.de(a.g,m,a.Ib);null!=m&&(m.name==c||b.Da(m.name));)m=e.de(a.g,m,a.Ib);e=null==m?1:h(m,l);if(u&&!d.e()&&0<=e)return null!=f&&jd(f,new I("child_changed",d,c,z)),b.T(c,d);null!=f&&jd(f,new I("child_removed",z,c));b=b.T(c,G);return null!=m&&a.sa.matches(m)?(null!=f&&jd(f,new I("child_added",
	m.R,m.name)),b.T(m.name,m.R)):b}return d.e()?b:u&&0<=h(m,l)?(null!=f&&(jd(f,new I("child_removed",m.R,m.name)),jd(f,new I("child_added",d,c))),b.T(c,d).T(m.name,G)):b};function qc(a,b){this.B=a;H(n(this.B)&&null!==this.B,"LeafNode shouldn't be created with null/undefined value.");this.aa=b||G;Sd(this.aa);this.Db=null}var Td=["object","boolean","number","string"];g=qc.prototype;g.J=function(){return!0};g.C=function(){return this.aa};g.fa=function(a){return new qc(this.B,a)};g.Q=function(a){return".priority"===a?this.aa:G};g.P=function(a){return a.e()?this:".priority"===J(a)?this.aa:G};g.Da=function(){return!1};g.Ve=function(){return null};
	g.T=function(a,b){return".priority"===a?this.fa(b):b.e()&&".priority"!==a?this:G.T(a,b).fa(this.aa)};g.F=function(a,b){var c=J(a);if(null===c)return b;if(b.e()&&".priority"!==c)return this;H(".priority"!==c||1===Ad(a),".priority must be the last token in a path");return this.T(c,G.F(D(a),b))};g.e=function(){return!1};g.Eb=function(){return 0};g.O=function(){return!1};g.H=function(a){return a&&!this.C().e()?{".value":this.Ca(),".priority":this.C().H()}:this.Ca()};
	g.hash=function(){if(null===this.Db){var a="";this.aa.e()||(a+="priority:"+Ud(this.aa.H())+":");var b=typeof this.B,a=a+(b+":"),a="number"===b?a+Jc(this.B):a+this.B;this.Db=uc(a)}return this.Db};g.Ca=function(){return this.B};g.sc=function(a){if(a===G)return 1;if(a instanceof P)return-1;H(a.J(),"Unknown node type");var b=typeof a.B,c=typeof this.B,d=Ia(Td,b),e=Ia(Td,c);H(0<=d,"Unknown leaf type: "+b);H(0<=e,"Unknown leaf type: "+c);return d===e?"object"===c?0:this.B<a.B?-1:this.B===a.B?0:1:e-d};
	g.nb=function(){return this};g.yc=function(){return!0};g.Z=function(a){return a===this?!0:a.J()?this.B===a.B&&this.aa.Z(a.aa):!1};g.toString=function(){return B(this.H(!0))};function Vd(){}var Wd={};function Pd(a){return q(a.compare,a)}Vd.prototype.nd=function(a,b){return 0!==this.compare(new K("[MIN_NAME]",a),new K("[MIN_NAME]",b))};Vd.prototype.Hc=function(){return Xd};function Yd(a){H(!a.e()&&".priority"!==J(a),"Can't create PathIndex with empty path or .priority key");this.bc=a}la(Yd,Vd);g=Yd.prototype;g.xc=function(a){return!a.P(this.bc).e()};g.compare=function(a,b){var c=a.R.P(this.bc),d=b.R.P(this.bc),c=c.sc(d);return 0===c?hc(a.name,b.name):c};
	g.Ec=function(a,b){var c=M(a),c=G.F(this.bc,c);return new K(b,c)};g.Fc=function(){var a=G.F(this.bc,Zd);return new K("[MAX_NAME]",a)};g.toString=function(){return this.bc.slice().join("/")};function $d(){}la($d,Vd);g=$d.prototype;g.compare=function(a,b){var c=a.R.C(),d=b.R.C(),c=c.sc(d);return 0===c?hc(a.name,b.name):c};g.xc=function(a){return!a.C().e()};g.nd=function(a,b){return!a.C().Z(b.C())};g.Hc=function(){return Xd};g.Fc=function(){return new K("[MAX_NAME]",new qc("[PRIORITY-POST]",Zd))};
	g.Ec=function(a,b){var c=M(a);return new K(b,new qc("[PRIORITY-POST]",c))};g.toString=function(){return".priority"};var N=new $d;function ae(){}la(ae,Vd);g=ae.prototype;g.compare=function(a,b){return hc(a.name,b.name)};g.xc=function(){throw sc("KeyIndex.isDefinedOn not expected to be called.");};g.nd=function(){return!1};g.Hc=function(){return Xd};g.Fc=function(){return new K("[MAX_NAME]",G)};g.Ec=function(a){H(p(a),"KeyIndex indexValue must always be a string.");return new K(a,G)};g.toString=function(){return".key"};
	var Fd=new ae;function be(){}la(be,Vd);g=be.prototype;g.compare=function(a,b){var c=a.R.sc(b.R);return 0===c?hc(a.name,b.name):c};g.xc=function(){return!0};g.nd=function(a,b){return!a.Z(b)};g.Hc=function(){return Xd};g.Fc=function(){return ce};g.Ec=function(a,b){var c=M(a);return new K(b,c)};g.toString=function(){return".value"};var de=new be;function ee(){this.Rb=this.na=this.Kb=this.ka=this.xa=!1;this.oa=0;this.mb="";this.dc=null;this.zb="";this.ac=null;this.xb="";this.g=N}var fe=new ee;function Nd(a){return""===a.mb?a.ka:"l"===a.mb}function Jd(a){H(a.ka,"Only valid if start has been set");return a.dc}function Id(a){H(a.ka,"Only valid if start has been set");return a.Kb?a.zb:"[MIN_NAME]"}function Ld(a){H(a.na,"Only valid if end has been set");return a.ac}
	function Kd(a){H(a.na,"Only valid if end has been set");return a.Rb?a.xb:"[MAX_NAME]"}function ge(a){var b=new ee;b.xa=a.xa;b.oa=a.oa;b.ka=a.ka;b.dc=a.dc;b.Kb=a.Kb;b.zb=a.zb;b.na=a.na;b.ac=a.ac;b.Rb=a.Rb;b.xb=a.xb;b.g=a.g;b.mb=a.mb;return b}g=ee.prototype;g.le=function(a){var b=ge(this);b.xa=!0;b.oa=a;b.mb="l";return b};g.me=function(a){var b=ge(this);b.xa=!0;b.oa=a;b.mb="r";return b};g.Nd=function(a,b){var c=ge(this);c.ka=!0;n(a)||(a=null);c.dc=a;null!=b?(c.Kb=!0,c.zb=b):(c.Kb=!1,c.zb="");return c};
	g.gd=function(a,b){var c=ge(this);c.na=!0;n(a)||(a=null);c.ac=a;n(b)?(c.Rb=!0,c.xb=b):(c.vg=!1,c.xb="");return c};function he(a,b){var c=ge(a);c.g=b;return c}function ie(a){var b={};a.ka&&(b.sp=a.dc,a.Kb&&(b.sn=a.zb));a.na&&(b.ep=a.ac,a.Rb&&(b.en=a.xb));if(a.xa){b.l=a.oa;var c=a.mb;""===c&&(c=Nd(a)?"l":"r");b.vf=c}a.g!==N&&(b.i=a.g.toString());return b}function S(a){return!(a.ka||a.na||a.xa)}function Sc(a){return S(a)&&a.g==N}
	function Tc(a){var b={};if(Sc(a))return b;var c;a.g===N?c="$priority":a.g===de?c="$value":a.g===Fd?c="$key":(H(a.g instanceof Yd,"Unrecognized index type!"),c=a.g.toString());b.orderBy=B(c);a.ka&&(b.startAt=B(a.dc),a.Kb&&(b.startAt+=","+B(a.zb)));a.na&&(b.endAt=B(a.ac),a.Rb&&(b.endAt+=","+B(a.xb)));a.xa&&(Nd(a)?b.limitToFirst=a.oa:b.limitToLast=a.oa);return b}g.toString=function(){return B(ie(this))};function je(a,b){this.od=a;this.cc=b}je.prototype.get=function(a){var b=w(this.od,a);if(!b)throw Error("No index defined for "+a);return b===Wd?null:b};function ke(a,b,c){var d=pa(a.od,function(d,f){var h=w(a.cc,f);H(h,"Missing index implementation for "+f);if(d===Wd){if(h.xc(b.R)){for(var k=[],l=c.Wb(jc),m=R(l);m;)m.name!=b.name&&k.push(m),m=R(l);k.push(b);return le(k,Pd(h))}return Wd}h=c.get(b.name);k=d;h&&(k=k.remove(new K(b.name,h)));return k.Oa(b,b.R)});return new je(d,a.cc)}
	function me(a,b,c){var d=pa(a.od,function(a){if(a===Wd)return a;var d=c.get(b.name);return d?a.remove(new K(b.name,d)):a});return new je(d,a.cc)}var ne=new je({".priority":Wd},{".priority":N});function oe(){this.set={}}g=oe.prototype;g.add=function(a,b){this.set[a]=null!==b?b:!0};g.contains=function(a){return cb(this.set,a)};g.get=function(a){return this.contains(a)?this.set[a]:void 0};g.remove=function(a){delete this.set[a]};g.clear=function(){this.set={}};g.e=function(){return ya(this.set)};g.count=function(){return ra(this.set)};function pe(a,b){r(a.set,function(a,d){b(d,a)})}g.keys=function(){var a=[];r(this.set,function(b,c){a.push(c)});return a};function qe(a,b,c,d){this.Yd=a;this.f=yc(a);this.jc=b;this.pb=this.qb=0;this.Va=$c(b);this.tf=c;this.wc=!1;this.Cb=d;this.Yc=function(a){return Jb(b,"long_polling",a)}}var re,se;
	qe.prototype.open=function(a,b){this.Me=0;this.ia=b;this.bf=new rb(a);this.Ab=!1;var c=this;this.sb=setTimeout(function(){c.f("Timed out trying to connect.");c.bb();c.sb=null},Math.floor(3E4));Dc(function(){if(!c.Ab){c.Ta=new te(function(a,b,d,k,l){ue(c,arguments);if(c.Ta)if(c.sb&&(clearTimeout(c.sb),c.sb=null),c.wc=!0,"start"==a)c.id=b,c.ff=d;else if("close"===a)b?(c.Ta.Kd=!1,sb(c.bf,b,function(){c.bb()})):c.bb();else throw Error("Unrecognized command received: "+a);},function(a,b){ue(c,arguments);
	tb(c.bf,a,b)},function(){c.bb()},c.Yc);var a={start:"t"};a.ser=Math.floor(1E8*Math.random());c.Ta.Qd&&(a.cb=c.Ta.Qd);a.v="5";c.tf&&(a.s=c.tf);c.Cb&&(a.ls=c.Cb);"undefined"!==typeof location&&location.href&&-1!==location.href.indexOf("firebaseio.com")&&(a.r="f");a=c.Yc(a);c.f("Connecting via long-poll to "+a);ve(c.Ta,a,function(){})}})};
	qe.prototype.start=function(){var a=this.Ta,b=this.ff;a.Vf=this.id;a.Wf=b;for(a.Ud=!0;we(a););a=this.id;b=this.ff;this.fc=document.createElement("iframe");var c={dframe:"t"};c.id=a;c.pw=b;this.fc.src=this.Yc(c);this.fc.style.display="none";document.body.appendChild(this.fc)};
	qe.isAvailable=function(){return re||!se&&"undefined"!==typeof document&&null!=document.createElement&&!("object"===typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))&&!("object"===typeof Windows&&"object"===typeof Windows.rg)&&!0};g=qe.prototype;g.sd=function(){};g.Tc=function(){this.Ab=!0;this.Ta&&(this.Ta.close(),this.Ta=null);this.fc&&(document.body.removeChild(this.fc),this.fc=null);this.sb&&(clearTimeout(this.sb),this.sb=null)};
	g.bb=function(){this.Ab||(this.f("Longpoll is closing itself"),this.Tc(),this.ia&&(this.ia(this.wc),this.ia=null))};g.close=function(){this.Ab||(this.f("Longpoll is being closed."),this.Tc())};g.send=function(a){a=B(a);this.qb+=a.length;Lb(this.Va,"bytes_sent",a.length);a=mb(a);a=ab(a,!0);a=Hc(a,1840);for(var b=0;b<a.length;b++){var c=this.Ta;c.Qc.push({jg:this.Me,pg:a.length,Oe:a[b]});c.Ud&&we(c);this.Me++}};function ue(a,b){var c=B(b).length;a.pb+=c;Lb(a.Va,"bytes_received",c)}
	function te(a,b,c,d){this.Yc=d;this.ib=c;this.te=new oe;this.Qc=[];this.Zd=Math.floor(1E8*Math.random());this.Kd=!0;this.Qd=rc();window["pLPCommand"+this.Qd]=a;window["pRTLPCB"+this.Qd]=b;a=document.createElement("iframe");a.style.display="none";if(document.body){document.body.appendChild(a);try{a.contentWindow.document||E("No IE domain setting required")}catch(e){a.src="javascript:void((function(){document.open();document.domain='"+document.domain+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
	a.contentDocument?a.gb=a.contentDocument:a.contentWindow?a.gb=a.contentWindow.document:a.document&&(a.gb=a.document);this.Ea=a;a="";this.Ea.src&&"javascript:"===this.Ea.src.substr(0,11)&&(a='<script>document.domain="'+document.domain+'";\x3c/script>');a="<html><body>"+a+"</body></html>";try{this.Ea.gb.open(),this.Ea.gb.write(a),this.Ea.gb.close()}catch(f){E("frame writing exception"),f.stack&&E(f.stack),E(f)}}
	te.prototype.close=function(){this.Ud=!1;if(this.Ea){this.Ea.gb.body.innerHTML="";var a=this;setTimeout(function(){null!==a.Ea&&(document.body.removeChild(a.Ea),a.Ea=null)},Math.floor(0))}var b=this.ib;b&&(this.ib=null,b())};
	function we(a){if(a.Ud&&a.Kd&&a.te.count()<(0<a.Qc.length?2:1)){a.Zd++;var b={};b.id=a.Vf;b.pw=a.Wf;b.ser=a.Zd;for(var b=a.Yc(b),c="",d=0;0<a.Qc.length;)if(1870>=a.Qc[0].Oe.length+30+c.length){var e=a.Qc.shift(),c=c+"&seg"+d+"="+e.jg+"&ts"+d+"="+e.pg+"&d"+d+"="+e.Oe;d++}else break;xe(a,b+c,a.Zd);return!0}return!1}function xe(a,b,c){function d(){a.te.remove(c);we(a)}a.te.add(c,1);var e=setTimeout(d,Math.floor(25E3));ve(a,b,function(){clearTimeout(e);d()})}
	function ve(a,b,c){setTimeout(function(){try{if(a.Kd){var d=a.Ea.gb.createElement("script");d.type="text/javascript";d.async=!0;d.src=b;d.onload=d.onreadystatechange=function(){var a=d.readyState;a&&"loaded"!==a&&"complete"!==a||(d.onload=d.onreadystatechange=null,d.parentNode&&d.parentNode.removeChild(d),c())};d.onerror=function(){E("Long-poll script failed to load: "+b);a.Kd=!1;a.close()};a.Ea.gb.body.appendChild(d)}}catch(e){}},Math.floor(1))};function ye(a){ze(this,a)}var Ae=[qe,cd];function ze(a,b){var c=cd&&cd.isAvailable(),d=c&&!(yb.Ze||!0===yb.get("previous_websocket_failure"));b.qg&&(c||O("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),d=!0);if(d)a.Wc=[cd];else{var e=a.Wc=[];Ic(Ae,function(a,b){b&&b.isAvailable()&&e.push(b)})}}function Be(a){if(0<a.Wc.length)return a.Wc[0];throw Error("No transports available");};function Ce(a,b,c,d,e,f,h){this.id=a;this.f=yc("c:"+this.id+":");this.re=c;this.Lc=d;this.ia=e;this.qe=f;this.L=b;this.Ad=[];this.Ke=0;this.sf=new ye(b);this.Ua=0;this.Cb=h;this.f("Connection created");De(this)}
	function De(a){var b=Be(a.sf);a.I=new b("c:"+a.id+":"+a.Ke++,a.L,void 0,a.Cb);a.ve=b.responsesRequiredToBeHealthy||0;var c=Ee(a,a.I),d=Fe(a,a.I);a.Xc=a.I;a.Rc=a.I;a.D=null;a.Bb=!1;setTimeout(function(){a.I&&a.I.open(c,d)},Math.floor(0));b=b.healthyTimeout||0;0<b&&(a.md=Mc(function(){a.md=null;a.Bb||(a.I&&102400<a.I.pb?(a.f("Connection exceeded healthy timeout but has received "+a.I.pb+" bytes.  Marking connection healthy."),a.Bb=!0,a.I.sd()):a.I&&10240<a.I.qb?a.f("Connection exceeded healthy timeout but has sent "+
	a.I.qb+" bytes.  Leaving connection alive."):(a.f("Closing unhealthy connection after timeout."),a.close()))},Math.floor(b)))}function Fe(a,b){return function(c){b===a.I?(a.I=null,c||0!==a.Ua?1===a.Ua&&a.f("Realtime connection lost."):(a.f("Realtime connection failed."),"s-"===a.L.$a.substr(0,2)&&(yb.remove("host:"+a.L.host),a.L.$a=a.L.host)),a.close()):b===a.D?(a.f("Secondary connection lost."),c=a.D,a.D=null,a.Xc!==c&&a.Rc!==c||a.close()):a.f("closing an old connection")}}
	function Ee(a,b){return function(c){if(2!=a.Ua)if(b===a.Rc){var d=Fc("t",c);c=Fc("d",c);if("c"==d){if(d=Fc("t",c),"d"in c)if(c=c.d,"h"===d){var d=c.ts,e=c.v,f=c.h;a.qf=c.s;Ib(a.L,f);0==a.Ua&&(a.I.start(),Ge(a,a.I,d),"5"!==e&&O("Protocol version mismatch detected"),c=a.sf,(c=1<c.Wc.length?c.Wc[1]:null)&&He(a,c))}else if("n"===d){a.f("recvd end transmission on primary");a.Rc=a.D;for(c=0;c<a.Ad.length;++c)a.wd(a.Ad[c]);a.Ad=[];Ie(a)}else"s"===d?(a.f("Connection shutdown command received. Shutting down..."),
	a.qe&&(a.qe(c),a.qe=null),a.ia=null,a.close()):"r"===d?(a.f("Reset packet received.  New host: "+c),Ib(a.L,c),1===a.Ua?a.close():(Je(a),De(a))):"e"===d?zc("Server Error: "+c):"o"===d?(a.f("got pong on primary."),Ke(a),Le(a)):zc("Unknown control packet command: "+d)}else"d"==d&&a.wd(c)}else if(b===a.D)if(d=Fc("t",c),c=Fc("d",c),"c"==d)"t"in c&&(c=c.t,"a"===c?Me(a):"r"===c?(a.f("Got a reset on secondary, closing it"),a.D.close(),a.Xc!==a.D&&a.Rc!==a.D||a.close()):"o"===c&&(a.f("got pong on secondary."),
	a.pf--,Me(a)));else if("d"==d)a.Ad.push(c);else throw Error("Unknown protocol layer: "+d);else a.f("message on old connection")}}Ce.prototype.ua=function(a){Ne(this,{t:"d",d:a})};function Ie(a){a.Xc===a.D&&a.Rc===a.D&&(a.f("cleaning up and promoting a connection: "+a.D.Yd),a.I=a.D,a.D=null)}
	function Me(a){0>=a.pf?(a.f("Secondary connection is healthy."),a.Bb=!0,a.D.sd(),a.D.start(),a.f("sending client ack on secondary"),a.D.send({t:"c",d:{t:"a",d:{}}}),a.f("Ending transmission on primary"),a.I.send({t:"c",d:{t:"n",d:{}}}),a.Xc=a.D,Ie(a)):(a.f("sending ping on secondary."),a.D.send({t:"c",d:{t:"p",d:{}}}))}Ce.prototype.wd=function(a){Ke(this);this.re(a)};function Ke(a){a.Bb||(a.ve--,0>=a.ve&&(a.f("Primary connection is healthy."),a.Bb=!0,a.I.sd()))}
	function He(a,b){a.D=new b("c:"+a.id+":"+a.Ke++,a.L,a.qf);a.pf=b.responsesRequiredToBeHealthy||0;a.D.open(Ee(a,a.D),Fe(a,a.D));Mc(function(){a.D&&(a.f("Timed out trying to upgrade."),a.D.close())},Math.floor(6E4))}function Ge(a,b,c){a.f("Realtime connection established.");a.I=b;a.Ua=1;a.Lc&&(a.Lc(c,a.qf),a.Lc=null);0===a.ve?(a.f("Primary connection is healthy."),a.Bb=!0):Mc(function(){Le(a)},Math.floor(5E3))}
	function Le(a){a.Bb||1!==a.Ua||(a.f("sending ping on primary."),Ne(a,{t:"c",d:{t:"p",d:{}}}))}function Ne(a,b){if(1!==a.Ua)throw"Connection is not connected";a.Xc.send(b)}Ce.prototype.close=function(){2!==this.Ua&&(this.f("Closing realtime connection."),this.Ua=2,Je(this),this.ia&&(this.ia(),this.ia=null))};function Je(a){a.f("Shutting down all connections");a.I&&(a.I.close(),a.I=null);a.D&&(a.D.close(),a.D=null);a.md&&(clearTimeout(a.md),a.md=null)};function L(a,b){if(1==arguments.length){this.o=a.split("/");for(var c=0,d=0;d<this.o.length;d++)0<this.o[d].length&&(this.o[c]=this.o[d],c++);this.o.length=c;this.Y=0}else this.o=a,this.Y=b}function T(a,b){var c=J(a);if(null===c)return b;if(c===J(b))return T(D(a),D(b));throw Error("INTERNAL ERROR: innerPath ("+b+") is not within outerPath ("+a+")");}
	function Oe(a,b){for(var c=a.slice(),d=b.slice(),e=0;e<c.length&&e<d.length;e++){var f=hc(c[e],d[e]);if(0!==f)return f}return c.length===d.length?0:c.length<d.length?-1:1}function J(a){return a.Y>=a.o.length?null:a.o[a.Y]}function Ad(a){return a.o.length-a.Y}function D(a){var b=a.Y;b<a.o.length&&b++;return new L(a.o,b)}function Bd(a){return a.Y<a.o.length?a.o[a.o.length-1]:null}g=L.prototype;
	g.toString=function(){for(var a="",b=this.Y;b<this.o.length;b++)""!==this.o[b]&&(a+="/"+this.o[b]);return a||"/"};g.slice=function(a){return this.o.slice(this.Y+(a||0))};g.parent=function(){if(this.Y>=this.o.length)return null;for(var a=[],b=this.Y;b<this.o.length-1;b++)a.push(this.o[b]);return new L(a,0)};
	g.n=function(a){for(var b=[],c=this.Y;c<this.o.length;c++)b.push(this.o[c]);if(a instanceof L)for(c=a.Y;c<a.o.length;c++)b.push(a.o[c]);else for(a=a.split("/"),c=0;c<a.length;c++)0<a[c].length&&b.push(a[c]);return new L(b,0)};g.e=function(){return this.Y>=this.o.length};g.Z=function(a){if(Ad(this)!==Ad(a))return!1;for(var b=this.Y,c=a.Y;b<=this.o.length;b++,c++)if(this.o[b]!==a.o[c])return!1;return!0};
	g.contains=function(a){var b=this.Y,c=a.Y;if(Ad(this)>Ad(a))return!1;for(;b<this.o.length;){if(this.o[b]!==a.o[c])return!1;++b;++c}return!0};var C=new L("");function Pe(a,b){this.Qa=a.slice();this.Ha=Math.max(1,this.Qa.length);this.Pe=b;for(var c=0;c<this.Qa.length;c++)this.Ha+=nb(this.Qa[c]);Qe(this)}Pe.prototype.push=function(a){0<this.Qa.length&&(this.Ha+=1);this.Qa.push(a);this.Ha+=nb(a);Qe(this)};Pe.prototype.pop=function(){var a=this.Qa.pop();this.Ha-=nb(a);0<this.Qa.length&&--this.Ha};
	function Qe(a){if(768<a.Ha)throw Error(a.Pe+"has a key path longer than 768 bytes ("+a.Ha+").");if(32<a.Qa.length)throw Error(a.Pe+"path specified exceeds the maximum depth that can be written (32) or object contains a cycle "+Re(a));}function Re(a){return 0==a.Qa.length?"":"in property '"+a.Qa.join(".")+"'"};function Se(a){a instanceof Te||Ac("Don't call new Database() directly - please use firebase.database().");this.ta=a;this.ba=new U(a,C);this.INTERNAL=new Ue(this)}var Ve={TIMESTAMP:{".sv":"timestamp"}};g=Se.prototype;g.app=null;g.jf=function(a){We(this,"ref");x("database.ref",0,1,arguments.length);return n(a)?this.ba.n(a):this.ba};
	g.gg=function(a){We(this,"database.refFromURL");x("database.refFromURL",1,1,arguments.length);var b=Bc(a);Xe("database.refFromURL",b);var c=b.jc;c.host!==this.ta.L.host&&Ac("database.refFromURL: Host name does not match the current database: (found "+c.host+" but expected "+this.ta.L.host+")");return this.jf(b.path.toString())};function We(a,b){null===a.ta&&Ac("Cannot call "+b+" on a deleted database.")}g.Pf=function(){x("database.goOffline",0,0,arguments.length);We(this,"goOffline");this.ta.ab()};
	g.Qf=function(){x("database.goOnline",0,0,arguments.length);We(this,"goOnline");this.ta.kc()};Object.defineProperty(Se.prototype,"app",{get:function(){return this.ta.app}});function Ue(a){this.Ya=a}Ue.prototype.delete=function(){We(this.Ya,"delete");var a=Ye.Vb(),b=this.Ya.ta;w(a.lb,b.app.name)!==b&&Ac("Database "+b.app.name+" has already been deleted.");b.ab();delete a.lb[b.app.name];this.Ya.ta=null;this.Ya.ba=null;this.Ya=this.Ya.INTERNAL=null;return firebase.Promise.resolve()};
	Se.prototype.ref=Se.prototype.jf;Se.prototype.refFromURL=Se.prototype.gg;Se.prototype.goOnline=Se.prototype.Qf;Se.prototype.goOffline=Se.prototype.Pf;Ue.prototype["delete"]=Ue.prototype.delete;function mc(){this.k=this.B=null}mc.prototype.find=function(a){if(null!=this.B)return this.B.P(a);if(a.e()||null==this.k)return null;var b=J(a);a=D(a);return this.k.contains(b)?this.k.get(b).find(a):null};function oc(a,b,c){if(b.e())a.B=c,a.k=null;else if(null!==a.B)a.B=a.B.F(b,c);else{null==a.k&&(a.k=new oe);var d=J(b);a.k.contains(d)||a.k.add(d,new mc);a=a.k.get(d);b=D(b);oc(a,b,c)}}
	function Ze(a,b){if(b.e())return a.B=null,a.k=null,!0;if(null!==a.B){if(a.B.J())return!1;var c=a.B;a.B=null;c.O(N,function(b,c){oc(a,new L(b),c)});return Ze(a,b)}return null!==a.k?(c=J(b),b=D(b),a.k.contains(c)&&Ze(a.k.get(c),b)&&a.k.remove(c),a.k.e()?(a.k=null,!0):!1):!0}function nc(a,b,c){null!==a.B?c(b,a.B):a.O(function(a,e){var f=new L(b.toString()+"/"+a);nc(e,f,c)})}mc.prototype.O=function(a){null!==this.k&&pe(this.k,function(b,c){a(b,c)})};var $e=/[\[\].#$\/\u0000-\u001F\u007F]/,af=/[\[\].#$\u0000-\u001F\u007F]/;function bf(a){return p(a)&&0!==a.length&&!$e.test(a)}function cf(a){return null===a||p(a)||ga(a)&&!Cc(a)||ia(a)&&cb(a,".sv")}function df(a,b,c,d){d&&!n(b)||ef(y(a,1,d),b,c)}
	function ef(a,b,c){c instanceof L&&(c=new Pe(c,a));if(!n(b))throw Error(a+"contains undefined "+Re(c));if(ha(b))throw Error(a+"contains a function "+Re(c)+" with contents: "+b.toString());if(Cc(b))throw Error(a+"contains "+b.toString()+" "+Re(c));if(p(b)&&b.length>10485760/3&&10485760<nb(b))throw Error(a+"contains a string greater than 10485760 utf8 bytes "+Re(c)+" ('"+b.substring(0,50)+"...')");if(ia(b)){var d=!1,e=!1;db(b,function(b,h){if(".value"===b)d=!0;else if(".priority"!==b&&".sv"!==b&&(e=
	!0,!bf(b)))throw Error(a+" contains an invalid key ("+b+") "+Re(c)+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');c.push(b);ef(a,h,c);c.pop()});if(d&&e)throw Error(a+' contains ".value" child '+Re(c)+" in addition to actual children.");}}
	function ff(a,b){var c,d;for(c=0;c<b.length;c++){d=b[c];for(var e=d.slice(),f=0;f<e.length;f++)if((".priority"!==e[f]||f!==e.length-1)&&!bf(e[f]))throw Error(a+"contains an invalid key ("+e[f]+") in path "+d.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');}b.sort(Oe);e=null;for(c=0;c<b.length;c++){d=b[c];if(null!==e&&e.contains(d))throw Error(a+"contains a path "+e.toString()+" that is ancestor of another path "+d.toString());e=d}}
	function gf(a,b,c){var d=y(a,1,!1);if(!ia(b)||ea(b))throw Error(d+" must be an object containing the children to replace.");var e=[];db(b,function(a,b){var k=new L(a);ef(d,b,c.n(k));if(".priority"===Bd(k)&&!cf(b))throw Error(d+"contains an invalid value for '"+k.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");e.push(k)});ff(d,e)}
	function hf(a,b,c){if(Cc(c))throw Error(y(a,b,!1)+"is "+c.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!cf(c))throw Error(y(a,b,!1)+"must be a valid Firebase priority (a string, finite number, server value, or null).");}
	function jf(a,b,c){if(!c||n(b))switch(b){case "value":case "child_added":case "child_removed":case "child_changed":case "child_moved":break;default:throw Error(y(a,1,c)+'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');}}function kf(a,b){if(n(b)&&!bf(b))throw Error(y(a,2,!0)+'was an invalid key: "'+b+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');}
	function lf(a,b){if(!p(b)||0===b.length||af.test(b))throw Error(y(a,1,!1)+'was an invalid path: "'+b+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');}function mf(a,b){if(".info"===J(b))throw Error(a+" failed: Can't modify data under /.info/");}
	function Xe(a,b){var c=b.path.toString(),d;!(d=!p(b.jc.host)||0===b.jc.host.length||!bf(b.jc.ne))&&(d=0!==c.length)&&(c&&(c=c.replace(/^\/*\.info(\/|$)/,"/")),d=!(p(c)&&0!==c.length&&!af.test(c)));if(d)throw Error(y(a,1,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');};function V(a,b){this.ta=a;this.qa=b}V.prototype.cancel=function(a){x("Firebase.onDisconnect().cancel",0,1,arguments.length);A("Firebase.onDisconnect().cancel",1,a,!0);var b=new hb;this.ta.xd(this.qa,ib(b,a));return b.ra};V.prototype.cancel=V.prototype.cancel;V.prototype.remove=function(a){x("Firebase.onDisconnect().remove",0,1,arguments.length);mf("Firebase.onDisconnect().remove",this.qa);A("Firebase.onDisconnect().remove",1,a,!0);var b=new hb;nf(this.ta,this.qa,null,ib(b,a));return b.ra};
	V.prototype.remove=V.prototype.remove;V.prototype.set=function(a,b){x("Firebase.onDisconnect().set",1,2,arguments.length);mf("Firebase.onDisconnect().set",this.qa);df("Firebase.onDisconnect().set",a,this.qa,!1);A("Firebase.onDisconnect().set",2,b,!0);var c=new hb;nf(this.ta,this.qa,a,ib(c,b));return c.ra};V.prototype.set=V.prototype.set;
	V.prototype.Jb=function(a,b,c){x("Firebase.onDisconnect().setWithPriority",2,3,arguments.length);mf("Firebase.onDisconnect().setWithPriority",this.qa);df("Firebase.onDisconnect().setWithPriority",a,this.qa,!1);hf("Firebase.onDisconnect().setWithPriority",2,b);A("Firebase.onDisconnect().setWithPriority",3,c,!0);var d=new hb;of(this.ta,this.qa,a,b,ib(d,c));return d.ra};V.prototype.setWithPriority=V.prototype.Jb;
	V.prototype.update=function(a,b){x("Firebase.onDisconnect().update",1,2,arguments.length);mf("Firebase.onDisconnect().update",this.qa);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;O("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}gf("Firebase.onDisconnect().update",a,this.qa);A("Firebase.onDisconnect().update",2,b,!0);
	c=new hb;pf(this.ta,this.qa,a,ib(c,b));return c.ra};V.prototype.update=V.prototype.update;function qf(a){H(ea(a)&&0<a.length,"Requires a non-empty array");this.Bf=a;this.Dc={}}qf.prototype.Ee=function(a,b){var c;c=this.Dc[a]||[];var d=c.length;if(0<d){for(var e=Array(d),f=0;f<d;f++)e[f]=c[f];c=e}else c=[];for(d=0;d<c.length;d++)c[d].He.apply(c[d].Ma,Array.prototype.slice.call(arguments,1))};qf.prototype.gc=function(a,b,c){rf(this,a);this.Dc[a]=this.Dc[a]||[];this.Dc[a].push({He:b,Ma:c});(a=this.Ue(a))&&b.apply(c,a)};
	qf.prototype.Ic=function(a,b,c){rf(this,a);a=this.Dc[a]||[];for(var d=0;d<a.length;d++)if(a[d].He===b&&(!c||c===a[d].Ma)){a.splice(d,1);break}};function rf(a,b){H(Oa(a.Bf,function(a){return a===b}),"Unknown event: "+b)};function sf(){qf.call(this,["online"]);this.hc=!0;if("undefined"!==typeof window&&"undefined"!==typeof window.addEventListener&&!qb()){var a=this;window.addEventListener("online",function(){a.hc||(a.hc=!0,a.Ee("online",!0))},!1);window.addEventListener("offline",function(){a.hc&&(a.hc=!1,a.Ee("online",!1))},!1)}}la(sf,qf);sf.prototype.Ue=function(a){H("online"===a,"Unknown event type: "+a);return[this.hc]};ca(sf);function tf(){qf.call(this,["visible"]);var a,b;"undefined"!==typeof document&&"undefined"!==typeof document.addEventListener&&("undefined"!==typeof document.hidden?(b="visibilitychange",a="hidden"):"undefined"!==typeof document.mozHidden?(b="mozvisibilitychange",a="mozHidden"):"undefined"!==typeof document.msHidden?(b="msvisibilitychange",a="msHidden"):"undefined"!==typeof document.webkitHidden&&(b="webkitvisibilitychange",a="webkitHidden"));this.Mb=!0;if(b){var c=this;document.addEventListener(b,
	function(){var b=!document[a];b!==c.Mb&&(c.Mb=b,c.Ee("visible",b))},!1)}}la(tf,qf);tf.prototype.Ue=function(a){H("visible"===a,"Unknown event type: "+a);return[this.Mb]};ca(tf);var uf=function(){var a=0,b=[];return function(c){var d=c===a;a=c;for(var e=Array(8),f=7;0<=f;f--)e[f]="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c%64),c=Math.floor(c/64);H(0===c,"Cannot push at time == 0");c=e.join("");if(d){for(f=11;0<=f&&63===b[f];f--)b[f]=0;b[f]++}else for(f=0;12>f;f++)b[f]=Math.floor(64*Math.random());for(f=0;12>f;f++)c+="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);H(20===c.length,"nextPushId: Length should be 20.");
	return c}}();function vf(a,b){this.La=a;this.ba=b?b:wf}g=vf.prototype;g.Oa=function(a,b){return new vf(this.La,this.ba.Oa(a,b,this.La).X(null,null,!1,null,null))};g.remove=function(a){return new vf(this.La,this.ba.remove(a,this.La).X(null,null,!1,null,null))};g.get=function(a){for(var b,c=this.ba;!c.e();){b=this.La(a,c.key);if(0===b)return c.value;0>b?c=c.left:0<b&&(c=c.right)}return null};
	function xf(a,b){for(var c,d=a.ba,e=null;!d.e();){c=a.La(b,d.key);if(0===c){if(d.left.e())return e?e.key:null;for(d=d.left;!d.right.e();)d=d.right;return d.key}0>c?d=d.left:0<c&&(e=d,d=d.right)}throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");}g.e=function(){return this.ba.e()};g.count=function(){return this.ba.count()};g.Gc=function(){return this.ba.Gc()};g.ec=function(){return this.ba.ec()};g.ha=function(a){return this.ba.ha(a)};
	g.Wb=function(a){return new yf(this.ba,null,this.La,!1,a)};g.Xb=function(a,b){return new yf(this.ba,a,this.La,!1,b)};g.Zb=function(a,b){return new yf(this.ba,a,this.La,!0,b)};g.We=function(a){return new yf(this.ba,null,this.La,!0,a)};function yf(a,b,c,d,e){this.Hd=e||null;this.je=d;this.Pa=[];for(e=1;!a.e();)if(e=b?c(a.key,b):1,d&&(e*=-1),0>e)a=this.je?a.left:a.right;else if(0===e){this.Pa.push(a);break}else this.Pa.push(a),a=this.je?a.right:a.left}
	function R(a){if(0===a.Pa.length)return null;var b=a.Pa.pop(),c;c=a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value};if(a.je)for(b=b.left;!b.e();)a.Pa.push(b),b=b.right;else for(b=b.right;!b.e();)a.Pa.push(b),b=b.left;return c}function zf(a){if(0===a.Pa.length)return null;var b;b=a.Pa;b=b[b.length-1];return a.Hd?a.Hd(b.key,b.value):{key:b.key,value:b.value}}function Af(a,b,c,d,e){this.key=a;this.value=b;this.color=null!=c?c:!0;this.left=null!=d?d:wf;this.right=null!=e?e:wf}g=Af.prototype;
	g.X=function(a,b,c,d,e){return new Af(null!=a?a:this.key,null!=b?b:this.value,null!=c?c:this.color,null!=d?d:this.left,null!=e?e:this.right)};g.count=function(){return this.left.count()+1+this.right.count()};g.e=function(){return!1};g.ha=function(a){return this.left.ha(a)||a(this.key,this.value)||this.right.ha(a)};function Bf(a){return a.left.e()?a:Bf(a.left)}g.Gc=function(){return Bf(this).key};g.ec=function(){return this.right.e()?this.key:this.right.ec()};
	g.Oa=function(a,b,c){var d,e;e=this;d=c(a,e.key);e=0>d?e.X(null,null,null,e.left.Oa(a,b,c),null):0===d?e.X(null,b,null,null,null):e.X(null,null,null,null,e.right.Oa(a,b,c));return Cf(e)};function Df(a){if(a.left.e())return wf;a.left.ea()||a.left.left.ea()||(a=Ef(a));a=a.X(null,null,null,Df(a.left),null);return Cf(a)}
	g.remove=function(a,b){var c,d;c=this;if(0>b(a,c.key))c.left.e()||c.left.ea()||c.left.left.ea()||(c=Ef(c)),c=c.X(null,null,null,c.left.remove(a,b),null);else{c.left.ea()&&(c=Ff(c));c.right.e()||c.right.ea()||c.right.left.ea()||(c=Gf(c),c.left.left.ea()&&(c=Ff(c),c=Gf(c)));if(0===b(a,c.key)){if(c.right.e())return wf;d=Bf(c.right);c=c.X(d.key,d.value,null,null,Df(c.right))}c=c.X(null,null,null,null,c.right.remove(a,b))}return Cf(c)};g.ea=function(){return this.color};
	function Cf(a){a.right.ea()&&!a.left.ea()&&(a=Hf(a));a.left.ea()&&a.left.left.ea()&&(a=Ff(a));a.left.ea()&&a.right.ea()&&(a=Gf(a));return a}function Ef(a){a=Gf(a);a.right.left.ea()&&(a=a.X(null,null,null,null,Ff(a.right)),a=Hf(a),a=Gf(a));return a}function Hf(a){return a.right.X(null,null,a.color,a.X(null,null,!0,null,a.right.left),null)}function Ff(a){return a.left.X(null,null,a.color,null,a.X(null,null,!0,a.left.right,null))}
	function Gf(a){return a.X(null,null,!a.color,a.left.X(null,null,!a.left.color,null,null),a.right.X(null,null,!a.right.color,null,null))}function If(){}g=If.prototype;g.X=function(){return this};g.Oa=function(a,b){return new Af(a,b,null)};g.remove=function(){return this};g.count=function(){return 0};g.e=function(){return!0};g.ha=function(){return!1};g.Gc=function(){return null};g.ec=function(){return null};g.ea=function(){return!1};var wf=new If;function P(a,b,c){this.k=a;(this.aa=b)&&Sd(this.aa);a.e()&&H(!this.aa||this.aa.e(),"An empty node cannot have a priority");this.yb=c;this.Db=null}g=P.prototype;g.J=function(){return!1};g.C=function(){return this.aa||G};g.fa=function(a){return this.k.e()?this:new P(this.k,a,this.yb)};g.Q=function(a){if(".priority"===a)return this.C();a=this.k.get(a);return null===a?G:a};g.P=function(a){var b=J(a);return null===b?this:this.Q(b).P(D(a))};g.Da=function(a){return null!==this.k.get(a)};
	g.T=function(a,b){H(b,"We should always be passing snapshot nodes");if(".priority"===a)return this.fa(b);var c=new K(a,b),d,e;b.e()?(d=this.k.remove(a),c=me(this.yb,c,this.k)):(d=this.k.Oa(a,b),c=ke(this.yb,c,this.k));e=d.e()?G:this.aa;return new P(d,e,c)};g.F=function(a,b){var c=J(a);if(null===c)return b;H(".priority"!==J(a)||1===Ad(a),".priority must be the last token in a path");var d=this.Q(c).F(D(a),b);return this.T(c,d)};g.e=function(){return this.k.e()};g.Eb=function(){return this.k.count()};
	var Jf=/^(0|[1-9]\d*)$/;g=P.prototype;g.H=function(a){if(this.e())return null;var b={},c=0,d=0,e=!0;this.O(N,function(f,h){b[f]=h.H(a);c++;e&&Jf.test(f)?d=Math.max(d,Number(f)):e=!1});if(!a&&e&&d<2*c){var f=[],h;for(h in b)f[h]=b[h];return f}a&&!this.C().e()&&(b[".priority"]=this.C().H());return b};g.hash=function(){if(null===this.Db){var a="";this.C().e()||(a+="priority:"+Ud(this.C().H())+":");this.O(N,function(b,c){var d=c.hash();""!==d&&(a+=":"+b+":"+d)});this.Db=""===a?"":uc(a)}return this.Db};
	g.Ve=function(a,b,c){return(c=Kf(this,c))?(a=xf(c,new K(a,b)))?a.name:null:xf(this.k,a)};function Qd(a,b){var c;c=(c=Kf(a,b))?(c=c.Gc())&&c.name:a.k.Gc();return c?new K(c,a.k.get(c)):null}function Rd(a,b){var c;c=(c=Kf(a,b))?(c=c.ec())&&c.name:a.k.ec();return c?new K(c,a.k.get(c)):null}g.O=function(a,b){var c=Kf(this,a);return c?c.ha(function(a){return b(a.name,a.R)}):this.k.ha(b)};g.Wb=function(a){return this.Xb(a.Hc(),a)};
	g.Xb=function(a,b){var c=Kf(this,b);if(c)return c.Xb(a,function(a){return a});for(var c=this.k.Xb(a.name,jc),d=zf(c);null!=d&&0>b.compare(d,a);)R(c),d=zf(c);return c};g.We=function(a){return this.Zb(a.Fc(),a)};g.Zb=function(a,b){var c=Kf(this,b);if(c)return c.Zb(a,function(a){return a});for(var c=this.k.Zb(a.name,jc),d=zf(c);null!=d&&0<b.compare(d,a);)R(c),d=zf(c);return c};g.sc=function(a){return this.e()?a.e()?0:-1:a.J()||a.e()?1:a===Zd?-1:0};
	g.nb=function(a){if(a===Fd||va(this.yb.cc,a.toString()))return this;var b=this.yb,c=this.k;H(a!==Fd,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var d=[],e=!1,c=c.Wb(jc),f=R(c);f;)e=e||a.xc(f.R),d.push(f),f=R(c);d=e?le(d,Pd(a)):Wd;e=a.toString();c=za(b.cc);c[e]=a;a=za(b.od);a[e]=d;return new P(this.k,this.aa,new je(a,c))};g.yc=function(a){return a===Fd||va(this.yb.cc,a.toString())};
	g.Z=function(a){if(a===this)return!0;if(a.J())return!1;if(this.C().Z(a.C())&&this.k.count()===a.k.count()){var b=this.Wb(N);a=a.Wb(N);for(var c=R(b),d=R(a);c&&d;){if(c.name!==d.name||!c.R.Z(d.R))return!1;c=R(b);d=R(a)}return null===c&&null===d}return!1};function Kf(a,b){return b===Fd?null:a.yb.get(b.toString())}g.toString=function(){return B(this.H(!0))};function M(a,b){if(null===a)return G;var c=null;"object"===typeof a&&".priority"in a?c=a[".priority"]:"undefined"!==typeof b&&(c=b);H(null===c||"string"===typeof c||"number"===typeof c||"object"===typeof c&&".sv"in c,"Invalid priority type found: "+typeof c);"object"===typeof a&&".value"in a&&null!==a[".value"]&&(a=a[".value"]);if("object"!==typeof a||".sv"in a)return new qc(a,M(c));if(a instanceof Array){var d=G,e=a;r(e,function(a,b){if(cb(e,b)&&"."!==b.substring(0,1)){var c=M(a);if(c.J()||!c.e())d=
	d.T(b,c)}});return d.fa(M(c))}var f=[],h=!1,k=a;db(k,function(a){if("string"!==typeof a||"."!==a.substring(0,1)){var b=M(k[a]);b.e()||(h=h||!b.C().e(),f.push(new K(a,b)))}});if(0==f.length)return G;var l=le(f,gc,function(a){return a.name},ic);if(h){var m=le(f,Pd(N));return new P(l,M(c),new je({".priority":m},{".priority":N}))}return new P(l,M(c),ne)}var Lf=Math.log(2);
	function Mf(a){this.count=parseInt(Math.log(a+1)/Lf,10);this.Ne=this.count-1;this.Cf=a+1&parseInt(Array(this.count+1).join("1"),2)}function Nf(a){var b=!(a.Cf&1<<a.Ne);a.Ne--;return b}
	function le(a,b,c,d){function e(b,d){var f=d-b;if(0==f)return null;if(1==f){var m=a[b],u=c?c(m):m;return new Af(u,m.R,!1,null,null)}var m=parseInt(f/2,10)+b,f=e(b,m),z=e(m+1,d),m=a[m],u=c?c(m):m;return new Af(u,m.R,!1,f,z)}a.sort(b);var f=function(b){function d(b,h){var k=u-b,z=u;u-=b;var z=e(k+1,z),k=a[k],F=c?c(k):k,z=new Af(F,k.R,h,null,z);f?f.left=z:m=z;f=z}for(var f=null,m=null,u=a.length,z=0;z<b.count;++z){var F=Nf(b),id=Math.pow(2,b.count-(z+1));F?d(id,!1):(d(id,!1),d(id,!0))}return m}(new Mf(a.length));
	return null!==f?new vf(d||b,f):new vf(d||b)}function Ud(a){return"number"===typeof a?"number:"+Jc(a):"string:"+a}function Sd(a){if(a.J()){var b=a.H();H("string"===typeof b||"number"===typeof b||"object"===typeof b&&cb(b,".sv"),"Priority must be a string or number.")}else H(a===Zd||a.e(),"priority of unexpected type.");H(a===Zd||a.C().e(),"Priority nodes can't have a priority of their own.")}var G=new P(new vf(ic),null,ne);function Of(){P.call(this,new vf(ic),G,ne)}la(Of,P);g=Of.prototype;
	g.sc=function(a){return a===this?0:1};g.Z=function(a){return a===this};g.C=function(){return this};g.Q=function(){return G};g.e=function(){return!1};var Zd=new Of,Xd=new K("[MIN_NAME]",G),ce=new K("[MAX_NAME]",Zd);function W(a,b,c){this.A=a;this.V=b;this.g=c}W.prototype.H=function(){x("Firebase.DataSnapshot.val",0,0,arguments.length);return this.A.H()};W.prototype.val=W.prototype.H;W.prototype.Qe=function(){x("Firebase.DataSnapshot.exportVal",0,0,arguments.length);return this.A.H(!0)};W.prototype.exportVal=W.prototype.Qe;W.prototype.Lf=function(){x("Firebase.DataSnapshot.exists",0,0,arguments.length);return!this.A.e()};W.prototype.exists=W.prototype.Lf;
	W.prototype.n=function(a){x("Firebase.DataSnapshot.child",0,1,arguments.length);ga(a)&&(a=String(a));lf("Firebase.DataSnapshot.child",a);var b=new L(a),c=this.V.n(b);return new W(this.A.P(b),c,N)};W.prototype.child=W.prototype.n;W.prototype.Da=function(a){x("Firebase.DataSnapshot.hasChild",1,1,arguments.length);lf("Firebase.DataSnapshot.hasChild",a);var b=new L(a);return!this.A.P(b).e()};W.prototype.hasChild=W.prototype.Da;
	W.prototype.C=function(){x("Firebase.DataSnapshot.getPriority",0,0,arguments.length);return this.A.C().H()};W.prototype.getPriority=W.prototype.C;W.prototype.forEach=function(a){x("Firebase.DataSnapshot.forEach",1,1,arguments.length);A("Firebase.DataSnapshot.forEach",1,a,!1);if(this.A.J())return!1;var b=this;return!!this.A.O(this.g,function(c,d){return a(new W(d,b.V.n(c),N))})};W.prototype.forEach=W.prototype.forEach;
	W.prototype.kd=function(){x("Firebase.DataSnapshot.hasChildren",0,0,arguments.length);return this.A.J()?!1:!this.A.e()};W.prototype.hasChildren=W.prototype.kd;W.prototype.getKey=function(){x("Firebase.DataSnapshot.key",0,0,arguments.length);return this.V.getKey()};Lc(W.prototype,"key",W.prototype.getKey);W.prototype.Eb=function(){x("Firebase.DataSnapshot.numChildren",0,0,arguments.length);return this.A.Eb()};W.prototype.numChildren=W.prototype.Eb;
	W.prototype.wb=function(){x("Firebase.DataSnapshot.ref",0,0,arguments.length);return this.V};Lc(W.prototype,"ref",W.prototype.wb);function yd(a,b){this.N=a;this.Ld=b}function vd(a,b,c,d){return new yd(new $b(b,c,d),a.Ld)}function zd(a){return a.N.da?a.N.j():null}yd.prototype.w=function(){return this.Ld};function ac(a){return a.Ld.da?a.Ld.j():null};function Pf(a,b){this.V=a;var c=a.m,d=new Gd(c.g),c=S(c)?new Gd(c.g):c.xa?new Md(c):new Hd(c);this.hf=new pd(c);var e=b.w(),f=b.N,h=d.ya(G,e.j(),null),k=c.ya(G,f.j(),null);this.Ka=new yd(new $b(k,f.da,c.Na()),new $b(h,e.da,d.Na()));this.Za=[];this.Jf=new kd(a)}function Qf(a){return a.V}g=Pf.prototype;g.w=function(){return this.Ka.w().j()};g.hb=function(a){var b=ac(this.Ka);return b&&(S(this.V.m)||!a.e()&&!b.Q(J(a)).e())?b.P(a):null};g.e=function(){return 0===this.Za.length};g.Nb=function(a){this.Za.push(a)};
	g.kb=function(a,b){var c=[];if(b){H(null==a,"A cancel should cancel all event registrations.");var d=this.V.path;Ja(this.Za,function(a){(a=a.Le(b,d))&&c.push(a)})}if(a){for(var e=[],f=0;f<this.Za.length;++f){var h=this.Za[f];if(!h.matches(a))e.push(h);else if(a.Xe()){e=e.concat(this.Za.slice(f+1));break}}this.Za=e}else this.Za=[];return c};
	g.eb=function(a,b,c){a.type===Wc&&null!==a.source.Hb&&(H(ac(this.Ka),"We should always have a full cache before handling merges"),H(zd(this.Ka),"Missing event cache, even though we have a server cache"));var d=this.Ka;a=this.hf.eb(d,a,b,c);b=this.hf;c=a.Sd;H(c.N.j().yc(b.U.g),"Event snap not indexed");H(c.w().j().yc(b.U.g),"Server snap not indexed");H(dc(a.Sd.w())||!dc(d.w()),"Once a server snap is complete, it should never go back");this.Ka=a.Sd;return Rf(this,a.Df,a.Sd.N.j(),null)};
	function Sf(a,b){var c=a.Ka.N,d=[];c.j().J()||c.j().O(N,function(a,b){d.push(new I("child_added",b,a))});c.da&&d.push(bc(c.j()));return Rf(a,d,c.j(),b)}function Rf(a,b,c,d){return ld(a.Jf,b,c,d?[d]:a.Za)};function Tf(a,b,c){this.Pb=a;this.rb=b;this.tb=c||null}g=Tf.prototype;g.nf=function(a){return"value"===a};g.createEvent=function(a,b){var c=b.m.g;return new Ub("value",this,new W(a.Ja,b.wb(),c))};g.Tb=function(a){var b=this.tb;if("cancel"===a.ee()){H(this.rb,"Raising a cancel event on a listener with no cancel callback");var c=this.rb;return function(){c.call(b,a.error)}}var d=this.Pb;return function(){d.call(b,a.Md)}};g.Le=function(a,b){return this.rb?new Vb(this,a,b):null};
	g.matches=function(a){return a instanceof Tf?a.Pb&&this.Pb?a.Pb===this.Pb&&a.tb===this.tb:!0:!1};g.Xe=function(){return null!==this.Pb};function Uf(a,b,c){this.ga=a;this.rb=b;this.tb=c}g=Uf.prototype;g.nf=function(a){a="children_added"===a?"child_added":a;return("children_removed"===a?"child_removed":a)in this.ga};g.Le=function(a,b){return this.rb?new Vb(this,a,b):null};
	g.createEvent=function(a,b){H(null!=a.Xa,"Child events should have a childName.");var c=b.wb().n(a.Xa);return new Ub(a.type,this,new W(a.Ja,c,b.m.g),a.Dd)};g.Tb=function(a){var b=this.tb;if("cancel"===a.ee()){H(this.rb,"Raising a cancel event on a listener with no cancel callback");var c=this.rb;return function(){c.call(b,a.error)}}var d=this.ga[a.hd];return function(){d.call(b,a.Md,a.Dd)}};
	g.matches=function(a){if(a instanceof Uf){if(!this.ga||!a.ga)return!0;if(this.tb===a.tb){var b=ra(a.ga);if(b===ra(this.ga)){if(1===b){var b=sa(a.ga),c=sa(this.ga);return c===b&&(!a.ga[b]||!this.ga[c]||a.ga[b]===this.ga[c])}return qa(this.ga,function(b,c){return a.ga[c]===b})}}}return!1};g.Xe=function(){return null!==this.ga};function X(a,b,c,d){this.u=a;this.path=b;this.m=c;this.Nc=d}
	function Vf(a){var b=null,c=null;a.ka&&(b=Jd(a));a.na&&(c=Ld(a));if(a.g===Fd){if(a.ka){if("[MIN_NAME]"!=Id(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}if(a.na){if("[MAX_NAME]"!=Kd(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");if("string"!==
	typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");}}else if(a.g===N){if(null!=b&&!cf(b)||null!=c&&!cf(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");}else if(H(a.g instanceof Yd||a.g===de,"unknown index type."),null!=b&&"object"===typeof b||null!=c&&"object"===typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
	}function Wf(a){if(a.ka&&a.na&&a.xa&&(!a.xa||""===a.mb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");}function Xf(a,b){if(!0===a.Nc)throw Error(b+": You can't combine multiple orderBy calls.");}g=X.prototype;g.wb=function(){x("Query.ref",0,0,arguments.length);return new U(this.u,this.path)};
	g.gc=function(a,b,c,d){x("Query.on",2,4,arguments.length);jf("Query.on",a,!1);A("Query.on",2,b,!1);var e=Yf("Query.on",c,d);if("value"===a)Zf(this.u,this,new Tf(b,e.cancel||null,e.Ma||null));else{var f={};f[a]=b;Zf(this.u,this,new Uf(f,e.cancel,e.Ma))}return b};
	g.Ic=function(a,b,c){x("Query.off",0,3,arguments.length);jf("Query.off",a,!0);A("Query.off",2,b,!0);eb("Query.off",3,c);var d=null,e=null;"value"===a?d=new Tf(b||null,null,c||null):a&&(b&&(e={},e[a]=b),d=new Uf(e,null,c||null));e=this.u;d=".info"===J(this.path)?e.pd.kb(this,d):e.K.kb(this,d);Qb(e.ca,this.path,d)};
	g.$f=function(a,b){function c(k){f&&(f=!1,e.Ic(a,c),b&&b.call(d.Ma,k),h.resolve(k))}x("Query.once",1,4,arguments.length);jf("Query.once",a,!1);A("Query.once",2,b,!0);var d=Yf("Query.once",arguments[2],arguments[3]),e=this,f=!0,h=new hb;jb(h.ra);this.gc(a,c,function(b){e.Ic(a,c);d.cancel&&d.cancel.call(d.Ma,b);h.reject(b)});return h.ra};
	g.le=function(a){x("Query.limitToFirst",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToFirst: First argument must be a positive integer.");if(this.m.xa)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.u,this.path,this.m.le(a),this.Nc)};
	g.me=function(a){x("Query.limitToLast",1,1,arguments.length);if(!ga(a)||Math.floor(a)!==a||0>=a)throw Error("Query.limitToLast: First argument must be a positive integer.");if(this.m.xa)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new X(this.u,this.path,this.m.me(a),this.Nc)};
	g.ag=function(a){x("Query.orderByChild",1,1,arguments.length);if("$key"===a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');lf("Query.orderByChild",a);Xf(this,"Query.orderByChild");var b=new L(a);if(b.e())throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
	b=new Yd(b);b=he(this.m,b);Vf(b);return new X(this.u,this.path,b,!0)};g.bg=function(){x("Query.orderByKey",0,0,arguments.length);Xf(this,"Query.orderByKey");var a=he(this.m,Fd);Vf(a);return new X(this.u,this.path,a,!0)};g.cg=function(){x("Query.orderByPriority",0,0,arguments.length);Xf(this,"Query.orderByPriority");var a=he(this.m,N);Vf(a);return new X(this.u,this.path,a,!0)};
	g.dg=function(){x("Query.orderByValue",0,0,arguments.length);Xf(this,"Query.orderByValue");var a=he(this.m,de);Vf(a);return new X(this.u,this.path,a,!0)};g.Nd=function(a,b){x("Query.startAt",0,2,arguments.length);df("Query.startAt",a,this.path,!0);kf("Query.startAt",b);var c=this.m.Nd(a,b);Wf(c);Vf(c);if(this.m.ka)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");n(a)||(b=a=null);return new X(this.u,this.path,c,this.Nc)};
	g.gd=function(a,b){x("Query.endAt",0,2,arguments.length);df("Query.endAt",a,this.path,!0);kf("Query.endAt",b);var c=this.m.gd(a,b);Wf(c);Vf(c);if(this.m.na)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new X(this.u,this.path,c,this.Nc)};
	g.If=function(a,b){x("Query.equalTo",1,2,arguments.length);df("Query.equalTo",a,this.path,!1);kf("Query.equalTo",b);if(this.m.ka)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");if(this.m.na)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.Nd(a,b).gd(a,b)};
	g.toString=function(){x("Query.toString",0,0,arguments.length);for(var a=this.path,b="",c=a.Y;c<a.o.length;c++)""!==a.o[c]&&(b+="/"+encodeURIComponent(String(a.o[c])));return this.u.toString()+(b||"/")};g.ja=function(){var a=Gc(ie(this.m));return"{}"===a?"default":a};
	g.isEqual=function(a){x("Query.isEqual",1,1,arguments.length);if(!(a instanceof X))throw Error("Query.isEqual failed: First argument must be an instance of firebase.database.Query.");var b=this.u===a.u,c=this.path.Z(a.path),d=this.ja()===a.ja();return b&&c&&d};
	function Yf(a,b,c){var d={cancel:null,Ma:null};if(b&&c)d.cancel=b,A(a,3,d.cancel,!0),d.Ma=c,eb(a,4,d.Ma);else if(b)if("object"===typeof b&&null!==b)d.Ma=b;else if("function"===typeof b)d.cancel=b;else throw Error(y(a,3,!0)+" must either be a cancel callback or a context object.");return d}X.prototype.on=X.prototype.gc;X.prototype.off=X.prototype.Ic;X.prototype.once=X.prototype.$f;X.prototype.limitToFirst=X.prototype.le;X.prototype.limitToLast=X.prototype.me;X.prototype.orderByChild=X.prototype.ag;
	X.prototype.orderByKey=X.prototype.bg;X.prototype.orderByPriority=X.prototype.cg;X.prototype.orderByValue=X.prototype.dg;X.prototype.startAt=X.prototype.Nd;X.prototype.endAt=X.prototype.gd;X.prototype.equalTo=X.prototype.If;X.prototype.toString=X.prototype.toString;X.prototype.isEqual=X.prototype.isEqual;Lc(X.prototype,"ref",X.prototype.wb);function $f(a,b){this.value=a;this.children=b||ag}var ag=new vf(function(a,b){return a===b?0:a<b?-1:1});function bg(a){var b=Q;r(a,function(a,d){b=b.set(new L(d),a)});return b}g=$f.prototype;g.e=function(){return null===this.value&&this.children.e()};function cg(a,b,c){if(null!=a.value&&c(a.value))return{path:C,value:a.value};if(b.e())return null;var d=J(b);a=a.children.get(d);return null!==a?(b=cg(a,D(b),c),null!=b?{path:(new L(d)).n(b.path),value:b.value}:null):null}
	function dg(a,b){return cg(a,b,function(){return!0})}g.subtree=function(a){if(a.e())return this;var b=this.children.get(J(a));return null!==b?b.subtree(D(a)):Q};g.set=function(a,b){if(a.e())return new $f(b,this.children);var c=J(a),d=(this.children.get(c)||Q).set(D(a),b),c=this.children.Oa(c,d);return new $f(this.value,c)};
	g.remove=function(a){if(a.e())return this.children.e()?Q:new $f(null,this.children);var b=J(a),c=this.children.get(b);return c?(a=c.remove(D(a)),b=a.e()?this.children.remove(b):this.children.Oa(b,a),null===this.value&&b.e()?Q:new $f(this.value,b)):this};g.get=function(a){if(a.e())return this.value;var b=this.children.get(J(a));return b?b.get(D(a)):null};
	function Ed(a,b,c){if(b.e())return c;var d=J(b);b=Ed(a.children.get(d)||Q,D(b),c);d=b.e()?a.children.remove(d):a.children.Oa(d,b);return new $f(a.value,d)}function eg(a,b){return fg(a,C,b)}function fg(a,b,c){var d={};a.children.ha(function(a,f){d[a]=fg(f,b.n(a),c)});return c(b,a.value,d)}function gg(a,b,c){return hg(a,b,C,c)}function hg(a,b,c,d){var e=a.value?d(c,a.value):!1;if(e)return e;if(b.e())return null;e=J(b);return(a=a.children.get(e))?hg(a,D(b),c.n(e),d):null}
	function ig(a,b,c){jg(a,b,C,c)}function jg(a,b,c,d){if(b.e())return a;a.value&&d(c,a.value);var e=J(b);return(a=a.children.get(e))?jg(a,D(b),c.n(e),d):Q}function Cd(a,b){kg(a,C,b)}function kg(a,b,c){a.children.ha(function(a,e){kg(e,b.n(a),c)});a.value&&c(b,a.value)}function lg(a,b){a.children.ha(function(a,d){d.value&&b(a,d.value)})}var Q=new $f(null);$f.prototype.toString=function(){var a={};Cd(this,function(b,c){a[b.toString()]=c.toString()});return B(a)};function mg(a,b,c){this.type=ud;this.source=ng;this.path=a;this.Ob=b;this.Id=c}mg.prototype.Mc=function(a){if(this.path.e()){if(null!=this.Ob.value)return H(this.Ob.children.e(),"affectedTree should not have overlapping affected paths."),this;a=this.Ob.subtree(new L(a));return new mg(C,a,this.Id)}H(J(this.path)===a,"operationForChild called for unrelated child.");return new mg(D(this.path),this.Ob,this.Id)};
	mg.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" ack write revert="+this.Id+" affectedTree="+this.Ob+")"};var Bb=0,Wc=1,ud=2,Db=3;function og(a,b,c,d){this.ce=a;this.Se=b;this.Hb=c;this.Ce=d;H(!d||b,"Tagged queries must be from server.")}var ng=new og(!0,!1,null,!1),pg=new og(!1,!0,null,!1);og.prototype.toString=function(){return this.ce?"user":this.Ce?"server(queryID="+this.Hb+")":"server"};function qg(a){this.W=a}var rg=new qg(new $f(null));function sg(a,b,c){if(b.e())return new qg(new $f(c));var d=dg(a.W,b);if(null!=d){var e=d.path,d=d.value;b=T(e,b);d=d.F(b,c);return new qg(a.W.set(e,d))}a=Ed(a.W,b,new $f(c));return new qg(a)}function tg(a,b,c){var d=a;db(c,function(a,c){d=sg(d,b.n(a),c)});return d}qg.prototype.Ed=function(a){if(a.e())return rg;a=Ed(this.W,a,Q);return new qg(a)};function ug(a,b){var c=dg(a.W,b);return null!=c?a.W.get(c.path).P(T(c.path,b)):null}
	function vg(a){var b=[],c=a.W.value;null!=c?c.J()||c.O(N,function(a,c){b.push(new K(a,c))}):a.W.children.ha(function(a,c){null!=c.value&&b.push(new K(a,c.value))});return b}function wg(a,b){if(b.e())return a;var c=ug(a,b);return null!=c?new qg(new $f(c)):new qg(a.W.subtree(b))}qg.prototype.e=function(){return this.W.e()};qg.prototype.apply=function(a){return xg(C,this.W,a)};
	function xg(a,b,c){if(null!=b.value)return c.F(a,b.value);var d=null;b.children.ha(function(b,f){".priority"===b?(H(null!==f.value,"Priority writes must always be leaf nodes"),d=f.value):c=xg(a.n(b),f,c)});c.P(a).e()||null===d||(c=c.F(a.n(".priority"),d));return c};function yg(){this.za={}}g=yg.prototype;g.e=function(){return ya(this.za)};g.eb=function(a,b,c){var d=a.source.Hb;if(null!==d)return d=w(this.za,d),H(null!=d,"SyncTree gave us an op for an invalid query."),d.eb(a,b,c);var e=[];r(this.za,function(d){e=e.concat(d.eb(a,b,c))});return e};g.Nb=function(a,b,c,d,e){var f=a.ja(),h=w(this.za,f);if(!h){var h=c.Aa(e?d:null),k=!1;h?k=!0:(h=d instanceof P?c.rc(d):G,k=!1);h=new Pf(a,new yd(new $b(h,k,!1),new $b(d,e,!1)));this.za[f]=h}h.Nb(b);return Sf(h,b)};
	g.kb=function(a,b,c){var d=a.ja(),e=[],f=[],h=null!=zg(this);if("default"===d){var k=this;r(this.za,function(a,d){f=f.concat(a.kb(b,c));a.e()&&(delete k.za[d],S(a.V.m)||e.push(a.V))})}else{var l=w(this.za,d);l&&(f=f.concat(l.kb(b,c)),l.e()&&(delete this.za[d],S(l.V.m)||e.push(l.V)))}h&&null==zg(this)&&e.push(new U(a.u,a.path));return{hg:e,Kf:f}};function Ag(a){return Ka(ta(a.za),function(a){return!S(a.V.m)})}g.hb=function(a){var b=null;r(this.za,function(c){b=b||c.hb(a)});return b};
	function Bg(a,b){if(S(b.m))return zg(a);var c=b.ja();return w(a.za,c)}function zg(a){return xa(a.za,function(a){return S(a.V.m)})||null};function Cg(){this.S=rg;this.la=[];this.Bc=-1}function Dg(a,b){for(var c=0;c<a.la.length;c++){var d=a.la[c];if(d.Zc===b)return d}return null}g=Cg.prototype;
	g.Ed=function(a){var b=Pa(this.la,function(b){return b.Zc===a});H(0<=b,"removeWrite called with nonexistent writeId.");var c=this.la[b];this.la.splice(b,1);for(var d=c.visible,e=!1,f=this.la.length-1;d&&0<=f;){var h=this.la[f];h.visible&&(f>=b&&Eg(h,c.path)?d=!1:c.path.contains(h.path)&&(e=!0));f--}if(d){if(e)this.S=Fg(this.la,Gg,C),this.Bc=0<this.la.length?this.la[this.la.length-1].Zc:-1;else if(c.Ga)this.S=this.S.Ed(c.path);else{var k=this;r(c.children,function(a,b){k.S=k.S.Ed(c.path.n(b))})}return!0}return!1};
	g.Aa=function(a,b,c,d){if(c||d){var e=wg(this.S,a);return!d&&e.e()?b:d||null!=b||null!=ug(e,C)?(e=Fg(this.la,function(b){return(b.visible||d)&&(!c||!(0<=Ia(c,b.Zc)))&&(b.path.contains(a)||a.contains(b.path))},a),b=b||G,e.apply(b)):null}e=ug(this.S,a);if(null!=e)return e;e=wg(this.S,a);return e.e()?b:null!=b||null!=ug(e,C)?(b=b||G,e.apply(b)):null};
	g.rc=function(a,b){var c=G,d=ug(this.S,a);if(d)d.J()||d.O(N,function(a,b){c=c.T(a,b)});else if(b){var e=wg(this.S,a);b.O(N,function(a,b){var d=wg(e,new L(a)).apply(b);c=c.T(a,d)});Ja(vg(e),function(a){c=c.T(a.name,a.R)})}else e=wg(this.S,a),Ja(vg(e),function(a){c=c.T(a.name,a.R)});return c};g.ad=function(a,b,c,d){H(c||d,"Either existingEventSnap or existingServerSnap must exist");a=a.n(b);if(null!=ug(this.S,a))return null;a=wg(this.S,a);return a.e()?d.P(b):a.apply(d.P(b))};
	g.qc=function(a,b,c){a=a.n(b);var d=ug(this.S,a);return null!=d?d:Zb(c,b)?wg(this.S,a).apply(c.j().Q(b)):null};g.lc=function(a){return ug(this.S,a)};g.Wd=function(a,b,c,d,e,f){var h;a=wg(this.S,a);h=ug(a,C);if(null==h)if(null!=b)h=a.apply(b);else return[];h=h.nb(f);if(h.e()||h.J())return[];b=[];a=Pd(f);e=e?h.Zb(c,f):h.Xb(c,f);for(f=R(e);f&&b.length<d;)0!==a(f,c)&&b.push(f),f=R(e);return b};
	function Eg(a,b){return a.Ga?a.path.contains(b):!!wa(a.children,function(c,d){return a.path.n(d).contains(b)})}function Gg(a){return a.visible}
	function Fg(a,b,c){for(var d=rg,e=0;e<a.length;++e){var f=a[e];if(b(f)){var h=f.path;if(f.Ga)c.contains(h)?(h=T(c,h),d=sg(d,h,f.Ga)):h.contains(c)&&(h=T(h,c),d=sg(d,C,f.Ga.P(h)));else if(f.children)if(c.contains(h))h=T(c,h),d=tg(d,h,f.children);else{if(h.contains(c))if(h=T(h,c),h.e())d=tg(d,C,f.children);else if(f=w(f.children,J(h)))f=f.P(D(h)),d=sg(d,C,f)}else throw sc("WriteRecord should have .snap or .children");}}return d}function Hg(a,b){this.Lb=a;this.W=b}g=Hg.prototype;
	g.Aa=function(a,b,c){return this.W.Aa(this.Lb,a,b,c)};g.rc=function(a){return this.W.rc(this.Lb,a)};g.ad=function(a,b,c){return this.W.ad(this.Lb,a,b,c)};g.lc=function(a){return this.W.lc(this.Lb.n(a))};g.Wd=function(a,b,c,d,e){return this.W.Wd(this.Lb,a,b,c,d,e)};g.qc=function(a,b){return this.W.qc(this.Lb,a,b)};g.n=function(a){return new Hg(this.Lb.n(a),this.W)};function Ig(){this.children={};this.bd=0;this.value=null}function Jg(a,b,c){this.ud=a?a:"";this.Pc=b?b:null;this.A=c?c:new Ig}function Kg(a,b){for(var c=b instanceof L?b:new L(b),d=a,e;null!==(e=J(c));)d=new Jg(e,d,w(d.A.children,e)||new Ig),c=D(c);return d}g=Jg.prototype;g.Ca=function(){return this.A.value};function Lg(a,b){H("undefined"!==typeof b,"Cannot set value to undefined");a.A.value=b;Mg(a)}g.clear=function(){this.A.value=null;this.A.children={};this.A.bd=0;Mg(this)};
	g.kd=function(){return 0<this.A.bd};g.e=function(){return null===this.Ca()&&!this.kd()};g.O=function(a){var b=this;r(this.A.children,function(c,d){a(new Jg(d,b,c))})};function Ng(a,b,c,d){c&&!d&&b(a);a.O(function(a){Ng(a,b,!0,d)});c&&d&&b(a)}function Og(a,b){for(var c=a.parent();null!==c&&!b(c);)c=c.parent()}g.path=function(){return new L(null===this.Pc?this.ud:this.Pc.path()+"/"+this.ud)};g.name=function(){return this.ud};g.parent=function(){return this.Pc};
	function Mg(a){if(null!==a.Pc){var b=a.Pc,c=a.ud,d=a.e(),e=cb(b.A.children,c);d&&e?(delete b.A.children[c],b.A.bd--,Mg(b)):d||e||(b.A.children[c]=a.A,b.A.bd++,Mg(b))}};function Pg(a,b,c,d,e,f){this.id=Qg++;this.f=yc("p:"+this.id+":");this.qd={};this.$={};this.pa=[];this.Oc=0;this.Kc=[];this.ma=!1;this.Sa=1E3;this.td=3E5;this.Gb=b;this.Jc=c;this.se=d;this.L=a;this.ob=this.Fa=this.Cb=this.xe=null;this.$c=e;this.be=!1;this.ie=0;if(f)throw Error("Auth override specified in options, but not supported on non Node.js platforms");this.Ge=f||null;this.ub=null;this.Mb=!1;this.Gd={};this.ig=0;this.Re=!0;this.Ac=this.ke=null;Rg(this,0);tf.Vb().gc("visible",this.Zf,this);-1===
	a.host.indexOf("fblocal")&&sf.Vb().gc("online",this.Yf,this)}var Qg=0,Sg=0;g=Pg.prototype;g.ua=function(a,b,c){var d=++this.ig;a={r:d,a:a,b:b};this.f(B(a));H(this.ma,"sendRequest call when we're not connected not allowed.");this.Fa.ua(a);c&&(this.Gd[d]=c)};
	g.$e=function(a,b,c,d){var e=a.ja(),f=a.path.toString();this.f("Listen called for "+f+" "+e);this.$[f]=this.$[f]||{};H(Sc(a.m)||!S(a.m),"listen() called for non-default but complete query");H(!this.$[f][e],"listen() called twice for same path/queryId.");a={G:d,ld:b,eg:a,tag:c};this.$[f][e]=a;this.ma&&Tg(this,a)};
	function Tg(a,b){var c=b.eg,d=c.path.toString(),e=c.ja();a.f("Listen on "+d+" for "+e);var f={p:d};b.tag&&(f.q=ie(c.m),f.t=b.tag);f.h=b.ld();a.ua("q",f,function(f){var k=f.d,l=f.s;if(k&&"object"===typeof k&&cb(k,"w")){var m=w(k,"w");ea(m)&&0<=Ia(m,"no_index")&&O("Using an unspecified index. Consider adding "+('".indexOn": "'+c.m.g.toString()+'"')+" at "+c.path.toString()+" to your security rules for better performance")}(a.$[d]&&a.$[d][e])===b&&(a.f("listen response",f),"ok"!==l&&Ug(a,d,e),b.G&&b.G(l,
	k))})}g.kf=function(a){this.ob=a;this.f("Auth token refreshed");this.ob?Vg(this):this.ma&&this.ua("unauth",{},function(){});if(a&&40===a.length||Pc(a))this.f("Admin auth credential detected.  Reducing max reconnect time."),this.td=3E4};function Vg(a){if(a.ma&&a.ob){var b=a.ob,c=Oc(b)?"auth":"gauth",d={cred:b};a.Ge&&(d.authvar=a.Ge);a.ua(c,d,function(c){var d=c.s;c=c.d||"error";a.ob===b&&("ok"===d?a.ie=0:Wg(a,d,c))})}}
	g.uf=function(a,b){var c=a.path.toString(),d=a.ja();this.f("Unlisten called for "+c+" "+d);H(Sc(a.m)||!S(a.m),"unlisten() called for non-default but complete query");if(Ug(this,c,d)&&this.ma){var e=ie(a.m);this.f("Unlisten on "+c+" for "+d);c={p:c};b&&(c.q=e,c.t=b);this.ua("n",c)}};g.pe=function(a,b,c){this.ma?Xg(this,"o",a,b,c):this.Kc.push({ue:a,action:"o",data:b,G:c})};g.cf=function(a,b,c){this.ma?Xg(this,"om",a,b,c):this.Kc.push({ue:a,action:"om",data:b,G:c})};
	g.xd=function(a,b){this.ma?Xg(this,"oc",a,null,b):this.Kc.push({ue:a,action:"oc",data:null,G:b})};function Xg(a,b,c,d,e){c={p:c,d:d};a.f("onDisconnect "+b,c);a.ua(b,c,function(a){e&&setTimeout(function(){e(a.s,a.d)},Math.floor(0))})}g.put=function(a,b,c,d){Yg(this,"p",a,b,c,d)};g.af=function(a,b,c,d){Yg(this,"m",a,b,c,d)};function Yg(a,b,c,d,e,f){d={p:c,d:d};n(f)&&(d.h=f);a.pa.push({action:b,mf:d,G:e});a.Oc++;b=a.pa.length-1;a.ma?Zg(a,b):a.f("Buffering put: "+c)}
	function Zg(a,b){var c=a.pa[b].action,d=a.pa[b].mf,e=a.pa[b].G;a.pa[b].fg=a.ma;a.ua(c,d,function(d){a.f(c+" response",d);delete a.pa[b];a.Oc--;0===a.Oc&&(a.pa=[]);e&&e(d.s,d.d)})}g.we=function(a){this.ma&&(a={c:a},this.f("reportStats",a),this.ua("s",a,function(a){"ok"!==a.s&&this.f("reportStats","Error sending stats: "+a.d)}))};
	g.wd=function(a){if("r"in a){this.f("from server: "+B(a));var b=a.r,c=this.Gd[b];c&&(delete this.Gd[b],c(a.b))}else{if("error"in a)throw"A server-side error has occurred: "+a.error;"a"in a&&(b=a.a,a=a.b,this.f("handleServerMessage",b,a),"d"===b?this.Gb(a.p,a.d,!1,a.t):"m"===b?this.Gb(a.p,a.d,!0,a.t):"c"===b?$g(this,a.p,a.q):"ac"===b?Wg(this,a.s,a.d):"sd"===b?this.xe?this.xe(a):"msg"in a&&"undefined"!==typeof console&&console.log("FIREBASE: "+a.msg.replace("\n","\nFIREBASE: ")):zc("Unrecognized action received from server: "+
	B(b)+"\nAre you using the latest client?"))}};g.Lc=function(a,b){this.f("connection ready");this.ma=!0;this.Ac=(new Date).getTime();this.se({serverTimeOffset:a-(new Date).getTime()});this.Cb=b;if(this.Re){var c={};c["sdk.js."+firebase.SDK_VERSION.replace(/\./g,"-")]=1;qb()?c["framework.cordova"]=1:"object"===typeof navigator&&"ReactNative"===navigator.product&&(c["framework.reactnative"]=1);this.we(c)}ah(this);this.Re=!1;this.Jc(!0)};
	function Rg(a,b){H(!a.Fa,"Scheduling a connect when we're already connected/ing?");a.ub&&clearTimeout(a.ub);a.ub=setTimeout(function(){a.ub=null;bh(a)},Math.floor(b))}g.Zf=function(a){a&&!this.Mb&&this.Sa===this.td&&(this.f("Window became visible.  Reducing delay."),this.Sa=1E3,this.Fa||Rg(this,0));this.Mb=a};g.Yf=function(a){a?(this.f("Browser went online."),this.Sa=1E3,this.Fa||Rg(this,0)):(this.f("Browser went offline.  Killing connection."),this.Fa&&this.Fa.close())};
	g.df=function(){this.f("data client disconnected");this.ma=!1;this.Fa=null;for(var a=0;a<this.pa.length;a++){var b=this.pa[a];b&&"h"in b.mf&&b.fg&&(b.G&&b.G("disconnect"),delete this.pa[a],this.Oc--)}0===this.Oc&&(this.pa=[]);this.Gd={};ch(this)&&(this.Mb?this.Ac&&(3E4<(new Date).getTime()-this.Ac&&(this.Sa=1E3),this.Ac=null):(this.f("Window isn't visible.  Delaying reconnect."),this.Sa=this.td,this.ke=(new Date).getTime()),a=Math.max(0,this.Sa-((new Date).getTime()-this.ke)),a*=Math.random(),this.f("Trying to reconnect in "+
	a+"ms"),Rg(this,a),this.Sa=Math.min(this.td,1.3*this.Sa));this.Jc(!1)};
	function bh(a){if(ch(a)){a.f("Making a connection attempt");a.ke=(new Date).getTime();a.Ac=null;var b=q(a.wd,a),c=q(a.Lc,a),d=q(a.df,a),e=a.id+":"+Sg++,f=a.Cb,h=!1,k=null,l=function(){k?k.close():(h=!0,d())};a.Fa={close:l,ua:function(a){H(k,"sendRequest call when we're not connected not allowed.");k.ua(a)}};var m=a.be;a.be=!1;a.$c.getToken(m).then(function(l){h?E("getToken() completed but was canceled"):(E("getToken() completed. Creating connection."),a.ob=l&&l.accessToken,k=new Ce(e,a.L,b,c,d,function(b){O(b+
	" ("+a.L.toString()+")");a.ab("server_kill")},f))}).then(null,function(b){a.f("Failed to get token: "+b);h||l()})}}g.ab=function(a){E("Interrupting connection for reason: "+a);this.qd[a]=!0;this.Fa?this.Fa.close():(this.ub&&(clearTimeout(this.ub),this.ub=null),this.ma&&this.df())};g.kc=function(a){E("Resuming connection for reason: "+a);delete this.qd[a];ya(this.qd)&&(this.Sa=1E3,this.Fa||Rg(this,0))};
	function $g(a,b,c){c=c?La(c,function(a){return Gc(a)}).join("$"):"default";(a=Ug(a,b,c))&&a.G&&a.G("permission_denied")}function Ug(a,b,c){b=(new L(b)).toString();var d;n(a.$[b])?(d=a.$[b][c],delete a.$[b][c],0===ra(a.$[b])&&delete a.$[b]):d=void 0;return d}
	function Wg(a,b,c){E("Auth token revoked: "+b+"/"+c);a.ob=null;a.be=!0;a.Fa.close();"invalid_token"===b&&(a.ie++,3<=a.ie&&(a.Sa=3E4,a=a.$c,b='Provided authentication credentials for the app named "'+a.oc.name+'" are invalid. This usually indicates your app was not initialized correctly. ',b="credential"in a.oc.options?b+'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in a.oc.options?
	b+'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':b+'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',O(b)))}
	function ah(a){Vg(a);r(a.$,function(b){r(b,function(b){Tg(a,b)})});for(var b=0;b<a.pa.length;b++)a.pa[b]&&Zg(a,b);for(;a.Kc.length;)b=a.Kc.shift(),Xg(a,b.action,b.ue,b.data,b.G)}function ch(a){var b;b=sf.Vb().hc;return ya(a.qd)&&b};var Y={Mf:function(){re=dd=!0}};Y.forceLongPolling=Y.Mf;Y.Nf=function(){se=!0};Y.forceWebSockets=Y.Nf;Y.Tf=function(){return cd.isAvailable()};Y.isWebSocketsAvailable=Y.Tf;Y.lg=function(a,b){a.u.Ra.xe=b};Y.setSecurityDebugCallback=Y.lg;Y.ze=function(a,b){a.u.ze(b)};Y.stats=Y.ze;Y.Ae=function(a,b){a.u.Ae(b)};Y.statsIncrementCounter=Y.Ae;Y.fd=function(a){return a.u.fd};Y.dataUpdateCount=Y.fd;Y.Sf=function(a,b){a.u.he=b};Y.interceptServerData=Y.Sf;function dh(a){this.wa=Q;this.jb=new Cg;this.Be={};this.ic={};this.Cc=a}function eh(a,b,c,d,e){var f=a.jb,h=e;H(d>f.Bc,"Stacking an older write on top of newer ones");n(h)||(h=!0);f.la.push({path:b,Ga:c,Zc:d,visible:h});h&&(f.S=sg(f.S,b,c));f.Bc=d;return e?fh(a,new Ab(ng,b,c)):[]}function gh(a,b,c,d){var e=a.jb;H(d>e.Bc,"Stacking an older merge on top of newer ones");e.la.push({path:b,children:c,Zc:d,visible:!0});e.S=tg(e.S,b,c);e.Bc=d;c=bg(c);return fh(a,new Vc(ng,b,c))}
	function hh(a,b,c){c=c||!1;var d=Dg(a.jb,b);if(a.jb.Ed(b)){var e=Q;null!=d.Ga?e=e.set(C,!0):db(d.children,function(a,b){e=e.set(new L(a),b)});return fh(a,new mg(d.path,e,c))}return[]}function ih(a,b,c){c=bg(c);return fh(a,new Vc(pg,b,c))}function jh(a,b,c,d){d=kh(a,d);if(null!=d){var e=lh(d);d=e.path;e=e.Hb;b=T(d,b);c=new Ab(new og(!1,!0,e,!0),b,c);return mh(a,d,c)}return[]}
	function nh(a,b,c,d){if(d=kh(a,d)){var e=lh(d);d=e.path;e=e.Hb;b=T(d,b);c=bg(c);c=new Vc(new og(!1,!0,e,!0),b,c);return mh(a,d,c)}return[]}
	dh.prototype.Nb=function(a,b){var c=a.path,d=null,e=!1;ig(this.wa,c,function(a,b){var f=T(a,c);d=d||b.hb(f);e=e||null!=zg(b)});var f=this.wa.get(c);f?(e=e||null!=zg(f),d=d||f.hb(C)):(f=new yg,this.wa=this.wa.set(c,f));var h;null!=d?h=!0:(h=!1,d=G,lg(this.wa.subtree(c),function(a,b){var c=b.hb(C);c&&(d=d.T(a,c))}));var k=null!=Bg(f,a);if(!k&&!S(a.m)){var l=oh(a);H(!(l in this.ic),"View does not exist, but we have a tag");var m=ph++;this.ic[l]=m;this.Be["_"+m]=l}h=f.Nb(a,b,new Hg(c,this.jb),d,h);k||
	e||(f=Bg(f,a),h=h.concat(qh(this,a,f)));return h};
	dh.prototype.kb=function(a,b,c){var d=a.path,e=this.wa.get(d),f=[];if(e&&("default"===a.ja()||null!=Bg(e,a))){f=e.kb(a,b,c);e.e()&&(this.wa=this.wa.remove(d));e=f.hg;f=f.Kf;b=-1!==Pa(e,function(a){return S(a.m)});var h=gg(this.wa,d,function(a,b){return null!=zg(b)});if(b&&!h&&(d=this.wa.subtree(d),!d.e()))for(var d=rh(d),k=0;k<d.length;++k){var l=d[k],m=l.V,l=sh(this,l);this.Cc.ye(th(m),uh(this,m),l.ld,l.G)}if(!h&&0<e.length&&!c)if(b)this.Cc.Od(th(a),null);else{var u=this;Ja(e,function(a){a.ja();
	var b=u.ic[oh(a)];u.Cc.Od(th(a),b)})}vh(this,e)}return f};dh.prototype.Aa=function(a,b){var c=this.jb,d=gg(this.wa,a,function(b,c){var d=T(b,a);if(d=c.hb(d))return d});return c.Aa(a,d,b,!0)};function rh(a){return eg(a,function(a,c,d){if(c&&null!=zg(c))return[zg(c)];var e=[];c&&(e=Ag(c));r(d,function(a){e=e.concat(a)});return e})}function vh(a,b){for(var c=0;c<b.length;++c){var d=b[c];if(!S(d.m)){var d=oh(d),e=a.ic[d];delete a.ic[d];delete a.Be["_"+e]}}}
	function th(a){return S(a.m)&&!Sc(a.m)?a.wb():a}function qh(a,b,c){var d=b.path,e=uh(a,b);c=sh(a,c);b=a.Cc.ye(th(b),e,c.ld,c.G);d=a.wa.subtree(d);if(e)H(null==zg(d.value),"If we're adding a query, it shouldn't be shadowed");else for(e=eg(d,function(a,b,c){if(!a.e()&&b&&null!=zg(b))return[Qf(zg(b))];var d=[];b&&(d=d.concat(La(Ag(b),function(a){return a.V})));r(c,function(a){d=d.concat(a)});return d}),d=0;d<e.length;++d)c=e[d],a.Cc.Od(th(c),uh(a,c));return b}
	function sh(a,b){var c=b.V,d=uh(a,c);return{ld:function(){return(b.w()||G).hash()},G:function(b){if("ok"===b){if(d){var f=c.path;if(b=kh(a,d)){var h=lh(b);b=h.path;h=h.Hb;f=T(b,f);f=new Cb(new og(!1,!0,h,!0),f);b=mh(a,b,f)}else b=[]}else b=fh(a,new Cb(pg,c.path));return b}f="Unknown Error";"too_big"===b?f="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==b?f="Client doesn't have permission to access the desired data.":"unavailable"==b&&
	(f="The service is unavailable");f=Error(b+" at "+c.path.toString()+": "+f);f.code=b.toUpperCase();return a.kb(c,null,f)}}}function oh(a){return a.path.toString()+"$"+a.ja()}function lh(a){var b=a.indexOf("$");H(-1!==b&&b<a.length-1,"Bad queryKey.");return{Hb:a.substr(b+1),path:new L(a.substr(0,b))}}function kh(a,b){var c=a.Be,d="_"+b;return d in c?c[d]:void 0}function uh(a,b){var c=oh(b);return w(a.ic,c)}var ph=1;
	function mh(a,b,c){var d=a.wa.get(b);H(d,"Missing sync point for query tag that we're tracking");return d.eb(c,new Hg(b,a.jb),null)}function fh(a,b){return wh(a,b,a.wa,null,new Hg(C,a.jb))}function wh(a,b,c,d,e){if(b.path.e())return xh(a,b,c,d,e);var f=c.get(C);null==d&&null!=f&&(d=f.hb(C));var h=[],k=J(b.path),l=b.Mc(k);if((c=c.children.get(k))&&l)var m=d?d.Q(k):null,k=e.n(k),h=h.concat(wh(a,l,c,m,k));f&&(h=h.concat(f.eb(b,e,d)));return h}
	function xh(a,b,c,d,e){var f=c.get(C);null==d&&null!=f&&(d=f.hb(C));var h=[];c.children.ha(function(c,f){var m=d?d.Q(c):null,u=e.n(c),z=b.Mc(c);z&&(h=h.concat(xh(a,z,f,m,u)))});f&&(h=h.concat(f.eb(b,e,d)));return h};function Te(a,b,c){this.app=c;var d=new Eb(c);this.L=a;this.Va=$c(a);this.Vc=null;this.ca=new Nb;this.vd=1;this.Ra=null;if(b||0<=("object"===typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i))this.va=new Qc(this.L,q(this.Gb,this),d),setTimeout(q(this.Jc,this,!0),0);else{b=c.options.databaseAuthVariableOverride||null;if(null!==b){if("object"!==da(b))throw Error("Only objects are supported for option databaseAuthVariableOverride");
	try{B(b)}catch(e){throw Error("Invalid authOverride provided: "+e);}}this.va=this.Ra=new Pg(this.L,q(this.Gb,this),q(this.Jc,this),q(this.se,this),d,b)}var f=this;Fb(d,function(a){f.va.kf(a)});this.og=ad(a,q(function(){return new Xc(this.Va,this.va)},this));this.mc=new Jg;this.ge=new Gb;this.pd=new dh({ye:function(a,b,c,d){b=[];c=f.ge.j(a.path);c.e()||(b=fh(f.pd,new Ab(pg,a.path,c)),setTimeout(function(){d("ok")},0));return b},Od:ba});yh(this,"connected",!1);this.ia=new mc;this.Ya=new Se(this);this.fd=
	0;this.he=null;this.K=new dh({ye:function(a,b,c,d){f.va.$e(a,c,b,function(b,c){var e=d(b,c);Sb(f.ca,a.path,e)});return[]},Od:function(a,b){f.va.uf(a,b)}})}g=Te.prototype;g.toString=function(){return(this.L.Sc?"https://":"http://")+this.L.host};g.name=function(){return this.L.ne};function zh(a){a=a.ge.j(new L(".info/serverTimeOffset")).H()||0;return(new Date).getTime()+a}function Ah(a){a=a={timestamp:zh(a)};a.timestamp=a.timestamp||(new Date).getTime();return a}
	g.Gb=function(a,b,c,d){this.fd++;var e=new L(a);b=this.he?this.he(a,b):b;a=[];d?c?(b=pa(b,function(a){return M(a)}),a=nh(this.K,e,b,d)):(b=M(b),a=jh(this.K,e,b,d)):c?(d=pa(b,function(a){return M(a)}),a=ih(this.K,e,d)):(d=M(b),a=fh(this.K,new Ab(pg,e,d)));d=e;0<a.length&&(d=Bh(this,e));Sb(this.ca,d,a)};g.Jc=function(a){yh(this,"connected",a);!1===a&&Ch(this)};g.se=function(a){var b=this;Ic(a,function(a,d){yh(b,d,a)})};
	function yh(a,b,c){b=new L("/.info/"+b);c=M(c);var d=a.ge;d.Jd=d.Jd.F(b,c);c=fh(a.pd,new Ab(pg,b,c));Sb(a.ca,b,c)}g.Jb=function(a,b,c,d){this.f("set",{path:a.toString(),value:b,ug:c});var e=Ah(this);b=M(b,c);var e=pc(b,e),f=this.vd++,e=eh(this.K,a,e,f,!0);Ob(this.ca,e);var h=this;this.va.put(a.toString(),b.H(!0),function(b,c){var e="ok"===b;e||O("set at "+a+" failed: "+b);e=hh(h.K,f,!e);Sb(h.ca,a,e);Dh(d,b,c)});e=Eh(this,a);Bh(this,e);Sb(this.ca,e,[])};
	g.update=function(a,b,c){this.f("update",{path:a.toString(),value:b});var d=!0,e=Ah(this),f={};r(b,function(a,b){d=!1;var c=M(a);f[b]=pc(c,e)});if(d)E("update() called with empty data.  Don't do anything."),Dh(c,"ok");else{var h=this.vd++,k=gh(this.K,a,f,h);Ob(this.ca,k);var l=this;this.va.af(a.toString(),b,function(b,d){var e="ok"===b;e||O("update at "+a+" failed: "+b);var e=hh(l.K,h,!e),f=a;0<e.length&&(f=Bh(l,a));Sb(l.ca,f,e);Dh(c,b,d)});r(b,function(b,c){var d=Eh(l,a.n(c));Bh(l,d)});Sb(this.ca,
	a,[])}};function Ch(a){a.f("onDisconnectEvents");var b=Ah(a),c=[];nc(lc(a.ia,b),C,function(b,e){c=c.concat(fh(a.K,new Ab(pg,b,e)));var f=Eh(a,b);Bh(a,f)});a.ia=new mc;Sb(a.ca,C,c)}g.xd=function(a,b){var c=this;this.va.xd(a.toString(),function(d,e){"ok"===d&&Ze(c.ia,a);Dh(b,d,e)})};function nf(a,b,c,d){var e=M(c);a.va.pe(b.toString(),e.H(!0),function(c,h){"ok"===c&&oc(a.ia,b,e);Dh(d,c,h)})}
	function of(a,b,c,d,e){var f=M(c,d);a.va.pe(b.toString(),f.H(!0),function(c,d){"ok"===c&&oc(a.ia,b,f);Dh(e,c,d)})}function pf(a,b,c,d){var e=!0,f;for(f in c)e=!1;e?(E("onDisconnect().update() called with empty data.  Don't do anything."),Dh(d,"ok")):a.va.cf(b.toString(),c,function(e,f){if("ok"===e)for(var l in c){var m=M(c[l]);oc(a.ia,b.n(l),m)}Dh(d,e,f)})}function Zf(a,b,c){c=".info"===J(b.path)?a.pd.Nb(b,c):a.K.Nb(b,c);Qb(a.ca,b.path,c)}g.ab=function(){this.Ra&&this.Ra.ab("repo_interrupt")};
	g.kc=function(){this.Ra&&this.Ra.kc("repo_interrupt")};g.ze=function(a){if("undefined"!==typeof console){a?(this.Vc||(this.Vc=new Mb(this.Va)),a=this.Vc.get()):a=this.Va.get();var b=Ma(ua(a),function(a,b){return Math.max(b.length,a)},0),c;for(c in a){for(var d=a[c],e=c.length;e<b+2;e++)c+=" ";console.log(c+d)}}};g.Ae=function(a){Lb(this.Va,a);this.og.rf[a]=!0};g.f=function(a){var b="";this.Ra&&(b=this.Ra.id+":");E(b,arguments)};
	function Dh(a,b,c){a&&ub(function(){if("ok"==b)a(null);else{var d=(b||"error").toUpperCase(),e=d;c&&(e+=": "+c);e=Error(e);e.code=d;a(e)}})};function Fh(a,b,c,d,e){function f(){}a.f("transaction on "+b);var h=new U(a,b);h.gc("value",f);c={path:b,update:c,G:d,status:null,ef:rc(),Fe:e,of:0,Rd:function(){h.Ic("value",f)},Td:null,Ba:null,cd:null,dd:null,ed:null};d=a.K.Aa(b,void 0)||G;c.cd=d;d=c.update(d.H());if(n(d)){ef("transaction failed: Data returned ",d,c.path);c.status=1;e=Kg(a.mc,b);var k=e.Ca()||[];k.push(c);Lg(e,k);"object"===typeof d&&null!==d&&cb(d,".priority")?(k=w(d,".priority"),H(cf(k),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):
	k=(a.K.Aa(b)||G).C().H();e=Ah(a);d=M(d,k);e=pc(d,e);c.dd=d;c.ed=e;c.Ba=a.vd++;c=eh(a.K,b,e,c.Ba,c.Fe);Sb(a.ca,b,c);Gh(a)}else c.Rd(),c.dd=null,c.ed=null,c.G&&(a=new W(c.cd,new U(a,c.path),N),c.G(null,!1,a))}function Gh(a,b){var c=b||a.mc;b||Hh(a,c);if(null!==c.Ca()){var d=Ih(a,c);H(0<d.length,"Sending zero length transaction queue");Na(d,function(a){return 1===a.status})&&Jh(a,c.path(),d)}else c.kd()&&c.O(function(b){Gh(a,b)})}
	function Jh(a,b,c){for(var d=La(c,function(a){return a.Ba}),e=a.K.Aa(b,d)||G,d=e,e=e.hash(),f=0;f<c.length;f++){var h=c[f];H(1===h.status,"tryToSendTransactionQueue_: items in queue should all be run.");h.status=2;h.of++;var k=T(b,h.path),d=d.F(k,h.dd)}d=d.H(!0);a.va.put(b.toString(),d,function(d){a.f("transaction put response",{path:b.toString(),status:d});var e=[];if("ok"===d){d=[];for(f=0;f<c.length;f++){c[f].status=3;e=e.concat(hh(a.K,c[f].Ba));if(c[f].G){var h=c[f].ed,k=new U(a,c[f].path);d.push(q(c[f].G,
	null,null,!0,new W(h,k,N)))}c[f].Rd()}Hh(a,Kg(a.mc,b));Gh(a);Sb(a.ca,b,e);for(f=0;f<d.length;f++)ub(d[f])}else{if("datastale"===d)for(f=0;f<c.length;f++)c[f].status=4===c[f].status?5:1;else for(O("transaction at "+b.toString()+" failed: "+d),f=0;f<c.length;f++)c[f].status=5,c[f].Td=d;Bh(a,b)}},e)}function Bh(a,b){var c=Kh(a,b),d=c.path(),c=Ih(a,c);Lh(a,c,d);return d}
	function Lh(a,b,c){if(0!==b.length){for(var d=[],e=[],f=Ka(b,function(a){return 1===a.status}),f=La(f,function(a){return a.Ba}),h=0;h<b.length;h++){var k=b[h],l=T(c,k.path),m=!1,u;H(null!==l,"rerunTransactionsUnderNode_: relativePath should not be null.");if(5===k.status)m=!0,u=k.Td,e=e.concat(hh(a.K,k.Ba,!0));else if(1===k.status)if(25<=k.of)m=!0,u="maxretry",e=e.concat(hh(a.K,k.Ba,!0));else{var z=a.K.Aa(k.path,f)||G;k.cd=z;var F=b[h].update(z.H());n(F)?(ef("transaction failed: Data returned ",F,
	k.path),l=M(F),"object"===typeof F&&null!=F&&cb(F,".priority")||(l=l.fa(z.C())),z=k.Ba,F=Ah(a),F=pc(l,F),k.dd=l,k.ed=F,k.Ba=a.vd++,Qa(f,z),e=e.concat(eh(a.K,k.path,F,k.Ba,k.Fe)),e=e.concat(hh(a.K,z,!0))):(m=!0,u="nodata",e=e.concat(hh(a.K,k.Ba,!0)))}Sb(a.ca,c,e);e=[];m&&(b[h].status=3,setTimeout(b[h].Rd,Math.floor(0)),b[h].G&&("nodata"===u?(k=new U(a,b[h].path),d.push(q(b[h].G,null,null,!1,new W(b[h].cd,k,N)))):d.push(q(b[h].G,null,Error(u),!1,null))))}Hh(a,a.mc);for(h=0;h<d.length;h++)ub(d[h]);Gh(a)}}
	function Kh(a,b){for(var c,d=a.mc;null!==(c=J(b))&&null===d.Ca();)d=Kg(d,c),b=D(b);return d}function Ih(a,b){var c=[];Mh(a,b,c);c.sort(function(a,b){return a.ef-b.ef});return c}function Mh(a,b,c){var d=b.Ca();if(null!==d)for(var e=0;e<d.length;e++)c.push(d[e]);b.O(function(b){Mh(a,b,c)})}function Hh(a,b){var c=b.Ca();if(c){for(var d=0,e=0;e<c.length;e++)3!==c[e].status&&(c[d]=c[e],d++);c.length=d;Lg(b,0<c.length?c:null)}b.O(function(b){Hh(a,b)})}
	function Eh(a,b){var c=Kh(a,b).path(),d=Kg(a.mc,b);Og(d,function(b){Nh(a,b)});Nh(a,d);Ng(d,function(b){Nh(a,b)});return c}
	function Nh(a,b){var c=b.Ca();if(null!==c){for(var d=[],e=[],f=-1,h=0;h<c.length;h++)4!==c[h].status&&(2===c[h].status?(H(f===h-1,"All SENT items should be at beginning of queue."),f=h,c[h].status=4,c[h].Td="set"):(H(1===c[h].status,"Unexpected transaction status in abort"),c[h].Rd(),e=e.concat(hh(a.K,c[h].Ba,!0)),c[h].G&&d.push(q(c[h].G,null,Error("set"),!1,null))));-1===f?Lg(b,null):c.length=f+1;Sb(a.ca,b.path(),e);for(h=0;h<d.length;h++)ub(d[h])}};function Ye(){this.lb={};this.wf=!1}Ye.prototype.ab=function(){for(var a in this.lb)this.lb[a].ab()};Ye.prototype.kc=function(){for(var a in this.lb)this.lb[a].kc()};Ye.prototype.ae=function(a){this.wf=a};ca(Ye);Ye.prototype.interrupt=Ye.prototype.ab;Ye.prototype.resume=Ye.prototype.kc;var Z={};Z.nc=Pg;Z.DataConnection=Z.nc;Pg.prototype.ng=function(a,b){this.ua("q",{p:a},b)};Z.nc.prototype.simpleListen=Z.nc.prototype.ng;Pg.prototype.Hf=function(a,b){this.ua("echo",{d:a},b)};Z.nc.prototype.echo=Z.nc.prototype.Hf;Pg.prototype.interrupt=Pg.prototype.ab;Z.zf=Ce;Z.RealTimeConnection=Z.zf;Ce.prototype.sendRequest=Ce.prototype.ua;Ce.prototype.close=Ce.prototype.close;
	Z.Rf=function(a){var b=Pg.prototype.put;Pg.prototype.put=function(c,d,e,f){n(f)&&(f=a());b.call(this,c,d,e,f)};return function(){Pg.prototype.put=b}};Z.hijackHash=Z.Rf;Z.yf=Hb;Z.ConnectionTarget=Z.yf;Z.ja=function(a){return a.ja()};Z.queryIdentifier=Z.ja;Z.Uf=function(a){return a.u.Ra.$};Z.listens=Z.Uf;Z.ae=function(a){Ye.Vb().ae(a)};Z.forceRestClient=Z.ae;Z.Context=Ye;function U(a,b){if(!(a instanceof Te))throw Error("new Firebase() no longer supported - use app.database().");X.call(this,a,b,fe,!1);this.then=void 0;this["catch"]=void 0}la(U,X);g=U.prototype;g.getKey=function(){x("Firebase.key",0,0,arguments.length);return this.path.e()?null:Bd(this.path)};
	g.n=function(a){x("Firebase.child",1,1,arguments.length);if(ga(a))a=String(a);else if(!(a instanceof L))if(null===J(this.path)){var b=a;b&&(b=b.replace(/^\/*\.info(\/|$)/,"/"));lf("Firebase.child",b)}else lf("Firebase.child",a);return new U(this.u,this.path.n(a))};g.getParent=function(){x("Firebase.parent",0,0,arguments.length);var a=this.path.parent();return null===a?null:new U(this.u,a)};
	g.Of=function(){x("Firebase.ref",0,0,arguments.length);for(var a=this;null!==a.getParent();)a=a.getParent();return a};g.Gf=function(){return this.u.Ya};g.set=function(a,b){x("Firebase.set",1,2,arguments.length);mf("Firebase.set",this.path);df("Firebase.set",a,this.path,!1);A("Firebase.set",2,b,!0);var c=new hb;this.u.Jb(this.path,a,null,ib(c,b));return c.ra};
	g.update=function(a,b){x("Firebase.update",1,2,arguments.length);mf("Firebase.update",this.path);if(ea(a)){for(var c={},d=0;d<a.length;++d)c[""+d]=a[d];a=c;O("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}gf("Firebase.update",a,this.path);A("Firebase.update",2,b,!0);c=new hb;this.u.update(this.path,a,ib(c,b));return c.ra};
	g.Jb=function(a,b,c){x("Firebase.setWithPriority",2,3,arguments.length);mf("Firebase.setWithPriority",this.path);df("Firebase.setWithPriority",a,this.path,!1);hf("Firebase.setWithPriority",2,b);A("Firebase.setWithPriority",3,c,!0);if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.setWithPriority failed: "+this.getKey()+" is a read-only object.";var d=new hb;this.u.Jb(this.path,a,b,ib(d,c));return d.ra};
	g.remove=function(a){x("Firebase.remove",0,1,arguments.length);mf("Firebase.remove",this.path);A("Firebase.remove",1,a,!0);return this.set(null,a)};
	g.transaction=function(a,b,c){x("Firebase.transaction",1,3,arguments.length);mf("Firebase.transaction",this.path);A("Firebase.transaction",1,a,!1);A("Firebase.transaction",2,b,!0);if(n(c)&&"boolean"!=typeof c)throw Error(y("Firebase.transaction",3,!0)+"must be a boolean.");if(".length"===this.getKey()||".keys"===this.getKey())throw"Firebase.transaction failed: "+this.getKey()+" is a read-only object.";"undefined"===typeof c&&(c=!0);var d=new hb;ha(b)&&jb(d.ra);Fh(this.u,this.path,a,function(a,c,h){a?
	d.reject(a):d.resolve(new pb(c,h));ha(b)&&b(a,c,h)},c);return d.ra};g.kg=function(a,b){x("Firebase.setPriority",1,2,arguments.length);mf("Firebase.setPriority",this.path);hf("Firebase.setPriority",1,a);A("Firebase.setPriority",2,b,!0);var c=new hb;this.u.Jb(this.path.n(".priority"),a,null,ib(c,b));return c.ra};
	g.push=function(a,b){x("Firebase.push",0,2,arguments.length);mf("Firebase.push",this.path);df("Firebase.push",a,this.path,!0);A("Firebase.push",2,b,!0);var c=zh(this.u),d=uf(c),c=this.n(d);if(null!=a){var e=this,f=c.set(a,b).then(function(){return e.n(d)});c.then=q(f.then,f);c["catch"]=q(f.then,f,void 0);ha(b)&&jb(f)}return c};g.ib=function(){mf("Firebase.onDisconnect",this.path);return new V(this.u,this.path)};U.prototype.child=U.prototype.n;U.prototype.set=U.prototype.set;U.prototype.update=U.prototype.update;
	U.prototype.setWithPriority=U.prototype.Jb;U.prototype.remove=U.prototype.remove;U.prototype.transaction=U.prototype.transaction;U.prototype.setPriority=U.prototype.kg;U.prototype.push=U.prototype.push;U.prototype.onDisconnect=U.prototype.ib;Lc(U.prototype,"database",U.prototype.Gf);Lc(U.prototype,"key",U.prototype.getKey);Lc(U.prototype,"parent",U.prototype.getParent);Lc(U.prototype,"root",U.prototype.Of);if("undefined"===typeof firebase)throw Error("Cannot install Firebase Database - be sure to load firebase-app.js first.");
	try{firebase.INTERNAL.registerService("database",function(a){var b=Ye.Vb(),c=a.options.databaseURL;n(c)||Ac("Can't determine Firebase Database URL.  Be sure to include databaseURL option when calling firebase.intializeApp().");var d=Bc(c),c=d.jc;Xe("Invalid Firebase Database URL",d);d.path.e()||Ac("Database URL must point to the root of a Firebase Database (not including a child path).");(d=w(b.lb,a.name))&&Ac("FIREBASE INTERNAL ERROR: Database initialized multiple times.");d=new Te(c,b.wf,a);b.lb[a.name]=
	d;return d.Ya},{Reference:U,Query:X,Database:Se,enableLogging:xc,INTERNAL:Y,TEST_ACCESS:Z,ServerValue:Ve})}catch(Oh){Ac("Failed to register the Firebase Database Service ("+Oh+")")};})();

	}).call(typeof global !== undefined ? global : typeof self !== undefined ? self : typeof window !== undefined ? window : {});
	module.exports = firebase.database;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var firebase = __webpack_require__(3);
	(function(){
	/*! @license Firebase v3.6.10
	    Build: 3.6.10-rc.1
	    Terms: https://firebase.google.com/terms/ */
	(function(){for(var k,aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},l="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,m=["Number","MIN_SAFE_INTEGER"],ba=0;ba<m.length-1;ba++){var ca=m[ba];ca in l||(l[ca]={});l=l[ca]}var da=m[m.length-1];
	-9007199254740991!=l[da]&&aa(l,da,{configurable:!0,writable:!0,value:-9007199254740991});
	var n=this,q=function(a){return void 0!==a},ea=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&
	!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b};var r=function(a,b){return-1!==a.indexOf(b)};var fa=function(a,b,c){function d(){z||(z=!0,b.apply(null,arguments))}function e(b){p=setTimeout(function(){p=null;a(f,2===C)},b)}function f(a,b){if(!z)if(a)d.apply(null,arguments);else if(2===C||B)d.apply(null,arguments);else{64>h&&(h*=2);var c;1===C?(C=2,c=0):c=1E3*(h+Math.random());e(c)}}function g(a){Ma||(Ma=!0,z||(null!==p?(a||(C=2),clearTimeout(p),e(0)):a||(C=1)))}var h=1,p=null,B=!1,C=0,z=!1,Ma=!1;e(0);setTimeout(function(){B=!0;g(!0)},c);return g};var t="https://firebasestorage.googleapis.com";var u=function(a,b){this.code="storage/"+a;this.message="Firebase Storage: "+b;this.serverResponse=null;this.name="FirebaseError"};(function(){var a=Error;function b(){}b.prototype=a.prototype;u.b=a.prototype;u.prototype=new b;u.a=function(b,d,e){for(var c=Array(arguments.length-2),g=2;g<arguments.length;g++)c[g-2]=arguments[g];return a.prototype[d].apply(b,c)}})();
	var ga=function(){return new u("unknown","An unknown error occurred, please check the error payload for server response.")},ha=function(){return new u("canceled","User canceled the upload/download.")},ia=function(){return new u("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")},ja=function(a,b,c){return new u("invalid-argument","Invalid argument in `"+b+"` at index "+a+": "+c)},ka=function(){return new u("app-deleted","The Firebase app was deleted.")},v=function(a,b){return new u("invalid-format",
	"String does not match format '"+a+"': "+b)},la=function(a){throw new u("internal-error","Internal error: "+a);};var ma=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])},na=function(a){var b={};ma(a,function(a,d){b[a]=d});return b};var oa=function(a,b){b=b.split("/").filter(function(a){return 0<a.length}).join("/");return 0===a.length?b:a+"/"+b},pa=function(a){var b=a.lastIndexOf("/",a.length-2);return-1===b?a:a.slice(b+1)};var qa=function(a){if("undefined"!==typeof firebase)return new firebase.Promise(a);throw Error("Error in Firebase Storage - be sure to load firebase-app.js first.");};var w=function(a,b,c,d){this.h=a;this.b={};this.method=b;this.headers={};this.body=null;this.j=c;this.l=this.a=null;this.c=[200];this.g=[];this.timeout=d;this.f=!0};var ra={STATE_CHANGED:"state_changed"},x={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"},sa=function(a){switch(a){case "running":case "pausing":case "canceling":return"running";case "paused":return"paused";case "success":return"success";case "canceled":return"canceled";case "error":return"error";default:return"error"}};var y=function(a){return q(a)&&null!==a},ta=function(a){return"string"===typeof a||a instanceof String},ua=function(){return"undefined"!==typeof Blob};var wa=function(a,b){var c=va;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var xa=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},ya=function(a,b){return a<b?-1:a>b?1:0};var A=function(a){return function(){var b=[];Array.prototype.push.apply(b,arguments);firebase.Promise.resolve(!0).then(function(){a.apply(null,b)})}};var D=function(a,b){this.bucket=a;this.path=b},za=function(a){var b=encodeURIComponent;return"/b/"+b(a.bucket)+"/o/"+b(a.path)},Aa=function(a){for(var b=null,c=[{K:/^gs:\/\/([A-Za-z0-9.\-]+)(\/(.*))?$/i,G:{bucket:1,path:3},J:function(a){"/"===a.path.charAt(a.path.length-1)&&(a.path=a.path.slice(0,-1))}},{K:/^https?:\/\/firebasestorage\.googleapis\.com\/v[A-Za-z0-9_]+\/b\/([A-Za-z0-9.\-]+)\/o(\/([^?#]*).*)?$/i,G:{bucket:1,path:3},J:function(a){a.path=decodeURIComponent(a.path)}}],d=0;d<c.length;d++){var e=
	c[d],f=e.K.exec(a);if(f){b=f[e.G.bucket];(f=f[e.G.path])||(f="");b=new D(b,f);e.J(b);break}}if(null==b)throw new u("invalid-url","Invalid URL '"+a+"'.");return b};var Ba=function(a,b,c){"function"==ea(a)||y(b)||y(c)?(this.b=a,this.error=b||null,this.a=c||null):(this.b=a.next||null,this.error=a.error||null,this.a=a.complete||null)};var E={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},Ca=function(a){switch(a){case "raw":case "base64":case "base64url":case "data_url":break;default:throw"Expected one of the event types: [raw, base64, base64url, data_url].";}},Da=function(a,b){this.data=a;this.a=b||null},Ha=function(a,b){switch(a){case "raw":return new Da(Ea(b));case "base64":case "base64url":return new Da(Fa(a,b));case "data_url":a=new Ga(b);var c;if(a.a)c=Fa("base64",a.c);else{try{c=decodeURIComponent(a.c)}catch(d){throw v("data_url",
	"Malformed data URL.");}c=Ea(c)}return new Da(c,(new Ga(b)).b)}throw ga();},Ea=function(a){for(var b=[],c=0;c<a.length;c++){var d=a.charCodeAt(c);if(127>=d)b.push(d);else if(2047>=d)b.push(192|d>>6,128|d&63);else if(55296==(d&64512))if(c<a.length-1&&56320==(a.charCodeAt(c+1)&64512)){var e=a.charCodeAt(++c),d=65536|(d&1023)<<10|e&1023;b.push(240|d>>18,128|d>>12&63,128|d>>6&63,128|d&63)}else b.push(239,191,189);else 56320==(d&64512)?b.push(239,191,189):b.push(224|d>>12,128|d>>6&63,128|d&63)}return new Uint8Array(b)},
	Fa=function(a,b){switch(a){case "base64":var c=-1!==b.indexOf("-"),d=-1!==b.indexOf("_");if(c||d)throw v(a,"Invalid character '"+(c?"-":"_")+"' found: is it base64url encoded?");break;case "base64url":c=-1!==b.indexOf("+");d=-1!==b.indexOf("/");if(c||d)throw v(a,"Invalid character '"+(c?"+":"/")+"' found: is it base64 encoded?");b=b.replace(/-/g,"+").replace(/_/g,"/")}var e;try{e=atob(b)}catch(f){throw v(a,"Invalid character found");}a=new Uint8Array(e.length);for(b=0;b<e.length;b++)a[b]=e.charCodeAt(b);
	return a},Ga=function(a){var b=a.match(/^data:([^,]+)?,/);if(null===b)throw v("data_url","Must be formatted 'data:[<mediatype>][;base64],<data>");b=b[1]||null;this.a=!1;this.b=null;if(null!=b){var c=b.length-7;this.b=(this.a=0<=c&&b.indexOf(";base64",c)==c)?b.substring(0,b.length-7):b}this.c=a.substring(a.indexOf(",")+1)};var Ia=function(a){var b=encodeURIComponent,c="?";ma(a,function(a,e){a=b(a)+"="+b(e);c=c+a+"&"});return c=c.slice(0,-1)};var Ja=function(){var a=this;this.a=new XMLHttpRequest;this.c=0;this.f=qa(function(b){a.a.addEventListener("abort",function(){a.c=2;b(a)});a.a.addEventListener("error",function(){a.c=1;b(a)});a.a.addEventListener("load",function(){b(a)})});this.b=!1},Ka=function(a,b,c,d,e){if(a.b)throw la("cannot .send() more than once");a.b=!0;a.a.open(c,b,!0);y(e)&&ma(e,function(b,c){a.a.setRequestHeader(b,c.toString())});y(d)?a.a.send(d):a.a.send();return a.f},La=function(a){if(!a.b)throw la("cannot .getErrorCode() before sending");
	return a.c},F=function(a){if(!a.b)throw la("cannot .getStatus() before sending");try{return a.a.status}catch(b){return-1}},Na=function(a){if(!a.b)throw la("cannot .getResponseText() before sending");return a.a.responseText};Ja.prototype.abort=function(){this.a.abort()};var G=function(a,b,c,d,e,f){this.b=a;this.h=b;this.f=c;this.a=d;this.g=e;this.c=f};k=G.prototype;k.V=function(){return this.b};k.qa=function(){return this.h};k.na=function(){return this.f};k.ia=function(){return this.a};k.W=function(){if(y(this.a)){var a=this.a.downloadURLs;return y(a)&&y(a[0])?a[0]:null}return null};k.pa=function(){return this.g};k.la=function(){return this.c};var H;a:{var Oa=n.navigator;if(Oa){var Pa=Oa.userAgent;if(Pa){H=Pa;break a}}H=""};var Ra=function(a,b,c,d,e,f,g,h,p,B,C){this.C=a;this.A=b;this.v=c;this.o=d;this.B=e.slice();this.m=f.slice();this.j=this.l=this.c=this.b=null;this.f=this.g=!1;this.s=g;this.h=h;this.D=C;this.w=p;var z=this;this.u=qa(function(a,b){z.l=a;z.j=b;Qa(z)})},Sa=function(a,b,c){this.b=a;this.c=b;this.a=!!c},Qa=function(a){function b(a,b){b?a(!1,new Sa(!1,null,!0)):(b=new Ja,b.a.withCredentials=d.D,d.b=b,Ka(b,d.C,d.A,d.o,d.v).then(function(b){d.b=null;var c=0===La(b),e=F(b);if(!(c=!c))var c=r([408,429],e),
	f=r(d.m,e),c=500<=e&&600>e||c||f;c?(b=2===La(b),a(!1,new Sa(!1,null,b))):a(!0,new Sa(r(d.B,e),b))}))}function c(a,b){var c=d.l;a=d.j;var e=b.c;if(b.b)try{var f=d.s(e,Na(e));q(f)?c(f):c()}catch(B){a(B)}else null!==e?(b=ga(),f=Na(e),b.serverResponse=f,d.h?a(d.h(e,b)):a(b)):(b=b.a?d.f?ka():ha():new u("retry-limit-exceeded","Max retry time for operation exceeded, please try again."),a(b))}var d=a;a.g?c(0,new Sa(!1,null,!0)):a.c=fa(b,c,a.w)};Ra.prototype.a=function(){return this.u};
	Ra.prototype.cancel=function(a){this.g=!0;this.f=a||!1;null!==this.c&&(0,this.c)(!1);null!==this.b&&this.b.abort()};var Ta=function(a,b,c){var d=Ia(a.b),d=a.h+d,e=a.headers?na(a.headers):{};null!==b&&0<b.length&&(e.Authorization="Firebase "+b);e["X-Firebase-Storage-Version"]="webjs/"+("undefined"!==typeof firebase?firebase.SDK_VERSION:"AppManager");return new Ra(d,a.method,e,a.body,a.c,a.g,a.j,a.a,a.timeout,0,c)};var Ua=function(){};var Va=function(a){this.b=firebase.Promise.reject(a)};Va.prototype.a=function(){return this.b};Va.prototype.cancel=function(){};var Wa=function(){this.a={};this.b=Number.MIN_SAFE_INTEGER},Xa=function(a,b){function c(){delete e.a[d]}var d=a.b;a.b++;a.a[d]=b;var e=a;b.a().then(c,c)},Ya=function(a){ma(a.a,function(a,c){c&&c.cancel(!0)});a.a={}};var Za=function(a,b,c,d,e){this.a=a;this.g=null;if(null!==this.a&&(a=this.a.options,y(a))){a=a.storageBucket||null;if(null==a)a=null;else{var f=null;try{f=Aa(a)}catch(g){}if(null!==f){if(""!==f.path)throw new u("invalid-default-bucket","Invalid default bucket '"+a+"'.");a=f.bucket}}this.g=a}this.o=b;this.m=c;this.j=e;this.l=d;this.c=12E4;this.b=6E4;this.h=new Wa;this.f=!1},$a=function(a){return null!==a.a&&y(a.a.INTERNAL)&&y(a.a.INTERNAL.getToken)?a.a.INTERNAL.getToken().then(function(a){return y(a)?
	a.accessToken:null},function(){return null}):firebase.Promise.resolve(null)};Za.prototype.bucket=function(){if(this.f)throw ka();return this.g};var I=function(a,b,c){if(a.f)return new Va(ka());b=a.m(b,c,null===a.a,a.j);Xa(a.h,b);return b};var ab=-1!=H.indexOf("Opera"),bb=-1!=H.indexOf("Trident")||-1!=H.indexOf("MSIE"),cb=-1!=H.indexOf("Edge"),db=-1!=H.indexOf("Gecko")&&!(-1!=H.toLowerCase().indexOf("webkit")&&-1==H.indexOf("Edge"))&&!(-1!=H.indexOf("Trident")||-1!=H.indexOf("MSIE"))&&-1==H.indexOf("Edge"),eb=-1!=H.toLowerCase().indexOf("webkit")&&-1==H.indexOf("Edge"),fb;
	a:{var gb="",hb=function(){var a=H;if(db)return/rv\:([^\);]+)(\)|;)/.exec(a);if(cb)return/Edge\/([\d\.]+)/.exec(a);if(bb)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(eb)return/WebKit\/(\S+)/.exec(a);if(ab)return/(?:Version)[ \/]?(\S+)/.exec(a)}();hb&&(gb=hb?hb[1]:"");if(bb){var ib,jb=n.document;ib=jb?jb.documentMode:void 0;if(null!=ib&&ib>parseFloat(gb)){fb=String(ib);break a}}fb=gb}
	var kb=fb,va={},lb=function(a){return wa(a,function(){for(var b=0,c=xa(String(kb)).split("."),d=xa(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==g[0].length&&0==h[0].length)break;b=ya(0==g[1].length?0:parseInt(g[1],10),0==h[1].length?0:parseInt(h[1],10))||ya(0==g[2].length,0==h[2].length)||ya(g[2],h[2]);g=g[3];h=h[3]}while(0==b)}return 0<=b})};var mb=function(a){var b=n.BlobBuilder||n.WebKitBlobBuilder;if(q(b)){for(var b=new b,c=0;c<arguments.length;c++)b.append(arguments[c]);return b.getBlob()}b=Array.prototype.slice.call(arguments);c=n.BlobBuilder||n.WebKitBlobBuilder;if(q(c)){for(var c=new c,d=0;d<b.length;d++)c.append(b[d],void 0);b=c.getBlob(void 0)}else if(q(n.Blob))b=new Blob(b,{});else throw Error("This browser doesn't seem to support creating Blobs");return b},nb=function(a,b,c){q(c)||(c=a.size);return a.webkitSlice?a.webkitSlice(b,
	c):a.mozSlice?a.mozSlice(b,c):a.slice?db&&!lb("13.0")||eb&&!lb("537.1")?(0>b&&(b+=a.size),0>b&&(b=0),0>c&&(c+=a.size),c<b&&(c=b),a.slice(b,c-b)):a.slice(b,c):null};var ob=function(a,b){return b},J=function(a,b,c,d){this.c=a;this.b=b||a;this.writable=!!c;this.a=d||ob},pb=null,qb=function(){if(pb)return pb;var a=[];a.push(new J("bucket"));a.push(new J("generation"));a.push(new J("metageneration"));a.push(new J("name","fullPath",!0));var b=new J("name");b.a=function(a,b){return!ta(b)||2>b.length?b:pa(b)};a.push(b);b=new J("size");b.a=function(a,b){return y(b)?+b:b};a.push(b);a.push(new J("timeCreated"));a.push(new J("updated"));a.push(new J("md5Hash",null,!0));
	a.push(new J("cacheControl",null,!0));a.push(new J("contentDisposition",null,!0));a.push(new J("contentEncoding",null,!0));a.push(new J("contentLanguage",null,!0));a.push(new J("contentType",null,!0));a.push(new J("metadata","customMetadata",!0));a.push(new J("downloadTokens","downloadURLs",!1,function(a,b){if(!(ta(b)&&0<b.length))return[];var c=encodeURIComponent;return b.split(",").map(function(b){var d=a.fullPath,d="https://firebasestorage.googleapis.com/v0"+("/b/"+c(a.bucket)+"/o/"+c(d));b=Ia({alt:"media",
	token:b});return d+b})}));return pb=a},rb=function(a,b){Object.defineProperty(a,"ref",{get:function(){return b.o(b,new D(a.bucket,a.fullPath))}})},sb=function(a,b){for(var c={},d=b.length,e=0;e<d;e++){var f=b[e];f.writable&&(c[f.c]=a[f.b])}return JSON.stringify(c)},tb=function(a){if(!a||"object"!==typeof a)throw"Expected Metadata object.";for(var b in a){var c=a[b];if("customMetadata"===b){if("object"!==typeof c)throw"Expected object for 'customMetadata' mapping.";}else if(null!=c&&"object"===typeof c)throw"Mapping for '"+
	b+"' cannot be an object.";}};var K=function(a,b,c){for(var d=b.length,e=b.length,f=0;f<b.length;f++)if(b[f].b){d=f;break}if(!(d<=c.length&&c.length<=e))throw d===e?(b=d,d=1===d?"argument":"arguments"):(b="between "+d+" and "+e,d="arguments"),new u("invalid-argument-count","Invalid argument count in `"+a+"`: Expected "+b+" "+d+", received "+c.length+".");for(f=0;f<c.length;f++)try{b[f].a(c[f])}catch(g){if(g instanceof Error)throw ja(f,a,g.message);throw ja(f,a,g);}},L=function(a,b){var c=this;this.a=function(b){c.b&&!q(b)||a(b)};
	this.b=!!b},ub=function(a,b){return function(c){a(c);b(c)}},M=function(a,b){function c(a){if(!("string"===typeof a||a instanceof String))throw"Expected string.";}var d;a?d=ub(c,a):d=c;return new L(d,b)},vb=function(){return new L(function(a){if(!(a instanceof Uint8Array||a instanceof ArrayBuffer||ua()&&a instanceof Blob))throw"Expected Blob or File.";})},wb=function(){return new L(function(a){if(!(("number"===typeof a||a instanceof Number)&&0<=a))throw"Expected a number 0 or greater.";})},xb=function(a,
	b){return new L(function(b){if(!(null===b||y(b)&&b instanceof Object))throw"Expected an Object.";y(a)&&a(b)},b)},N=function(){return new L(function(a){if(null!==a&&"function"!=ea(a))throw"Expected a Function.";},!0)};var O=function(a,b){ua()&&a instanceof Blob?(this.i=a,b=a.size,a=a.type):(a instanceof ArrayBuffer?(b?this.i=new Uint8Array(a):(this.i=new Uint8Array(a.byteLength),this.i.set(new Uint8Array(a))),b=this.i.length):(b?this.i=a:(this.i=new Uint8Array(a.length),this.i.set(a)),b=a.length),a="");this.a=b;this.b=a};O.prototype.type=function(){return this.b};
	O.prototype.slice=function(a,b){if(ua()&&this.i instanceof Blob)return a=nb(this.i,a,b),null===a?null:new O(a);a=new Uint8Array(this.i.buffer,a,b-a);return new O(a,!0)};
	var yb=function(a){var b=[];Array.prototype.push.apply(b,arguments);if(ua())return b=b.map(function(a){return a instanceof O?a.i:a}),new O(mb.apply(null,b));var b=b.map(function(a){return ta(a)?Ha("raw",a).data.buffer:a.i.buffer}),c=0;b.forEach(function(a){c+=a.byteLength});var d=new Uint8Array(c),e=0;b.forEach(function(a){a=new Uint8Array(a);for(var b=0;b<a.length;b++)d[e++]=a[b]});return new O(d,!0)};var P=function(a){if(!a)throw ga();},zb=function(a,b){return function(c,d){var e;a:{try{e=JSON.parse(d)}catch(h){e=null;break a}c=typeof e;e="object"==c&&null!=e||"function"==c?e:null}if(null===e)e=null;else{c={type:"file"};d=b.length;for(var f=0;f<d;f++){var g=b[f];c[g.b]=g.a(c,e[g.c])}rb(c,a);e=c}P(null!==e);return e}},Q=function(a){return function(b,c){b=401===F(b)?new u("unauthenticated","User is not authenticated, please authenticate using Firebase Authentication and try again."):402===F(b)?
	new u("quota-exceeded","Quota for bucket '"+a.bucket+"' exceeded, please view quota on https://firebase.google.com/pricing/."):403===F(b)?new u("unauthorized","User does not have permission to access '"+a.path+"'."):c;b.serverResponse=c.serverResponse;return b}},Ab=function(a){var b=Q(a);return function(c,d){var e=b(c,d);404===F(c)&&(e=new u("object-not-found","Object '"+a.path+"' does not exist."));e.serverResponse=d.serverResponse;return e}},Bb=function(a,b,c){var d=za(b);a=new w(t+"/v0"+d,"GET",
	zb(a,c),a.c);a.a=Ab(b);return a},Cb=function(a,b){var c=za(b);a=new w(t+"/v0"+c,"DELETE",function(){},a.c);a.c=[200,204];a.a=Ab(b);return a},Db=function(a,b,c){c=c?na(c):{};c.fullPath=a.path;c.size=b.a;c.contentType||(a=b&&b.type()||"application/octet-stream",c.contentType=a);return c},Eb=function(a,b,c,d,e){var f="/b/"+encodeURIComponent(b.bucket)+"/o",g={"X-Goog-Upload-Protocol":"multipart"},h;h="";for(var p=0;2>p;p++)h+=Math.random().toString().slice(2);g["Content-Type"]="multipart/related; boundary="+
	h;e=Db(b,d,e);p=sb(e,c);d=yb("--"+h+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+p+"\r\n--"+h+"\r\nContent-Type: "+e.contentType+"\r\n\r\n",d,"\r\n--"+h+"--");if(null===d)throw ia();a=new w(t+"/v0"+f,"POST",zb(a,c),a.b);a.b={name:e.fullPath};a.headers=g;a.body=d.i;a.a=Q(b);return a},Fb=function(a,b,c,d){this.a=a;this.total=b;this.b=!!c;this.c=d||null},Gb=function(a,b){var c;try{c=a.a.getResponseHeader("X-Goog-Upload-Status")}catch(d){P(!1)}P(r(b||["active"],c));return c},Hb=function(a,
	b,c,d,e){var f="/b/"+encodeURIComponent(b.bucket)+"/o",g=Db(b,d,e);e={name:g.fullPath};f=t+"/v0"+f;d={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":d.a,"X-Goog-Upload-Header-Content-Type":g.contentType,"Content-Type":"application/json; charset=utf-8"};c=sb(g,c);a=new w(f,"POST",function(a){Gb(a);var b;try{b=a.a.getResponseHeader("X-Goog-Upload-URL")}catch(B){P(!1)}P(ta(b));return b},a.b);a.b=e;a.headers=d;a.body=c;a.a=Q(b);return a},Ib=
	function(a,b,c,d){a=new w(c,"POST",function(a){var b=Gb(a,["active","final"]),c;try{c=a.a.getResponseHeader("X-Goog-Upload-Size-Received")}catch(h){P(!1)}a=c;isFinite(a)&&(a=String(a));a="string"==typeof a?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN;P(!isNaN(a));return new Fb(a,d.a,"final"===b)},a.b);a.headers={"X-Goog-Upload-Command":"query"};a.a=Q(b);a.f=!1;return a},Jb=function(a,b,c,d,e,f,g){var h=new Fb(0,0);g?(h.a=g.a,h.total=g.total):(h.a=0,h.total=d.a);if(d.a!==h.total)throw new u("server-file-wrong-size",
	"Server recorded incorrect upload file size, please retry the upload.");var p=g=h.total-h.a;0<e&&(p=Math.min(p,e));var B=h.a;e={"X-Goog-Upload-Command":p===g?"upload, finalize":"upload","X-Goog-Upload-Offset":h.a};g=d.slice(B,B+p);if(null===g)throw ia();c=new w(c,"POST",function(a,c){var e=Gb(a,["active","final"]),g=h.a+p,C=d.a,z;"final"===e?z=zb(b,f)(a,c):z=null;return new Fb(g,C,"final"===e,z)},b.b);c.headers=e;c.body=g.i;c.l=null;c.a=Q(a);c.f=!1;return c};var T=function(a,b,c,d,e,f){this.L=a;this.c=b;this.l=c;this.f=e;this.h=f||null;this.s=d;this.m=0;this.D=this.u=!1;this.B=[];this.S=262144<this.f.a;this.b="running";this.a=this.v=this.g=null;this.j=1;var g=this;this.F=function(a){g.a=null;g.j=1;"storage/canceled"===a.code?(g.u=!0,R(g)):(g.g=a,S(g,"error"))};this.P=function(a){g.a=null;"storage/canceled"===a.code?R(g):(g.g=a,S(g,"error"))};this.A=this.o=null;this.C=qa(function(a,b){g.o=a;g.A=b;Kb(g)});this.C.then(null,function(){})},Kb=function(a){"running"===
	a.b&&null===a.a&&(a.S?null===a.v?Lb(a):a.u?Mb(a):a.D?Nb(a):Ob(a):Pb(a))},U=function(a,b){$a(a.c).then(function(c){switch(a.b){case "running":b(c);break;case "canceling":S(a,"canceled");break;case "pausing":S(a,"paused")}})},Lb=function(a){U(a,function(b){var c=Hb(a.c,a.l,a.s,a.f,a.h);a.a=I(a.c,c,b);a.a.a().then(function(b){a.a=null;a.v=b;a.u=!1;R(a)},this.F)})},Mb=function(a){var b=a.v;U(a,function(c){var d=Ib(a.c,a.l,b,a.f);a.a=I(a.c,d,c);a.a.a().then(function(b){a.a=null;Qb(a,b.a);a.u=!1;b.b&&(a.D=
	!0);R(a)},a.F)})},Ob=function(a){var b=262144*a.j,c=new Fb(a.m,a.f.a),d=a.v;U(a,function(e){var f;try{f=Jb(a.l,a.c,d,a.f,b,a.s,c)}catch(g){a.g=g;S(a,"error");return}a.a=I(a.c,f,e);a.a.a().then(function(b){33554432>262144*a.j&&(a.j*=2);a.a=null;Qb(a,b.a);b.b?(a.h=b.c,S(a,"success")):R(a)},a.F)})},Nb=function(a){U(a,function(b){var c=Bb(a.c,a.l,a.s);a.a=I(a.c,c,b);a.a.a().then(function(b){a.a=null;a.h=b;S(a,"success")},a.P)})},Pb=function(a){U(a,function(b){var c=Eb(a.c,a.l,a.s,a.f,a.h);a.a=I(a.c,c,
	b);a.a.a().then(function(b){a.a=null;a.h=b;Qb(a,a.f.a);S(a,"success")},a.F)})},Qb=function(a,b){var c=a.m;a.m=b;a.m>c&&V(a)},S=function(a,b){if(a.b!==b)switch(b){case "canceling":a.b=b;null!==a.a&&a.a.cancel();break;case "pausing":a.b=b;null!==a.a&&a.a.cancel();break;case "running":var c="paused"===a.b;a.b=b;c&&(V(a),Kb(a));break;case "paused":a.b=b;V(a);break;case "canceled":a.g=ha();a.b=b;V(a);break;case "error":a.b=b;V(a);break;case "success":a.b=b,V(a)}},R=function(a){switch(a.b){case "pausing":S(a,
	"paused");break;case "canceling":S(a,"canceled");break;case "running":Kb(a)}};T.prototype.w=function(){return new G(this.m,this.f.a,sa(this.b),this.h,this,this.L)};
	T.prototype.M=function(a,b,c,d){function e(a){try{g(a);return}catch(z){}try{if(h(a),!(q(a.next)||q(a.error)||q(a.complete)))throw"";}catch(z){throw"Expected a function or an Object with one of `next`, `error`, `complete` properties.";}}function f(a){return function(b,c,d){null!==a&&K("on",a,arguments);var e=new Ba(b,c,d);Rb(p,e);return function(){var a=p.B,b=a.indexOf(e);-1!==b&&a.splice(b,1)}}}var g=N().a,h=xb(null,!0).a;K("on",[M(function(){if("state_changed"!==a)throw"Expected one of the event types: [state_changed].";
	}),xb(e,!0),N(),N()],arguments);var p=this,B=[xb(function(a){if(null===a)throw"Expected a function or an Object with one of `next`, `error`, `complete` properties.";e(a)}),N(),N()];return q(b)||q(c)||q(d)?f(null)(b,c,d):f(B)};T.prototype.then=function(a,b){return this.C.then(a,b)};T.prototype["catch"]=function(a){return this.then(null,a)};
	var Rb=function(a,b){a.B.push(b);Sb(a,b)},V=function(a){Tb(a);Array.prototype.slice.call(a.B).forEach(function(b){Sb(a,b)})},Tb=function(a){if(null!==a.o){var b=!0;switch(sa(a.b)){case "success":A(a.o.bind(null,a.w()))();break;case "canceled":case "error":A(a.A.bind(null,a.g))();break;default:b=!1}b&&(a.o=null,a.A=null)}},Sb=function(a,b){switch(sa(a.b)){case "running":case "paused":null!==b.b&&A(b.b.bind(b,a.w()))();break;case "success":null!==b.a&&A(b.a.bind(b))();break;case "canceled":case "error":null!==
	b.error&&A(b.error.bind(b,a.g))();break;default:null!==b.error&&A(b.error.bind(b,a.g))()}};T.prototype.O=function(){K("resume",[],arguments);var a="paused"===this.b||"pausing"===this.b;a&&S(this,"running");return a};T.prototype.N=function(){K("pause",[],arguments);var a="running"===this.b;a&&S(this,"pausing");return a};T.prototype.cancel=function(){K("cancel",[],arguments);var a="running"===this.b||"pausing"===this.b;a&&S(this,"canceling");return a};var W=function(a,b){this.a=a;if(b)this.location=b instanceof D?b:Aa(b);else if(a=a.bucket(),null!==a)this.location=new D(a,"");else throw new u("no-default-bucket","No default bucket found. Did you set the 'storageBucket' property when initializing the app?");};W.prototype.toString=function(){K("toString",[],arguments);return"gs://"+this.location.bucket+"/"+this.location.path};var Ub=function(a,b){return new W(a,b)};k=W.prototype;
	k.H=function(a){K("child",[M()],arguments);var b=oa(this.location.path,a);return Ub(this.a,new D(this.location.bucket,b))};k.ka=function(){var a;a=this.location.path;if(0==a.length)a=null;else{var b=a.lastIndexOf("/");a=-1===b?"":a.slice(0,b)}return null===a?null:Ub(this.a,new D(this.location.bucket,a))};k.ma=function(){return Ub(this.a,new D(this.location.bucket,""))};k.U=function(){return this.location.bucket};k.fa=function(){return this.location.path};k.ja=function(){return pa(this.location.path)};
	k.oa=function(){return this.a.l};k.Z=function(a,b){K("put",[vb(),new L(tb,!0)],arguments);X(this,"put");return new T(this,this.a,this.location,qb(),new O(a),b)};k.$=function(a,b,c){K("putString",[M(),M(Ca,!0),new L(tb,!0)],arguments);X(this,"putString");var d=Ha(y(b)?b:"raw",a),e=c?na(c):{};!y(e.contentType)&&y(d.a)&&(e.contentType=d.a);return new T(this,this.a,this.location,qb(),new O(d.data,!0),e)};
	k.X=function(){K("delete",[],arguments);X(this,"delete");var a=this;return $a(this.a).then(function(b){var c=Cb(a.a,a.location);return I(a.a,c,b).a()})};k.I=function(){K("getMetadata",[],arguments);X(this,"getMetadata");var a=this;return $a(this.a).then(function(b){var c=Bb(a.a,a.location,qb());return I(a.a,c,b).a()})};
	k.aa=function(a){K("updateMetadata",[new L(tb,void 0)],arguments);X(this,"updateMetadata");var b=this;return $a(this.a).then(function(c){var d=b.a,e=b.location,f=a,g=qb(),h=za(e),h=t+"/v0"+h,f=sb(f,g),d=new w(h,"PATCH",zb(d,g),d.c);d.headers={"Content-Type":"application/json; charset=utf-8"};d.body=f;d.a=Ab(e);return I(b.a,d,c).a()})};
	k.Y=function(){K("getDownloadURL",[],arguments);X(this,"getDownloadURL");return this.I().then(function(a){a=a.downloadURLs[0];if(y(a))return a;throw new u("no-download-url","The given file does not have any download URLs.");})};var X=function(a,b){if(""===a.location.path)throw new u("invalid-root-operation","The operation '"+b+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').");};var Y=function(a,b){this.a=new Za(a,function(a,b){return new W(a,b)},Ta,this,y(b)?b:new Ua);this.b=a;this.c=new Vb(this)};k=Y.prototype;k.ba=function(a){K("ref",[M(function(a){if(/^[A-Za-z]+:\/\//.test(a))throw"Expected child path but got a URL, use refFromURL instead.";},!0)],arguments);var b=new W(this.a);return q(a)?b.H(a):b};
	k.ca=function(a){K("refFromURL",[M(function(a){if(!/^[A-Za-z]+:\/\//.test(a))throw"Expected full URL but got a child path, use ref instead.";try{Aa(a)}catch(c){throw"Expected valid full URL but got an invalid one.";}},!1)],arguments);return new W(this.a,a)};k.ha=function(){return this.a.b};k.ea=function(a){K("setMaxUploadRetryTime",[wb()],arguments);this.a.b=a};k.ga=function(){return this.a.c};k.da=function(a){K("setMaxOperationRetryTime",[wb()],arguments);this.a.c=a};k.T=function(){return this.b};
	k.R=function(){return this.c};var Vb=function(a){this.a=a};Vb.prototype.b=function(){var a=this.a.a;a.f=!0;a.a=null;Ya(a.h)};var Z=function(a,b,c){Object.defineProperty(a,b,{get:c})};W.prototype.toString=W.prototype.toString;W.prototype.child=W.prototype.H;W.prototype.put=W.prototype.Z;W.prototype.putString=W.prototype.$;W.prototype["delete"]=W.prototype.X;W.prototype.getMetadata=W.prototype.I;W.prototype.updateMetadata=W.prototype.aa;W.prototype.getDownloadURL=W.prototype.Y;Z(W.prototype,"parent",W.prototype.ka);Z(W.prototype,"root",W.prototype.ma);Z(W.prototype,"bucket",W.prototype.U);Z(W.prototype,"fullPath",W.prototype.fa);
	Z(W.prototype,"name",W.prototype.ja);Z(W.prototype,"storage",W.prototype.oa);Y.prototype.ref=Y.prototype.ba;Y.prototype.refFromURL=Y.prototype.ca;Z(Y.prototype,"maxOperationRetryTime",Y.prototype.ga);Y.prototype.setMaxOperationRetryTime=Y.prototype.da;Z(Y.prototype,"maxUploadRetryTime",Y.prototype.ha);Y.prototype.setMaxUploadRetryTime=Y.prototype.ea;Z(Y.prototype,"app",Y.prototype.T);Z(Y.prototype,"INTERNAL",Y.prototype.R);Vb.prototype["delete"]=Vb.prototype.b;Y.prototype.capi_=function(a){t=a};
	T.prototype.on=T.prototype.M;T.prototype.resume=T.prototype.O;T.prototype.pause=T.prototype.N;T.prototype.cancel=T.prototype.cancel;T.prototype.then=T.prototype.then;T.prototype["catch"]=T.prototype["catch"];Z(T.prototype,"snapshot",T.prototype.w);Z(G.prototype,"bytesTransferred",G.prototype.V);Z(G.prototype,"totalBytes",G.prototype.qa);Z(G.prototype,"state",G.prototype.na);Z(G.prototype,"metadata",G.prototype.ia);Z(G.prototype,"downloadURL",G.prototype.W);Z(G.prototype,"task",G.prototype.pa);
	Z(G.prototype,"ref",G.prototype.la);ra.STATE_CHANGED="state_changed";x.RUNNING="running";x.PAUSED="paused";x.SUCCESS="success";x.CANCELED="canceled";x.ERROR="error";E.RAW="raw";E.BASE64="base64";E.BASE64URL="base64url";E.DATA_URL="data_url";
	(function(){function a(a){return new Y(a)}var b={TaskState:x,TaskEvent:ra,StringFormat:E,Storage:Y,Reference:W};if("undefined"!==typeof firebase)firebase.INTERNAL.registerService("storage",a,b);else throw Error("Cannot install Firebase Storage - be sure to load firebase-app.js first.");})();}).call(this);
	}).call(typeof global !== undefined ? global : typeof self !== undefined ? self : typeof window !== undefined ? window : {});
	module.exports = firebase.storage;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	$(function () {
	    var signIn = __webpack_require__(2)["signIn"];

	    $('#navbar-placeholder').on('click', '#login-button', function () {
	        $('#login-popup').fadeIn();
	    });

	    $(document).mouseup(function (e) {
	        var popup = $('#login-popup');
	        if (popup.is(e.target)) {
	            popup.fadeOut();
	        }
	    });

	    $('body').on('keypress', '#login-popup-inner', function(e) {
	        if (e.which === 13) {
	            signIn($('#email').val(), $('#password').val());
	        }
	    });

	    $('body').on('click', '#sign-in-button', function() {
	        signIn($('#email').val(), $('#password').val());
	    });
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	$(function() {
	    var addListing = __webpack_require__(2)['addListing'];
	    var auth = __webpack_require__(2)['auth'];
	    var sendVerificationEmail = __webpack_require__(2)['sendVerificationEmail'];
	    var itemTitle;
	    var itemDescription;
	    var itemTags;
	    var itemPrice;
	    var itemHub;
	    var userID;
	    var itemImages;

	    $('#notVerified-confirmation').hide();

	    var checkBasicItems = function() {
	        var checksPassed = true;
	        userID = auth.currentUser.uid;
	        itemTitle = $("#item-post-title").val();
	        itemDescription = $("#item-post-description").val();

	        itemTags = $('#itemTags').textext()[0].tags()._formData;
	        itemPrice = $("#item-post-price").val();
	        itemImages = [];
	        $('#dropzone').find('img').each(function(index) {
	            itemImages.push($(this).attr('src'));
	        });

	        itemHub = $('#hub-selection').textext()[0].tags()._formData;

	        if (!/^[\w\s\.\,\'\"\!\?\$\#\@\!\%\^\&\*\(\)\-\+\=\/\\]{5,30}$/.test(itemTitle)) {
	            Materialize.toast('Title must be between 5 and 30 characters', 3000, 'rounded');
	            checksPassed = false;
	        } else if (!/^[\w\s\.\,\'\"\!\?\$\#\@\!\%\^\&\*\(\)\-\+\=\/\\]+$/.test(itemDescription) || itemDescription.length < 5) {
	            Materialize.toast('Description can only contain letters and numbers', 3000, 'rounded');
	            checksPassed = false;
	        } else if(!itemPrice.match(/^[0-9]+([.][0-9]{0,2})?$/) || itemPrice < 0.01 || itemPrice > 3000) {
	            Materialize.toast('only enter numbers, and an optional decimal', 3000, 'rounded');
	            checksPassed = false;
	        } else if(itemHub.length < 1 || itemHub.length > 3) {
	            checksPassed = false;
	            Materialize.toast('Please enter up to 3 hubs', 3000, 'rounded');
	        } else if (itemTags.length < 2 || itemTags.length > 5) {
	            Materialize.toast('Please enter 2 to 5 tags', 3000, 'rounded');
	            checksPassed = false;
	        } else if (itemImages.length < 1) {
	            Materialize.toast('Please add at least one image', 3000, 'rounded');
	            checksPassed = false;
	        } else {
	            for (var i = 0; i < itemTags.length; i += 1) {
	                if (!/^[a-zA-Z\-]+$/.test(itemTags[i]) || itemTags[i].length > 15) {
	                    Materialize.toast('tags can only contain letters and hyphens, up to 15 characters', 3000, 'rounded');
	                    checksPassed = false;
	                }
	            }   

	            itemHub.forEach(function(currentHub) {
	                if (!/^[a-zA-Z\-\s]+$/.test(currentHub)) {
	                    Materialize.toast('Hubs can only contain letters, hyphens and spaces', 3000, 'rounded');
	                    checksPassed = false;
	                } 
	            });
	        }

	        return checksPassed;
	    };

	    var addImagesToSlider = function() {
	        var imageCount = ['one', 'two', 'three', 'four'];
	        $('#carousel-wrapper').append($('<div></div>').addClass('carousel carousel-slider'));

	        for (var i = 0; i < itemImages.length; i += 1) {    
	            $('.carousel-slider').append(
	                $('<a></a>').addClass('carousel-item').attr('href', '#' + imageCount[i] + '!').append(
	                    $('<img>').attr('src', itemImages[i])
	                )
	            ); 
	        }
	        $('.carousel.carousel-slider').carousel({full_width: true, indicators: true});
	    };

	    $("#post-preview").click(function () {
	        if (checkBasicItems()) {
	            addImagesToSlider();
	            
	            $('#preview-submit-tab').removeClass('disabled');
	            $('ul.tabs').tabs('select_tab', 'preview-submit');
	            $('#basic-info-tab').addClass('disabled');

	            $('#preview-title').append(itemTitle);
	            $('#preview-price').append(itemPrice);
	            $('#preview-description').append(itemDescription);
	            
	            for (tag of itemTags) {
	                $('#preview-tags').append(
	                    $('<a></a>').attr('href', '#').addClass('hub-card').text(tag)
	                );
	                $('#preview-tags').append(" ");
	            }
	        }
	    });

	    $('#back-to-preview').on('click', function (e) {
	        $('#basic-info-tab').removeClass('disabled');
	        $('ul.tabs').tabs('select_tab', 'basic-info');
	        $('#preview-submit-tab').addClass('disabled');
	        
	        $('#preview-title').empty();
	        $('#preview-price').empty().text("$");
	        $('#preview-description').empty();
	        $('#preview-tags').empty().append(
	            $('<span>').attr('id', 'preview-tag-blurb').text('Tags: ')
	        );
	        $('#carousel-wrapper').empty();
	    });

	    //add listing
	    $("main").on('click', '#submit-post', function (e) {
	        if (itemTitle && itemDescription && itemTags && itemPrice) {
	            addListing(itemTitle, itemDescription, itemTags, itemPrice, itemHub, userID, itemImages);
	            $("#new-post-main").text("Item has been Posted :)");
	        } else {
	            alert("please enter a username and comment");
	        }
	    });


	    $('.close-button').click(function () {
	        $('#notVerified-popup').animate({
	            opacity: 0,
	            'z-index': -100
	        }, 100);
	    });

	    let initializeTagTextExt = (element, tags) => {
	        var itemTagRef = $(element);
	        itemTagRef.textext({plugins : 'tags autocomplete'})
	            .bind('getSuggestions', function(e, data){
	                var list = tags,
	                    textext = $(e.target).textext()[0],
	                    query = (data ? data.query : '') || '';

	                $(this).trigger('setSuggestions',{
	                    result : textext.itemManager().filter(list, query) }
	                );
	        });        
	    }

	    let checkIfVerified = () => {
	        auth.onAuthStateChanged(function(user) {
	            if (!auth.currentUser.emailVerified) {
	                $('#notVerified-popup').css('z-index', '100').animate({
	                    opacity: 1
	                }, 50);

	                $("#post-preview").addClass('disabled');
	            }
	        });
	    }

	    let initializeCampusTextExt = () => {
	        var hubRef = $('#hub-selection');
	        hubRef.textext({plugins : 'tags autocomplete'})
	            .bind('getSuggestions', function(e, data){
	                var list = [
	                        'Loyola Marymount University',
	                        'UCLA'
	                    ],
	                    textext = $(e.target).textext()[0],
	                    query = (data ? data.query : '') || '';

	                $(this).trigger('setSuggestions',{
	                    result : textext.itemManager().filter(list, query) }
	                );
	        });

	    }

	    $("#notVerified-popup-send-button").click(() => {
	        console.log('button clicked');
	        $('#notVerified-popup-content').fadeOut(500);

	        setTimeout(function () {
	            $('#notVerified-popup-inner').css({
	                'display': 'flex',
	                'align-items': 'center',
	                'justify-content': 'center'
	            });
	            $('#notVerified-confirmation').fadeIn();
	        }, 500);
	        sendVerificationEmail();
	    });

	    if (window.location.pathname === "/new-post/new-post.html") {
	        checkIfVerified();
	        initializeCampusTextExt();
	        initializeTagTextExt('#itemTags', [
	            'Table',
	            'Desk',
	            'Computer',
	            'Electronics',
	            'iPhone',
	            'Cell-Phone',
	            'Apple',
	            'Macbook',
	            'Chair',
	            'Leather',
	            'Clothing',
	            'Bedroom',
	            'Bathroom',
	            'Couch',
	            'Kitchen',
	            'Living-Room',
	            'Dinner-Table'
	        ]);
	    }


	    /**
	        drophub to add images by clicking
	        or by dragging and dropping
	    **/
	    var reader;
	    var drop;

	    $('#dropMain, .drop').on({
	        'click': function(e) {
	            $('#fileBox').click();
	            drop = this;
	            reader = new FileReader();
	        },
	        'dragover dragenter': function(e) {
	            e.preventDefault();
	            e.stopPropagation();
	        },
	        'drop': function(e) {
	            var dropArea = this;
	            var dataTransfer =  e.originalEvent.dataTransfer;
	            if (dataTransfer && dataTransfer.files.length) {
	                e.preventDefault();
	                e.stopPropagation();
	                $.each(dataTransfer.files, function(i, file) { 
	                    reader = new FileReader();
	                    reader.onload = $.proxy(function(file, $fileList, event) {
	                        var img = file.type.match('image.*') ? $("<img>").attr('src', event.target.result) : "";
	                        $fileList.empty().append(img);
	                    }, this, file, $(dropArea));
	                    reader.readAsDataURL(file);
	                });
	            }
	        }
	    });

	    $("#fileBox").change(function() {
	        var fileExtension = ['jpeg', 'jpg', 'png'];
	        if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
	            Materialize.toast('Only formats are allowed : ' + fileExtension.join(', '), 3000, 'rounded');

	        } else if (this.files && this.files[0]) {
	            reader.onload = function (e) {
	                $(drop).empty().append($("<img>").attr("src", reader.result));
	                $(drop).css('background-color', '#fff');
	            };
	            reader.readAsDataURL(this.files[0]);
	        }
	    });

	    $('#show-hub-link').on('click', function () {
	        $('#hub-popup').fadeIn();
	    });

	    $(document).mouseup(function (e) {
	        var popup = $('#hub-popup');
	        if (popup.is(e.target)) {
	            popup.fadeOut();
	        }
	    });

	    $('#submit-hub').on('click', function() {
	        let hubs = $('#hub-selection').textext()[0].tags()._formData;
	        
	        if (hubs.length > 0 ) {
	            $("#current-hubs-signed-in").empty();
	            for (var i = 0; i < hubs.length; i += 1) {
	                $('#current-hubs-signed-in').append(
	                    $('<span>').addClass('hub-card z-depth-1').append(hubs[i])
	                    
	                );
	                $("#current-hubs-signed-in").append(" ");
	            }
	            $('#hub-popup').fadeOut();
	        }
	    });

	    $('#cancel-hub').on('click', function() {
	        $('#hub-popup').fadeOut();
	    });

	    module.exports = {
	        initializeTagTextExt
	    }
	});



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'

	$(function() {
	    var getListings = __webpack_require__(2)['getListings'];
	    var getFavorites = __webpack_require__(2)['getFavorites'];
	    var wNumb = __webpack_require__(10);
	    var auth = __webpack_require__(2)["auth"];
	    var itemImagesRef = __webpack_require__(2)["itemImagesRef"];
	    var addFavoriteToProfile = __webpack_require__(2)['addFavoriteToProfile'];
	    var removeFavorite = __webpack_require__(2)['removeFavorite'];
	    var getFavoriteObjects = __webpack_require__(2)['getFavoriteObjects'];
	    var getImage = __webpack_require__(2)['getImage'];
	    var initializeMessage = __webpack_require__(2)['initializeMessage'];
	    var getItemsById = __webpack_require__(2)['getItemsById'];
	    var getUserInfoProper = __webpack_require__(2)['getUserInfoProper'];

	    var favoriteTemplate = $('#favorite-template');
	    $('#message-popup-confirmation').hide();

	    var showFavoritesInSidebar = function(favorites) {
	        var str = $('#favorite-template').text();
	        var compiled = _.template(str);

	        $('#favorite-holder').empty();
	        $('#favorite-holder').append(compiled({favorites: favorites}));

	        for (var i = 0; i < favorites.length; i += 1) {
	            (function (x) {
	                getImage(favorites[x]['id'] + '/imageOne', function(url) {
	                    let tagToAdd = ".favorite-image img:eq(" + x  + " )";
	                    $(tagToAdd).attr({src: url});
	                });
	            })(i);
	        }
	    };
	    

	    auth.onAuthStateChanged(function(user) {
	        if (user && $(favoriteTemplate).length > 0) {
	            getFavoriteObjects(showFavoritesInSidebar);
	            $("#find-favorite-logged-in").css('display', 'block');
	            $("#find-favorite-logged-out").css('display', 'none');

	            // favorite icon highlight/changes
	            $('body').on('mouseenter', '.find-result-favorite-image', function() {
	                $(this).attr('src', '../media/ic_heart_hover.png');
	                $(this).css('opacity', 1);
	            }).on('mouseout', '.find-result-favorite-image', function() {
	                if (!this.favorited) {
	                    $(this).attr('src', '../media/ic_heart.png');
	                    $(this).css('opacity', '0.3');
	                }
	            }).on('click', '.find-result-favorite-image', function() {
	                this.favorited = this.favorited || false;
	                if (!this.favorited) {
	                    $(this).attr('src', '../media/ic_heart_hover.png');
	                    addFavoriteToProfile(auth.currentUser.uid, $(this).attr('uid'));
	                    getFavoriteObjects(showFavoritesInSidebar);

	                } else {
	                    $(this).attr('src', '../media/ic_heart.png');
	                    removeFavorite($(this).attr('uid'));
	                    getFavoriteObjects(showFavoritesInSidebar);
	                }
	                this.favorited = !this.favorited;
	            });
	        } else {
	            $("#find-favorite-logged-in").css('display', 'none');
	            $("#find-favorite-logged-out").css('display', 'block');
	        }
	    });

	    var newSearch = function(currentItems, keywords = [], tags = [], hubs = [], priceRange = []) {
	        Promise.resolve(currentItems).then(function(itemList) {

	            console.log(hubs);
	            console.log(keywords);
	            console.log(tags);
	            console.log(priceRange);
	            var str = $('#find-results-template').text();
	            var compiled = _.template(str);
	            var imagePaths = [];
	            var filteredItemList = {};

	            for (var item in itemList) {
	                var currentItem = itemList[item];
	                var itemID = currentItem['id'];
	                var itemDescription = currentItem['description'].toLowerCase();
	                var itemTitle = currentItem['title'].toLowerCase();
	                var itemPrice = parseInt(currentItem['price'])
	                imagePaths.push(itemID);


	                if (hubs.length > 0 && !hubs.some(hub => currentItem['hubs'].includes(hub))) {
	                    continue;
	                }

	                if (tags.length > 0 && !tags.some(tag => currentItem['tags'].includes(tag))) {
	                    continue;
	                }

	                if (keywords.length > 0 && (!keywords.some(key => itemTitle.includes(key)) &&
	                    !keywords.some(key => itemDescription.includes(key)))) {
	                        continue
	                }

	                if (itemPrice < priceRange[0] || itemPrice > priceRange[1]) {
	                    continue;
	                }

	                filteredItemList[itemID] = currentItem
	            }

	            $("#find-content-presearch").hide()
	            $('#find-results-holder').empty();
	            $('#find-results-holder').append(compiled({filteredItemList: filteredItemList}));


	            getFavorites(showFavoritesInSearches);

	            for (var i = 0; i < imagePaths.length; i += 1) {
	                (function (x) {
	                    getImage(imagePaths[x] + '/imageOne', function(url) {
	                        $("#" + imagePaths[x]).attr({src: url});
	                    });
	                })(i);
	            }
	        });
	    };

	    function updateSliderRange (min, max) {
	        slider[0].noUiSlider.updateOptions({
	            start: [min, max]
	        });
	    }

	    var showItemsBasedOnHash = function() {
	        if (location.hash.length > 0) {
	            let hashKeys = location.hash.split('?');
	            let key = hashKeys[0].split("=")[1];
	            let hubs = hashKeys[1].split("=")[1];
	            let tags = hashKeys[2].split("=")[1];

	            if (tags.length === 0) {
	                tags = [];
	            } else {
	                tags = tags.split(',');
	            }

	            if (key.length === 0) {
	                key = [];
	            } else {
	                key = key.split(',');
	            }

	            if (hubs.length === 0) {
	                hubs = [];
	            } else {
	                hubs = hubs.split(',');
	            }

	            let priceRange = [parseInt(hashKeys[3].split("=")[1]), parseInt(hashKeys[4].split("=")[1])];
	            updateSliderRange(priceRange[0], priceRange[1]);

	            $("#find-keywords").val(key.join(" "));
	            $('#find-tags').textext()[0].tags().addTags(tags);


	            newSearch(getListings(), key, tags, hubs, priceRange);
	        }
	    }

	    var slider = $("#search-slider");
	    if (window.location.pathname === "/find/find.html") {
	        // Add dropdown hub selector
	        $('select').material_select();
	        // add slider
	        noUiSlider.create(slider[0], {
	            start: [1, 500],
	            connect: true,
	            step: 1,
	            tooltips: true,
	            format: wNumb({
	                decimals: 0,
	                thousand: ',',
	                prefix: '$',
	            }),
	            range: {
	                'min': 1,
	                'max': 3000
	            }
	        });

	        slider[0].noUiSlider.get()


	        // add autofill tags
	        var findTags = $('#find-tags');
	        findTags.textext({plugins : 'tags autocomplete'})
	            .bind('getSuggestions', function(e, data){
	                var list = [
	                        'Table',
	                        'Desk',
	                        'Computer',
	                        'Electronics',
	                        'iPhone',
	                        'Cell-Phone',
	                        'Apple',
	                        'Macbook',
	                        'Chair',
	                        'Leather',
	                        'Clothing',
	                        'Bedroom',
	                        'Bathroom',
	                        'Couch',
	                        'Kitchen',
	                        'Living-Room',
	                        'Dinner-Table'
	                    ],
	                    textext = $(e.target).textext()[0],
	                    query = (data ? data.query : '') || '';

	                $(this).trigger('setSuggestions',{
	                    result : textext.itemManager().filter(list, query) }
	                );
	        });

	        showItemsBasedOnHash();
	    }

	    var showFavoritesInSearches = function(currentFavorites) {
	        $('.find-result-favorite-image').each(function() {
	            var  currentImageID = $(this).attr('uid');
	            if(currentFavorites && currentFavorites[currentImageID]) {
	                $(this).attr('src', '../media/ic_heart_hover.png');
	                $(this).css('opacity', 1);
	                this.favorited = true;

	            }

	        });
	    };

	    $("#find-search-button").click(function () {
	        let query = "key=";
	        let keywords = $("#find-keywords").val().toLowerCase().trim().split(/\s+/);
	        let hubs = $("#find-hubs").val();
	        let tags = $('#find-tags').textext()[0].tags()._formData;
	        let priceRange = slider[0].noUiSlider.get();

	        for (let i = 0; i < priceRange.length; i += 1) {
	            priceRange[i] = parseInt(priceRange[i].replace(/[^0-9.]/g, ''));
	        }

	        for (let i = 0; i < tags.length; i += 1) {
	            tags[i] = tags[i].toLowerCase();
	        }

	        query += `${keywords}?hub=${hubs}?tags=${tags}?priceMin=${priceRange[0]}?priceMax=${priceRange[1]}`;
	        location.hash = query;

	        newSearch(getListings(), keywords, tags, hubs, priceRange);
	    });

	    $('.close-button').click(function () {
	        $('#message-popup').animate({
	            opacity: 0,
	            'z-index': -100
	        }, 100);
	    });

	    let newMessageId;
	    let newMessageImagePath;

	    $('body').on('click', '.card-contact', function () {
	        let parentDiv = $(this).parent().parent();
	        let imageDiv = parentDiv[0].children[2];
	        newMessageImagePath = $(imageDiv)[0].children[0].src;
	        newMessageId = $(imageDiv)[0].children[0].id;

	        $('#message-popup').css('z-index', '100').animate({
	            opacity: 1
	        }, 50);
	    });


	    $('#message-popup-send-button').click(function() {
	        let newMessageSellerId;
	        let newMessageContent = $($(this).parent()[0].children[2]).val();

	        Promise.resolve(getItemsById([newMessageId]))
	            .then(function(items) {

	                for (let item in items) {
	                    newMessageSellerId = items[item].uid;
	                }

	                return Promise.all([getUserInfoProper(newMessageSellerId),
	                    getUserInfoProper(auth.currentUser.uid)]);
	            })
	            .then(function(results) {
	                let currentUser = results[1];
	                let otherUser = results[0]
	                let myUsername = currentUser['username'];
	                let otherUsername = otherUser['username'];
	                initializeMessage(auth.currentUser.uid, newMessageSellerId,
	                    newMessageId, newMessageImagePath, newMessageContent, otherUsername, myUsername);

	                $('#message-popup-content').fadeOut(500);

	                setTimeout(function () {
	                    $('#message-popup-inner').css({
	                        'display': 'flex',
	                        'align-items': 'center',
	                        'justify-content': 'center'
	                    });
	                    $('#message-popup-confirmation').fadeIn();
	                }, 500);

	            })
	    });

	});


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {

	    if ( true ) {

	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	    } else if ( typeof exports === 'object' ) {

	        // Node/CommonJS
	        module.exports = factory();

	    } else {

	        // Browser globals
	        window.wNumb = factory();
	    }

	}(function(){

		'use strict';

	var FormatOptions = [
		'decimals',
		'thousand',
		'mark',
		'prefix',
		'suffix',
		'encoder',
		'decoder',
		'negativeBefore',
		'negative',
		'edit',
		'undo'
	];

	// General

		// Reverse a string
		function strReverse ( a ) {
			return a.split('').reverse().join('');
		}

		// Check if a string starts with a specified prefix.
		function strStartsWith ( input, match ) {
			return input.substring(0, match.length) === match;
		}

		// Check is a string ends in a specified suffix.
		function strEndsWith ( input, match ) {
			return input.slice(-1 * match.length) === match;
		}

		// Throw an error if formatting options are incompatible.
		function throwEqualError( F, a, b ) {
			if ( (F[a] || F[b]) && (F[a] === F[b]) ) {
				throw new Error(a);
			}
		}

		// Check if a number is finite and not NaN
		function isValidNumber ( input ) {
			return typeof input === 'number' && isFinite( input );
		}

		// Provide rounding-accurate toFixed method.
		// Borrowed: http://stackoverflow.com/a/21323330/775265
		function toFixed ( value, exp ) {
			value = value.toString().split('e');
			value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));
			value = value.toString().split('e');
			return (+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp))).toFixed(exp);
		}


	// Formatting

		// Accept a number as input, output formatted string.
		function formatTo ( decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input ) {

			var originalInput = input, inputIsNegative, inputPieces, inputBase, inputDecimals = '', output = '';

			// Apply user encoder to the input.
			// Expected outcome: number.
			if ( encoder ) {
				input = encoder(input);
			}

			// Stop if no valid number was provided, the number is infinite or NaN.
			if ( !isValidNumber(input) ) {
				return false;
			}

			// Rounding away decimals might cause a value of -0
			// when using very small ranges. Remove those cases.
			if ( decimals !== false && parseFloat(input.toFixed(decimals)) === 0 ) {
				input = 0;
			}

			// Formatting is done on absolute numbers,
			// decorated by an optional negative symbol.
			if ( input < 0 ) {
				inputIsNegative = true;
				input = Math.abs(input);
			}

			// Reduce the number of decimals to the specified option.
			if ( decimals !== false ) {
				input = toFixed( input, decimals );
			}

			// Transform the number into a string, so it can be split.
			input = input.toString();

			// Break the number on the decimal separator.
			if ( input.indexOf('.') !== -1 ) {
				inputPieces = input.split('.');

				inputBase = inputPieces[0];

				if ( mark ) {
					inputDecimals = mark + inputPieces[1];
				}

			} else {

			// If it isn't split, the entire number will do.
				inputBase = input;
			}

			// Group numbers in sets of three.
			if ( thousand ) {
				inputBase = strReverse(inputBase).match(/.{1,3}/g);
				inputBase = strReverse(inputBase.join( strReverse( thousand ) ));
			}

			// If the number is negative, prefix with negation symbol.
			if ( inputIsNegative && negativeBefore ) {
				output += negativeBefore;
			}

			// Prefix the number
			if ( prefix ) {
				output += prefix;
			}

			// Normal negative option comes after the prefix. Defaults to '-'.
			if ( inputIsNegative && negative ) {
				output += negative;
			}

			// Append the actual number.
			output += inputBase;
			output += inputDecimals;

			// Apply the suffix.
			if ( suffix ) {
				output += suffix;
			}

			// Run the output through a user-specified post-formatter.
			if ( edit ) {
				output = edit ( output, originalInput );
			}

			// All done.
			return output;
		}

		// Accept a sting as input, output decoded number.
		function formatFrom ( decimals, thousand, mark, prefix, suffix, encoder, decoder, negativeBefore, negative, edit, undo, input ) {

			var originalInput = input, inputIsNegative, output = '';

			// User defined pre-decoder. Result must be a non empty string.
			if ( undo ) {
				input = undo(input);
			}

			// Test the input. Can't be empty.
			if ( !input || typeof input !== 'string' ) {
				return false;
			}

			// If the string starts with the negativeBefore value: remove it.
			// Remember is was there, the number is negative.
			if ( negativeBefore && strStartsWith(input, negativeBefore) ) {
				input = input.replace(negativeBefore, '');
				inputIsNegative = true;
			}

			// Repeat the same procedure for the prefix.
			if ( prefix && strStartsWith(input, prefix) ) {
				input = input.replace(prefix, '');
			}

			// And again for negative.
			if ( negative && strStartsWith(input, negative) ) {
				input = input.replace(negative, '');
				inputIsNegative = true;
			}

			// Remove the suffix.
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
			if ( suffix && strEndsWith(input, suffix) ) {
				input = input.slice(0, -1 * suffix.length);
			}

			// Remove the thousand grouping.
			if ( thousand ) {
				input = input.split(thousand).join('');
			}

			// Set the decimal separator back to period.
			if ( mark ) {
				input = input.replace(mark, '.');
			}

			// Prepend the negative symbol.
			if ( inputIsNegative ) {
				output += '-';
			}

			// Add the number
			output += input;

			// Trim all non-numeric characters (allow '.' and '-');
			output = output.replace(/[^0-9\.\-.]/g, '');

			// The value contains no parse-able number.
			if ( output === '' ) {
				return false;
			}

			// Covert to number.
			output = Number(output);

			// Run the user-specified post-decoder.
			if ( decoder ) {
				output = decoder(output);
			}

			// Check is the output is valid, otherwise: return false.
			if ( !isValidNumber(output) ) {
				return false;
			}

			return output;
		}


	// Framework

		// Validate formatting options
		function validate ( inputOptions ) {

			var i, optionName, optionValue,
				filteredOptions = {};

			if ( inputOptions['suffix'] === undefined ) {
				inputOptions['suffix'] = inputOptions['postfix'];
			}

			for ( i = 0; i < FormatOptions.length; i+=1 ) {

				optionName = FormatOptions[i];
				optionValue = inputOptions[optionName];

				if ( optionValue === undefined ) {

					// Only default if negativeBefore isn't set.
					if ( optionName === 'negative' && !filteredOptions.negativeBefore ) {
						filteredOptions[optionName] = '-';
					// Don't set a default for mark when 'thousand' is set.
					} else if ( optionName === 'mark' && filteredOptions.thousand !== '.' ) {
						filteredOptions[optionName] = '.';
					} else {
						filteredOptions[optionName] = false;
					}

				// Floating points in JS are stable up to 7 decimals.
				} else if ( optionName === 'decimals' ) {
					if ( optionValue >= 0 && optionValue < 8 ) {
						filteredOptions[optionName] = optionValue;
					} else {
						throw new Error(optionName);
					}

				// These options, when provided, must be functions.
				} else if ( optionName === 'encoder' || optionName === 'decoder' || optionName === 'edit' || optionName === 'undo' ) {
					if ( typeof optionValue === 'function' ) {
						filteredOptions[optionName] = optionValue;
					} else {
						throw new Error(optionName);
					}

				// Other options are strings.
				} else {

					if ( typeof optionValue === 'string' ) {
						filteredOptions[optionName] = optionValue;
					} else {
						throw new Error(optionName);
					}
				}
			}

			// Some values can't be extracted from a
			// string if certain combinations are present.
			throwEqualError(filteredOptions, 'mark', 'thousand');
			throwEqualError(filteredOptions, 'prefix', 'negative');
			throwEqualError(filteredOptions, 'prefix', 'negativeBefore');

			return filteredOptions;
		}

		// Pass all options as function arguments
		function passAll ( options, method, input ) {
			var i, args = [];

			// Add all options in order of FormatOptions
			for ( i = 0; i < FormatOptions.length; i+=1 ) {
				args.push(options[FormatOptions[i]]);
			}

			// Append the input, then call the method, presenting all
			// options as arguments.
			args.push(input);
			return method.apply('', args);
		}

		function wNumb ( options ) {

			if ( !(this instanceof wNumb) ) {
				return new wNumb ( options );
			}

			if ( typeof options !== "object" ) {
				return;
			}

			options = validate(options);

			// Call 'formatTo' with proper arguments.
			this.to = function ( input ) {
				return passAll(options, formatTo, input);
			};

			// Call 'formatFrom' with proper arguments.
			this.from = function ( input ) {
				return passAll(options, formatFrom, input);
			};
		}

		return wNumb;

	}));


/***/ },
/* 11 */
/***/ function(module, exports) {

	

/***/ },
/* 12 */
/***/ function(module, exports) {

	$(function() {
	    $('.carousel.carousel-slider').carousel({full_width: true});
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	$(function () {
	    $('#message-offer-popup').fadeOut(1);
	    var auth = __webpack_require__(2)['auth'];
	    var getUserInfo = __webpack_require__(2)['getUserInfo'];
	    var updateUserInfo = __webpack_require__(2)['updateUserInfo'];
	    var addTagToProfile = __webpack_require__(2)['addTagToProfile'];
	    var getProfileTags = __webpack_require__(2)['getProfileTags'];
	    var removeProfileTag = __webpack_require__(2)['removeProfileTag'];
	    var nameSizeMin = __webpack_require__(11)['nameSizeMin'];
	    var nameSizeMax = __webpack_require__(11)['nameSizeMax'];
	    var userImagesRef = __webpack_require__(2)['userImagesRef'];
	    var addProfilePicture = __webpack_require__(2)['addProfilePicture'];
	    var getProfilePicture = __webpack_require__(2)['getProfilePicture'];
	    var displayConversations = __webpack_require__(2)['displayConversations'];
	    var displayMessagesDetail = __webpack_require__(2)['displayMessagesDetail'];
	    var updateNavbarName = __webpack_require__(1)['updateNavbarName'];
	    var getUserSelling = __webpack_require__(2)['getUserSelling'];
	    var getItemsById = __webpack_require__(2)['getItemsById'];
	    var setItemAsSold = __webpack_require__(2)['setItemAsSold'];

	    var updateNavbarPic = __webpack_require__(1)['updateNavbarPic'];

	    var reader;
	    var user;
	    var uid;
	    var firebaseUsername;
	    var likedCardList = $('#profile-liked-card-list');
	    var sellingCardList = $('#profile-selling-card-list');
	    var profilePicture = $('#profile-picture');
	    var addPhotoButton = $('#add-photo-button');
	    var addPhotoInput = $('#add-photo-input');
	    var addButton = $('.add-button');
	    var editButton = $('#edit-button');
	    var saveButton = $('#save-button');
	    var firstName = $('#profile-first-name');
	    var lastName = $('#profile-last-name');
	    var username = $('#profile-user-name');
	    var hub = $('#profile-hub-name');
	    var paymentPreference;
	    var emailNotifications = $('#email-notifications');
	    var password = $('#profile-password');
	    var getImage = __webpack_require__(2)["getImage"];
	    var getFavoriteObjects = __webpack_require__(2)['getFavoriteObjects'];
	    var profileLikedItems = $('#profile-liked-items');
	    var navbarProfilePic = $('#navbar-user-photo');
	    var profileName = $('#profile-name');

	    if ($(profileLikedItems).length > 0) {
	        var showFavoritedItems = function(items) {
	            var imagePaths = []
	            var str = $('#profile-liked-items').text();
	            var compiled = _.template(str);

	            $('#profile-liked-holder').empty();
	            $('#profile-liked-holder').append(compiled({items: items}));
	            
	            for (var item in items) {
	                imagePaths.push(items[item]['id']);
	            }

	            for (var i = 0; i < imagePaths.length; i += 1) {
	                (function (x) {
	                    getImage(imagePaths[x] + '/imageOne', function(url) {
	                        tagToAdd = "img.activator:eq(" + x  + " )";
	                        $(tagToAdd).attr({src: url});
	                    });
	                })(i);
	            }
	        };
	    }


	    $('#messages-preview-holder').on('click', '.message-preview', function() {
	        let chatid = $(this).attr('chatid');
	        $('#message-send-button').attr('chatid', chatid)

	        // toggling clicked/selected div colors
	        if ($(this).closest('div').hasClass('active')) {
	            return false;
	        }

	        $(this).find('.material-icons').remove();
	        $('.active-message').toggleClass('active-message');
	        $(this).closest('div').toggleClass('active-message');
	        $('#message-detail-content').empty().fadeOut(100);

	        displayMessagesDetail(uid, chatid);
	    });

	    var loadSellingCardList = function () {
	        Promise.resolve(getUserSelling(uid)).then(function(items) {
	            if (Object.keys(items).length >= 1) {
	                let itemList = [];
	                for (itemId in items) {
	                    itemList.push(itemId)
	                }

	                Promise.resolve(getItemsById(itemList)).then(function(itemObjects) {
	                    let filteredItemList = {};
	                    var str = $('#profile-selling-template').text();
	                    var compiled = _.template(str);
	                    var imagePaths = [];

	                    for (var item in itemObjects) {
	                        var currentItem = itemObjects[item];
	                        var itemID = currentItem['id'];

	                        imagePaths.push(itemID);

	                        filteredItemList[itemID] = currentItem;
	                    }

	                    $('#profile-selling-holder').empty();
	                    $('#profile-selling-holder').append(compiled({filteredItemList: filteredItemList}));

	                    for (var i = 0; i < imagePaths.length; i += 1) {
	                        (function (x) {
	                            getImage(imagePaths[x] + '/imageOne', function(url) {
	                                $("#" + imagePaths[x]).attr({src: url});
	                            });
	                        })(i);
	                    }
	                });

	            } else {
	                // show a div saying user has no items for sale
	            }
	        });
	    };

	    var loadTagsList = function () {

	    };


	    var addToTagsList = function () {
	        var addition = {
	            test: ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8"]
	        };
	        addTagToProfile(uid, addition);
	    };

	    var loadSettings = function () {
	        getUserInfo(uid, loadUserInfo);
	    };

	    var loadProfilePicture = function () {
	        Promise.resolve(getProfilePicture(uid)).then(url => {
	            profilePicture.attr('src', url);
	        });
	    }

	    var loadUserInfo = function (userInfo) {
	        firstName.val(userInfo.firstName);
	        lastName.val(userInfo.lastName);
	        username.val(userInfo.username);
	        firebaseUsername = userInfo.username;
	        hub.val(userInfo.userHub);
	        loadProfilePicture();
	        $('.my-profile-username').text(firebaseUsername);
	        for (let preference in userInfo.paymentPreferences) {
	            $("select[id$='profile-payment-preference'] option[value=" + userInfo.paymentPreferences[preference] + "]").attr("selected", true);
	        }

	        $('select').material_select();

	    };

	    var checkInput = function (input) {
	        return input.val().length > nameSizeMin;
	    }

	    var checkUsername = function (input) {
	        return input.val().length >= nameSizeMin && input.val().length <= nameSizeMax
	    }

	    var updateSettings = function () {
	        var paymentPreferences = [];
	        for (let preference in paymentPreference.val()) {
	            paymentPreferences.push(paymentPreference.val()[preference]);
	        }

	        if (!paymentPreferences.length) {
	            paymentPreferences.push("none");
	        }

	        var updatedInfo = {
	            username: username.val(),
	            firstName: firstName.val(),
	            lastName: lastName.val(),
	            userHub: hub.val(),
	            paymentPreferences: paymentPreferences
	        };
	        updateUserInfo(uid, updatedInfo);
	        loadSettings();
	    };

	    var rerouteProfileHash = function(hash) {
	        if (window.location.hash.substr(1) === 'messages') {
	            $('ul.tabs').tabs('select_tab', 'profile-messages');
	        } else if (window.location.hash.substr(1) === 'notifications') {
	            $('ul.tabs').tabs('select_tab', 'profile-tagslist');
	        } else if (window.location.hash.substr(1) === 'settings') {
	            $('ul.tabs').tabs('select_tab', 'profile-settings');
	        }
	    }

	    auth.onAuthStateChanged(function(user) {
	        if (user) {
	            uid = auth.currentUser.uid;
	            if (window.location.pathname === '/profile/profile.html') {
	                $('select').material_select();
	                paymentPreference = $('#profile-payment-preference');
	                loadSettings();
	                getFavoriteObjects(showFavoritedItems);
	                displayConversations(uid);
	                rerouteProfileHash();

	                if (!auth.currentUser.emailVerified) {
	                    Materialize.toast('Please check email to verify account', 3000, 'rounded');
	                }
	            }

	        } else if (!user && window.location.pathname === '/profile/profile.html'){
	            window.location.href = "../index.html";
	        }
	    });

	    $('#selling-tab').click(function () {
	        loadSellingCardList();
	    });


	    $('#notifications-tab').click(function () {
	        loadTagsList();
	    });

	    $('#messages-offer-button').click(function() {
	        if ($('#message-offer-popup').hasClass('invisible-div')) {
	            $('#message-offer-popup').removeClass('invisible-div').fadeIn(1000);
	        }
	        else {
	            $('#message-offer-popup').addClass('invisible-div').fadeOut(1000);
	        }
	    })

	    addButton.click(function () {
	        addToTagsList();
	    });

	    addPhotoButton.click(function () {
	        addPhotoInput.click();
	    });

	    profilePicture.click(function () {
	        addPhotoInput.click();
	    });

	    $('#profile-selling-holder').on('click', '.selling-sold-button', function () {
	        let chatID = $($(this).parent()[0].children[2])[0].children[0].id;
	        setItemAsSold(chatID);
	        loadSellingCardList();

	        //get itemID
	        // mark this item as sold in items, itemsByHub, itemsByUser
	        // refresh items
	    });

	    addPhotoInput.change(function () {
	        reader = new FileReader();
	        var fileExtension = ['jpeg', 'jpg', 'png'];
	        if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
	            Materialize.toast('Only formats are allowed : ' + fileExtension.join(', '), 3000, 'rounded');
	        } else {
	            reader.onload = function (e) {
	                addProfilePicture(uid, e.target.result);
	            }
	            reader.readAsDataURL($(this)[0].files[0]);
	        }
	    });

	    editButton.click(function () {
	        saveButton.attr("disabled", false);
	        editButton.attr("disabled", true);
	        firstName.attr("disabled", false);
	        lastName.attr("disabled", false);
	        username.attr("disabled", false);
	        hub.attr("disabled", false);
	        paymentPreference.attr("disabled", false);
	        $('select').material_select();
	        emailNotifications.attr("disabled", false);
	        password.attr("disabled", false);
	    });

	    saveButton.click(function () {
	        if (!checkInput(firstName) || !checkInput(lastName) || !checkUsername(username || !checkInput(hub))) {
	            Materialize.toast('First Name, Last Name, Username, and Hub must all be at least 1 character.', 3000, 'rounded');
	            return;
	        }

	        editButton.attr("disabled", false);
	        saveButton.attr("disabled", true);
	        firstName.attr("disabled", true);
	        lastName.attr("disabled", true);
	        username.attr("disabled", true);
	        hub.attr("disabled", true);
	        paymentPreference.attr("disabled", true);
	        $('select').material_select();
	        emailNotifications.attr("disabled", true);
	        password.attr("disabled", true);
	        updateSettings();
	    });

	});


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	$(function () {
	    var getRecentItemsInHub = __webpack_require__(2)['getRecentItemsInHub'];
	    var itemImagesRef = __webpack_require__(2)["itemImagesRef"];
	    var auth = __webpack_require__(2)["auth"];
	    var getImage = __webpack_require__(2)["getImage"];
	    var populateSuggestionsInHub = __webpack_require__(2)['populateSuggestionsInHub'];
	    var getItemsById = __webpack_require__(2)['getItemsById'];
	    var getUserInfo = __webpack_require__(2)['getUserInfo'];


	    var mostRecentItems = $('#hub-most-recent');
	    var showMostRecentItems = function(items) {
	        var imagePaths = []
	        var str = $('#hub-most-recent').text();
	        var compiled = _.template(str);

	        $('#hub-recent-holder').empty();
	        $('#hub-recent-holder').prepend(compiled({items: items}));


	        for (var item in items) {
	            imagePaths.push(items[item]['id']);
	        }

	        for (var i = 0; i < imagePaths.length; i += 1) {
	            (function (x) {
	                getImage(imagePaths[x] + '/imageOne', function(url) {
	                    tagToAdd = ".hub-recent img:eq(" + x  + " )";
	                    $(tagToAdd).attr({src: url});
	                });
	            })(i);
	        }
	    };

	    var showSuggestions = function(suggestions) {
	        Promise.resolve(suggestions).then(function(itemList) {
	            Promise.resolve(getItemsById(itemList)).then(function(itemsObject) {
	                if (Object.keys(itemsObject).length > 0) {
	                    $('#hub-suggestions-holder').empty();
	                }

	                var imagePaths = []
	                var str = $('#hub-suggested').text();
	                var compiled = _.template(str);

	                $('#hub-suggestions-holder').prepend(compiled({itemsObject: itemsObject}));


	                for (var item in itemsObject) {
	                    imagePaths.push(itemsObject[item]['id']);
	                }

	                for (var i = 0; i < imagePaths.length; i += 1) {
	                    (function (x) {
	                        getImage(imagePaths[x] + '/imageOne', function(url) {
	                            $("#" + imagePaths[x]).attr({src: url});
	                        });
	                    })(i);
	                }
	            })
	        });
	    };

	    var showUserInfo = function (userData) {
	        $('#hub-username-blurb').text(userData.firstName);
	    }

	    auth.onAuthStateChanged(function(user) {
	        if (user && $(mostRecentItems).length > 0) {
	            getUserInfo(auth.currentUser.uid, showUserInfo);
	            getRecentItemsInHub('Loyola Marymount University', showMostRecentItems, 4);
	            showSuggestions(populateSuggestionsInHub('Loyola Marymount University', auth.currentUser.uid));
	        } else if (!user && $(mostRecentItems).length > 0) {
	            window.location.href = "../index.html";

	        }
	    });    
	    

	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	$(() => {
	    const getRecentItemsInHub = __webpack_require__(2)['getRecentItemsInHub'];
	    const getImage = __webpack_require__(2)["getImage"];

	    $('.slider').slider();
	    $('ul.tabs').tabs();
	    $('.parallax').parallax();


	    const tagsList = [
	                    'Table',
	                    'Desk',
	                    'Computer',
	                    'Electronics',
	                    'iPhone',
	                    'Cell-Phone',
	                    'Apple',
	                    'Macbook',
	                    'Chair',
	                    'Leather',
	                    'Clothing',
	                    'Bedroom',
	                    'Bathroom',
	                    'Couch',
	                    'Kitchen',
	                    'Living-Room',
	                    'Dinner-Table'
	    ];

	    const campusList = ['UCLA', 'Loyola Marymount University'];
	    const initializeTagTextExt = __webpack_require__(8)['initializeTagTextExt']
	    let blurbLeft = true;

	    const fadingBlurbs = (blurbSide) => {
	        if (blurbSide) {
	            $(".main-info-left").fadeIn(2000).delay(5000).fadeOut('slow', function() {
	                blurbLeft = !blurbLeft;
	                fadingBlurbs(blurbLeft);
	            });
	        } else {
	            $(".main-info-right").fadeIn(2000).delay(5000).fadeOut('slow', function() {
	                blurbLeft = !blurbLeft;
	                fadingBlurbs(blurbLeft);
	            });
	        }
	    }

	    const mostRecentItemsFirstDiv = $('#first-div-results-holder');
	    const mostRecentItemsSecondDiv = $('#second-div-results-holder');
	    const showMostRecentItemsFirstDiv = (campus, numberOfResults, placeholderElement) => {
	        Promise.resolve(getRecentItemsInHub(campus, numberOfResults)).then(items => {
	            let imagePaths = []
	            const str = placeholderElement.text();
	            const compiled = _.template(str);

	            // mostRecentItemsFirstDiv.empty();
	            placeholderElement.prepend(compiled({items: items}));


	            for (let item in items) {
	                imagePaths.push(items[item]['id']);
	            }

	            for (let i = 0; i < imagePaths.length; i += 1) {
	                ((x)=> {
	                    getImage(imagePaths[x] + '/imageOne', (url) => {
	                        $(`#${imagePaths[x]}`).attr({src: url});
	                    });
	                })(i);
	            }
	        });
	    };

	    $("#search-button-main-page").on('click', () => {
	        const keysInput = $("#main-keys").val().toLowerCase().trim().split(/\s+/);
	        const hubInput = $('#main-campus').textext()[0].tags()._formData;
	        const tagsInput = $('#main-tags').textext()[0].tags()._formData;
	        const priceMaxInput = $("#main-price").val().length > 0 ?  $("#main-price").val() : "9999";

	        for (let i = 0; i < tagsInput.length; i += 1) {
	            tagsInput[i] = tagsInput[i].toLowerCase();

	        }
	        
	        window.location.href = `/find/find.html#key=${keysInput}?hub=${hubInput}?tags=${tagsInput}?priceMin=1?priceMax=${priceMaxInput}`;
	    });

	    const scrollAmount = 420;

	    $('#scroll-left').on('click', () => {
	        const leftPos = $('.outside-scroll-container').scrollLeft();
	        $(".outside-scroll-container").animate({ scrollLeft:  leftPos - scrollAmount }, 400);

	    });

	    $('#scroll-right').on('click', () => {
	        const leftPos = $('.outside-scroll-container').scrollLeft();

	        if (leftPos <= scrollAmount * 2) {
	            $(".outside-scroll-container").animate({ scrollLeft:  leftPos + scrollAmount }, 400);
	        }
	    });    

	    if (window.location.pathname === "/index.html" || window.location.pathname === "/") {

	        setTimeout(() => { fadingBlurbs(blurbLeft) }, 1000);
	        initializeTagTextExt('#main-tags', tagsList);
	        initializeTagTextExt('#main-campus', campusList);
	        showMostRecentItemsFirstDiv('Loyola Marymount University', 5, mostRecentItemsFirstDiv);
	        showMostRecentItemsFirstDiv('UCLA', 5, mostRecentItemsSecondDiv);
	    }
	});

/***/ },
/* 16 */
/***/ function(module, exports) {

	$(function () {
	    $('body').on('click', '.view-item-detail', function() {
	        let parentDiv = $(this).parent().parent().parent();
	        let imageDiv = parentDiv[0].children[2];
	        let itemID = $(imageDiv)[0].children[0].id;
	        window.location.href = `/items/item.html#item=${itemID}`;
	    });
	});

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"

	$(function() {
	    const createAccount = __webpack_require__(2)["createAccount"];
	    const sendVerificationEmail = __webpack_require__(2)['sendVerificationEmail'];
	    const facebookAuthentication = __webpack_require__(2)['facebookLogin'];
	    const googleAuthentication = __webpack_require__(2)['googleLogin'];
	    const auth = __webpack_require__(2)['auth'];

	    const nameCheck = new RegExp(/^[a-zA-Z]{2,15}[\ ][a-zA-Z]{2,20}$/);
	    const emailCheck = new RegExp(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/);
	    const passwordSizeLimit = 8;
	    const nameSizeMin = 2;
	    const nameSizeMax = 15;    

	    let nameValid = false;
	    let lastNameValid = false;
	    let emailValid = false;
	    let passwordValid = false;

	    const checkInput = function () {
	        return nameValid && emailValid && passwordValid;
	    };



	    $('#navbar-placeholder').on('click', '#sign-up-button', function () {
	        window.location.href = '/signup/signup.html';
	    });

	    $('body').on('click', '#google-login-button', function() {
	        googleAuthentication();
	    });

	    $('body').on('click', '#fb-login-button', function() {
	        facebookAuthentication();
	    });


	    $('body').on('click', '#sign-up-button-container', function() {
	        if (checkInput()) {
	            createAccount();
	            sendVerificationEmail();
	        } else {
	            // Materialize.toast('Invalid input.', 3000, 'rounded');
	            if (!nameValid) {
	                $("#fullname-alert").removeClass('hide');
	            } 

	            if (!passwordValid) {
	                $("#password-alert").removeClass('hide');
	            }
	        }
	    });


	    $('body').on('keyup', '#signup-names', function() {
	        const fullName = $('#signup-names').val();
	        const first = fullName.substr(0,fullName.indexOf(' '));
	        const last = fullName.substr(fullName.indexOf(' ') + 1);

	        if (first.length < nameSizeMin || first.length > nameSizeMax || 
	            last.length < nameSizeMin || last.length > nameSizeMax) {
	            nameValid = false;
	            $('#checkmark-name').addClass('hide');
	        } else {
	            nameValid = true
	            $('#checkmark-name').removeClass('hide');
	        }
	    });

	    $('body').on('keyup', '#signup-email', function() {
	        let userEmail = $('#signup-email').val();

	        if (emailCheck.test(userEmail)) {
	            auth.fetchProvidersForEmail(userEmail).then(function(result) {
	                if (result.length === 0) {
	                    emailValid = true;
	                    $('#checkmark-email').removeClass('hide');
	                    $('#email-edu-blurb').text("(Must be .edu)");
	                    $('#email-edu-blurb').removeClass('red-text text-darken-1');
	                } else {
	                    console.log('lol');
	                    $('#email-edu-blurb').text("(Email is already registered)");
	                    $('#email-edu-blurb').addClass('red-text text-darken-1');
	                }
	            }).catch(function(error) {
	                console.log(error);
	            });
	        } else {
	            emailValid = false;
	            $('#checkmark-email').addClass('hide');
	        }
	    });

	    $('body').on('keyup', '#signup-password', function() {
	        if ($('#signup-password').val().length >= passwordSizeLimit) {
	            passwordValid = true;
	            $('#checkmark-password').removeClass('hide');
	        } else {
	            passwordValid = false;
	            $('#checkmark-password').addClass('hide');
	        }
	    });

	    module.exports = {
	        nameSizeMin,
	        nameSizeMax
	    };

	});


/***/ }
/******/ ]);