// 1. Atualização do Relógio (Compatível com iOS 6)
function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  
  var clockElement = document.getElementById('clock');
  if (clockElement) {
    clockElement.innerHTML = hours + ':' + minutes;
  }
}

// 2. Busca do Clima via HTTP
function fetchWeather() {
  var url = 'http://api.open-meteo.com/v1/forecast?latitude=-29.7136&longitude=-52.4242&current_weather=true';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          var data = JSON.parse(xhr.responseText);
          if (data && data.current_weather) {
            var temp = Math.round(data.current_weather.temperature);
            var code = data.current_weather.weathercode;

            var tempElement = document.getElementById('temperature');
            if (tempElement) {
              tempElement.innerHTML = temp + '°C';
            }
            updateWeatherIcon(code);
          }
        } catch(e) {
          console.log('Erro no parsing do JSON');
        }
      }
    }
  };
  
  xhr.send();
}

// 3. Ícones SVG
function updateWeatherIcon(code) {
  var iconContainer = document.getElementById('weather-icon-container');
  if (!iconContainer) return;
  
  var sunSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="32" r="12"/><line x1="32" y1="8" x2="32" y2="14"/><line x1="32" y1="50" x2="32" y2="56"/><line x1="8" y1="32" x2="14" y2="32"/><line x1="50" y1="32" x2="56" y2="32"/><line x1="15" y1="15" x2="19" y2="19"/><line x1="45" y1="45" x2="49" y2="49"/><line x1="15" y1="49" x2="19" y2="45"/><line x1="45" y1="19" x2="49" y2="15"/></svg>';
  var cloudSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 48h28a12 12 0 0 0 0-24 12.6 12.6 0 0 0-3.2.4A16 16 0 0 0 14 28a10 10 0 0 0 4 20z"/></svg>';
  var rainSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M18 40h28a12 12 0 0 0 0-24 12.6 12.6 0 0 0-3.2.4A16 16 0 0 0 14 20a10 10 0 0 0 4 20z"/><line x1="22" y1="46" x2="18" y2="54"/><line x1="32" y1="46" x2="28" y2="54"/><line x1="42" y1="46" x2="38" y2="54"/></svg>';

  if (code === 0) {
    iconContainer.innerHTML = sunSVG;
  } else if (code >= 1 && code <= 3) {
    iconContainer.innerHTML = cloudSVG;
  } else {
    iconContainer.innerHTML = rainSVG;
  }
}

// Inicialização segura
updateClock();
setInterval(updateClock, 1000);

fetchWeather();
setInterval(fetchWeather, 900000);