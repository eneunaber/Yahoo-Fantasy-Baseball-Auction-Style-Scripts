// ==UserScript==
// @name           	Exclude Keepers From Yahoo Pre-Draft Values
// @namespace      	com.yahoo.fantasy.baseball
// @copyright      	2011, Eric Neunaber
// @include        	http://baseball.fantasysports.yahoo.com/b1/*/prerank_auction_costs*
// @require  		http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1.min.js
// ==/UserScript==
(function() {
	var keepers = $('img[src$="keeper_indicator.gif"]');
	keepers.each(function(index, elm){
		$(elm).closest('tr').find("input:checkbox").prop("checked", true);
	});   

	//$('#ysf-preauctioncosts-save').removeClass('ysf-cta-disabled');
})();
