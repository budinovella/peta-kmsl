// Map position
let map = L.map("map", {center: [-0.5, 100], zoom: 8});

// OpenStreetMap
L.tileLayer(
	"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
	{attribution: "&copy; OpenStreetMap"}
).addTo(map);


// Kawasan Hutan Konservasi di Sumatera Barat
let geojsonLayer = new L.GeoJSON.AJAX("geodata/kk.json");
geojsonLayer.addTo(map);

/*
let pnt = L.marker([-0.262218, 100]).addTo(map);


let popup = L.popup();

L.marker(L.latLng(-0.256, 100.2)).addTo(map);

function onMapCilck(e){
	popup
		.setLatLng(e.latlng)
		.setContent(
			"You clicked the map at -<br>" +
			"<b>lon:</b> " + Math.round(e.latlng.lng * 10000000) / 1000000 + "<br>" +
			"<b>lat:</b> " + Math.round(e.latlng.lat * 10000000) / 1000000
		)
		.openOn(map);
}

map.addEventListener("click", onMapCilck);
*/

let link = 'https://sheets.googleapis.com/v4/spreadsheets/1vdjyIBrYn6Q2RV5Qsg6_2qQ2jVJIPRKKwmGwViE3gdA/values/FormResponses1?key=AIzaSyDxkeqWydQdTf92Gv0V_UTtPvkyfaFTcys';

var getJSON = function(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'json';
		xhr.onload = function() {
			var status = xhr.status;
			if (status === 200) {
				callback(null, xhr.response);
			} else {
				callback(status, xhr.response);
			}
		};
		xhr.send();
};

getJSON(link,
function(err, data) {
	if (err !== null) {
		alert('Something went wrong: ' + err);
	} else {
		for (let i = 1; i < data.values.length; i++) {
			var latlng = L.latLng({ lat: data.values[i][5], lng: data.values[i][4] });
			var content = '<table class="table table-dark">' +
			'<tr>' + '<th>Tanggal</th>' + '<td>' + data.values[i][1] + '</td>' + '</tr>' +
			'<tr>' + '<th>Satwa</th>' + '<td>' + data.values[i][2] + '</td>' + '</tr>' +
			'<tr>' + '<th>Lokasi</th>' + '<td>' + data.values[i][3] + '</td>' + '</tr>' + 
			'<tr>' + '<th>Keterangan</th>' + '<td>' + data.values[i][7] + '</td>' + '</tr>' +
			'</table>';
			let icon;
				if (data.values[i][2] == 'Harimau Sumatera (Panthera tigris sumatrae Pocock, 1929)') {
					// select name of material icon, see https://fonts.google.com/icons?selected=Material+Icons
					icon = "pets";
				} else if (data.values[i][2] == 'Beruang Madu (Helarctos malayanus)') {
					icon = "cancel";
				} else if (data.values[i][2] == 'Buaya Muara (Crocodylus porosus)' ) {
					icon = "add circle";
				} else if (data.values[i][2] == 'Buaya Senyulong (Tomistoma schlegelii)' ) {
					icon = "remove circle";
				} else if (data.values[i][2] == 'Beruk (Macaca nemestrina)' ) {
					icon = "push pin";
				} else if (data.values[i][2] == 'Kera (Macaca fasciculari)' ) {
					icon = "change circle";
				}else {
					icon = "clear";
				}

			let webIconColor = '#ffffff';
			let webmarkerColor = 'rgba(255,25, 92, 1)';
			let weboutlineColor = 'white';
			let webIconSize = [31, 42];


			// Create icon
			var webIcon = L.IconMaterial.icon({
			    icon: icon,            				// Name of Material icon
			    iconColor: webIconColor,            // Material icon color (could be rgba, hex, html name...)
			    markerColor: webmarkerColor, 		// Marker fill color
			    outlineColor: weboutlineColor,		// Marker outline color
			    outlineWidth: 1,					// Marker outline width 
			    iconSize: webIconSize				// Width and height of the icon
			  })


				L.marker( latlng,  {icon: webIcon} ).bindPopup(L.popup({maxWidth:500}).setContent(content)).addTo(map);

/*
Harimau Sumatera (Panthera tigris sumatrae Pocock, 1929)
Beruang Madu (Helarctos malayanus)
Buaya Muara (Crocodylus porosus)
Buaya Senyulong (Tomistoma schlegelii)
Beruk (Macaca nemestrina)
Biawak (Varanus salvator)
Binturung (Arctictis binturong)
Kera (Macaca fasciculari)
Kucing Emas (Catopuma temminckii)
Kucing Hutan/ Macan dahan benua (Neofelis nebulosa)
Kucing Hutan/ Macan dahan (Neofelis diardi)
Kucing Hutan/ Kucing batu (Pardofelis marmorata)
Kucing Hutan/ Kucing congkok/ Meong congkok (Prionailurus bengalensis)
Penyu Hijau (Chelonia mydas)
Penyu Lekang (Lepidochelys olivacea)
Penyu Sisik (Eretmochelys imbricata)
Rusa Sambar (Rusa unicolor)
Sanca Batik/ Sanca kembang (Malayopython reticulatus)
Tapir (Tapirus indicus)
Elang Bondol (Haliastur indus)
Elang Brontok (Spizaetus cirrhatus)
Elang Coklat (Accipiter fasciatus)
Elang Ikan, Elang Tiram (Pandion haliaetus)
Elang Jawa (Spizaetus bartelsi)
Elang Kecil/ Elang perut karat (Lophotriorchis kienerii)
Burung Elang-ikan Kecil, Elang ikan kepala kelabu, Elang laut kecil, Elangikan Kecil, Elang-ikan kecil (Haliaeetus humilis)
Elang Laut data putih (Haliaeetus leucogaster)
Elang Tikus (Elanus caeruleus)
Elang Ular Bido (Spilornis cheela)

*/
				
				
			} 
	}
});


// Well, this one-liner is possible: 
// var mark1=L.marker([51.5, -0.09]).bindPopup(L.popup({maxWidth:500}).setContent("I am a standalone popup.")).addTo(map); – erik Sep 11 '15 at 15:18

let legenda = L.control({position: "bottomleft"});

legenda.onAdd = function(){
	let div = L.DomUtil.create ("div", "legenda");
	div.innerHTML = 
		'<p><b>Peta penyebaran KMSL di Sumatera Barat</b></p><hr>' + 
		'<p>Konflik manusia dan satwa liar ' +
		'(KMSL) merupakan salah satu ' +
		'ancaman terhadap kelestarian jenis ' +
		'di Sumatera Barat' ;
	return div;
}

legenda.addTo(map);