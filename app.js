document.addEventListener('DOMContentLoaded', function () {
    
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        
        console.log('Buscando el clima');

        
        const ciudad = document.getElementById('ciudad').value;
        const pais = document.getElementById('pais').value;

        
        consultarAPI(ciudad, pais);
    });

    function consultarAPI(ciudad, pais) {
        const appID = '0f120f452a89931ac7243b6308738446';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudad)},${pais}&appid=${appID}&units=metric`;

        fetch(url)
            .then(respuesta => {
                return respuesta.json();
            })
            .then(datos => {
                const temperatura = datos.main.temp;

                console.log(`${datos.name}: ${temperatura} °C`);
                
                const resultadoElement = document.getElementById('resultado');
                resultadoElement.innerHTML = `<p class="text-center text-white mt-6">Temperatura: ${temperatura} °C</p>`;
            })
            .catch(error => {
                console.error('Error al obtener los datos del clima:', error);
                const resultadoElement = document.getElementById('resultado');
                resultadoElement.innerHTML = `<p id="error" class="text-center text-white mt-6">Error al obtener los datos del clima. Inténtalo de nuevo más tarde.</p>`;
            });
    }
});





