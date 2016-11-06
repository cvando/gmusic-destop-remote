

///////////////////////playlists////////////////////////
function playlist()
{
	$('#accordion1').empty();
	var obj = JSON.parse(localStorage.getItem("playlists"));
	var content = null;
	for(var i = 0; i < obj.length; i++)
		{
		var playlistid = objmess.payload[i].id
		localStorage.setItem(playlistid, JSON.stringify(obj[i]));
		var playlistid = obj[i].id
		var playlistname = obj[i].name
		var tracks = obj[i].tracks
		var iplay = '<button type="button" id="'+playlistid+'"  class="btn btn-default myplaybtn btn-sm"><span class="glyphicon glyphicon-white glyphicon-small glyphicon-play"></span></button>'
		var namep = objmess.payload[i].name.substring(10);
		var name= namep.slice(0, -1);
		var content='<div class="panel"><div class="panel-heading paneltitre"><table class="titletab"><tr><td data-toggle="collapse" data-parent="#accordion1" href="#collapse'+i+'" class="icoflechebas"><span class="glyphicon glyphicon-white glyphicon-small glyphicon-circle-arrow-down"></span></td><td data-toggle="collapse" data-parent="#accordion" href="#collapse'+i+'" align="left"><span class="titre">'+name+'</span></td><td width="30px;" align="right">'+iplay+'</td></tr></table></div><div id="collapse'+i+'" class="panel-collapse collapse panel-custom " ><div class="panel-body"><ul class="list-group" id="ul'+i+'"></ul></div></div></div>'
		$( content ).appendTo( "#accordion1" );
			for(var j = 0; j < obj[i].tracks.length; j++)
				{
				var id = obj[i].tracks[j].id
				localStorage.setItem(id, JSON.stringify(obj[i].tracks[j]));
				var title = obj[i].tracks[j].title
				var album = obj[i].tracks[j].album
				var art = obj[i].tracks[j].albumArt
				var artist = obj[i].tracks[j].artist
				var chans = '<table class="tabline" ><tr id="'+id+'" class="line myplaytracksearch"><td class="mini"><img class="mini" src="'+art+'"><td class="text">'+objmess.payload[i].tracks[j].artist+',  '+objmess.payload[i].tracks[j].title+'</td><td style="width:30px;" ><span class="glyphicon glyphicon-small glyphicon-play-circle"></span></button></td></tr></table>'
	
				$( chans ).appendTo( "#ul"+i );
				}
		}
}

function results()
{
	$('#artists').empty();
	$('#albums').empty();
	$('#songs').empty();
	for(var j = 0; j < objmess.payload.albums.length; j++)
				{
				var id = objmess.payload.albums[j].id
				localStorage.setItem(id, JSON.stringify(objmess.payload.albums[j]));
				var name = objmess.payload.albums[j].name
				var artist = objmess.payload.albums[j].artist
				var art = objmess.payload.albums[j].albumArt
				// var art = artv2.slice(0, -7);
				var album = '<table class="tabline"><tr id="'+id+'" class="line myplaytracksearch"><td class="mini"><img class="mini" src="'+art+'"></td><td class="text">'+artist+',    '+name+'</td><td style="width:30px;" ><button type="button" id="'+id+'" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-small glyphicon-play-circle"></span></button></td></tr></table>'
				
				$( album ).appendTo( "#albums" );
				}
	for(var j = 0; j < objmess.payload.artists.length; j++)
				{
				var id = objmess.payload.artists[j].id
				localStorage.setItem(id, JSON.stringify(objmess.payload.artists[j]));
				var name = objmess.payload.artists[j].name
				var artists = '<table class="tabline"><tr id="'+id+'"  class="line myplaytracksearch"><td class="text">'+name+'</td></tr></table>'
				
				//$( artists ).appendTo( "#artists" );
				}
	for(var j = 0; j < objmess.payload.tracks.length; j++)
				{
				var id = objmess.payload.tracks[j].id
				localStorage.setItem(id, JSON.stringify(objmess.payload.tracks[j]));
				var name = objmess.payload.tracks[j].title
				var artist = objmess.payload.tracks[j].artist
				var art = objmess.payload.tracks[j].albumArt
				var songs = '<table class="tabline"><tr id="'+id+'"  class="line myplaytracksearch"><td class="mini"><img class="mini" src="'+art+'"></td><td class="text" align="left">'+artist+',    '+name+'</td></td><td style="width:30px;" ><span class="glyphicon glyphicon-small glyphicon-play-circle"></span></button></td></tr></table>'
				
				$( songs ).appendTo( "#songs" );
				}



}



