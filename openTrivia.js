const fsPromises = require('fs').promises;


const URLS = [
    "https://opentdb.com/api.php?type=multiple&amount=1&category=9", // general
    "https://opentdb.com/api.php?type=multiple&amount=1&category=18", // CS
    "https://opentdb.com/api.php?type=multiple&amount=1&category=30" // gadgets
]
const FILENAME = './questions.json'

async function getQuestion(url) {
    const response = await fetch(url);
    const question = response.json();
    return question;
}

async function saveQuestion(question) {
    await fsPromises.appendFile('./questions.json', question);
}

async function getAndSaveQuestion(url){
    await sleep(2000 * Math.random());
    const question = await getQuestion(url);
    await saveQuestion(JSON.stringify(question) + ",\n");
    console.log(`wrote question: ${question["results"][0]["category"]} `)
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function writeStart() {
    // await sleep(2000);
    await fsPromises.writeFile(FILENAME, "[\n");
}

async function writeEnd() {
    await fsPromises.appendFile(FILENAME, "]");
}

async function for_loop_main() {
    await writeStart();

    for (let i = 0; i < URLS.length; i++) {
        await getAndSaveQuestion(URLS[i]);
    }

    await writeEnd();
}

async function promise_all_main() {
    await writeStart();
    
    await Promise.all(
        URLS.map(url => getAndSaveQuestion(url)) // a list of promises
    )
    await writeEnd();
}

function profile(f) {
    return async function(...args) {
        const start = performance.now();
        const result = await f(...args);
        const end = performance.now();
        console.log(`Execution Time: ${end - start} ms`);
        return result;
    };
}

(async () => {
    await profile(for_loop_main)();
    // const start = performance.now();
    await profile(promise_all_main)();
    // const end = performance.now();
    // console.log(`Execution Time: ${end - start} ms`);
})();