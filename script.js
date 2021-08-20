const stateIndex = {
  "AN": {StateName:"Andaman and Nicobar Islands",latitude: 13.21409,longitude: 92.94347 },
  "AP": {StateName:"Andhra Pradesh",latitude: 14.762005,longitude: 78.874889 },
  "AR": {StateName:"Arunachal Pradesh",latitude: 28.485129,longitude: 94.678982 },
  "AS": {StateName:"Assam",latitude: 26.272528,longitude: 92.877434 },
  "BR": {StateName:"Bihar",latitude: 25.708465,longitude: 85.573398 },
  "CH": {StateName:"Chandigarh",latitude: 30.728092   ,longitude: 76.7784 },
  "CT": {StateName:"Chhattisgarh",latitude: 21.65204,   longitude: 81.871417 },
  "DN": {StateName:"Dadra and Nagar Haveli",latitude: 20.24168,   longitude: 73.0171 },
  "DD": {StateName:"Daman and Diu",latitude: 20.397314   ,longitude: 72.855807 },
  "DL": {StateName:"Delhi",latitude: 28.557163   ,longitude: 77.163665 },
  "GA": {StateName:"Goa",latitude: 15.353196   ,longitude: 74.104396 },
  "GJ": {StateName:"Gujarat",latitude: 23.361661   ,longitude: 71.64895 },
  "HR": {StateName:"Haryana",latitude: 29.0588   ,longitude: 76.0856 },
  "HP": {StateName:"Himachal Pradesh",latitude: 31.90226,   longitude: 77.274759 },
  "JK": {StateName:"Jammu and Kashmir",latitude: 33.2778   ,longitude: 75.3412 },
  "JH": {StateName:"Jharkhand",latitude: 23.663785   ,longitude: 85.143872 },
  "KA": {StateName:"Karnataka",latitude: 14.882195   ,longitude: 75.57454 },
  "KL": {StateName:"Kerala",latitude: 9.791129,   longitude: 76.746728 },
  "LA": {StateName:"Ladakh",latitude: 34.442917   ,longitude: 78.077329 },
  "LD": {StateName:"Lakshadweep",latitude: 11.277142   ,longitude: 74.043031 },
  "MP": {StateName:"Madhya Pradesh",latitude: 22.952601   ,longitude: 78.35788 },
  "MH": {StateName:"Maharashtra",latitude: 19.405779   ,longitude: 75.70204 },
  "MN": {StateName:"Manipur",latitude: 24.649936   ,longitude: 93.810293 },
  "ML": {StateName:"Meghalaya",latitude: 25.500167   ,longitude: 91.457209 },
  "MZ": {StateName:"Mizoram",latitude: 23.543786   ,longitude: 92.884718 },
  "NL": {StateName:"Nagaland",latitude: 26.098769   ,longitude: 94.563688 },
  "OR": {StateName:"Odisha",latitude: 20.775803   ,longitude: 84.637724 },
  "PY": {StateName:"Puducherry",latitude: 10.943987   ,longitude: 79.796105 },
  "PB": {StateName:"Punjab",latitude: 30.754088   ,longitude: 75.522889 },
  "RJ": {StateName:"Rajasthan",latitude: 26.950688,longitude: 73.786591 },
  "SK": {StateName:"Sikkim",latitude: 27.584537,longitude: 88.468692 },
  "TN": {StateName:"Tamil Nadu",latitude: 11.05221,longitude: 78.408526 },
  "TG": {StateName:"Telangana",latitude: 18,longitude: 79.5 },
  "TR": {StateName:"Tripura",latitude: 23.687391,longitude: 91.587472 },
  "UP": {StateName:"Uttar Pradesh",latitude: 26.879641,longitude: 80.56982 },
  "UT": {StateName:"Uttarakhand",latitude: 30.209236,longitude: 79.182055 },
  "WB": {StateName:"West Bengal",latitude: 23.269974,longitude: 87.815506 },
  "TT": {StateName:"India",latitude: 20.5937,longitude: 78.9629 }
};

