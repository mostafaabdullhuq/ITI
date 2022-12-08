let nextButton = document.getElementById("next-photo"),
    prevButton = document.getElementById("prev-photo"),
    sliderElementsCount = document.querySelectorAll(".imgs-container > div").length,
    sliderPreviewContainer = document.querySelector(".slider-preview");

// create slider preview elements
for (let i = 0; i < sliderElementsCount; i++) {
    sliderPreviewContainer.appendChild(document.createElement("li"));
    // add class active to the fild slider preview item
    if (i === 0) {
        sliderPreviewContainer.querySelector("li").classList.add("active");
    }
}

function swapElements(swapType) {
    let selectedElement = document.querySelector("div.img.selected"),
        nextElement = selectedElement.nextElementSibling,
        prevElement = selectedElement.previousElementSibling;

    // if next button is clicked
    if (swapType === "next") {
        var newNextElement;
        // if the current selected image has a next sibling
        if (nextElement) {
            // get the next element of the new selected element
            newNextElement = nextElement.nextElementSibling;

            // if the new selected element is the last child of the slider
            if (!newNextElement) {
                // make the first child of the slider the next element
                newNextElement = selectedElement.parentElement.firstElementChild;
            }
        }
        // if the current selected image is the last child of the slider
        else {
            // make the new selected element the first element of the slider
            nextElement = selectedElement.parentElement.firstElementChild;
            // make the new next element the second element of the slider
            newNextElement = nextElement.nextElementSibling;
        }

        // if the current selected element is the first element of the slider
        if (!prevElement) {
            // make the new previous element the last element of the slider
            prevElement = selectedElement.parentElement.lastElementChild;
        }
        // remove old classes from elements
        selectedElement.classList.remove("selected");
        nextElement.classList.remove("next");
        prevElement.classList.remove("prev");
        // add new classes to elements
        nextElement.classList.add("selected");
        newNextElement.classList.add("next");
        selectedElement.classList.add("prev");
    }

    // if previous  button is clicked
    else {
        var newPrevElement;
        // if the current selected image has a previous sibling
        if (prevElement) {
            // get the next element of the new selected element
            newPrevElement = prevElement.previousElementSibling;

            // if the new selected element is the first child of the slider
            if (!newPrevElement) {
                // make the first child of the slider the next element
                newPrevElement = selectedElement.parentElement.lastElementChild;
            }
        }
        // if the current selected image is the first child of the slider
        else {
            // make the new selected element the first element of the slider
            prevElement = selectedElement.parentElement.lastElementChild;
            // make the new next element the second element of the slider
            newPrevElement = prevElement.previousElementSibling;
        }

        // if the current selected element is the first element of the slider
        if (!nextElement) {
            // make the new previous element the last element of the slider
            nextElement = selectedElement.parentElement.firstElementChild;
        }
        // remove old classes from elements
        selectedElement.classList.remove("selected");
        nextElement.classList.remove("next");
        prevElement.classList.remove("prev");
        // add new classes to elements
        prevElement.classList.add("selected");
        newPrevElement.classList.add("prev");
        selectedElement.classList.add("next");
    }

    // update the slider preview
    // get all imgs from the imgs container and convert them to array, then loop on them
    [...document.querySelector("div.imgs-container").children].forEach((child, index) => {
        // if img is selected right now
        if (child.classList.contains("selected")) {
            // get all slider preview li and convert them to array then loop on them
            [...document.querySelectorAll(".slider-preview > li")].forEach((previewElement, previewIndex) => {
                // if the slider preview index is the same as the current selected img index, set the preview to active, else remove active
                previewIndex === index ? previewElement.classList.add("active") : previewElement.classList.remove("active");
            });
        }
    });
}

// if next button is clicked
nextButton.addEventListener("click", (e) => {
    swapElements("next");
    // console.log("next");
});

// if previous button is clicked
prevButton.addEventListener("click", (e) => {
    swapElements("prev");
});
