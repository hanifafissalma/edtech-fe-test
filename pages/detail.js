import {useState, useEffect} from 'react';
import axios from 'axios';
import Head from "./components/head";
import {Container, Typography, Card, CardMedia, Chip, CardContent, Grid} from "@mui/material";
import { useRouter } from "next/router";
import LazyLoad from 'react-lazy-load';
const Detail = () => {
    const { query } = useRouter();
    const [data, setData] = useState(null);
    const name = query.name;
    
    const fetchData = async() => {
        const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setData(resp.data);
    }

    useEffect(()=>{
        fetchData();
    },[])
    return(
        <>
            <Head/>
            <Container maxWidth="md">
                <Typography variant="h4" className="m-t-30">{name}</Typography>
                <br/>
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={9} sm={12}>
                                <center>
                                    <LazyLoad 
                                        width={150}
                                        height={150}
                                        debounce={false}
                                        offsetVertical={500}
                                    >
                                        <CardMedia
                                            component={"img"}
                                            image={data?.sprites?.front_default}
                                            alt={data?.name}
                                        />
                                    </LazyLoad>
                                </center>
                                <Typography variant="h6">Types</Typography>
                                {data?.types?.map((d,i)=>
                                    <Chip label={d.type?.name} color="primary" variant="outlined" key={i} style={{margin:'3px'}}/>
                                )}
                                <br/>
                                <Typography variant="h6">Stats</Typography>
                                {data?.stats?.map((d,i)=>
                                    <Chip label={d.stat?.name} color="success" variant="outlined" key={i} style={{margin:'3px'}}/>
                                )}
                                <br/>
                                <Typography variant="h6">Moves</Typography>
                                {data?.moves?.map((d,i)=>
                                    <Chip label={d.move?.name} color="warning" variant="outlined" key={i} style={{margin:'3px'}}/>
                                )} 
                            </Grid>
                            <Grid item md={3} sm={12}>
                                <center>
                                    <LazyLoad 
                                        width={150}
                                        height={150}
                                        debounce={false}
                                        offsetVertical={500}
                                    >
                                        <CardMedia
                                            component={"img"}
                                            image={data?.sprites?.back_default}
                                            alt={data?.name}
                                        />
                                    </LazyLoad>
                                </center>
                                <center>
                                    <LazyLoad 
                                        width={150}
                                        height={150}
                                        debounce={false}
                                        offsetVertical={500}
                                    >
                                        <CardMedia
                                            component={"img"}
                                            image={data?.sprites?.front_shiny}
                                            alt={data?.name}
                                        />
                                    </LazyLoad>
                                </center>
                                <center>
                                    <LazyLoad 
                                        width={150}
                                        height={150}
                                        debounce={false}
                                        offsetVertical={500}
                                    >
                                        <CardMedia
                                            component={"img"}
                                            image={data?.sprites?.back_shiny}
                                            alt={data?.name}
                                        />
                                    </LazyLoad>
                                </center>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                        
            </Container>
        </>
    )
}
export default Detail;