"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
let path = require('path');
let zlib = require('zlib');
const fs = __importStar(require("fs"));
// @ts-ignore
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
var FileStore = require('session-file-store')(express_session_1.default);
const { createBundleRenderer } = require('vue-server-renderer');
const template = require('fs').readFileSync('./template.html', 'utf-8');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const server = express_1.default();
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientManifest,
    inject: false,
});
server.use(express_session_1.default({
    store: new FileStore({ logFn: function () { } }),
    secret: 'Shh, its a secret!',
    saveUninitialized: false,
    resave: false
}));
server.use('/vue-ssr-server-bundle.json', (req, res) => { res.status(404).send("Page not found"); });
server.use('/vue-ssr-client-manifest.json', (req, res) => { res.status(404).send("Page not found"); });
let staticContentCache = { deflate: {}, gzip: {}, raw: {} };
fs.readdir("./dist", (err, files) => {
    files.forEach(function (file) {
        let p = "/" + file;
        if (!fs.lstatSync("./dist" + p).isFile())
            return;
        var raw1 = fs.createReadStream("./dist" + p);
        let ds = raw1.pipe(zlib.createDeflate());
        let dbufs = [];
        ds.on('data', function (d) { dbufs.push(d); });
        ds.on('end', function () {
            var buf = Buffer.concat(dbufs);
            staticContentCache["deflate"][p] = buf;
        });
        var raw2 = fs.createReadStream("./dist" + p);
        let gs = raw2.pipe(zlib.createGzip());
        let gbufs = [];
        ds.on('data', function (d) { gbufs.push(d); });
        ds.on('end', function () {
            var buf = Buffer.concat(gbufs);
            staticContentCache["gzip"][p] = buf;
        });
        staticContentCache["raw"][p] = fs.readFileSync("./dist" + p);
    });
});
server.get('*', (req, res) => {
    var acceptEncoding = req.headers['accept-encoding'];
    if (!acceptEncoding) {
        acceptEncoding = '';
    }
    if (req.path in staticContentCache.deflate && acceptEncoding.match(/\bdeflate\b/)) {
        res.writeHead(200, { 'content-encoding': 'deflate' });
        res.end(staticContentCache.deflate[req.path]);
    }
    else if (req.path in staticContentCache.gzip && acceptEncoding.match(/\bgzip\b/)) {
        res.writeHead(200, { 'content-encoding': 'gzip' });
        res.end(staticContentCache.gzip[req.path]);
    }
    else if (req.path in staticContentCache.raw) {
        res.writeHead(200, {});
        res.end(staticContentCache.raw[req.path]);
    }
    else {
        const context = { url: req.url };
        renderer.renderToString(context, (err, html) => {
            if (err) {
                if (err.message === "404") {
                    res.status(404);
                    res.end('Page not found');
                }
                else {
                    console.log(err);
                    res.status(500).end('Internal Server Error');
                }
                return;
            }
            const buf = new Buffer(html, 'utf-8'); // Choose encoding for the string.
            if (acceptEncoding.match(/\bdeflate\b/)) {
                res.writeHead(200, { 'content-encoding': 'deflate' });
                zlib.deflate(buf, function (err, result) {
                    res.end(result);
                });
            }
            else if (acceptEncoding.match(/\bgzip\b/)) {
                res.writeHead(200, { 'content-encoding': 'gzip' });
                zlib.gzip(buf, function (err, result) {
                    res.end(result);
                });
            }
            else {
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(200, {});
                res.end(buf);
            }
        });
    }
});
server.listen(Number(process.env.PORT) || 8040);
// let watchFilePath = "/root/repository/succulents.in.ua/refs/heads/master"
// if (fs.existsSync(watchFilePath)) {
//   fs.watchFile(watchFilePath, function (/*curr, prev*/) {
//     console.log('get changes from repositry')
//     childProcess.execSync("git pull")
//     console.log('build web application')
//     childProcess.execSync("node ./node_modules/.bin/tsc")
//     childProcess.execSync("npm run build")
//     console.log('restart')
//     process.exit(0);
//   });
// }
