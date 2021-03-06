import fetch from "node-fetch";

const pokemon1 = process.argv[2];
const pokemon2 = process.argv[3];

function CustomError(from_, status_) {
  let instance = new Error(from_, status_);
  instance.from = from_;
  instance.status = status_;
  instance.message = `${instance.from}, ${
        instance.status == 404
      ? "Pokemon Not Found. Enter the name correctly!"
      : instance.status >= 500
      ? "At this moment the service is not available!"
      : "HTTP error!"
  } \nStatus: ${instance.status}`
  return instance;
}

const versus = async (pokemon1, pokemon2) => {
  try {
    if (pokemon1 == undefined || pokemon2 == undefined) {
      throw new Error("Enter pokemon names, Please!");
    }
    const pokemon1Response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon1}`
    );
    if (!pokemon1Response.ok) {
      throw new CustomError('First pokemon:', pokemon1Response.status);
    } 
    const pokemon1Json = await pokemon1Response.json();
    const pokemon1PrimaryTypeName = pokemon1Json.types[0].type.name;
    const pokemon1PrimaryTypeUrl = pokemon1Json.types[0].type.url;
    const pokemon1TypeResponse = await fetch(pokemon1PrimaryTypeUrl);
    if (!pokemon1TypeResponse.ok) {
      throw new CustomError('First pokemon Type:', pokemon1TypeResponse.status);
    }
    const pokemon1TypeJson = await pokemon1TypeResponse.json();
    const pokemon1DamageTo = pokemon1TypeJson.damage_relations.double_damage_to;
    const pokemon2Response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon2}`
    );
    if (!pokemon2Response.ok) {
      throw new CustomError('Second pokemon:', pokemon2Response.status);
    }
    const pokemon2Json = await pokemon2Response.json();
    const pokemon2PrimaryTypeName = pokemon2Json.types[0].type.name;
    const pokemon2PrimaryTypeUrl = pokemon2Json.types[0].type.url;
    const pokemon2TypeResponse = await fetch(pokemon2PrimaryTypeUrl);
    if (!pokemon2TypeResponse.ok) {
      throw new CustomError('Second pokemon Type:', pokemon2TypeResponse.status);
    }
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
    } else winner = "Both!. It is a Tie";

    console.log(
      pokemon1.toUpperCase() +
        " ->(type) " +
        pokemon1PrimaryTypeName +
        " VS " +
        pokemon2.toUpperCase() +
        " ->(type) " +
        pokemon2PrimaryTypeName +
        "\nThe winner is: " +
        winner
    );
  } catch (err) {
    console.error(err.message);
  }
};

versus(pokemon1, pokemon2);
