locationTrigger.addEventListener("click", () =>
    navigator.geolocation.getCurrentPosition((locationInfo) => window.location.assign(`https://maps.google.com/?q=${locationInfo.coords.latitude},${locationInfo.coords.longitude}`))
);

webStorageTrigger.addEventListener("click", () => {
    localStorage.setItem("name", nameInput.value);
    sessionStorage.setItem("address", addressInput.value);
});

getSumTrigger.addEventListener("click", () => {
    let sumWorker = new Worker("./js/worker.js");

    sumWorker.postMessage("sum");

    sumWorker.onmessage = (mess) => alert(mess.data);
});

changeBackgroundTrigger.addEventListener(
    "click",
    () => (document.body.style.backgroundColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`)
);
