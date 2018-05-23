import React from 'react';
import SearchBar from './searchBar';
import ImageSearchBar from  './ImageSearchBar';
import SummonerInicio from './summonerInicio';

const Inicio = (props) => {
    const { logeado, summoner } = props;
    return (
        <div>
            <ImageSearchBar/>
            <SearchBar/>
            { logeado ? <SummonerInicio summoner={summoner}/>: null}
        </div>
    );
};
// class Inicio extends Component {
//     constructor(props){
//         super(props);
//     }
//     render() {
//         const { logeado, summoner } = this.props;
//         return (
//             <div>
//                 <ImageSearchBar/>
//                 <SearchBar/>
//                 { logeado ? <SummonerInicio summoner={summoner}/>: null}
//             </div>
//         );
//     }
// }

export default Inicio;