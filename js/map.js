var petaHarimau = L.layerGroup();
var petaKk = L.layerGroup();
var petaBeruang = L.layerGroup();
var petaBuaya1 = L.layerGroup();
var petaBuaya2 = L.layerGroup();
var petaLainnya = L.layerGroup();

let link = 'https://sheets.googleapis.com/v4/spreadsheets/1vdjyIBrYn6Q2RV5Qsg6_2qQ2jVJIPRKKwmGwViE3gdA/values/FormResponses1?key=AIzaSyDxkeqWydQdTf92Gv0V_UTtPvkyfaFTcys';

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
var dataKonflik = JSON.parse(Get(link));

function dataSatwa(data, namaSatwa){
	var result = [];
	for (let i = 1; i < dataKonflik.values.length ; i++) {
		var r = [];
		if (dataKonflik.values[i][2] === namaSatwa){
			r[0] = dataKonflik.values[i][0]
			r[1] = dataKonflik.values[i][1]
			r[2] = dataKonflik.values[i][2]
			r[3] = dataKonflik.values[i][3]
			r[4] = dataKonflik.values[i][4]
			r[5] = dataKonflik.values[i][5]
			r[6] = dataKonflik.values[i][6]
			r[7] = dataKonflik.values[i][7]
			r[8] = dataKonflik.values[i][8]
			result.push(r);
			//console.log("HASIL DATA KUCINGx: " + result.lat[1]);
		}
	}
	return result;
}

function dataSatwaLainnya(data){
	var result = [];
	for (let i = 1; i < dataKonflik.values.length ; i++) {
		var r = [];
		if (dataKonflik.values[i][2] !== 'Harimau Sumatera (Panthera tigris sumatrae Pocock, 1929)' &&
			dataKonflik.values[i][2] !== 'Beruang Madu (Helarctos malayanus)' &&
			dataKonflik.values[i][2] !== 'Buaya Muara (Crocodylus porosus)' &&
			dataKonflik.values[i][2] !== 'Buaya Senyulong (Tomistoma schlegelii)'
			){
			r[0] = dataKonflik.values[i][0]
			r[1] = dataKonflik.values[i][1]
			r[2] = dataKonflik.values[i][2]
			r[3] = dataKonflik.values[i][3]
			r[4] = dataKonflik.values[i][4]
			r[5] = dataKonflik.values[i][5]
			r[6] = dataKonflik.values[i][6]
			r[7] = dataKonflik.values[i][7]
			r[8] = dataKonflik.values[i][8]
			result.push(r);
		}
	}
	return result;
}

dataHarimau = dataSatwa(dataKonflik, 'Harimau Sumatera (Panthera tigris sumatrae Pocock, 1929)');
dataBeruang = dataSatwa(dataKonflik, 'Beruang Madu (Helarctos malayanus)');
dataBuaya1 = dataSatwa(dataKonflik, 'Buaya Muara (Crocodylus porosus)');
dataBuaya2 = dataSatwa(dataKonflik, 'Buaya Senyulong (Tomistoma schlegelii)');
dataLainnya = dataSatwaLainnya(dataKonflik);

function dataPeta(data, markerColor, namaLayer){
	

	for (let i = 0; i < data.length; i++) {
		
		var latlng = L.latLng({ lat: data[i][5], lng: data[i][4] });
		var content = '<table class="table table-dark">' +
			'<tr>' + '<th>Tanggal</th>' + '<td>' + data[i][1] + '</td>' + '</tr>' +
			'<tr>' + '<th>Satwa</th>' + '<td>' + data[i][2] + '</td>' + '</tr>' +
			'<tr>' + '<th>Lokasi</th>' + '<td>' + data[i][3] + '</td>' + '</tr>' + 
			'<tr>' + '<th>Keterangan</th>' + '<td>' + data[i][7] + '</td>' + '</tr>' +
			'</table>';
		let icon;
		let webIconColor = '#ffffff';
		let webmarkerColor = 'rgba(255,25, 92, 1)';
		let weboutlineColor = 'white';
		let webIconSize = [31, 42];

			// Create icon
		var webIcon = L.IconMaterial.icon({
		    icon: 'pets',            			// Name of Material icon
		    iconColor: webIconColor,            // Material icon color (could be rgba, hex, html name...)
		    markerColor: markerColor, 		// Marker fill color
		    outlineColor: weboutlineColor,		// Marker outline color
		    outlineWidth: 1,					// Marker outline width 
		    iconSize: webIconSize				// Width and height of the icon
		  })
			L.marker( latlng,  {icon: webIcon} ).bindPopup(L.popup({maxWidth:500}).setContent(content)).addTo(namaLayer);
		} 
}

/*
color rgba:
rgba(34, 49, 63, 1) 	//ebony clay
rgba(25, 181, 254, 1) 	//deepsky blue
rgba(240, 52, 52, 1)	//pomegranate (red)
rgba(27, 163, 156, 1)	//light sea green 
petaLainnya
*/
PHarimau = dataPeta(dataHarimau, 'rgba(240, 52, 52, 1)', petaHarimau);
PBeruang = dataPeta(dataBeruang, 'rgba(27, 163, 156, 1)', petaBeruang);
PBuaya1 = dataPeta(dataBuaya1, 'rgba(25, 181, 254, 1)', petaBuaya1);
PBuaya2 = dataPeta(dataBuaya2, 'rgba(25, 181, 254, 1)', petaBuaya2);
PLainnya = dataPeta(dataLainnya, 'rgba(34, 49, 63, 1)', petaLainnya);

// OpenStreetMap
var osm = L.tileLayer(
	"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
	{attribution: "&copy; OpenStreetMap"}
);

// Map position
var map = L.map('map', {
	center: [-0.5, 100],
	zoom: 8,
	layers: [osm, petaKk, petaHarimau]
});


// Kawasan Hutan Konservasi di Sumatera Barat
let geojsonLayer = new L.GeoJSON.AJAX("geodata/kk.json");
geojsonLayer.addTo(petaKk);


var baseLayers = {	
	"OpenStreetMap": osm
};

var overlays = {
	"KK Sumbar": petaKk,	
	"Harimau Sumatera": petaHarimau,
	"Beruang Madu": petaBeruang,
	"Buaya Muara": petaBuaya1,
	"Buaya Senyulong": petaBuaya2,
	"Satwa lainnya": petaLainnya
};

L.control.layers(baseLayers, overlays).addTo(map);

let legenda = L.control({position: "bottomleft"});

legenda.onAdd = function(){
	let div = L.DomUtil.create ("div", "legenda");
	div.innerHTML = 
		'<p><b>Peta penyebaran KMSL di Sumbar</b></p><hr>' + 
		'<p>Konflik manusia dan satwa liar ' +
		'(KMSL) merupakan salah satu ' +
		'ancaman terhadap kelestarian jenis ' +
		'di Sumbar<br>&copy; Balai KSDA Sumbar' ;
	return div;
}

legenda.addTo(map);