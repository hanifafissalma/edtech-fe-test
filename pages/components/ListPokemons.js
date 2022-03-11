import {useState, useEffect} from 'react';
import LazyLoad from 'react-lazy-load';
import Link from 'next/link';
import {Typography, Grid, Card, CardMedia, CardContent, Chip, Box} from "@mui/material";
const ListPokemons = ({pokemons}) => {
    return(
        pokemons?.map((d,i)=>
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
        )
    )
}
export default ListPokemons;