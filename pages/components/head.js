import React from 'react';
import NextHead from 'next/head'

const Head = (props) => (
    <NextHead>
        <meta charSet="UTF-8" />
        <title>Edtech FE Test - Pokemon</title>
        <meta name="description" content="This test to fulfill Frontend Engineering test"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="frontend, pokemon"/>
        <meta httpEquiv="imagetoolbar" content="no" />
    </NextHead>
)
  
export default Head;