var petaHarimau = L.layerGroup();
var petaKk = L.layerGroup();
var petaBeruang = L.layerGroup();
var petaBuaya1 = L.layerGroup();
var petaBuaya2 = L.layerGroup();
var petaHarimauDahan = L.layerGroup();
var petaSancaBatik = L.layerGroup();
var petaTapir = L.layerGroup();
var petaLandak = L.layerGroup();
var petaKukang = L.layerGroup();
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
		if (dataKonflik.values[i][4] === namaSatwa){
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

// data satwa yang tidak termasuk Harimau Sumatera, Beruang Madu, Buaya Muara, Buaya Senyulong
// Harimau Dahan, Sanca Batik, Tapir, Landak, Kukang

function dataSatwaLainnya(data){
	var result = [];
	for (let i = 1; i < dataKonflik.values.length ; i++) {
		var r = [];
		if (dataKonflik.values[i][4] !== 'Harimau Sumatera' &&
			dataKonflik.values[i][4] !== 'Beruang Madu' &&
			dataKonflik.values[i][4] !== 'Buaya Muara' &&
			dataKonflik.values[i][4] !== 'Buaya Senyulong' &&
			dataKonflik.values[i][4] !== 'Harimau Dahan' &&
			dataKonflik.values[i][4] !== 'Sanca Batik' &&
			dataKonflik.values[i][4] !== 'Tapir' &&
			dataKonflik.values[i][4] !== 'Landak' &&
			dataKonflik.values[i][4] !== 'Kukang'
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

dataHarimau = dataSatwa(dataKonflik, 'Harimau Sumatera');
dataBeruang = dataSatwa(dataKonflik, 'Beruang Madu');
dataBuaya1 = dataSatwa(dataKonflik, 'Buaya Muara');
dataBuaya2 = dataSatwa(dataKonflik, 'Buaya Senyulong');
dataHarimauDahan = dataSatwa(dataKonflik, 'Harimau Dahan');
dataSancaBatik = dataSatwa(dataKonflik, 'Sanca Batik');
dataTapir = dataSatwa(dataKonflik, 'Tapir');
dataLandak = dataSatwa(dataKonflik, 'Landak');
dataKukang = dataSatwa(dataKonflik, 'Kukang');
dataLainnya = dataSatwaLainnya(dataKonflik);

function dataPeta(data, markerColor, namaLayer){
	

	for (let i = 0; i < data.length; i++) {
		
		var latlng = L.latLng({ lat: data[i][6], lng: data[i][5] });
		var content = '<table class="table table-dark">' +
			'<tr>' + '<th>Tanggal</th>' + '<td>' + data[i][1] + '</td>' + '</tr>' +
			'<tr>' + '<th>Satwa</th>' + '<td>' + data[i][4] + ' (' + data[i][7] + ')</td>' + '</tr>' +
			'<tr>' + '<th>Lokasi</th>' + '<td>' + data[i][3] + '</td>' + '</tr>' + 
			'<tr>' + '<th>Keterangan</th>' + '<td>' + data[i][8] + '</td>' + '</tr>' +
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
rgba(103, 128, 159, 1)	// hoki
rgba(46, 49, 49, 1)		// outer space
rgba(108, 122, 137, 1)	// Lynch
rgba(149, 165, 166, 1)	// cascade
rgba(189, 195, 199, 1)	// silver sand

*/
PHarimau = dataPeta(dataHarimau, 'rgba(240, 52, 52, 1)', petaHarimau);
PBeruang = dataPeta(dataBeruang, 'rgba(27, 163, 156, 1)', petaBeruang);
PBuaya1 = dataPeta(dataBuaya1, 'rgba(25, 181, 254, 1)', petaBuaya1);
PBuaya2 = dataPeta(dataBuaya2, 'rgba(25, 181, 254, 1)', petaBuaya2);
PHarimauDahan = dataPeta(dataHarimauDahan, 'rgba(103, 128, 159, 1)', petaHarimauDahan);
PSancaBatik = dataPeta(dataSancaBatik, 'rgba(46, 49, 49, 1)', petaSancaBatik);
PTapir = dataPeta(dataTapir, 'rgba(108, 122, 137, 1)', petaTapir);
PLandak = dataPeta(dataLandak, 'rgba(149, 165, 166, 1)', petaLandak);
PKukang = dataPeta(dataKukang, 'rgba(189, 195, 199, 1)', petaKukang);
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
	"Harimau Dahan": petaHarimauDahan,
	"Sanca Batik": petaSancaBatik,
	"Tapir": petaTapir,
	"Landak": petaLandak,
	"Kukang": petaKukang,
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