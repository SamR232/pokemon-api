const Pokedex = require('pokeapi-js-wrapper');
const customOptions = {
	protocol: 'https',
	hostName: 'localhost:443',
	versionPath: '/api/v2/',
	cache: true,
	timeout: 5 * 1000, // 5s
	cacheImages: true,
};

const PokeReq = new Pokedex.Pokedex();

export default PokeReq;
