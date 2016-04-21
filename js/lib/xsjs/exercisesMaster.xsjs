function fillSessionInfo(){
	var body = "";
	body = JSON.stringify({
		"session" : [{"UserName": $.session.getUsername(), "Language": $.session.language}]
	});
	$.response.contentType = "application/json";
	$.response.setBody(body);
	$.response.status = $.net.http.OK; 
}


var aCmd = $.request.parameters.get("cmd");
switch (aCmd) {
case "getSessionInfo":
	fillSessionInfo();
	break; 
default:
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody("Invalid Request Method");
}