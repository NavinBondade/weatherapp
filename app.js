window.addEventListener('load', () => {
    let long,
        lat;
        temperaturedDescription = document.querySelector('.description'); 
        temperatureDegree = document.querySelector('.degree');
        locationTimeZOne = document.querySelector('.location-timezone');
    const iconID = document.querySelector('.icon'); 
        temperatureSection = document.querySelector('.temperature');
const temperatureSpan = document.querySelector('.temperature span');
let fara = 0,
    cel = 0;



    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/22fe3c353b92d60bfb371a8ee142be43/${lat},${long}`;


            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon } = data.currently;

                // Set Dom Elements from the API
                temperatureDegree.textContent = temperature;
                temperaturedDescription = summary;
                locationTimeZOne.textContent = data.timezone;
                fara =temperature;

                // Set Icons
                setIcons(icon, iconID);

                // Change in Type
                changeType();

            });
        });
    }


    // Set SkyIcons
    function setIcons(icon, iconID){
        const skycons = new Skycons({color:'white'});
        const currenIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currenIcon]);
    }

    // Change temperature to Celsius/Farenheint
    function changeType(){
        temperatureSection.addEventListener('click', ()=>{
            if(temperatureSpan.textContent === 'F'){
                temperatureSpan.textContent = 'C';
                cel = ((fara-32)/1.8).toFixed(3);
                temperatureDegree.textContent = cel;
                
            }else{
                temperatureSpan.textContent = 'F';
                temperatureDegree.textContent = fara;
            }
        })

    }
});