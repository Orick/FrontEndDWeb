import React from 'react';
import SectionBar from './SectionBar';
import ImagePresentation from './ImagePresentation';
import '../css/index.css';

const App = (props) => {
  return(
        <div>
          <ImagePresentation/>
          <SectionBar/>
        </div>
    )
};
// class App extends Component {
//   render() {
//     return (
//         <div>
//             <ImagePresentation/>
//             <SectionBar/>
//         </div>
//
//     );
//   }
// }


export default App;
