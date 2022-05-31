import React, { useEffect, useState } from 'react';
import PokeReq from './Wrapper';

import './index.css';

// declare function to be used in getGenerationOne func
const getIndividuaLPokemon = async (name) => {
	const individualPokemonData = await PokeReq.getPokemonByName(name);
	return individualPokemonData;
};

// gets array of pokemon names then maps over them returning array of pokemon data, per index
const getGenerationOne = async () => {
	const genOnePokemon = await PokeReq.getGenerationByName(1);

	const names = genOnePokemon.pokemon_species.map((pokemon) => {
		return pokemon.name;
	});

	const res = await Promise.all(
		names.map((name) => {
			return getIndividuaLPokemon(name);
		})
	);

	return res;
};

const App = () => {
	const [pokemon, setPokemon] = useState([]);

	useEffect(() => {
		async function fetchGenerationOne() {
			const generationResponse = await getGenerationOne();
			setPokemon(generationResponse);
		}

		fetchGenerationOne();
	}, []);

	useEffect(() => {
		console.log(pokemon, 'pokemon');
	}, [pokemon]);

	return (
		<div>
			<h1 className='text-2xl text-red-700'>Pokedex</h1>

			<div>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Types</th>
							<th>Image</th>
						</tr>
					</thead>
					<tbody>
						{pokemon.map((currPokemon) => {
							return (
								<tr>
									<td>{currPokemon.name}</td>
									<td>
										{currPokemon.types
											.map((type) => {
												return type.type.name;
											})
											.join(', ')}{' '}
									</td>
									<td>
										<img src={currPokemon.sprites.front_default}></img>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default App;
