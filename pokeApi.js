import fetch from "node-fetch";

let pokemon1 = process.argv[2];
let pokemon2 = process.argv[3];

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1}`)
  .then((responsePokemon1) => responsePokemon1.json())
  .then((jsonPokemon1) => {
    const namePrimaryTypePokemon1 = jsonPokemon1.types[0].type.name;
    const urlPrimaryTypePokemon1 = jsonPokemon1.types[0].type.url;

    fetch(urlPrimaryTypePokemon1)
      .then((responseTypePokemon1) => responseTypePokemon1.json())
      .then((jsonTypePokemon1) => {
        const Pokemon1DamageTo =
          jsonTypePokemon1.damage_relations.double_damage_to;

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2}`)
          .then((responsePokemon2) => responsePokemon2.json())
          .then((jsonPokemon2) => {
            const namePrimaryTypePokemon2 = jsonPokemon2.types[0].type.name;
            const urlPrimaryTypePokemon2 = jsonPokemon2.types[0].type.url;

            fetch(urlPrimaryTypePokemon2)
              .then((responseTypePokemon2) => responseTypePokemon2.json())
              .then((jsonTypePokemon2) => {
                const Pokemon2DamageTo =
                  jsonTypePokemon2.damage_relations.double_damage_to;

                function versus() {
                  if (
                    Pokemon1DamageTo.filter(function (pokemon1DamageTo) {
                      return pokemon1DamageTo.name === namePrimaryTypePokemon2;
                    }).length
                  ) {
                    return pokemon1;
                  } else if (
                    Pokemon2DamageTo.filter(function (pokemon2DamageTo) {
                      return pokemon2DamageTo.name === namePrimaryTypePokemon1;
                    }).length
                  ) {
                    return pokemon2;
                  } else return "Empate";
                }

                console.log(
                  pokemon1.toUpperCase() +
                    " ->(type) " +
                    namePrimaryTypePokemon1 +
                    " VS " +
                    pokemon2.toUpperCase() +
                    " ->(type) " +
                    namePrimaryTypePokemon2 +
                    "\nEl ganador es: " +
                    versus()
                );
              });
          });
      });
  });
