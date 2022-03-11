import Head from "./components/head";
import {Container, Typography, Grid, Alert} from "@mui/material";
import axios from 'axios';
import {useState, useEffect, createRef} from "react";
import ListPokemons from "./components/ListPokemons";
import { Offline } from "react-detect-offline";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(12);
  const contentScroll = createRef();
  const fetchPokemons = async () => {
    setLoading(true)
    const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=12`);
    const arr = [];
    if(resp.data?.results?.length > 0){
      for(let i = 0; i < resp.data?.results.length; i++){
        arr.push(await axios.get(resp.data.results[i].url).catch((err) => null));
      }
    }
    setPokemons(arr)
    setLoading(false)
  };

  const handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      setLimit(limit+12)
    }
}

  useEffect(()=>{
    fetchPokemons();
  },[limit])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [limit])
  console.log(loading)
  return (
    <div ref={contentScroll}>
      <Head/>
      <Container maxWidth="md">
        <Offline><Alert severity="error">Offline</Alert></Offline>
        <Typography variant="h4" className="m-t-30">Pokemons</Typography>
        <br/>
        <Grid container spacing={2} alignItems="stretch" direction="row" style={{gridAutoRows: '1fr'}}>
          <ListPokemons pokemons={pokemons} loading={loading}/>
        </Grid>
        <br/>
        {loading && <center><Typography variant="body">Muat lebih banyak...</Typography></center>}
      </Container>
    </div>
  )
}
export default Home;
