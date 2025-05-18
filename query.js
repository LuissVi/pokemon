$(document).ready(function () {
    //hacemos la solicitud para el select
  $.get("https://pokeapi.co/api/v2/pokemon/?limit=1000")
      .done(function (respuesta) {
          //results es el objeto de la api
          //respuesta.results;accedemos a una propiedad de respuesta(.)
          let array = respuesta.results;//results contiene un array de objetos
          for (let i = 0; i < array.length; i++) {
              //guardamos en una variable el array creados por el for
              let pokemon = array[i]; //  se declara una nueva variable tipo arreglo

              $("#pokemon select").append("<option value='" + pokemon.name + "'>" + pokemon.name + "</option>");
          }
      })
      .fail(function () {
          alert("Error al obtener la lista de Pokémon.");
      });
});

function caracteristicas() {
  let pokeName = $("#pokemon select").val(); // Obtener el nombre del Pokémon seleccionado
  $(".tabla_caracteristicas tbody").html(""); // Limpiar el contenido anterior de la tabla

  // Realizar solicitud a la API para obtener los detalles del Pokémon seleccionado
  $.get('https://pokeapi.co/api/v2/pokemon/' + pokeName)
      .done(function (data) {
          let stats = data.stats;
          //data es la respuesta de la llamada, stats es el objeto padre donde se encuentran los datos que buscamos

          let ataque = findStat(stats, 'attack');
          //findStat es una funcion
          let ataqueEspecial = findStat(stats, 'special-attack');
          let defensa = findStat(stats, 'defense');
          let nombrePoke=data.name;
          let imagenUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

          //seleccionamos los div almacen
          $("#nombre h3").text(nombrePoke);
          $("#ataque h3").text(ataque+'K');
          $("#ataqueEspecial h3").text(ataqueEspecial+'K');
          $("#defensa h3").text(defensa+'K');
          $(".card-body-img").attr('src', imagenUrl).attr('alt', nombrePoke).attr('width', '150');  
         
      })
      .fail(function () {
          alert("Error al obtener las características del Pokémon.");
      });
}
//findStat(); funcion para buscar una estadistica espesifica de un pokemon en un array de estadisticas, toma dos argumentos; stats es el array que representa las estadisticas del pokemon dentro de la api, statName es el nombre donde se encuentrade la estadistica que buscamos 
function findStat(stats, statName) {
  for (let i = 0; i < stats.length; i++) {

      if (stats[i].stat.name === statName) {
         
          return stats[i].base_stat;
      }
  }
  return 0; // si no encuentra la estadistica retorna cero
}
 

function nombrePoke(){
   let input=$("#btNombre").val();
    $("#btNombre tbody").html("");
    $.get('https://pokeapi.co/api/v2/pokemon/' + input)
    .done(function (data) {
        let stats = data.stats;
        let ataque = findStat(stats, 'attack');
        let ataqueEspecial = findStat(stats, 'special-attack');
        let defensa = findStat(stats, 'defense');
        let nombrePoke=data.name;
        let imagenUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
        //let imgcombate=data.sprites.front_default;

        $("#nombre h3").text(nombrePoke);
        $("#ataque h3").text(ataque+'K');
        $("#ataqueEspecial h3").text(ataqueEspecial+'K');
        $("#defensa h3").text(defensa+'K');
        $(".card-body-img").attr('src', imagenUrl).attr('alt', nombrePoke).attr('width', '150'); 
        //$(".card-body-img").html(`<img src="${imgcombate}" alt="Sprite en combate del Pokémon">`) 
       // mostrarDiv();
    })
    
}
        function findStat(stats, statName) {
            for (let i = 0; i < stats.length; i++) {
                if (stats[i].stat.name === statName) {
                    return stats[i].base_stat;
                }
            }
            return 0; // Se mueve el retorno de 0 fuera del bucle for
          }
        //   function mostrarDiv() {
        //     let div = document.getElementById("card");
        //     div.style.display = "block";
        // }