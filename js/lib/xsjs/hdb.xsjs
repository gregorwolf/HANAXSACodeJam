var conn = $.hdb.getConnection();
var query = 'SELECT FROM dev602.data::PurchaseOrder.Item { ' +
	        ' PURCHASEORDERID as "PurchaseOrderItemId", ' +
            ' PURCHASEORDERITEM as "ItemPos", ' +
            ' PRODUCT as "ProductID", ' +
            ' GROSSAMOUNT as "Amount" ' +
            ' } ';
var rs = conn.executeQuery(query);

var body = '';

for(var i = 0; i < rs.length; i++){
   if(rs[i]["Amount"] >= 500){
	body += rs[i]["PurchaseOrderItemId"] + "\t" + rs[i]["ItemPos"] + "\t" + 
			rs[i]["ProductID"] + "\t" + rs[i]["Amount"] + "\n";
   }
}


$.response.setBody(body);
$.response.contentType = 'application/vnd.ms-excel; charset=utf-16le';
$.response.headers.set('Content-Disposition',
		'attachment; filename=Excel.xls');
$.response.status = $.net.http.OK;