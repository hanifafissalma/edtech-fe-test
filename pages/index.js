import Head from "./components/head";
import {Container, Typography, Grid, Alert, Card, CardContent, CardMedia, Chip} from "@mui/material";
import axios from 'axios';
import {useState, useEffect} from "react";
import { Offline } from "react-detect-offline";
import Link from 'next/link';
import LazyLoad from "react-lazy-load";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(12);
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
    if (windowBottom + 100 >= docHeight) {
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

  return (
    <div>
      <Head/>
      <Container maxWidth="md">
        <Offline><Alert severity="error">Offline</Alert></Offline>
        <Typography variant="h4" className="m-t-30">Pokemons</Typography>
        <br/>
        <Grid container spacing={2} alignItems="stretch" direction="row" style={{gridAutoRows: '1fr'}}>
          {pokemons?.map((d,i)=>
            <Grid item md={4} sm={6} xs={12} key={i}>
              <Link href={`/detail?name=${d.data?.name}`}>
                <Card>
                  <center>
                    <LazyLoad 
                      width={150}
                      height={150}
                      debounce={false}
                      offsetVertical={500}
                    >
                      <CardMedia
                          component={"img"}
                          image={d.data?.sprites?.front_default}
                          alt={d.data?.name}
                      />
                    </LazyLoad>
                  </center>
                  <CardContent>
                    <Typography variant="h6" color="text.secondary">#{d.data?.id}</Typography>
                    <Typography variant="h5" style={{textTransform: 'capitalize'}}>{d.data?.name}</Typography>
                    {d.data?.abilities?.map((data, i)=>
                      <Chip label={data.ability?.name} color="primary" variant="outlined" key={i} style={{margin:'3px'}}/>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          )}
        </Grid>
        <br/>
        {loading && <center><Typography variant="body">Muat lebih banyak...</Typography></center>}
      </Container>
    </div>
  )
}
export default Home;
