$(function() {
    
    var addListing = require('./firebase.js')['addListing'];
    var auth = require('./firebase.js')['auth'];


    var itemTitle;
    var itemDescription;
    var itemTags;
    var itemPrice;
    var itemHub;
    var itemUid;
    var itemImages = [];

    var checkBasicItems = function() {
        var checksPassed = true;
        itemUid = auth.currentUser.uid;
        itemTitle = $("#item-post-title").val();
        itemDescription = $("#item-post-description").val();
        itemTags = $('#itemTags').textext()[0].tags()._formData;
        itemPrice = $("#item-post-price").val();
        $('#dropzone').find('img').each(function(index){
            itemImages.push($(this).attr('src'));
        });
        
        // itemHub needs to be changed
        itemHub = "hardcodedForNow";

        
        if (!/^[a-zA-Z0-9]{5,20}$/.test(itemTitle)) {
            Materialize.toast('Title must be between 5 and 20 characters', 3000, 'rounded');
            checksPassed = false;
        } else if (!/^[a-zA-Z0-9\.]+$/.test(itemDescription) || itemDescription.length < 5) {
            Materialize.toast('Description can only contain letters and numbers', 3000, 'rounded');
            checksPassed = false;
        } else if(!itemPrice.match(/^[0-9]+([.][0-9]{0,2})?$/) || itemPrice < 0.01 || itemPrice > 3000) {
            Materialize.toast('only enter numbers, and an optional decimal', 3000, 'rounded');
            checksPassed = false;
        } else if(!/^[a-zA-Z\s]+$/.test(itemHub)) {
            checksPassed = false;
        } else if (itemTags.length < 2 || itemTags.length > 5) {
            Materialize.toast('Please enter 2 to 5 tags', 3000, 'rounded');
            checksPassed = false;
        } else if (itemImages.length < 1) {
            Materialize.toast('Please add at least one image', 3000, 'rounded');
            checksPassed = false;
        } else {
            for (var i = 0; i < itemTags.length; i += 1) {
                if (!/^[a-zA-Z\s]+$/.test(itemTags[i]) || itemTags[i].length > 15) {
                    Materialize.toast('tags can only contain letters and spaces, up to 15 characters', 3000, 'rounded');
                    checksPassed = false;
                }
            }   
        }
        return checksPassed;
    }

    $("#post-preview").click(function () {
        if (true) {
            $('#preview-submit-tab').removeClass('disabled');
            $('ul.tabs').tabs('select_tab', 'preview-submit');
            // setting custom fields for carousel

            $('#carousel-wrapper').append('<div>').addClass('carousel carousel-slider');
            $('.carousel-slider').append('<a class="carousel-item" href="#one!"><img src="http://lorempixel.com/800/400/food/1"></a');
            $('.carousel.carousel-slider').carousel({full_width: true, indicators: true});
        }
    });


    //add listing
    $("main").on('click', '#add-listing', function (e) {
        if (itemTitle && itemDescription && itemTags && itemPrice) {
            addListing(itemTitle, itemDescription, itemTags, itemPrice, itemUid);
            $("main").text("Item has been Posted :)");
        } else {
            alert("please enter a username and comment");
        }
    });



    var itemTagRef = $('#itemTags');
    if (itemTagRef.length > 0) {
        itemTagRef.textext({plugins : 'tags autocomplete'})
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
                $(drop).css('background-color', '#fff');
            }
            reader.readAsDataURL(this.files[0]);
        }
    });

    

});