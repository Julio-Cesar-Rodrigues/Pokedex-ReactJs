import React from 'react'

const NotFound = () => {
  const confused =
    'https://i.pinimg.com/564x/83/16/57/831657741c34d56a8b1980af0acc5b99.jpg'
  return (
    <div className="not-found-content">
      <div className="not-found-text"> Meteu essa meu nobre?! </div>
      <img src={confused} alt="???" className="not-found-img" />
    </div>
  )
}
export default NotFound
