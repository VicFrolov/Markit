'use strict'

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');



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
var usersRef = database.ref('users/');

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
                console.log(downloadURL);
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

var getRecentItemsInHub = function (hub, callback) {
    database.ref('itemsByHub/' + hub + '/').orderByKey().limitToLast(4).once('value').then(function (snapshot) {
        callback(snapshot.val());
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

var addTagToProfile = function(uid, tagObject) {
    usersRef.child(uid + '/tagsList/' + Object.keys(tagObject)[0]).set(Object.values(tagObject)[0].slice(0,5));
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

var initializeMessage = function (id, sellerId, uid, imageLink, message) {
    let chatKey = usersRef.push().key;
    let date = (new Date()).toString();

    let contextUser = {
        itemID: uid,
        itemImageURL: imageLink,
        otherUser: sellerId
    };

    let contextOtherUser = {
        itemID: uid,
        itemImageURL: imageLink,
        otherUser: id
    };

    let messageObject = {
        date: date,
        text: message,
        type: 'text',
        user: id
    }

    usersRef.child(`/${id}/chats/${chatKey}'/context/`).set(contextUser);
    usersRef.child(`/${sellerId}/chats/${chatKey}'/context/`).set(contextOtherUser);
    
    usersRef.child(`/${id}/chats/${chatKey}'/messages/`).push(messageObject);
    usersRef.child(`/${sellerId}/chats/${chatKey}'/messages/`).push(messageObject);
}


// AI algorithm functions for suggestions in hub
// next 3 functions
var getItemsInHub = function (hub) {
    return database.ref('itemsByHub/' + hub + '/').once('value').then(function (snapshot) {
        return snapshot.val();
    });
};

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


var getUserSuggestions = function (uid) {
    usersRef
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
}


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
    getItemsById,
    initializeMessage
};