import React, { createContext, useContext, useState} from 'react';
const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';


export const ResultContextProvider = ({ children }) => {
    const [results, setResults ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const[searchTerm, setSearchTerm] = useState('Elon Musk');
    
    const getResults = async (type) =>{
       setIsLoading(true);
       const response = await fetch(`${baseUrl}${type}`,{
        method: 'GET',
        headers:{
            'X-User-Agent': 'desktop',
            'X-Proxy-Location': 'EU',
            'X-RapidAPI-Key': '9d54bbc36cmsh8364d36008bf69ap13d769jsne7ed3f8a1ff4',
            'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
        }
       })
       const data = await response.json()
       console.log(data)
       if (type.includes('/news')) {
           setResults( data.entries);
       }else if (type.includes('/image')) {
           setResults( data.image_results);
       }else{
        setResults( data.results);
       }
       
       setIsLoading(false)
    }
    return(
        <ResultContext.Provider value={{getResults,results,searchTerm,setSearchTerm,isLoading}}>
         {children}
        </ResultContext.Provider>
    )
}
export const  useResultContext = () => useContext(ResultContext);


