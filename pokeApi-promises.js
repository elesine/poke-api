import fetch from "node-fetch";

let pokemon1 = process.argv[2];
let pokemon2 = process.argv[3];

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon1}`)
  .then((pokemon1Response) => pokemon1Response.json())
  .then((pokemon1Json) => {
    const pokemon1PrimaryTypeName = pokemon1Json.types[0].type.name;
    const pokemon1PrimaryTypeUrl = pokemon1Json.types[0].type.url;

    fetch(pokemon1PrimaryTypeUrl)
      .then((pokemon1TypeResponse) => pokemon1TypeResponse.json())
      .then((pokemon1TypeJson) => {
        const pokemon1DamageTo =
          pokemon1TypeJson.damage_relations.double_damage_to;

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2}`)
          .then((pokemon2Response) => pokemon2Response.json())
          .then((pokemon2Json) => {
            const pokemon2PrimaryTypeName = pokemon2Json.types[0].type.name;
            const pokemon2PrimaryTypeUrl = pokemon2Json.types[0].type.url;

            fetch(pokemon2PrimaryTypeUrl)
              .then((pokemon2TypeResponse) => pokemon2TypeResponse.json())
              .then((pokemon2TypeJson) => {
                const pokemon2DamageTo =
                  pokemon2TypeJson.damage_relations.double_damage_to;

                function versus() {
                  if (
                    pokemon1DamageTo.find(
                      (pokemon1DamageTo) =>
                        pokemon1DamageTo.name === pokemon2PrimaryTypeName
                    )
                  ) {
                    return pokemon1;
                  } else if (
                    pokemon2DamageTo.find(
                      (pokemon2DamageTo) =>
                        pokemon2DamageTo.name === pokemon1PrimaryTypeName
                    )
                  ) {
                    return pokemon2;
                  } else return "Empate";
                }

                console.log(
                  pokemon1.toUpperCase() +
                    " ->(type) " +
                    pokemon1PrimaryTypeName +
                    " VS " +
                    pokemon2.toUpperCase() +
                    " ->(type) " +
                    pokemon2PrimaryTypeName +
                    "\nEl ganador es: " +
                    versus()
                );
              });
          });
      });
  });
