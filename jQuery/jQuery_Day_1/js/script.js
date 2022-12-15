$(() => {
    let imagesList = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"],
        currentIndex = 0,
        mySlider = setInterval(() => {
            $(".task1 img")
                .fadeOut(500, function (e) {
                    $(this).attr("src", `imgs/${imagesList[currentIndex === imagesList.length ? (currentIndex = 0) : currentIndex]}`);
                })
                .fadeIn(1000);
            currentIndex++;
        }, 3000);

    $(".task1 .stop").on("click", (e) => {
        clearInterval(mySlider);
    });

    $(".task2 img").on("click", function (e) {
        $(this).next().slideToggle();
    });
});
