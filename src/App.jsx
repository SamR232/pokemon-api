import React, { useEffect, useState } from 'react';
import PokeReq from './Wrapper';

const getGenerationOne = async () => {
	const res = await PokeReq.getGenerationByName(1);

	const results = await res.pokemon_species.map((item) => {
		return getIndividuaLPokemon(item.name);
	});
};

const getIndividuaLPokemon = async (name) => {
	const res = PokeReq.getPokemonByName(name);

	console.log('*', res);
};

const App = () => {
	const [pokemon, setPokemon] = useState([]);

	useEffect(() => {
		const generationResponse = getGenerationOne();

		setPokemon(generationResponse);
	}, []);

	return (
		<div>
			<h1>App</h1>

			<div>
				<ul>
					{pokemon &&
						pokemon.map((currentPokemon) => {
							return <li>{currentPokemon}</li>;
						})}
				</ul>
			</div>
		</div>
	);
};

export default App;
