
var ipport
var conheight	
var resized
var resuresized
var libsize
var navheight

/////////////conncet//////////////////////////
function connect(ipport)
{
	ip = localStorage.getItem("ip")
	code = localStorage.getItem(ip)
	ipport = ip+":5672"
	ws = new WebSocket('ws://'+ipport+'');
	$("#addip").val(localStorage.getItem("ip"));
	login(code)
}


////////////////////login/////////////////////
function login(code)
{
	connectf()	
	ws.onopen = function()
		{
			ws.send(JSON.stringify({
			"namespace": "connect",
			"method": "connect",
			"arguments": ["pc / webapp", code]
			}));
			listen ()
		}
	if(ws.readyState === ws.OPEN)
	{
		ws.send(JSON.stringify({
			"namespace": "connect",
			"method": "connect",
			"arguments": ["pc / webapp", code]
			}));
			listen ()
	}	
}

////////////////////listen/////////////////////
function listen ()
{
		ws.onmessage = function (evt)
			{
			connects()
			objmess = JSON.parse(evt.data);
			
			if(objmess.payload=="CODE_REQUIRED")
				{
				if(ws.readyState === ws.OPEN)
					{
					code = window.prompt(objmess.payload);
					if (code != null) 
						{
						login(code)
						}
					}
				}
			if(objmess.channel=="connect")
				{
				if(objmess.payload!="CODE_REQUIRED")
					{
					code = objmess.payload
					ipport = localStorage.getItem("ip")
					localStorage.setItem(ipport, code);
					login(code)
					}
				}
			
			
			
			switch (objmess.channel){
				case "playlists":
					localStorage.setItem('playlists', JSON.stringify(objmess.payload));
					playlist()
					$("#iconnect").attr("class","glyphicon colmargin iconect glyphicon-music");
				break;
				
				case "track":
					var mytrack = objmess.payload.albumArt
					var trackname = objmess.payload.title
					var trackinfo = objmess.payload.artist +" , "+ objmess.payload.album
					track(mytrack,trackname,trackinfo)			
				break;
				
				case "playState":
					var playstate = objmess.payload
					iconplay(playstate)					
				break;
				
				case "shuffle":
					if(objmess.payload!="NO_SHUFFLE")
					{
					$(".glyphicon-random").attr("class","glyphicon colmargin glyphicon-large glyphicon-random enabled");
					}
					else
					{
					$(".glyphicon-random").attr("class","glyphicon colmargin glyphicon-large glyphicon-random");
					}
				break;
				
				case "time":
					var current=objmess.payload.current
					var total=objmess.payload.total
					mytime(current,total)
				break;
				
				case "queue":
					localStorage.setItem('queue', JSON.stringify(objmess.payload));
					queuelist()
				break;
				
				case "search-results":
					localStorage.setItem('search', JSON.stringify(objmess.payload));
					results()
				break;
				case "library":
					localStorage.setItem('library', JSON.stringify(objmess.payload));
					library()
					
				break;
				case "lyrics":
					localStorage.setItem('lyrics', objmess.payload);
					lyrics()
					
				break;
				
			}
			}
}

  		
  


