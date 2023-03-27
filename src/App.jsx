import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import PokemonForm from './components/PokemonForm';
import PokemonInfo from "./components/PokemonInfo";

export default class App extends Component {
// простой способ получить запрос с АРI без архитектуры приложения
//   state = {
//     pokemon: null,
//     loading: false,
//   }

//   componentDidMount = () => {
//     this.setState({loading: true})
//     setTimeout(() => {
//       fetch('https://pokeapi.co/api/v2/pokemon/ditto')
//         .then(res => res.json())
//         .then(pokemon => this.setState({ pokemon }))
//         .finally(this.setState({loading: false}))
//     }, 1000)
//       }
  
//  render(){
//    return (
//     <div style={{maxWidth: 1170, margin: '0 auto', padding: 20}}>
//        <ToastContainer autoClose={3000} />
//        {this.state.loading && <h1>Загружаем ...</h1>}
//        {this.state.pokemon && <div>{this.state.pokemon.name}</div>}
//     </div>
//   );
//   }
   state = {
        pokemonName: '',
    }
  
  habdleFormSubmit = (pokemonName) => {
    this.setState({pokemonName})
  };
  render() {
    return (
      <div style={{maxWidth: 1170, margin: '0 auto', padding: 20}}>
        <PokemonForm onSubmit={this.habdleFormSubmit} />
        <PokemonInfo pokemonName={this.state.pokemonName} />
        <ToastContainer theme="colored" autoClose={3000} />
      </div>
    )
  }
};
