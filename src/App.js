import React, { useEffect, useState } from 'react'

import './App.css'

import Navbar from './components/Navbar'
import Searchbar from './components/Searchbar'
import Pokedex from './components/Pokedex'
import { getPokemonData, getPokemons, searchPokemon } from './api'
import { FavoriteProvider } from './context/favoritesContext'
import NotFound from './components/NotFound'

const favoritesKey = 'f'
function App() {
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [pokemons, setPokemons] = useState([])
  const [favorites, setFavorites] = useState([])
  const fetchPokemons = async () => {
    try {
      setLoading(true)
      setNotFound(false)
      const data = await getPokemons()
      const promisses = data.results.map(async pokemon => {
        return await getPokemonData(pokemon.url)
      })

      const results = await Promise.all(promisses)

      setPokemons(results)
      setLoading(false)
    } catch (error) {
      console.error('fetchPokemon Erro:', error)
    }
  }

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }
  useEffect(() => {
    loadFavoritePokemons()
  }, [])

  useEffect(() => {
    console.log('carregou')
    fetchPokemons()
  }, [])

  const updateFavoritePokemons = name => {
    const updateFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if (favoriteIndex >= 0) {
      updateFavorites.splice(favoriteIndex, 1)
    } else {
      updateFavorites.push(name)
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updateFavorites))
    setFavorites(updateFavorites)
  }
  const onSearchHandler = async pokemon => {
    if (!pokemon) {
      return fetchPokemons()
    }
    setLoading(true)
    setNotFound(false)
    const result = await searchPokemon(pokemon)
    if (!result) {
      setNotFound(true)
    } else {
      setPokemons([result])
    }
    setLoading(false)
  }

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons
      }}
    >
      <div>
        <Navbar />
        <Searchbar onSearch={onSearchHandler} />
        {notFound ? (
          <NotFound />
        ) : (
          <Pokedex pokemons={pokemons} loading={loading} />
        )}
      </div>
    </FavoriteProvider>
  )
}

export default App
