var player = (function() {
	'use strict';

	var pub = {},
		// HEY YOU DEV!
		// Redefine this with yuor Play Server address
		playServer = 'http://0.0.0.0:3000/';

	pub.togglePlayPause = function() {
		$.get(playServer + 'play_pause');
	};

	pub.play = function() {
		$.get(playServer + 'play');
	};

	pub.pause = function() {
		$.get(playServer + 'pause');
	};

	pub.next = function() {
		$.get(playServer + 'next');
	};

	pub.previous = function() {
		$.get(playServer + 'previous');
	};

	pub.volumeUp = function() {
		$.get(playServer + 'up');
	};

	pub.volumeDown = function() {
		$.get(playServer + 'down');
	};

	pub.enableRepeat = function() {
		$.get(playServer + 'enable_repeat');
	};

	pub.disableRepeat = function() {
		$.get(playServer + 'disable_repeat');
	};

	pub.enableShuffle = function() {
		$.get(playServer + 'enable_shuffle');
	};

	pub.disableShuffle = function() {
		$.get(playServer + 'disable_shuffle');
	};

	pub.quit = function() {
		$.get(playServer + 'quit');
	};

	pub.systemVolumeUp = function() {
		$.get(playServer + 'system_up');
	};

	pub.systemVolumeDown = function() {
		$.get(playServer + 'system_down');
	};

	pub.getArtist = function(callback) {
		$.get(playServer + 'artist', callback);
	};

	pub.getTrack = function(callback) {
		$.get(playServer + 'track', callback);
	};


	// Return the public methods and attributes
	return pub;
}());


var controller = (function() {
	'use strict';

	var pub = {},
		interval,
		frequency = 5000; // 5000 => 5 seconds


	function insertArtist(response) {
		$( '#artist' ).html(response);
	}

	function insertTrack(response) {
		$( '#track' ).html(response);
	}

	function refreshArtistAndTrackData() {
		player.getArtist(insertArtist);
		player.getTrack(insertTrack);
	}

	function refreshInterval() {
		// Exit if interval is already defined
		if (interval !== undefined) { return; }

		interval = setInterval(function(){
			refreshArtistAndTrackData();
		}, frequency );
	}


	pub.play = function() {
		player.play();
		refreshInterval();
	};

	pub.togglePlayPause = function() {
		player.togglePlayPause();
		refreshInterval();
	};

	pub.turnOffPlayer = function() {
		// Turn off the player
		player.quit();

		// Stop loading artist and track data
		clearInterval(interval);
		interval = undefined;

		// Clean old artist and track data
		$( '#artist' ).html('');
		$( '#track' ).html('');
	};

	// Load current artist and track data automatically
	refreshArtistAndTrackData();

	// Start interval automatically
	refreshInterval();


	// Return the public methods and attributes
	return pub;
}());


$( '#play-pause' ).click(controller.togglePlayPause);
$( '#play' ).click(controller.play);
$( '#pause' ).click(player.pause);
$( '#next' ).click(player.next);
$( '#previous' ).click(player.previous);
$( '#down' ).click(player.volumeDown);
$( '#up' ).click(player.volumeUp);
$( '#enable-repeat' ).click(player.enableRepeat);
$( '#disable-repeat' ).click(player.disableRepeat);
$( '#enable-shuffle' ).click(player.enableShuffle);
$( '#disable-shuffle' ).click(player.disableShuffle);
$( '#system-down' ).click(player.systemVolumeDown);
$( '#system-up' ).click(player.systemVolumeUp);
$( '#quit' ).click(controller.turnOffPlayer);