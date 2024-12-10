// Lista de divisas y banderas
//Cada clave es un código de moneda (por ejemplo, "USD" para el dólar estadounidense).
//Cada valor es un código de país asociado para cargar la bandera correspondiente.

let country_list = {
    "USD": "us",
    "EUR": "eu",  // Alemania
    "CRC": "cr",  // Costa Rica
    "RUB": "ru",  // Rusia
    "COP": "co",  // Colombia
    "BRL": "br",  // Brasil
    "ARS": "ar",  // Argentina
    "UYU": "uy"   // Uruguay
};

// Función para realizar la conversión de moneda
function convertCurrency(event) {
    event.preventDefault(); //  Evita que el formulario envíe los datos y recargue la página cuando se ejecuta el evento.

    // Obtener el monto a convertir y las monedas seleccionadas
    //parseFloat(): Convierte una cadena de texto en un número decimal.
    //document.getElementById(): Busca un elemento HTML por su id.
    //.value: Obtiene el valor actual de un elemento del DOM (como el monto ingresado en un campo).
    let amount = parseFloat(document.getElementById('amount').value);
    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;

    // Verificar que el monto es válido
    if (isNaN(amount) || amount <= 0) { //isNaN(): Verifica si el valor no es un número.
        alert("Por favor ingresa un monto válido.");
        return;
    }

    // Objeto con las tasas de conversión (estas pueden ser actualizadas con API en el futuro)
    const rates = {
        "USD": { "EUR": 0.95, "CRC": 507.87, "RUB": 99.99, "COP": 4438.73, "BRL": 6.08, "ARS": 1015.81, "UYU": 43.53 },
        "EUR": { "USD": 1.05, "CRC": 535.81, "RUB": 105.52, "COP": 4684.26, "BRL": 6.41, "ARS": 1071.86, "UYU": 45.93 },
        "CRC": { "USD": 0.0019, "EUR": 0.0018, "RUB": 0.19, "COP": 8.69, "BRL": 0.0119, "ARS": 1.999, "UYU": 0.085 },
        "RUB": { "USD": 0.010, "EUR": 0.0094, "CRC": 5.079, "COP": 44.12, "BRL": 0.06, "ARS": 10.16, "UYU": 0.43 },
        "COP": { "USD": 0.00022, "EUR": 0.00021, "CRC": 0.11, "RUB": 0.02, "BRL": 0.0013, "ARS": 0.23, "UYU": 0.0098 },
        "BRL": { "USD": 0.16, "EUR": 0.15, "CRC": 83.55, "RUB": 16.44, "COP": 726.30, "ARS": 167.08, "UYU": 7.15 },
        "ARS": { "USD": 0.00098, "EUR": 0.00093, "CRC": 0.49, "RUB": 0.098, "COP": 4.33, "BRL": 0.005, "UYU": 0.04 },
        "UYU": { "USD": 0.022, "EUR": 0.021, "CRC": 11.66, "RUB": 2.29, "COP": 101.54, "BRL": 0.13, "ARS": 23.33 }
    };

    // Verificar si la moneda de origen y destino son iguales
    if (fromCurrency === toCurrency) { //compara moneda origen - moneda de destino
        document.getElementById('result').value = amount.toFixed(2); //Redondea un número a dos decimales.
        return;
    }

    // Realizar la conversión utilizando la tasa correspondiente
    let result = amount * rates[fromCurrency][toCurrency];

    // Mostrar el resultado y hacer visible el contenedor
    document.getElementById('result').value = result.toFixed(2);
    document.getElementById('result-container').style.display = "block";
}

// Función para intercambiar las monedas
function swapCurrencies() {
    // Obtener las monedas seleccionadas
    let fromCurrency = document.getElementById('fromCurrency'); //Obtiene el elemento HTML con el id fromCurrency

    // Intercambiar los valores de las monedas

    //let temp: Declara una variable temporal para almacenar el valor actual de fromCurrency.
    let temp = fromCurrency.value; 
    //romCurrency.value: Obtiene el valor actual de la moneda "origen".
    fromCurrency.value = toCurrency.value;
    //toCurrency.value: Obtiene el valor actual de la moneda "destino". 
    toCurrency.value = temp; 

    // Actualizar las banderas
    updateFlags();

    // Opcional: Llamar a la función de conversión después de intercambiar
    //Asegura que, después de intercambiar las monedas, la conversión se actualice automáticamente.
    convertCurrency(event);
}

// Actualizar las banderas al cambiar la divisa
document.getElementById('fromCurrency').addEventListener('change', updateFlags);
document.getElementById('toCurrency').addEventListener('change', updateFlags);

// Función para actualizar las banderas
function updateFlags() {
    //Obteniendo el elemento de la bandera de la moneda de origen
    let fromFlag = document.getElementById('fromFlag');
    //Obteniendo el elemento de la bandera de la moneda de destino:
    let toFlag = document.getElementById('toFlag');
    //Obteniendo la moneda de origen seleccionada
    let fromCurrency = document.getElementById('fromCurrency').value;
    //Obteniendo la moneda de destino seleccionada
    let toCurrency = document.getElementById('toCurrency').value;

    //Actualizando la fuente de la bandera de origen: 
    fromFlag.src = `https://flagcdn.com/48x36/${country_list[fromCurrency]}.png`;
    //Actualizando la fuente de la bandera de destino
    toFlag.src = `https://flagcdn.com/48x36/${country_list[toCurrency]}.png`;
}

// Inicializar las banderas al cargar la página
window.onload = updateFlags;
