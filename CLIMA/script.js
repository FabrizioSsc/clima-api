document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();//evita atualizar a pagina

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');
        showAlert('Você precisa digitar uma cidade...');
        return;
    }

      const apiKey = '6c90faf9000d60cd6cd7908dca3478e3'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl); // chama a api
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
          
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
          
        });
    } else {
        document.querySelector("#weather").classList.remove('show');
        showAlert(`
            Não foi possível localizar...

            <img src="404.svg"/>
        `)
    }
});

function showInfo(json){
    showAlert('');

    document.querySelector("#weather").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

   

}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}