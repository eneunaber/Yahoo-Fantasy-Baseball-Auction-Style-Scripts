// ==UserScript==
// @name           	Pre-Fill Player Values For Yahoo Draft
// @namespace      	com.yahoo.fantasy.baseball
// @copyright      	2011, Eric Neunaber
// @include        	http://baseball.fantasysports.yahoo.com/b1/*/prerank_auction_costs*
// @require  		http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1.min.js
// ==/UserScript==
(function() {

var priceGuideURL = "http://www.lastplayerpicked.com/priceguide/index.php?t=14&l=MLB&m=260&b=1&ds=12C&dis=500&spl=&hs=70&ps=30&pt=Y&R=Y&RBI=Y&OBP=Y&BB=Y&TB=Y&ERA=Y&WHIP=Y&PHR=Y&K9=Y&KBB=Y&IP=Y&C=1&1B=1&2B=1&3B=1&SS=1&OF=0&LF=1&CF=1&RF=1&CI=0&MI=0&IF=0&Util=1&mg=10&SP=6&RP=3&P=0&ms=5&mr=5&o=S"
var players = new Array();

getPlayers();

setPlayerValues();


document.addEventListener("DOMNodeInserted", getInfo, false);

function getInfo(event)
{
   if (event.target.tagName == "DIV")
   {
      showValues();
   }
}

function getPlayers()
{
GM_xmlhttpRequest(
{
    method: 'GET',
    url: priceGuideURL,
    onload: function( responseDetails )
    {
      buildPlayersHash(responseDetails.responseText);
      showValues();
    },
});
}

function buildPlayersHash(playersCSV)
{
   var playerValues = playersCSV.split("\n");

   for (var i = 0; i < playerValues.length - 1; i++)
   {
      var player = playerValues[i].split(",");
      var dollarValue = 0;

      if (player[1] > 0)
      {
         dollarValue =  Number(player[1]).toFixed(0);
      }
      else
      {
         dollarValue =  Math.abs(Number(player[1]).toFixed(0));
      }
      players[ player[0] ] = dollarValue;
   }
}


function showValues()
{
	/*
   var playerMatch = /.*sports\.yahoo\.com\/mlb\/players\/(\d\d\d\d)$/;

   var tags = document.getElementsByTagName("a");

   for (var i = 0; i < tags.length; i++)
   {
      var isPlayer = tags[i].href.match(playerMatch);

      if (isPlayer)
      {
         var playerID = isPlayer[1];
         if (players[playerID] != null)
         {
            var dollarValue = players[playerID];

            if (tags[i].innerHTML.indexOf(dollarValue) < 0)
            {
               tags[i].innerHTML = tags[i].innerHTML + " " + dollarValue;
            }

            console.log(  $(tags[i]).closest('tr').siblings().find("input[class$='auction-cost']").length );
            //var playerValue = $(tags[i]).closest('tr').siblings().find("input[class$='auction-cost']");
            //if(playerValue){
            //	console.log($(playerValue).val());
            //}
         }
      }
   }
   */
}


function setPlayerValues(){
	var playerValueInputs = $(document).find("input[class$='auction-cost']");
	playerValueInputs.each(function(index, elm){
		var myString = $(elm).attr('name');

		var part1 = myString.split("[");
		var playerNumber = part1[1].slice(0,part1[1].length-1);
		console.log(playerNumber);

		//var myRegexp = /(players\[)([0-9])+(\]\[auction_cost\])/g;
		//var match = myRegexp.exec(myString);		
		//if(match)
		//	console.log(match);
		//else
		//	console.log("no match");
	});   
}

})();
