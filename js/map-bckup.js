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
        L.marker( latlng ).addTo(map);
      } 
  }
});



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