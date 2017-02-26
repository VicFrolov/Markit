$(function () {
    $('body').on('click', '.view-item-detail', function() {
        let parentDiv = $(this).parent().parent().parent();
        let imageDiv = parentDiv[0].children[2];
        let itemID = $(imageDiv)[0].children[0].id;
        window.location.href = `/items/item.html#item=${itemID}`;
    });

    $('body').on('click', '.card-contact', function () {
        let parentDiv = $(this).parent().parent();
        let imageDiv = parentDiv[0].children[2];
        newMessageImagePath = $(imageDiv)[0].children[0].src;
        newMessageId = $(imageDiv)[0].children[0].id;

        $('#message-popup').css('z-index', '100').animate({
            opacity: 1
        }, 50);
    });
});