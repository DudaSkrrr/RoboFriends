import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import Header from '../components/Header';
import { fetchRobots, setSearchField } from '../features/SearchField/SearchFieldSlice';

const App = () => {
  const dispatch = useDispatch()
  const {searchField, robots} = useSelector((store) => store.searchField)


  /* const [robots, setRobots] = useState([]); */

  useEffect(() => {
    // Dispatch fetchRobots action when the component mounts
    dispatch(fetchRobots());
  }, [dispatch])

  const onSearchChange = (event) => {
    dispatch(setSearchField(event.target.value));
  }

  const filteredRobots = robots.filter(robot => {
    /* console.log(searchField) */
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
  });  

  return !robots.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <Header/>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
}

export default App;
