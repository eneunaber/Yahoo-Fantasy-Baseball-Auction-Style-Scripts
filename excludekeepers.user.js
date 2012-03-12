// ==UserScript==
// @name           	Exclude Keepers From Yahoo Pre-Draft Values
// @namespace      	com.yahoo.fantasy.baseball
// @copyright      	2011, Eric Neunaber
// @include        	http://baseball.fantasysports.yahoo.com/b1/*/prerank_auction_costs*
// @require  		http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1.min.js
// ==/UserScript==
(function() {
	console.log("only here...");
	
	console.log('a' + $("img").length);
	var keepers = $('img[src$="keeper_indicator.gif"]');
	
	console.log('b' + keepers.length);

	keepers.each(function(index, elm){
		$(elm).closest('tr').find("input:checkbox").prop("checked", true);
	});   
	
	console.log("end...");
})();
