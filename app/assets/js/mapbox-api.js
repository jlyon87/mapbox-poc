"use strict";
(function mapbox() {

	const config = {
		pkey: "pk.eyJ1Ijoiamx5b24xMSIsImEiOiJjajd0YWtieXk1NjQ0MnFucHYxbGQyN2dwIn0.c8nc1po08pFtUCT0SlUzgA",
		skey: "sk.eyJ1Ijoiamx5b24xMSIsImEiOiJjajd0YWw4bDIzaGZ2MndxbmVkOWpkM2h3In0.OahVHoyr99vm1S5rIHuLlA",
		url: "https://api.mapbox.com/v4/mapbox.emerald/page.html?access_token=",
		mapContainer: "mapbox",
		styleUrl: "mapbox://styles/mapbox/streets-v9",

		cleveland: [-81.694, 41.499],
		dc: [-77.036, 38.895],
		zoom: 12,
	};

	const createMap = function() {
		mapboxgl.accessToken = config.pkey;
		return new mapboxgl.Map({
			container: config.mapContainer,
			style: config.styleUrl,
			center: config.cleveland,
			zoom: config.zoom,
		});;
	};

	const createGeocoder = function() {
		return new MapboxGeocoder({
			accessToken: config.pkey,
		});
	};

	const createDraw = function() {
		return new MapboxDraw({
			displayControlsDefault: false,
			controls: {
				polygon: true,
				trash: true,
			},
		});
	};

	const attachCalcClickHandler = function(draw) {
		let calcBtn = document.getElementById("calculate");
		calcBtn.addEventListener("click", function() {
			let data = draw.getAll();
			if(data.features.length > 0) {
				let area = turf.area(data);
				let roundedArea = Math.round(area*100)/100;
				let answer = document.getElementById("calculated-area");
				answer.innerHTML = "<p><strong>" + roundedArea + "</strong><p><p>square meters</p>";
			}
		});
	};

	const init = function() {
		let map = createMap();
		let geocoder = createGeocoder();
		let draw = createDraw();

		map.addControl(geocoder);
		map.addControl(draw);

		attachCalcClickHandler(draw);
	};

	init();
}());
