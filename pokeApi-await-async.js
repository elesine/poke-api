import fetch from "node-fetch";

const pokemon1 = process.argv[2];
const pokemon2 = process.argv[3];

const versus = async (pokemon1, pokemon2) => {
  const pokemon1Response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon1}`
  );
  const pokemon1Json = await pokemon1Response.json();
  const pokemon1PrimaryTypeName = pokemon1Json.types[0].type.name;
  const pokemon1PrimaryTypeUrl = pokemon1Json.types[0].type.url;
  const pokemon1TypeResponse = await fetch(pokemon1PrimaryTypeUrl);
  const pokemon1TypeJson = await pokemon1TypeResponse.json();
  const pokemon1DamageTo = pokemon1TypeJson.damage_relations.double_damage_to;
  const pokemon2Response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon2}`
  );
  const pokemon2Json = await pokemon2Response.json();
  const pokemon2PrimaryTypeName = pokemon2Json.types[0].type.name;
  const pokemon2PrimaryTypeUrl = pokemon2Json.types[0].type.url;
  const pokemon2TypeResponse = await fetch(pokemon2PrimaryTypeUrl);
  const pokemon2TypeJson = await pokemon2TypeResponse.json();
  const pokemon2DamageTo = pokemon2TypeJson.damage_relations.double_damage_to;
  let winner;
  if (
    pokemon1DamageTo.find(
      (pokemon1DamageTo) => pokemon1DamageTo.name === pokemon2PrimaryTypeName
    )
  ) {
    winner = pokemon1;
  } else if (
    pokemon2DamageTo.find(
      (pokemon2DamageTo) => pokemon2DamageTo.name === pokemon1PrimaryTypeName
    )
  ) {
    winner = pokemon2;
  } else winner = "Empate";

  console.log(
    pokemon1.toUpperCase() +
      " ->(type) " +
      pokemon1PrimaryTypeName +
      " VS " +
      pokemon2.toUpperCase() +
      " ->(type) " +
      pokemon2PrimaryTypeName +
      "\nEl ganador es: " +
      winner
  );
};

versus(pokemon1, pokemon2);