function lyrics()
{
	var mylyrics = localStorage.getItem("lyrics");
	if (mylyrics != "null")
	{
		$( "#lyrics" ).html( mylyrics );
	}
	else
	{
		$( "#lyrics" ).html( "No lyrics" );
	}
}
function library()
{
	$('#accordion10').empty();
	var obj = JSON.parse(localStorage.getItem("library"));
	for(var j = 0; j < obj.albums.length; j++)
		{
		var id = obj.albums[j].id
		localStorage.setItem(id, JSON.stringify(obj.albums[j]));
		var name = obj.albums[j].name
		var artist = obj.albums[j].artist
		var art = obj.albums[j].albumArt
		var content='<div class="panel"><div class="panel-heading paneltitre"><table class="titletab"><tr><td data-toggle="collapse" data-parent="#accordion10" href="#collapse1'+j+'" class="icoflechebas"><img class="mini" src="'+art+'"></td><td data-toggle="collapse" data-parent="#accordion10" href="#collapse1'+j+'" align="left"><span class="titre">'+artist+' , '+name+'</span></td></td></tr></table></div><div id="collapse1'+j+'" class="panel-collapse collapse panel-custom " ><div class="panel-body"><ul class="list-group" id="ul1'+j+'"></ul></div></div></div>'
		$( content ).appendTo( "#accordion10" );
			
		for(var i = 0; i < obj.albums[j].tracks.length; i++)
			{
			var id = obj.albums[j].tracks[i].id
			localStorage.setItem(id, JSON.stringify(obj.albums[j].tracks[i]));
			var title = obj.albums[j].tracks[i].title
			var art = obj.albums[j].tracks[i].albumArt
			var chans = '<table class="tabline" ><tr id="'+id+'" class="line myplaytracklib"><td class="mini"><img class="mini" src="'+art+'"><td class="text">'+title+'</td><td style="width:30px;" ><span class="glyphicon glyphicon-small glyphicon-play-circle"></span></button></td></tr></table>'
			$( chans ).appendTo( "#ul1"+j );
			
			}
		}
}


function queuelist()
{
	$('#queueul').empty();
	var obj = JSON.parse(localStorage.getItem("queue"));
	for(var j = 0; j < obj.length; j++)
				{
				var id = obj[j].id
				localStorage.setItem(id, JSON.stringify(objmess.payload[j]));
				var title = obj[j].title
				var album = obj[j].album
				var art = obj[j].albumArt
				var artist = obj[j].artist
				var chans = '<table class="tabline"><tr id="'+id+'" class="line myplaytracksearch"><td class="mini"><img class="mini" src="'+art+'"></td><td class="text">'+artist+',  '+title+'</td><td style="width:30px;" ><span class="glyphicon glyphicon-small glyphicon-play-circle"></span></td></tr></table>'
	 
				$( chans ).appendTo( "#queueul" );
				}
}



function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}


function track(mytrack,trackname,trackinfo){
		if (trackname == null)
		{
		trackname = "connected"
		trackinfo = "Play a track"
		mytrack = "iconmusic.png"
		}
		
		$("#imgplayer").attr("src",mytrack);
		$("#tracklabel").html(trackname);
		$("#albartlabel").html(trackinfo);
}
function mytime(current,total)
{
		var mywidth=current/total*100
		$('#superbar').css('width', mywidth+'%').attr('aria-valuenow', current)
		$('#superbar').attr('aria-valuemax', total)
}
function play(list)
{
		clear()
		var obj = JSON.parse(localStorage.getItem(list));
 		ws.send(JSON.stringify({
		"namespace": "playlists",
		"method": "play",
		"arguments" : [obj]
		}));
		setTimeout(function(){
			playpause()
		}, 2000);
}
function playt(mysong)
{
		var obj1 = JSON.parse(localStorage.getItem("queue"));
		var supobj= getObjects(obj1, 'id', mysong)
		toplay = supobj[0]
		setTimeout(function(){
			searchplay(toplay)
		}, 2000);
}
function playliststrack(list, track)
{
		var obj = JSON.parse(localStorage.getItem(list));
		var obj = JSON.parse(localStorage.getItem(track));
		toplay = supobj[0]
		setTimeout(function(){
			playlt(re,res)
		}, 2000);
}

