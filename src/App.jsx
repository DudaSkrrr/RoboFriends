import React, {Component} from 'react'
import CardList from './components/CardList'
import 'tachyons'
import SearchBox from './components/SearchBox'
import './components/Global.css'
import Scroll from './components/Scroll'
import ErrorBoundry from './components/ErrorBoundry'



class App extends Component {
  //creates state,which is given to the children as props
  constructor(){
    super()
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() {

    //getting users from this link and updating the state
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response =>response.json())
    .then(users =>this.setState({robots:users}))

  }

    //changes the searchfield to the value of the input
    onSearchChange = (e) =>{
      this.setState({searchfield: e.target.value})
    }



  render() {
    const {robots, searchfield} = this.state
    //filters the robots
    const filteredrobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    if(!robots.length){
      return <h1>Loading...</h1>
    }else{

      return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        {/*receives the searchChange event and then goes into 'onSearchChange'*/}
        <SearchBox searchChange = {this.onSearchChange}/>
        <br />

        {/*gives component the ability to be scrollable*/}
        <Scroll>
          {/*catches errors*/}
          <ErrorBoundry>
            {/* gives the props as filteredrobots */}
            <CardList robots = {filteredrobots}/>
          </ErrorBoundry>
        </Scroll>
        
      </div>
  
      );
    }
  }
}

export default App;
