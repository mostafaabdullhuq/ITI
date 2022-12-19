$(() => {
    function callback() {
        // remove generated images for styling that causing element to change it's position
        $(".ui-effects-placeholder").remove();
    }

    let shakeInterval = null;

    // for rabbit image
    $("#draggable").draggable({
        revert: true,
        // when dragging start, change text
        start: function (e, targetElement) {
            $(targetElement.helper).find("p").text("Leave meeeee!!!!!!").css("color", "red");
            var rabbitImage = $(targetElement.helper).find("img");
            // start the shake immediately
            rabbitImage.effect("shake", 500, callback);

            // shake every 500ms
            shakeInterval = setInterval(() => {
                rabbitImage.effect("shake", 500, callback);
            }, 500);
        },

        // when dragging finished
        stop: function (e, targetElement) {
            // stop the shake
            clearInterval(shakeInterval);
            // change the text
            $(targetElement.helper).find("p").text("Don't Touch me!").css("color", "black");
        },
    });

    // for black hole image
    $("#droppable").droppable({
        drop: function (e, draggedItem) {
            // when rabbit image is on the black hole image, change the text
            $(draggedItem.draggable).find("p").text("Nooooooooooo");

            // when rabbit image is on the black hole image, fade out
            $(draggedItem.draggable).hide("fade", {}, 2000);
            setTimeout(() => {
                // after 1 second, fade in
                $(draggedItem.draggable).fadeIn();
            }, 1000);
        },
    });
});
