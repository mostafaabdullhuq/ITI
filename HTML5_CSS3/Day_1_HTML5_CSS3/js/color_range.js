let redRange = document.querySelector(".red input"),
    greenRange = document.querySelector(".green input"),
    blueRange = document.querySelector(".blue input"),
    hexValue = document.querySelector(".hex-value");

[redRange, greenRange, blueRange].map((elem) => {
    elem.addEventListener("change", function () {
        let red = redRange.value,
            green = greenRange.value,
            blue = blueRange.value;
        hexValue.textContent = getHex(parseInt(red), parseInt(green), parseInt(blue)).toUpperCase();

        document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    });
});

function getHex(r, g, b) {
    return "#" + r.toString(16) + g.toString(16) + b.toString(16);
}

hexValue.addEventListener("click", function () {
    let oldValue = this.textContent;
    this.textContent = "Copied!";

    setTimeout(() => {
        this.textContent = oldValue;
    }, 700);
    navigator.clipboard.writeText(oldValue);
});

window.onload = function () {
    let red = Math.floor(Math.random() * 255),
        green = Math.floor(Math.random() * 255),
        blue = Math.floor(Math.random() * 255);
    console.log(red, green, blue);
    (redRange.value = red), (greenRange.value = green), (blueRange.value = blue);
    hexValue.textContent = getHex(parseInt(red), parseInt(green), parseInt(blue)).toUpperCase();
    document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
};
