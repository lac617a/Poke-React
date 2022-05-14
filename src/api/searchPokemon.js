export default async function searchPokemon(pokemon) {
  try {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}