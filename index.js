const sucessCallback=(position)=>{
    var pos=position;
    var lat=pos.coords.latitude;
    var lon=pos.coords.longitude;
    console.log(lat);
    var url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=db0621e76cb4152ebe0624ce92f44df6`;

    fetch(url)
    .then((data) =>
    {
        return data.json();//converted to object  
    }).then((objectData)=>{
        console.log(objectData.coord);
        
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months=["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
        const d = new Date();
        let day = days[d.getDay()];
        
        let month=months[d.getMonth()];
        document.getElementById("date").innerHTML=day +',' + d.getDate()+' '+month;
        document.getElementsByClassName("temp")[0].innerHTML=(objectData.main.temp-273.15).toFixed(2)+"°";
        document.getElementsByClassName("minmax")[0].innerHTML=(objectData.main.temp_max-273.15).toFixed(2)+"°/"+(objectData.main.temp_max-273.15).toFixed(2) +"° Feels like "+(objectData.main.feels_like-273.15).toFixed(2) +"°"  ;
        document.getElementsByClassName("cloudy")[0].innerHTML=objectData.weather[0].main;
        document.getElementsByClassName("humidity")[0].innerHTML=objectData.main.humidity;
        document.getElementsByClassName("pressure")[0].innerHTML=objectData.main.pressure+"mb";
        document.getElementsByClassName("windspeed")[0].innerHTML=(objectData.wind.speed*18/5).toFixed(2)+"km/h"
        var degree=objectData.wind.deg;
        function  toTextualDescription(degree){
            if (degree>337.5) return 'N';
            if (degree>292.5) return 'NW';
            if(degree>247.5) return 'W';
            if(degree>202.5) return 'SW';
            if(degree>157.5) return 'S';
            if(degree>122.5) return 'SE';
            if(degree>67.5) return 'E';
            if(degree>22.5){return 'NE';}
            return 'N';
        }
        document.getElementsByClassName("direction")[0].innerHTML=toTextualDescription();
        console.log(objectData)
        // var rrr=objectData.rain.1h;
        // document.getElementsByClassName("precipitation")[0].innerHTML=rrr;
        document.getElementsByClassName("visibility")[0].innerHTML=objectData.visibility/1000+"km";
    //    document.getElementsByClassName("uvindex")[0].innerHTML=objectData.current.uvi;
       document.getElementById("image").src="http://openweathermap.org/img/w/"+ objectData.weather[0].icon +".png";
       document.getElementsByClassName("location")[0].innerHTML=objectData.name;


        
        
        








    }).catch((err)=>{
        console.log(err);
    })
};
const errorCallback=(error)=>{
    console.log(error);
    alert("ALLOW LOCATION PERMISSION")
};

const watchId=navigator.geolocation.watchPosition(sucessCallback,errorCallback,{
    enableHighAccuracy:true,
    timeout:5000
});
