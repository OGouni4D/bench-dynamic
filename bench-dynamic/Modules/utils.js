/*	The helloWorld() function can be executed from any of your project's server-side JavaScript file using the require() method as follows:
	var result = require('utils').helloWorld();

	For more information, refer to http://doc.wakanda.org/Wakanda Studio0.Beta/help/Title/en/page3355.html
*/
exports.getRandomString = function(length, chars) {
    if (!chars) chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
};

exports.getRandomInt = function(min, max) {
    if (!min) min = 0;
    if (!max) max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.getRandomArbitary = function(min, max) {
    if (!min) min = 0;
    if (!max) max = 100;
    return Math.random() * (max - min) + min;
};

exports.initData = function(dataclass, total, raz) {

    var dc = ds.dataClasses[dataclass];

    if (raz) {
        // clear the dataclass
        dc.remove();
        // init the auto sequence number
        dc.setAutoSequenceNumber(1);
        // wait a bit in order to sync with the next step
        wait(5000);
    }
	
	// calculate to number of entities to add
	var nToAdd = total;
	if(!raz) nToAdd = total - dc.length;
	// get util functions
    getRandomString = require("utils").getRandomString;
    getRandomInt = require("utils").getRandomInt;
    getRandomArbitary = require("utils").getRandomArbitary;
	
    // populate the dataclass
    for (i = 0; i < nToAdd; i++) {
        var entity = dc.createEntity();
        for (x in dc.attributes) {
            if (x != "ID") {
                if (dc[x].type == "string") entity[x] = getRandomString(50);
                if (dc[x].type == "number") entity[x] = getRandomArbitary();
                if (dc[x].type == "bool") entity[x] = (i % 2) == 0;
                if (dc[x].type == "date") entity[x] = new Date(2013, getRandomInt(1, 12), getRandomInt(1, 29));
                if (dc[x].type == "byte") entity[x] = getRandomInt(-127, 128);
                if (dc[x].type == "duration") entity[x] = getRandomInt(0, 1000);
                if (dc[x].type == "long") entity[x] = getRandomInt(-2147483648, 2147483647);
                if (dc[x].type == "word") entity[x] = getRandomInt(-32767, 32768);
                if (dc[x].type == "uuid") entity[x] = application.generateUUID();
                if (dc[x].type == "image") entity[x] = application.loadImage(application.getFolder("path") 
                	+ "Images/img" + getRandomInt(1, 12) + ".jpg");
                if (dc[x].type == "blob") entity[x] = new Blob(1024, 88, "application/octet-stream");
                if (dc[x].kind == "relatedEntity") {

                    var rdc = ds.dataClasses[dc[x].relatedDataClass];
                    var idarray = rdc.toArray("ID");
                    var randomId = idarray[Math.floor(Math.random() * idarray.length)].ID;
                    entity[x] = rdc.find("ID=" + randomId);
                }
            }
        }
        entity.save();
    }
};