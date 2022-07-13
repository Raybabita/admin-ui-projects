import {Component} from "react"

import Paginate from "./components/Pagination";
import {FiSearch} from "react-icons/fi"
import './App.css';



class App extends Component{
 

  render(){   
    return(
      <>
      <div className="app-container">  
          <Paginate/>                       
      </div>
      </>
    )
  }
}
export default App;
