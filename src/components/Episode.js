import React from 'react'
import axios from 'axios'

class EpisodeList extends React.Component{
    constructor(){
        super()
        this.state={
          info:{},
          episodes:[],
          noOfPages:null,
          episodeName:''
        }
        this.handleClick=this.handleClick.bind(this)
        this.handleChange= this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    componentDidMount(){
       axios.get('https://rickandmortyapi.com/api/episode/')
        .then(response=>{
            
            this.setState({
                info:response.data.info,
                episodes:response.data.results,
                noOfPages:response.data.info.pages  
            })
        })

    }

    handleClick(event) {
        axios.get(`https://rickandmortyapi.com/api/episode/?page=${event.target.id}`)
        .then(response=>{
            this.setState({
                info:response.data.info,
                episodes:response.data.results,
                noOfPages:response.data.info.pages
            })
        })
      }
    
      handleChange(event){
        this.setState({[event.target.name]:event.target.value})
      }
    
       handleSubmit(e){
        e.preventDefault()
      if(this.state.episodeName.length>0)
       {
        axios.get(`https://rickandmortyapi.com/api/character/?name=${this.state.episodeName}`)
        .then(response=>{
           console.log(response.data)
           this.setState({episodes:response.data.results})
        })
        .catch(err=>{
           alert('no eposides found')
        })
       }
       
       }

    render(){
        const {  noOfPages } = this.state;
        
        let pageNumbers = [];
        for (let i = 1; i <= noOfPages; i++) {
          pageNumbers.push(i);
         }
        
         const renderPageNumbers = pageNumbers.map(number => {
            return (
              <li key={number}
                  id={number}
                  onClick={this.handleClick}> {number} </li>
            );
          });
       
        return(
            <div>
                 <form onSubmit={this.handleSubmit}>
                    <input type='text' 
                           name='episodeName'
                           placeholder='enter the episode name'
                           value={this.state.episodeName} 
                           onChange={this.handleChange}/><br/>
                    
                    <input type='submit' value='filter'/>
                </form>


                <h1 style={{textAlign:'center'}}>No of Episodes - {this.state.episodes.length}</h1>
                

                {this.state.episodes.map((episode, index) => {
                  return (
                 <div key={index} className="card" style={{background:'lightblue',border:'solid 2px black',borderradius:'50px'}}>
                    <div className="card-body">
                  <h5 className="card-title">Episode Name - {episode.name}</h5>
                  <p className="card-text" style={{textDecoration:'underline',color:'red'}}>Episode Date-{episode.air_date}</p>
                  <p className="card-text" style={{textDecoration:'underline',color:'blue'}}>Episode Code-{episode.episode}</p> 
                 </div>
                 </div>
                   )
              })}

               <ul id="page-numbers">
                   {renderPageNumbers}
               </ul>
                
            </div>
        )
    }
}

export default EpisodeList