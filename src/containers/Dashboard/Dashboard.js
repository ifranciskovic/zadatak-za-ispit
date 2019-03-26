import React, { Component } from 'react';
import axios from 'axios';

import Player from '../../components/Player/Player';
import Modal from '../../components/Modal/Modal';
import './Dashboard.css';

class Dashboard extends Component {
    state = {
        players: [],
		 numberOfRecords:5, 
		 isOpen:false,
		 currentFirstName:"Nobody",
		 currentLastName:null,
		 currentImgSrc:null
    }

	handleClick() {
    console.log('The link was clicked.');
    }

    toggleModal = () => {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }

    oldestPlayer = () => {

        let today=new Date();
        let birthDay=null;
        let daysOfLifes=[];
        let i=0;
        let days=null;

        for (i=0; i < this.state.players.length; i++) { 
            birthDay=new Date(this.state.players[i].birthDay.substring(0,10))
            days= Math.ceil((today.getTime()-birthDay.getTime()) / (1000 * 60 * 60 * 24));
            daysOfLifes.push(days);
        }
            let maxKey = daysOfLifes.indexOf(Math.max(...daysOfLifes));
        
            let years=Math.floor(daysOfLifes[maxKey]/365);
            let oldestPlayer=this.state.players[maxKey].firstName+" "+this.state.players[maxKey].lastName
            let message=`The oldest player is: ${oldestPlayer}, ${years} years!`;
            alert(message);
    }
    
 
    longestName = () => {
        let playersLength=[];
        let longestPlayersName=null;
        let indexPlayers=0;
        let maximumLetters=0;
        let i=0;
        for(i=0; i<this.state.players.length; i++){
            let nameLength=this.state.players[i].firstName.length+this.state.players[i].lastName.length;
            playersLength.push(nameLength);
            console.log(playersLength);
            console.log(nameLength+ " from longestName");
        }
        maximumLetters=Math.max(...playersLength);
        indexPlayers=playersLength.indexOf(maximumLetters);
        longestPlayersName=this.state.players[indexPlayers].firstName+" "+this.state.players[indexPlayers].lastName
        let message=`Player with the longest name is: ${longestPlayersName}, ${maximumLetters} letters`;
        alert(message);
        //alert(this.state.players[index].firstName+" "+this.state.players[index].lastName+" "+ maximumLetters);
    }

    shortestName = () => {
        let playersLength=[];
        let shortestPlayersName=null;
        let indexPlayers=0;
        let minimumLetters=0;
        let i=0;
        for(i=0; i<this.state.players.length; i++){
            let nameLength=this.state.players[i].firstName.length+this.state.players[i].lastName.length;
            playersLength.push(nameLength);
            console.log(playersLength);
           
        }
        minimumLetters=Math.min(...playersLength);
        indexPlayers=playersLength.indexOf(minimumLetters);
        shortestPlayersName=this.state.players[indexPlayers].firstName+" "+this.state.players[indexPlayers].lastName
        let message=`Player with the shortest name is: ${shortestPlayersName}, ${minimumLetters} letters`;
        alert(message);
        //alert(this.state.players[index].firstName+" "+this.state.players[index].lastName+" "+ maximumLetters);
    }
  
	totalPrizeMoney = () => {
		let total=0;
		let i=0;
		for (i=0; i < this.state.players.length; i++) { 
			 total = total+ this.state.players[i].prizeMoney;
		}

		//total=10000;
		let message=`Total prize money of all players: ${total} $`;
		alert(message);
	}
	
    playerClickedHandler = (id) => {
        //this.setState({selectedCustomerId: id});
		 console.log(id);
       this.setState({isOpen: true});
       this.setState({currentFirstName: this.state.players[id-1].firstName});
       this.setState({currentLastName: this.state.players[id-1].lastName});
   
       let imgSrc=`/images/${id}.jpg`; 
       this.setState({currentImgSrc: imgSrc});
    }

    componentDidMount () {
		 //Players
        axios.get( 'http://localhost:3001/getplayers' )
            .then( response => {
                const players = response.data;
                //const players = response.data.slice(0, this.state.numberOfRecords);
					//console.log(response.data);
                const updatedRecords = players.map(player => {
                    return { ...player}
                });
                this.setState({players: updatedRecords});
            } ); // END OF POST AXIOS

    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
			//Photos
        const players = this.state.players.map(player => {
			  let imgSrc=`/images/${player.id}.jpg`; 
            return <Player 
                key={player.id} 
                id={player.id} 
                firstName={player.firstName} 
                lastName={player.lastName} 
                country={player.country} 
                ranking={player.ranking} 
                imgSrc={imgSrc} 
                clicked={() => this.playerClickedHandler(player.id)} 
                 />;
        });

        return (
            <div className="Dashboard">
			  <h1> ATP World Ranking</h1>
						<button className="DasboardButton" onClick={this.toggleModal}> Open the modal </button>
						<button className="DasboardButton" onClick={this.totalPrizeMoney}> Total prize money of all players </button>
						<button className="DasboardButton" onClick={this.oldestPlayer}> Who is the oldest player?</button>
                        <button className="DasboardButton" onClick={this.longestName}> Who is the player with the longest name?</button>
                        <button className="DasboardButton" onClick={this.shortestName}> Who is the player with the shortest name?</button>
					  <Modal 
			  				show={this.state.isOpen} 
			  				onClose={this.toggleModal}
			  				firstName={this.state.currentFirstName}
			  				lastName={this.state.currentLastName}
                		    imgSrc={this.state.currentImgSrc} 
			 				 />
                <section className="Players"> {players} </section>
            </div>
        );
    }
}

export default Dashboard;
