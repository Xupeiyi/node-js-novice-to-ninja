// wait for ms milliseconds
function pWait(ms) {
    ms = parseFloat(ms);

    return new Promise((resolve, reject) => {
        
        // invalid ms value?
        if (!ms || ms < 1 || ms > 3000) {
            reject(new RangeError(`Invalid ms value: ${ms}`));
        }

        setTimeout(resolve, ms, ms);
    });
}

pWait(1000).then(ms => console.log(`waited ${ms}`));
pWait(400).then(ms => console.log(`waited ${ms}`));
pWait(-1).catch(err => console.log(`Caught: ${err.message}`));

pWait(100)
    .then(ms => {
        console.log(`waited ${ms}`);
        return pWait(ms + 100);
    })
    .then(ms => {
        console.log(`waited ${ms}`);
        return pWait(ms + 100);
    })
    .then(ms => {
        console.log(`waited ${ms}`);
        return pWait(0);
    })
    .catch(error => {
        console.log(`Caught: ${error.message}`)
    })
    .finally(() => console.log('done'));

(async () => {
    const ms = 1000;
    try {
        const p1 = await pWait(ms + 100);
        console.log(`p1: waited ${p1} ms`);

        const p2 = await pWait(-10);
        console.log(`p2: waited ${p2} ms`);

    }
    catch (err){
        console.log(err.message);
    }

})();