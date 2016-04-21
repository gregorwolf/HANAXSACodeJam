/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

var xsjs  = require("sap-xsjs");
var xsenv = require("sap-xsenv");
var port  = process.env.PORT || 3000;

var options = xsjs.extend({
//	anonymous : true, // remove to authenticate calls
	redirectUrl : "/index.xsjs"
});

// configure HANA
options = xsjs.extend(options, xsenv.getServices({ hana: {tag: "hana"} }));

// configure UAA
options = xsjs.extend(options, xsenv.getServices({ uaa: {tag: "xsuaa"} }));

// start server
xsjs(options).listen(port);

console.log("Server listening on port %d", port);