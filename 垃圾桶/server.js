const { error } = require('node:console');
const { readFile, writeFile } = require('node:fs/promises');


async function loadScore() {


    const file = await readFile('./score.json', 'utf8');
    const data = JSON.parse(file);
    const score = data.num;
    console.log("loadScore() 分數：" + score);

    return score



}

async function addScore(addNum) {

    const newScore = addNum + await loadScore();
    const jsonNewScore = JSON.stringify({ num: newScore });
    await writeFile('./score.json', jsonNewScore, 'utf8')
    console.log("loadScore() 分數：" + newScore);
    return newScore


}

// async function test() {
//     try {
//         await addScore(1);
//         await loadScore();
//     } catch (error) {

//         throw error
//     }

// }

// api
const http = require('node:http');

const server = http.createServer(async (req, res) => {

    console.log("1" + req.method, "2" + req.url);

    if (req.method === 'GET' && req.url === '/') {
        //api/載入

        const html = await readFile('./index.html', 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(html);

    } else if (req.method === 'GET' && req.url === '/api/score') {
        //api/score獲取分數

        res.setHeader('Content-Type', 'application/json; charset=utf-8');

        try {
            const score = await loadScore()
            res.statusCode = 200;
            res.end(JSON.stringify({ num: score }));

        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "讀取分數失敗" }));
            console.error(error);
        }

    } else if (req.method === 'POST' && req.url === '/api/score') {
        //api/clicks增加分數

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        try {
            const score = await addScore(1);
            res.statusCode = 200;
            res.end(JSON.stringify({ num: score }));

        } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "加分數失敗" }));
            console.error(error);
        }
    }

    else {
        //錯誤api

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.statusCode = 404;
        res.end("找不到路徑");


    }

});

server.listen(3000);



