import React, { useState } from 'react'

const Searchbar = props => {
  const [search, setSearch] = useState('charizard')
  const { onSearch } = props

  const onChangeHendle = e => {
    setSearch(e.target.value)
    if (e.target.value.length === 0) {
      onSearch(undefined)
    }
  }

  const onButtonClickHandler = () => {
    onSearch(search)
  }

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input placeholder="Buscar Pokemon" onChange={onChangeHendle} />
      </div>
      <div className="searchbar-btn">
        {' '}
        <button onClick={onButtonClickHandler}>Buscar</button>
      </div>
    </div>
  )
}

export default Searchbar