//initializes the map
mymap = L.map('mapid').setView([21.7679, 80.8718], 4.2);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHJhbmF2YmFsYWtyaXNobmFuIiwiYSI6ImNrc2Q1Y2hhcDA1dHoyb251czZqNjJ5OXIifQ.GAwEOUtXWEtB58rzohGM4g', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoicHJhbmF2YmFsYWtyaXNobmFuIiwiYSI6ImNrc2Q1Y2hhcDA1dHoyb251czZqNjJ5OXIifQ.GAwEOUtXWEtB58rzohGM4g'
}).addTo(mymap);



//gets state wise covid data and draws circles
function getCovidData(){
  $.ajax({
    url: "https://data.covid19india.org/v4/min/data.min.json",
    success: function(covidData) {
      for (const stateCode in covidData){
        var stateName = stateIndex[stateCode].StateName;
        var stateLat = stateIndex[stateCode].latitude;
        var stateLong= stateIndex[stateCode].longitude;
        var dailyCovid=0;
        if(stateCode=="TT"){
          currState=stateName;
          document.getElementById('clickname').innerHTML=currState;
          document.getElementById('new-cases').innerHTML=covidData[stateCode].delta.confirmed.toLocaleString();
          document.getElementById('recovered').innerHTML=covidData[stateCode].delta.recovered.toLocaleString();
          document.getElementById('deaths').innerHTML=covidData[stateCode].delta.deceased.toLocaleString();
          document.getElementById('total').innerHTML=covidData[stateCode].total.confirmed.toLocaleString();
          var vax2=covidData[stateCode].total.vaccinated2;
          var vax1=covidData[stateCode].total.vaccinated1;
          var pop=covidData[stateCode].meta.population;
          var pc2=(Math.ceil((vax2/pop)*100));
          var pc1=(Math.ceil((vax1/pop)*100));
          $(".progress").css("visibility","visible");
          $("#vax-bar2").css("width",pc2+"%");
          $("#vax-bar1").css("width",(pc1-pc2)+"%");
          document.getElementById('vax-bar2').innerHTML=pc2+"%";
          document.getElementById('vax-bar1').innerHTML=(pc1)+"%";
        }
        else{
          if(covidData[stateCode].delta!=undefined && covidData[stateCode].delta.confirmed!=undefined){dailyCovid=covidData[stateCode].delta.confirmed;}
          if(stateLat!=undefined && stateLong!=undefined){var circle = L.circle([stateLat,stateLong], { color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: Math.sqrt(dailyCovid) * 2000 }).addTo(mymap);}
        }
      }
    }
  })
}

//identifies state when latitude and longitude are passed
function geocode(query){
    $.ajax({
      url: 'https://api.opencagedata.com/geocode/v1/json',
      method: 'GET',
      data: {
        'key': '7d0232625e4b42e5b0f70554309d4059',
        'q': query,
        'no_annotations': 1
      },
      dataType: 'json',
      statusCode: {
        200: function(response){  // success
          var currState=response.results[0].components.state
          $(function(){
            $.ajax({
              url: "https://data.covid19india.org/v4/min/data.min.json",
              success: function(covidData) {
                for (const stateCode in covidData) {
                  if (stateIndex[stateCode].StateName===currState && (currState!=undefined)){
                    document.getElementById('clickname').innerHTML=currState;
                    if(covidData[stateCode].delta!=undefined && covidData[stateCode].delta.confirmed!=undefined){document.getElementById('new-cases').innerHTML=covidData[stateCode].delta.confirmed.toLocaleString();}
                    if(covidData[stateCode].delta!=undefined && covidData[stateCode].delta.recovered!=undefined){document.getElementById('recovered').innerHTML=covidData[stateCode].delta.recovered.toLocaleString();}
                    if(covidData[stateCode].delta!=undefined && covidData[stateCode].delta.deceased!=undefined){document.getElementById('deaths').innerHTML=covidData[stateCode].delta.deceased.toLocaleString();}
                    if(covidData[stateCode].total!=undefined && covidData[stateCode].total.confirmed!=undefined){document.getElementById('total').innerHTML=covidData[stateCode].total.confirmed.toLocaleString();}
                    var vax2=covidData[stateCode].total.vaccinated2;
                    var vax1=covidData[stateCode].total.vaccinated1;
                    var pop=covidData[stateCode].meta.population;
                    var pc2=(Math.ceil((vax2/pop)*100));
                    var pc1=(Math.ceil((vax1/pop)*100));
                    $(".progress").css("visibility","visible");
                    $("#vax-bar2").css("width",pc2+"%");
                    $("#vax-bar1").css("width",(pc1-pc2)+"%");
                    document.getElementById('vax-bar2').innerHTML=pc2+"%";
                    document.getElementById('vax-bar1').innerHTML=(pc1)+"%";
                    break;
                  }
                  else{
                    document.getElementById('clickname').innerHTML="";
                    $(".progress").css("visibility","hidden");
                    document.getElementById('new-cases').innerHTML="-";
                    document.getElementById('recovered').innerHTML="-";
                    document.getElementById('deaths').innerHTML="-";
                    document.getElementById('total').innerHTML="-";
                  }
                }
              }
            });
          });
        },
        402: function(){
          console.log('hit free trial daily limit');
          console.log('become a customer: https://opencagedata.com/pricing');
        }
      }
    });
  }