$( document ).ready(function() {
	connect()
	hidediv()
	
	$('body').on('click','#checkico', function(){
	ip = $('#addip').val();
	ws.close()
	$("input").blur();
	$( "#navbarCollapse" ).toggleClass( "collapse" )
	localStorage.setItem("ip", ip)
	connect(ip)
	});
	
	$('body').on('click','.myplaybtn', function(){
	var id = $(this).attr('id');
	play(id)
	});	
	
	$('tr').on('click','.myplaytrackbtn', function(){
	var mysong = $(this).attr('id');
	playt(mysong)
	});
	$('body').on('click','.myplaytracksearch', function(){
	var recup = $(this).attr('id');
	playresult(recup)
	});
	$('body').on('click','.myplaytracklib', function(){
	var recup = $(this).attr('id');
	playlib(recup)
	});
	$('body').on('click','.myplaylistrack', function(){
    forward()
	});
	$('body').on('click','#btnlyrics', function(){
	
    
	if ($('#lyrics').css('display') == 'none')
	{
		$( "#lyrics" ).show();
		heightdiv() 
		$("#imgplayer").css("-webkit-filter", "brightness(50%)");
		$(".square").css("-webkit-filter", "brightness(50%)");
		var heightadjust = resized + 100;
		var navadjust = navheight + 30;
		$("#lyrics").css("height", heightadjust);
		$("#lyrics").css("top", navadjust);	
	
		
	}
	else
	{
		$( "#lyrics" ).hide();
		$("#imgplayer").css("-webkit-filter", "brightness(100%)");
		$(".square").css("-webkit-filter", "brightness(100%)");
	}
	
	
	});
	
	
	$('body').on('click','#btn1', function(){
    playpause()
	});
	
	$('body').on('click','.glyphicon-fast-forward', function(){
    forward()
	});
	
	$('body').on('click','.glyphicon-fast-backward', function(){
    backward()
	});
	
	$('body').on('click','.glyphicon-play', function(){
    playpause()
	});
	$('body').on('click','.glyphicon-pause', function(){
    playpause()
	});
	
	$('body').on('click','.glyphicon-random', function(){
	toggleShuffle()
	});
	$('body').on('click','.glyphicon-volume-up', function(){
	involume();
	});
	$('body').on('click','.glyphicon-volume-down', function(){
	devolume();
	});
	
	
	$('body').on('click','#searchico', function(){
	$("input").blur();
			var mysearch = $('#searchin').val();
			search(mysearch)
			detectab()
			hidediv()
			$( "#results" ).show();
			heightdiv()
			lumout()
			$("#sublibrary").css("height", libsize);
			$(".resleft").css("height", libsize);
			$(".resright").css("height", libsize);
			$("#results").css("top", navheight);
			$("#results").css("animation",  "rleft 1s forwards");
			$("#searchin").val("");
	});
	
	$('#searchin').on('keypress', function (e) {
         if(e.which === 13){
			$("input").blur();
			var mysearch = $('#searchin').val();
			search(mysearch)
			detectab()
			hidediv()
			$( "#results" ).show();
			heightdiv()
			lumout()
			$("#sublibrary").css("height", libsize);
			$(".resleft").css("height", libsize);
			$(".resright").css("height", libsize);
			$("#results").css("top", navheight);
			$("#results").css("animation",  "rleft 1s forwards");
			$("#searchin").val("");
			return false;
         }
   });
   
   $('#addip').on('keypress', function (e) {
         if(e.which === 13){
			$("input").blur();
			ip = $('#addip').val();
			$( "#navbarCollapse" ).toggleClass( "collapse" )
			ws.close()
			localStorage.setItem("ip", ip)
			connect(ip)
         }
   });
	
	$('body').on('click','#dispresults', function(){
		hidediv()
		detectab()
		heightdiv()
		$( "#library" ).show();
		lumout()
		$("#accordion10").css("height", resized);
		$("#library").css("top", navheight);
		$("#library").css("animation",  "rleft 1s forwards");

	});
	
	
///////slider//////////////////////////////////////
var $element = $('input[type="range"]');
   $element.on('input', function() {
		volume(this.value)
		
	  });

	
/////////////hammer/////////////////////////////////	
	
	////playlists//////////
	var menu = document.getElementById('menu');
	var menuHammer = new Hammer(menu);
	menuHammer.on("swipeleft", function(ev) {
		lumin()
	    $("#menu").css("animation",  "left 1s forwards");
		setTimeout(function(){$( "#menu" ).hide();}, 1000);
	});
	
	var container = document.getElementById('container');
	var containerHammer = new Hammer(container);
	containerHammer.on("swiperight", function(ev) {
		hidediv()
		$( "#menu" ).show();
		lumout()
		detectab()
		heightdiv()
		$("#menu").css("animation",  "right 1s forwards");
		$("#menu").css("top", navheight);
	    $("#accordion1").css("height", resized);
	});
	
	////queue//////////
	var queue = document.getElementById('queue');
	var menuHammer = new Hammer(queue);
	menuHammer.on("swiperight", function(ev) {
		lumin()
		$("#queue").css("animation",  "rright 1s forwards"); 
		setTimeout(function(){$( "#queue" ).hide();}, 1000);
	});
	
	var container = document.getElementById('container');
	var containerHammer = new Hammer(container);
	containerHammer.on("swipeleft", function(ev) {
		lumout()
		hidediv()
		detectab()
		heightdiv()
		$( "#queue" ).show();
		$("#queue").css("top", navheight);
		$("#queue").css("animation",  "rleft 1s forwards");   
		$("#accordion2").css("height", resized);
	});
	
	
	
	////results//////////
	var results = document.getElementById('results');
	var menuHammer = new Hammer(results);
	menuHammer.on("swiperight", function(ev) {
		lumin()
	    $("#results").css("animation",  "rright 1s forwards"); 
		setTimeout(function(){$( "#results" ).hide();}, 1000);
	    
	});
	
	
	////l//////////
	var library = document.getElementById('library');
	var menuHammer = new Hammer(library);
	menuHammer.on("swiperight", function(ev) {
		lumin()
		$("#library").css("animation",  "rright 1s forwards"); 
		setTimeout(function(){$( "#library" ).hide();}, 1000);
	    
	});
	
	
	
	
});

