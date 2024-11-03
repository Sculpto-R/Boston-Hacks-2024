var fs = require('fs'),
    fabric = require('fabric').fabric,
    out = fs.createWriteStream(__dirname + '/output.png');

let jsonstr = fs.readFileSync(__dirname + '/json/test_json.json', 'utf-8');
let json = JSON.parse(jsonstr);

var canvas = new fabric.StaticCanvas(null, { width: 500, height: 500 });

canvas.loadFromJSON(json, function() {
    canvas.renderAll();
    var stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', function () {
        // do something here
    });
});