const express = require("express");
//  간단한 서버를 설정할때
const request = require("request");
//  다른 사이트 서버 연결해서 데이터 가져옴
const app = express();
//  서버 생성
const port = 3355;
//  포트번호 0 ~ 65535 (0~1023사용중)
//  포트번호 충돌 크로스도메인 방지

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

//  서버 대기중
app.listen(port, ()=>{
    console.log("server start...","http://localhost:3355")
})

app.get("/", (request, response) => {
    response.send("helloooooo node server")
})



// 몽고디비 연결
const client = require("mongodb").MongoClient;
/*
*   몽고디비 =>  noSql
*   find() == find({}) => select * from movie
*   find({mmo:1}) select * from movie where mmo=1
* */
app.get("/movie", (req, res) => {
    // url
    let url = "mongodb://211.238.142.181:27017";
    client.connect(url, (error, client) => {
        let db = client.db("mydb");
        db.collection("movie").find({cateno:1}).toArray((err, docs) => {
            res.json(docs)
            client.close();
        });
    })
})

// /movie_home?no=1
app.get("/movie_home", (req, res) => {
    // req.query.넘길파라미터(data)
    let no = req.query.no;
    let site = "";

    if(no == 1){
        site = "searchMainDailyBoxOffice.do";
    }else if(no == 2){
        site = "searchMainRealTicket.do";
    }else if(no == 3){
        site = "searchMainDailySeatTicket.do";
    }else if(no == 4){
        site = "searchMainOnlineDailyBoxOffice.do";
    }

    let url = `http://www.kobis.or.kr/kobis/business/main/${site}`
    
    // 외부서버 사용시 request 사용
    request({url:url}, (err,request,json) => {
        res.json(JSON.parse(json));
    })

})