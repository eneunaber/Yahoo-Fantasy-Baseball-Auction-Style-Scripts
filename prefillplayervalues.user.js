// ==UserScript==
// @name           	Pre-Fill Player Values For Yahoo Draft
// @namespace      	com.yahoo.fantasy.baseball
// @copyright      	2012, Eric Neunaber, Mays Copeland (http://www.lastplayerpicked.com) and Bert Sanders
// @include        	http://baseball.fantasysports.yahoo.com/b1/*/prerank_auction_costs*
// @require  		http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1.min.js
// ==/UserScript==
(function() {
   var priceGuideURL = "http://www.lastplayerpicked.com/priceguide/index.php?t=14&l=MLB&m=260&b=1&ds=12C&dis=500&spl=&hs=70&ps=30&pt=Y&R=Y&RBI=Y&OBP=Y&BB=Y&TB=Y&ERA=Y&WHIP=Y&PHR=Y&K9=Y&KBB=Y&IP=Y&C=1&1B=1&2B=1&3B=1&SS=1&OF=0&LF=1&CF=1&RF=1&CI=0&MI=0&IF=0&Util=1&mg=10&SP=6&RP=3&P=0&ms=5&mr=5&o=S"
   var players = new Array();

   getPlayers();

   window.addEventListener("load", function(e) {
      activateSaveButton();
   }, false);


   function populatePrices(){
      var playerMatch = /.*sports\.yahoo\.com\/mlb\/players\/(\d\d\d\d)$/;

      var tags = document.getElementsByTagName("a");

      for (var i = 0; i < tags.length; i++)
      {
        var isPlayer = tags[i].href.match(playerMatch);

        if (isPlayer)
        {
         var playerID = isPlayer[1];
         var dollarValue = players[playerID];
         var playerValueInput = $(document).find("input[name$='players[" + playerID + "][auction_cost]']");
         if(dollarValue < 0)
            dollarValue = 1            
         $(playerValueInput).val(dollarValue);          
        }
      }
   }

   function activateSaveButton()
   {
      var lastCheckbox = $('input[name$="[is_excluded]"]').last();
      var isChecked = $(lastCheckbox).prop("checked");
      $(lastCheckbox).prop("checked", !isChecked);
      $(lastCheckbox).prop("checked", isChecked);

      console.log("activateSaveButton...");
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
            populatePrices();
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
})();
