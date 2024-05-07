let allPokemon = []; // Declare this globally

const getPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((response) => response.json()));
  }

  Promise.all(promises).then((results) => {
    allPokemon = results.map((data) => ({
      image: data.sprites["front_default"],
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      ability: data.abilities[0].ability.name,
      atk: data.stats[1].base_stat,
      hp: data.stats[0].base_stat,
      def: data.stats[2].base_stat,
      spa: data.stats[3].base_stat,
      spd: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
    }));
    displayPokemon(allPokemon);
  });
};

const searchPokemon = () => {
  const searchText = document.getElementById("search").value.toLowerCase();
  const filteredPokemon = allPokemon.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText)
  );
  displayPokemon(filteredPokemon);
};

const displayPokemon = (pokemon) => {
  const pokemonString = pokemon
    .map(
      (singlePokemon) =>
        `
<div class="individual-pokemon">
  <div id="pokemon" class="pokemon__container">
    <figure id="pokemon-img__wrapper">
      <img id="pokemon-img" src="${singlePokemon.image}">
    </figure>
    <span id="pokemon-num">No${singlePokemon.id}</span>
    <h2 id="pokemon-name">${singlePokemon.name.toUpperCase()}</h2>
  </div>
  <div id="pokemon-description">
    <div id="pokemon-height__container">
      <h4>Height: </h4>
      <h4 class="pokemon-height">${singlePokemon.weight}hg</h4>
    </div>
    <div id="pokemon-weight__container">
      <h4>Weight: </h4>
      <h4 class="pokemon-weight">${singlePokemon.weight}hg</h4>
    </div>
    <div id="ability__container">
      <h4>Ability: </h4>
      <h4 class="pokemon-ability">${singlePokemon.ability.toUpperCase()}</h4>
    </div>
    <div class="stats__container">
      <h4>Stats</h4>
      <div class="stats__row">
        <div class="hp__container">
          <div class="stats-name">HP</div>
          <div class="stats-hp">${singlePokemon.hp}</div>
        </div>
        <div class="atk__container">
          <div class="stats-name">ATK</div>
          <div class="stats-attack">${singlePokemon.atk}</div>
        </div>
        <div class="def__container">
          <div class="stats-name">DEF</div>
          <div class="stats-defense">${singlePokemon.def}</div>
        </div>
        <div class="spa__container">
          <div class="stats-name">SpA</div>
          <div class="stats-spa">${singlePokemon.spa}</div>
        </div>
        <div class="spd__container">
          <div class="stats-name">SpD</div>
          <div class="stats-spd">${singlePokemon.spd}</div>
        </div>
        <div class="speed__container">
          <div class="stats-name">SPD</div>
          <div class="stats-spd">${singlePokemon.speed}</div>
        </div>
      </div>
    </div>
  </div>
</div>
  `
    )
    .join("");

  pokedex.innerHTML = pokemonString;
};

getPokemon();
