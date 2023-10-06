"use client"
import { useEffect, useState } from "react"
import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'


export default function Cardfilme({filme}){
    const [ favorito, setFavorito ] = useState(false) //hooks
    const image_url = "https://image.tmdb.org/t/p/w200/" + filme.poster_path

    useEffect( () => {
        let favoritos = JSON.parse (localStorage.getItem ("favoritos") ) || []
        const favorito = favoritos.find( f => f.id === filme.id)
        setFavorito(favorito)
    }, [] )

    function favoritar(){
        setFavorito(true)

        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODU3OWI3ZDQ2ZDJlOTUwNGE2MTEyMDEwMWI1YTM4OCIsInN1YiI6IjY1MDQ0MGFmNjNhYWQyMDBjNDRmMDUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VncJ9VlrJeSVNgFUt_cWa8gjKKcUhpBs1-IkdaJee28'
            },
            body: JSON.stringify({media_type: 'tv', media_id: filme.id, watchlist: true})
          };
          
          fetch('https://api.themoviedb.org/3/account/9269654/watchlist', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        let favoritos = JSON.parse (localStorage.getItem ("favoritos") ) || []
        favoritos.push(filme)
        localStorage.setItem("favoritos", JSON.stringify (favoritos))
    }
    function desfavoritar(){
        setFavorito(false)

        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODU3OWI3ZDQ2ZDJlOTUwNGE2MTEyMDEwMWI1YTM4OCIsInN1YiI6IjY1MDQ0MGFmNjNhYWQyMDBjNDRmMDUzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VncJ9VlrJeSVNgFUt_cWa8gjKKcUhpBs1-IkdaJee28'
            },
            body: JSON.stringify({media_type: 'tv', media_id: filme.id, watchlist: false})
          };
          
          fetch('https://api.themoviedb.org/3/account/9269654/watchlist', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

        let favoritos = JSON.parse (localStorage.getItem ("favoritos") ) || []
        const favoritosAtualizado = favoritos.filter(f => f.id !== filme.id)
        localStorage.setItem("favoritos", JSON.stringify (favoritosAtualizado))
    }

    return (
        <div className="flex flex-col items-center justfify-between gap-1 w-40 m-2 relative">
            {favorito ?
                <HeartIcon
                    className="h-6 w-6 text-red-600 absolute top-1 right-2 cursor-pointer hover:text-white"
                    onClick={desfavoritar}
                 />
                :
                <HeartIconOutline
                    className="h-6 w-6 absolute top-1 right-2 cursor-pointer hover:text-red-600"
                    onClick={favoritar}
                />                
            }
            <img className = "rounded h-56" src={image_url} alt="Poster do Filme" />
            <span className="font-bold text-lg w-full line-clamp-1 text-center">{filme.title}</span>
            <div className="flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-amber-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
        
            <span className="text-slate-400">{filme.vote_average.toFixed(1)}</span>
            </div>
            <a href="#" className="bg-orange-400 w-full rounded text-center py-1 hover:bg-orange-900">Detalhes</a>
       </div>
    )
}