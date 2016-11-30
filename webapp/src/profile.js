$(function () {

    var auth = require('./firebase.js')['auth'];
    var getUserInfo = require('./firebase.js')['getUserInfo'];
    var updateUserInfo = require('./firebase.js')['updateUserInfo'];
    var nameSizeLimit = require('./navbar-signup.js')['nameSizeLimit'];
    var user;
    var uid;
    var likedCardList = $('#profile-liked-card-list');
    var sellingCardList = $('#profile-selling-card-list');
    var notificationsList = $('#profile-notification-group');
    var editButton = $('#edit-button');
    var saveButton = $('#save-button');
    var firstName = $('#profile-first-name');
    var lastName = $('#profile-last-name');
    var username = $('#profile-user-name');
    var hub = $('#profile-hub-name');
    var paymentPreference;
    var emailNotifications = $('#email-notifications');
    var password = $('#profile-password'); 

    var loadLikedCardList = function () {
        likedCardList.empty();
        for (var i = 0; i < 42; i++) {
            likedCardList.append([
                $('<div></div>').addClass('col l4 m4 s12').append(
                    $('<div></div>').addClass('card hoverable profile-card').append([
                        $('<div></div>').addClass('profile-favorite').append(
                            $('<img>').addClass('profile-favorite-image').attr({
                                src: '../media/ic_heart.png'
                            })
                        ),
                        $('<div></div>').addClass('profile-price').text('$69'),
                        $('<div></div>').addClass('card-image waves-effect waves-block waves-light').append([
                            $('<img>').addClass('activator').attr({
                                src: 'https://d3nevzfk7ii3be.cloudfront.net/igi/DX2OGI5fYDA3jOZ5.medium'
                            }),
                        ]),
                        $('<div></div>').addClass('card-content').append([
                            $('<span></span>').addClass('card-title activator grey-text text-darken-4').text('Iphone').append(
                                $('<i></i>').addClass('material-icons right').text('more_vert')
                            ),

                            $('<p></p>').append(
                                $('<a></a>').text('view item').attr({
                                    href: '#'
                                })
                            )
                        ]),
                        $('<div></div>').addClass('card-reveal').append([
                            $('<span></span>').addClass('card-title grey-text text-darken-4').text("Description").append(
                                $('<i></i>').addClass('material-icons right').text('close')
                            ),
                            $('<p></p>').text('This is a test description')
                        ])
                    ])
                )
            ]);
        }
    };

    var loadSellingCardList = function () {
        sellingCardList.empty();
        for (var i = 0; i < 31; i++) {
            sellingCardList.append([
                $('<div></div>').addClass('col l4 m4 s12').append(
                    $('<div></div>').addClass('card hoverable profile-card').append([
                        $('<div></div>').addClass('profile-favorite').append(
                            $('<img>').addClass('profile-favorite-image').attr({
                                src: '../media/ic_heart.png'
                            })
                        ),
                        $('<div></div>').addClass('profile-price').text('$69'),
                        $('<div></div>').addClass('card-image waves-effect waves-block waves-light').append([
                            $('<img>').addClass('activator').attr({
                                src: 'https://d3nevzfk7ii3be.cloudfront.net/igi/DX2OGI5fYDA3jOZ5.medium'
                            }),
                        ]),
                        $('<div></div>').addClass('card-content').append([
                            $('<span></span>').addClass('card-title activator grey-text text-darken-4').text('Iphone Selling').append(
                                $('<i></i>').addClass('material-icons right').text('more_vert')
                            ),

                            $('<p></p>').append(
                                $('<a></a>').text('view item').attr({
                                    href: '#'
                                })
                            )
                        ]),
                        $('<div></div>').addClass('card-reveal').append([
                            $('<span></span>').addClass('card-title grey-text text-darken-4').text("Description").append(
                                $('<i></i>').addClass('material-icons right').text('close')
                            ),
                            $('<p></p>').text('This is a test selling description')
                        ])
                    ])
                )
            ]);
        }
    };

    var loadNotifications = function () {
        notificationsList.empty();
        for (var i = 0; i < 21; i++) {
            notificationsList.append([
                $('<li></li>').addClass('collection-item').append(
                    $('<div></div>').append([
                        $('<div></div>').addClass("notification").text("Sample Notification")
                    ])
                )
            ]);
        }
    };

    var loadSettings = function () {
        getUserInfo(uid, loadUserInfo);
    };

    var loadUserInfo = function (userInfo) {
        firstName.val(userInfo.firstName);
        lastName.val(userInfo.lastName);
        username.val(userInfo.username);
        hub.val(userInfo.userHub);
        for (preference in userInfo.paymentPreferences) {
            $("select[id$='profile-payment-preference'] option[value=" + userInfo.paymentPreferences[preference] + "]").attr("selected", true);
        }
        $('select').material_select();
    };

    var checkInput = function (input) {
        return input.val().length > nameSizeLimit;
    }

    var updateSettings = function () {
        var paymentPreferences = [];
        for (preference in paymentPreference.val()) {
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
    };


    auth.onAuthStateChanged(function(user) {
        if (user) {
            user = auth.currentUser.email;
            uid = auth.currentUser.uid;
            if (window.location.pathname === '/profile/profile.html') {
                $('#my-profile').empty().append([
                    $('<img>').addClass('img-fluid circle').attr({
                        src: 'https://s3.amazonaws.com/media-speakerfile-pre/images_avatars/38d365421dd9d65327f2b29b10b9613a1443224365_l.jpg',
                        width: '100px'
                    }),
                    $('<span></span>').addClass('title my-profile-email text-responsive').text(user)
                ]);
                loadLikedCardList();
                $('select').material_select();
                paymentPreference = $('#profile-payment-preference');
                loadSettings();
            }
        }
    });

    $('#selling-tab').click(function () {
        loadSellingCardList();
    });

    $('#liked-tab').click(function () {
        loadLikedCardList();
    });

    $('#notifications-tab').click(function () {
        loadNotifications();
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
        if (!checkInput(firstName) || !checkInput(lastName) || !checkInput(username || !checkInput(hub))) {
            Materialize.toast('First Name, Last Name, Username, and Hub must all be at least 1 character.', 3000, 'rounded')
            return
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