function onMapClick(e) {
    var lat=e.latlng.lat;
    var lng=e.latlng.lng;
    mymap.flyTo([lat,lng],5);
    var latlng=lat+','+lng;
    geocode(latlng);
}

function searchbystate(query){
  $.ajax({
      url: 'https://api.opencagedata.com/geocode/v1/json',
      method: 'GET',
      data: {
        'key': '7d0232625e4b42e5b0f70554309d4059',
        'q': query,
        'no_annotations': 1,
        'countrycode': 'in'
      },
      dataType: 'json',
      statusCode: {
        200: function(response){  // success
          var lat=(response.results[0].geometry.lat);
          var lng=response.results[0].geometry.lng;
          mymap.flyTo([lat,lng],5);
          var currState=response.results[0].components.state;
          if(currState!=undefined){document.getElementById('clickname').innerHTML=currState;}
          $(function(){
            $.ajax({
              url: "https://data.covid19india.org/v4/min/data.min.json",
              success: function(covidData) {
                for (const stateCode in covidData) {
                  if (stateIndex[stateCode].StateName===currState){
                    if(covidData[stateCode].delta!=undefined && covidData[stateCode].delta.confirmed!=undefined){document.getElementById('new-cases').innerHTML=covidData[stateCode].delta.confirmed.toLocaleString();}
                    if(covidData[stateCode].delta!=undefined && covidData[stateCode].delta.recovered!=undefined){document.getElementById('recovered').innerHTML=covidData[stateCode].delta.recovered.toLocaleString();}
                    if(covidData[stateCode].delta!=undefined && covidData[stateCode].delta.deceased!=undefined){document.getElementById('deaths').innerHTML=covidData[stateCode].delta.deceased.toLocaleString();}
                    if(covidData[stateCode].total!=undefined && covidData[stateCode].total.confirmed!=undefined){document.getElementById('total').innerHTML=covidData[stateCode].total.confirmed.toLocaleString();}
                    var vax=covidData[stateCode].total.vaccinated2;
                    var pop=covidData[stateCode].meta.population;
                    var pc=(Math.ceil((vax/pop)*100))+"%";
                    $(".progress").css("visibility","visible");
                    $(".progress-bar").css("width",pc);
                    document.getElementById('vax-bar').innerHTML=pc;
                    break;
                  }
                  else{
                    document.getElementById('new-cases').innerHTML="-";
                    document.getElementById('recovered').innerHTML="-";
                    document.getElementById('deaths').innerHTML="-";
                    document.getElementById('total').innerHTML="-";
                  }
                }
              }
            });
          });
        }
      }
    });
}


//main
getCovidData();
mymap.on('click', onMapClick);
document.getElementById('submit').addEventListener('click',function(){
  var query=document.getElementById('search-bar').value;
  searchbystate(query);
});
