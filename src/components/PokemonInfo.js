import { Component } from 'react';
import PokemonErrorView from './PokemonErrorView';
import PokemonDataView from './PokemonDataView';
import PokemonPendingView from './PokemonPendingView';
import pokemonAPI from '../services/pokemon-api';

// первый вариант кода
// export default class PokemonInfo extends Component {
//     state = {
//         pokemon: null,
//         loading: false,
//         error: null,
//         status: 'idle'
//     }
//     componentDidUpdate = (prevProps, prevState) => {
//         const prevName = prevProps.pokemonName;
//         const nextName = this.props.pokemonName;

//         if (prevName !== nextName) {
//             console.log('Изменилось имя покемона');
//             //     console.log('prevProps.pokemonName:', prevProps.pokemonName)
//             //     console.log('this.props.pokemonName:', this.props.pokemonName)
//             //  }
//             this.setState({ loading: true, pokemon: null })
            
//             setTimeout(() => {
//                 fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
//                     .then(response => {
//                         if (response.ok) {
//                             return response.json()
//                         }

//                         return Promise.reject(
//                             // в текст new Error записывается по факту текст из св-ва message у error ошибки 404
//                             new Error(`Шеф, фсьо прорало! Покемона ${nextName} нет!)`),
//                         );
//                     })
//                     // .then(console.log);
//                     .then(pokemon => this.setState({ pokemon }))
//                     .catch(error => this.setState({ error }))
//                     .finally(() => this.setState({ loading: false }));
//             }, 1000)
//         }
//     }

//     render() {
//         const { pokemon, loading, error, status } = this.state;
//         const { pokemonName } = this.props;

//         return (
//             <div>
//                 {error && <h1>{error.message}</h1>}
//                 {loading && <div>Загружаем ...</div>}
//                 {!pokemonName && <div>Введите имя покемона</div>}
//                 {pokemon &&
//                     <div>
//                         <p>{pokemon.name}</p>
//                         <img src={pokemon.sprites.other['official-artwork'].front_default}
//                             alt={pokemon.name}
//                             width="240"
//                         />
//                     </div>}
//             </div>
//         );
//     }
//     }

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class PokemonInfo extends Component {
  state = {
    pokemon: null,
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;

    if (prevName !== nextName) {
        this.setState({ status: Status.PENDING });     
      setTimeout(() => {
        pokemonAPI
          .fetchPokemon(nextName)
          .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
          .catch(error => this.setState({ error, status: Status.REJECTED }));
      }, 3000);
    }
  }

  render() {
    const { pokemon, error, status } = this.state;
    const { pokemonName } = this.props;

    if (status === 'idle') {
      return <div>Введите имя покемона.</div>;
    }

    if (status === 'pending') {
      return <PokemonPendingView pokemonName={pokemonName} />;
    }

    if (status === 'rejected') {
      return <PokemonErrorView message={error.message} />;
    }

    if (status === 'resolved') {
      return <PokemonDataView pokemon={pokemon} />;
    }
  }
}
