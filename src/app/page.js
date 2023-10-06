import Cardfilme from "./componentes/Cardfilme.jsx";
import NavBar from "./componentes/NavBar.jsx";
import Titulo from "./componentes/titulo.jsx";


async function carregarDados(){
  const url = "https://api.themoviedb.org/3/trending/tv/week?api_key=38579b7d46d2e9504a61120101b5a388&language=pt-br"
  const  response = await fetch(url)
  const json = await response.json()
  return json.results
}

export default async function Home() {


  const filmes = await carregarDados()



 return (
  <>
  <NavBar/>

   <Titulo>Em Alta</Titulo>
  <section className="flex flex-wrap gap-2">
    {filmes.map( filme => <Cardfilme filme= {filme} />)}
  </section>

   <Titulo>Lançamentos</Titulo>
  </>
 )
}