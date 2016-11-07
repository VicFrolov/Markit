$(function() {
    var addListing = require('./firebase.js')['addListing'];
    var auth = require('./firebase.js')['auth'];

    var itemTitle;
    var itemDescription;
    var itemTags;
    var itemPrice;
    var itemHub;
    var itemUid;

    var checkBasicItems = function(itemTitle, itemDescription, itemTags, 
        itemHub, itemPrice) {

        var itemTitle = $("#item-post-title").val();
        var itemDescription = $("#item-post-description").val();
        // var itemTags = $("#item-post-tags").val().match(/\S+/g) || [];
        var itemPrice = $("#item-post-price").val();
        var itemHub = $("#item-post-hub").val();

        if (!/^[a-zA-Z0-9]+$/.test(itemTitle)|| itemTitle.length < 5 || itemTitle.length > 20) {
            Materialize.toast('Title must be at least 5 letters long, with alphanumeric characters', 3000, 'rounded');
        } else if (!/^[a-zA-Z0-9\.]+$/.test(itemDescription) || itemDescription.length < 5) {
            Materialize.toast('Description can only contain letters and numbers', 3000, 'rounded');
        } else if(!itemPrice.match(/^[0-9]+([.][0-9]{0,2})?$/) || itemPrice < 0.01 || itemPrice > 3000) {
            Materialize.toast('only enter numbers, and an optional decimal', 3000, 'rounded');
        } else if(!/^[a-zA-Z\s]+$/.itemHub) {
            console.log("fix items Hub search");
        } else {
            if (itemTags.length === 0) {
                Materialize.toast('Please enter 3 to 5 tags', 3000, 'rounded');
            } else {
                for (tag in itemTags) {
                    console.log(tag)
                    if (!/^[a-zA-Z\s]+$/.test(tag) || tag.length > 15) {
                        Materialize.toast('tags can only contain letters, and must be under 15 characters', 3000, 'rounded');
                    }
                }
            }   
        }
    }

    $("#post-preview").click(function () {
        var itemUid = auth.currentUser.uid;

        var tags = $('#itemTags').textext()[0].tags()._formData;
  
        console.log(tags)

        if (checkBasicItems()) {
            $('ul.tabs').tabs('select_tab', 'photos');
        } else {
              Materialize.toast('invalid entry', 3000, 'rounded')
        }
    });

    $("main").on('click', '#add-listing', function (e) {
        if (itemTitle && itemDescription && itemTags && itemPrice) {
            addListing(itemTitle, itemDescription, itemTags, itemPrice, itemUid);
            $("main").text("Item has been Posted :)");
        } else {
            alert("please enter a username and comment");
        }
    });



    var itemTags = $('#itemTags')

    if (itemTags.length > 0) {
        $('#itemTags').textext({plugins : 'tags autocomplete'})
                .bind('getSuggestions', function(e, data){
                    var list = [
                            'Table',
                            'Desk',
                            'Computer',
                            'Electronics',
                            'iPhone',
                            'Cell Phone',
                            'Apple',
                            'Macbook',
                            'Chair',
                            'Leather',
                            'Clothing',
                            'Bedroom',
                            'Bathroom',
                            'Couch',
                            'Kitchen',
                            'Living Room',
                            'Dinner Table'
                        ],
                        textext = $(e.target).textext()[0],
                        query = (data ? data.query : '') || '';

                    $(this).trigger('setSuggestions',{
                        result : textext.itemManager().filter(list, query) }
                    );
        });
    }


    // drophub
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
                        var img = file.type.match('image.*')
                            ? $("<img>").attr('src', event.target.result) : "";
                        $fileList.empty().append(img);
                    }, this, file, $(dropArea));
                    reader.readAsDataURL(file);
                });
            }
        }
    });


    $("#fileBox").change(function() {
        if (this.files && this.files[0]) {
            reader.onload = function (e) {
                $(drop).empty().append($("<img>").attr("src", reader.result));
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

});