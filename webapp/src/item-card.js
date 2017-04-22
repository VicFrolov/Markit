$(function () {
    $('body').on('click', '.view-item-detail', function() {
        let parentDiv = $(this).parent().parent().parent();
        let imageDiv = parentDiv[0].children[2];
        let itemID = $(imageDiv)[0].children[0].id;
        let temp = $(imageDiv);
        console.log(temp);
        window.location.href = `/items/item.html#item=${itemID}`;
    });
});
