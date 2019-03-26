import React from 'react';

import './Player.css';

const player = (props) => (

    <article className="Player" onClick={props.clicked}>
        <h1>Ranking: {props.ranking}</h1>
        <h1>{props.firstName} {props.lastName}</h1>
        <h4>Country: {props.country} </h4>
        <img src={props.imgSrc} alt={props.lastName} width="200px"/>
    </article>
	
);

export default player;
