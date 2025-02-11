import React, { createContext, useState } from 'react'

const NewsContext = createContext()
export const NewsProvide = ({children}) => {
    const [allNews, setallNews] = useState([])
  return (
    <NewsContext.Provider value={{allNews,setallNews}}>
     {children}
    </NewsContext.Provider>
  )
}

export default NewsContext;

