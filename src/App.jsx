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

const colorMap = {
	grass: 'bg-green-600',
	fire: 'bg-red-600',
	water: 'bg-blue-600',
	electric: 'bg-yellow-600',
	poison: 'bg-purple-600',
	Flying: 'bg-slate-600',
	bug: 'bg-green-200',
	ground: 'bg-amber-700',
	rock: 'bg-stone-600',
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
			<h1 className='text-4xl text-center underline tracking-widest mb-8'>
				Pokedex
			</h1>

			<div>
				<table>
					<thead>
						<tr>
							<th className='bg-slate-200'>Name</th>
							<th className='bg-slate-200'>Types</th>
							<th className='bg-slate-200'>Image</th>
							<th className='bg-slate-200'>Abilities</th>
							<th className='bg-slate-200'>Moves</th>
							<th className='bg-slate-200'>Stats</th>
						</tr>
					</thead>
					<tbody>
						{pokemon.map((currPokemon) => {
							const firstType = currPokemon.types[0].type.name;
							const rowColor =
								firstType in colorMap ? colorMap[firstType] : 'bg-white.200';

							return (
								<tr
									className={`${rowColor} border-b-2 border-black hover:bg-white transition duration-200`}
								>
									<td className='px-4 border-r-4 border-black uppercase'>
										{currPokemon.name}
									</td>
									<td className={`px-4 border-r-4 border-black capitalize`}>
										{currPokemon.types
											.map(({ type }) => {
												return type.name;
											})
											.join(', ')}{' '}
									</td>
									<td className='w-64 border-r-4 border-black'>
										<img
											src={currPokemon.sprites.front_default}
											alt={currPokemon.name}
											className='w-64'
										/>
									</td>
									<td className='px-4 border-r-4 border-black bg-'>
										{currPokemon.abilities
											.map(({ ability }) => {
												return ability.name;
											})
											.join(', ')}
									</td>
									<td className='px-4 border-r-4 border-black'>
										{currPokemon.moves
											.map(({ move }) => {
												return move.name;
											})
											.slice(0, 4)
											.join(', ')}
									</td>
									<td className='px-4 border-r-4 border-black'>
										{currPokemon.stats
											.map((stat) => {
												return stat.stat.name + ': ' + stat.base_stat;
											})
											.join(', ')}
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
