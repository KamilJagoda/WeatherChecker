//Variables
let city = '';

//Functions
document.addEventListener('click',function(e){
    if(e.target && e.target.id== 'submit-btn') {
        result.innerHTML = "";
        city = document.getElementById('input').value;
        api(city);
    }
});

function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function api(city) {

    var request = new XMLHttpRequest();

    request.open('GET','https://api.openweathermap.org/data/2.5/weather?q=' + city + '&cnt=10&appid=29faa29a8d2fcc506f19b24863ac2851', true);

    request.onload = function () {

        if(request.status >=200 && request.status < 400) {

            var data = JSON.parse(this.response);

            const userCity = document.createElement('h2');
            userCity.textContent = data.name;

            const temp = document.createElement('p');
            temp.setAttribute('class','temp');
            temp.textContent = 'Temperature: ' + calcCelc(data.main.temp).toFixed(1) + '°C';

            const tempMin = document.createElement('p');
            tempMin.setAttribute('class','temp');
            tempMin.textContent = 'Min daily temperature : ' + calcCelc(data.main.temp_min).toFixed(1) + '°C';

            const tempMax = document.createElement('p');
            tempMax.setAttribute('class','temp');
            tempMax.textContent = 'Max daily temperature: ' + calcCelc(data.main.temp_max).toFixed(1) + '°C';

            const weather = document.createElement('p');
            weather.textContent = 'Weather: ' + data.weather[0].main;

            const wind = document.createElement('p');
            wind.textContent = 'Wind speed: ' + data.wind.speed.toFixed(1) + ' meter/sec';

            const cloud = document.createElement('p');
            cloud.textContent = 'Cloudiness: ' + data.clouds.all + '%';

            container.appendChild(result);
            result.appendChild(userCity);
            result.appendChild(temp);
            result.appendChild(tempMin);
            result.appendChild(tempMax);
            result.appendChild(weather);
            result.appendChild(wind);
            result.appendChild(cloud);


        } else {
            const errorMessage = document.createElement('error');

            var errorElement = document.getElementsByTagName("error"), index;

            for (index = errorElement.length - 1; index >= 0; index--) {
                errorElement[index].parentNode.removeChild(errorElement[index]);
            }

            errorMessage.textContent = `Wrong city name`;
            container.appendChild(errorMessage);

        }
    };

    request.send();
}

function calcCelc(temp) {
    return temp - 273.15;
}


const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class','container');

const title = document.createElement('h1');
title.textContent = 'Enter your city and check weather';

const img = document.createElement('img');
img.src = "logo.png";
img.setAttribute('alt', 'Weather Map');

const input = document.createElement('input');
setAttributes(input, {'type':'text','id':'input', 'placeholder':'Enter your city'});

const button = document.createElement('button');
button.textContent = 'Check';
setAttributes(button, {'type':'submit','id':'submit-btn'});

const result = document.createElement('div');
result.setAttribute('class','results');

app.appendChild(img);
app.appendChild(title);
app.appendChild(container);
container.appendChild(input);
container.appendChild(button);