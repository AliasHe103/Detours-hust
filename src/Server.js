//服务端node脚本 Server.js
//1.在8080号端口创建tcp服务器与远程c++程序通信
const hostIP = "10.12.177.56";
const injectorPath = '..\\detours\\Inject.exe';
const net = require('net');
const testServer = net.createServer((socket) => {
    socket.on('data', (data) => {
        const iconv = require('iconv-lite');
        const str = iconv.decode(data, 'gbk');
        console.log('(c++)->' + str);
        //sendMessageToWeb(str);//转发给web
    });
    socket.on('end', () => {
        console.log('(c++)->finished');
    });
});
testServer.on('connection', (socket)=>{
    console.log('client connected!');
    socket.write('(node js)hello new client!\n');//注意接收端必须设置接收
});
testServer.listen(1234, hostIP, () => {
    console.log(`(node)->server listening on ip ${hostIP}, port 1234`);
});

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const iconv = require('iconv-lite');
        const str = iconv.decode(data, 'gbk');
        console.log('(c++)->' + str);
        sendMessageToWeb(str);//转发给web
    });
    socket.on('end', () => {
        console.log('(c++)->finished');
    });
});

server.on('connection', (socket)=>{
    console.log('client connected!');
    // socket.write('(node js)hello new client!\n');//注意接收端必须设置接收
});

server.on('error', (err) => {
    console.error('!(node tcp error)->' + err.message);
});

server.listen(8080, hostIP, () => {
    console.log(`(node)->server listening on ip ${hostIP}, port 8080`);
});

//2.在8081号端口创建一个WebSocket服务器用于与Web页面通信
const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ port: 8081 });

//存储所有连接的WebSocket客户端
const clients = new Set();

wsServer.on('connection', (ws) => {
    console.log('Web client connected');
    clients.add(ws);
    console.log(clients.size);
    ws.on('close', () => {
        console.log('Web client disconnected');
        clients.delete(ws);
        console.log(clients.size);
    });
});

//消息转发，发送消息给web
function sendMessageToWeb(message) {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
            console.log('(node.js server send)->' + message);
        }
    });
}

//3.在3080号端口处理http请求,接收上传的文件
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();
const upload = multer({ dest: "upload/" });
const cors = require("cors");
const iconv = require("iconv-lite");
app.use(cors());

app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    const filePath = file.path;
    const fileName = file.originalname;
    const date = new Date();
    const newFileName = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}_${fileName}`;
    const newFilePath = `upload/${newFileName}`
    fs.rename(filePath, newFilePath, (err) => {
        if (err) {
            console.error("(error)" + err);
            res.status(500).send("Error while renaming file");
        } else {
            res.send("File renamed and saved successfully");
            console.log("File renamed and saved successfully");
        }
    });
    const extension = fileName.split('.').pop();
    if (extension === 'exe') {
        handleDetoursThread(newFileName);
    }
});

app.listen(3080, () => {
    console.log("Server started on port 3080");
});

//4.启动detours,分析文件
function handleDetoursThread(fileName) {
    const path = require('path');
    const exePath = path.join(__dirname, 'upload', fileName);
    console.log('exePath: ' + exePath)
    const thread = require('child_process');
    const cmd = `start cmd /k ${injectorPath} ${exePath}`;
    console.log(cmd);
    thread.exec(cmd, (err)=>{
        console.log('error:' + err);
    });
}
