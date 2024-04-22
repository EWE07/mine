const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
require("dotenv").config()

const cors = require('cors');
app.use(cors());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Create an HTTP server
const server = http.createServer(app);

// Initialize a new instance of socket.io by passing the HTTP server object
const io = socketIo(server);
const { WebhookClient } = require('discord.js');

// Handle root get request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Listen for new connections on the socket
io.on('connection', (socket) => {
    socket.on('consoleInfo', (msg) => {
        if (msg.includes("sounds") || msg.includes("IntegratedServerLAN") || msg.includes("BrowserRuntime") || msg.includes("SoundManager")) return
        const webhook = new WebhookClient({url: process.env.urlweb});

        webhook.send(msg).then(() => {
        }).catch(error => {
          console.error('Error sending message:', error);
        });

        console.info('Mensagem do cliente:', msg);
    });
});


server.listen(8005, () => console.log('Server'));



// function $rt_createOutputFunction(printFunction) {
//   var buffer = "";
//   var utf8Buffer = 0;
//   var utf8Remaining = 0;
//   function putCodePoint(ch) {
//     if (ch === 0xa) {
//       printFunction(buffer);
//       buffer = "";
//     } else if (ch < 0x10000) {
//       buffer += $rt_globals.String.fromCharCode(ch);
//     } else {
//       ch = (ch - 0x10000) | 0;
//       var hi = (ch >> 10) + 0xd800;
//       var lo = (ch & 0x3ff) + 0xdc00;
//       buffer += $rt_globals.String.fromCharCode(hi, lo);
//     }
//   }
//   return function (ch) {
//     if ((ch & 0x80) === 0) {
//       putCodePoint(ch);
//     } else if ((ch & 0xc0) === 0x80) {
//       if (utf8Buffer > 0) {
//         utf8Remaining <<= 6;
//         utf8Remaining |= ch & 0x3f;
//         if (--utf8Buffer === 0) {
//           putCodePoint(utf8Remaining);
//         }
//       }
//     } else if ((ch & 0xe0) === 0xc0) {
//       utf8Remaining = ch & 0x1f;
//       utf8Buffer = 1;
//     } else if ((ch & 0xf0) === 0xe0) {
//       utf8Remaining = ch & 0x0f;
//       utf8Buffer = 2;
//     } else if ((ch & 0xf8) === 0xf0) {
//       utf8Remaining = ch & 0x07;
//       utf8Buffer = 3;
//     }
//   };
// }
// function $rt_createOutputFunction(printFunction) {
//   var buffer = "";
//   var utf8Buffer = 0;
//   var utf8Remaining = 0;
//   function putCodePoint(ch) {
//     if (ch === 0xa) {
//       printFunction(buffer);
//       buffer = "";
//     } else if (ch < 0x10000) {
//       buffer += $rt_globals.String.fromCharCode(ch);
//     } else {
//       ch = (ch - 0x10000) | 0;
//       var hi = (ch >> 10) + 0xd800;
//       var lo = (ch & 0x3ff) + 0xdc00;
//       buffer += $rt_globals.String.fromCharCode(hi, lo);
//     }
//   }
//   return function (ch) {
//     if ((ch & 0x80) === 0) {
//       putCodePoint(ch);
//     } else if ((ch & 0xc0) === 0x80) {
//       if (utf8Buffer > 0) {
//         utf8Remaining <<= 6;
//         utf8Remaining |= ch & 0x3f;
//         if (--utf8Buffer === 0) {
//           putCodePoint(utf8Remaining);
//         }
//       }
//     } else if ((ch & 0xe0) === 0xc0) {
//       utf8Remaining = ch & 0x1f;
//       utf8Buffer = 1;
//     } else if ((ch & 0xf0) === 0xe0) {
//       utf8Remaining = ch & 0x0f;
//       utf8Buffer = 2;
//     } else if ((ch & 0xf8) === 0xf0) {
//       utf8Remaining = ch & 0x07;
//       utf8Buffer = 3;
//     }
//   };
// }
