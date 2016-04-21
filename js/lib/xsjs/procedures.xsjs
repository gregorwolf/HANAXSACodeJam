function hdbDirectTest(){
  var results = _selection();
//Pass output to response		
$.response.status = $.net.http.OK;
$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(results));

}

function hdbFlattenedTest(){
	outputJSON(_selection().EX_BP_ADDRESSES);
}

function _selection(){
	var connection = $.hdb.getConnection();

	var partnerRole = $.request.parameters.get("PartnerRole");
	partnerRole = typeof partnerRole !== 'undefined' ? partnerRole : '1';

	var getBpAddressesByRole = connection.loadProcedure( 
		"dev602.procedures::get_bp_addresses_by_role");

	var results = getBpAddressesByRole(partnerRole);
	return results;
}

/**
@function Puts a JSON object into the Response Object
@param {object} jsonOut - JSON Object
*/
function outputJSON(jsonOut){
	var out = [];
	for(var i=0; i<jsonOut.length;i++){
		out.push(jsonOut[i]);
	}
	$.response.status = $.net.http.OK;
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(out));
}


var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
case "direct":
	hdbDirectTest();
	break;
case "flattened":
	hdbFlattenedTest();
	break;	
default:
	hdbDirectTest();
	break;
}