import React, { useState, useEffect } from 'react';
import Card from './card'
import './App.css';

function App() {

  const [getData, setData] = useState([])
  useEffect(() => {
    ApiCall()
  }, [])

  async function ApiCall() {
    try {
      let request = await fetch('https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1')
      let response = await request.json()
      // console.log(...response[0].results)
      setData((prev) => [...prev, ...response[0].results])
    } catch (err) {
      console.log('sorry for the error 1')
    }
  }

  function pokemonIncrementorHndler() {
    ApiCall()
  }

  return (
    <div className="App">
      <h1>POKEMON KINGDOM</h1>
      <main className='cards-container'>
        {getData ? getData.map(function (value, index) {
          return <Card value={value} index={index} />
        }) : ""}

      </main>

      <section id='fetch-more'>
        <button id='fetch-more-btn' onClick={ApiCall}>More Pokemons</button>
      </section>
    </div>
  );
}

export default App;