function playresult(result){
		var obj1 = JSON.parse(localStorage.getItem(result));
		console.log(obj1)
		setTimeout(function(){
			searchplay(obj1)
		}, 2000);

}
function playlib(result){
		var obj1 = JSON.parse(localStorage.getItem(result));
		console.log(obj1)
		setTimeout(function(){
			libplay(obj1)
		}, 2000);

}

function myplay2(result){
		var obj = JSON.parse(localStorage.getItem("queue"));
		console.log(obj[result])
		setTimeout(function(){
			libplay(obj[result])
		}, 2000);

}

function playpause()
{
 		ws.send(JSON.stringify({
				"namespace": "playback",
				"method": "playPause"
				}));
}
function forward()
{
 		ws.send(JSON.stringify({
				"namespace": "playback",
				"method": "forward"
				}));
}
function backward()
{
 		ws.send(JSON.stringify({
				"namespace": "playback",
				"method": "rewind"
				}));
}
function clear()
{
 		ws.send(JSON.stringify({
				"namespace": "queue",
				"method": "clear"
				}));
}
function playTrack(track)
{
 		ws.send(JSON.stringify({
				"namespace": "queue",
				"method": "playTrack",
				"arguments": track
				}));
}


function toggleShuffle()
{
		ws.send(JSON.stringify({
				"namespace": "playback",
				"method": "toggleShuffle"
				}));
}
function involume()
{
		ws.send(JSON.stringify({
				"namespace": "volume",
				"method": "increaseVolume"
				}));
}
function devolume()
{
		ws.send(JSON.stringify({
				"namespace": "volume",
				"method": "decreaseVolume"
				}));
}
function shufflemode()
{
		ws.send(JSON.stringify({
				"namespace": "playback",
				"method": "setShuffle",
				"arguments" :"ALL_SHUFFLE"
				}));
}


function allplaylists()
{
 		ws.send(JSON.stringify({
				"namespace": "playlists",
				"method": "getAll"
				}));
}

function search(mysearch)
{
 		ws.send(JSON.stringify({
				"namespace": "search",
				"method": "performSearch",
				"arguments" : [mysearch]
				}));
}
function searchplay(track)
{
 		ws.send(JSON.stringify({
				"namespace": "search",
				"method": "playResult",
				"arguments" : [track]
				}));
}
function libplay(track)
{
 		ws.send(JSON.stringify({
				"namespace": "library",
				"method": "playTrack",
				"arguments" : [track]
				}));
}
function playlt(playlist, track)
{
 		ws.send(JSON.stringify({
				"namespace": "playlists",
				"method": "playWithTrack",
				"arguments" : [playlist, track]
				}));
}

function iconplay(state)
{
	if(state==false)
	{
	$("#ppicon").attr("class","glyphicon glyphicon-large colmargin glyphicon-play");
	}
	if (state==true)
	{
	$("#ppicon").attr("class","glyphicon glyphicon-large colmargin glyphicon-pause")
	}
}


function playback()
{
 		ws.send(JSON.stringify({
				"namespace": "playback",
				"method": "setCurrentTime",
				"arguments": [100000]
				}));
}
function currenttrack()
{
 		ws.send(JSON.stringify({
				"namespace": "playback",
				"method": "isPlaying"
				}));
}


function resizeimg()
{
  var hcont = $("#container").height();
  var screenImage = $("#imgplayer");
  var theImage = new Image();
  theImage.src = screenImage.attr("src");
  var imageWidth = theImage.width;
  var imageHeight = theImage.height;
  if (hcont < 700 )
  		{
  			
  		}
}
function detectab()
{
var conwidth= $('#container').width();
if (conwidth > 500)
	{
	$( "#resleft" ).addClass( "resleft" );
	$( "#resright" ).addClass( "resright" );
	}
else
	{
	$( "#resleft" ).removeClass( "resleft" );
	$( "#resright" ).removeClass( "resright" );
	}
}
function hidediv()
{
	$( "#results" ).hide();
	$( "#lyrics" ).hide();
	$( "#menu" ).hide();
	$( "#library" ).hide();
	$( "#queue" ).hide();
	$( "#volume" ).hide();
}
function heightdiv()
{
	navheight= $('#nav').height();
	conheight= $('#container').height();
	resized = conheight - 205;
	resuresized = conheight - 153;
	libsize = resuresized - 50
}
function lumin()
{
	$("#imgplayer").css("-webkit-filter", "brightness(100%)");
	$(".btnlyrics").css("-webkit-filter", "brightness(100%)");
}
function lumout()
{
	$("#imgplayer").css("-webkit-filter", "brightness(50%)");
	$(".btnlyrics").css("-webkit-filter", "brightness(20%)");
}
