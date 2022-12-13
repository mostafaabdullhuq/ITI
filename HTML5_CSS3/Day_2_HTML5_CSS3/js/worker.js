self.onmessage = (mess) => {
    console.log(mess);

    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
        sum += i;
    }

    self.postMessage(sum);
};
