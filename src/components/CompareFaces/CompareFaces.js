import React from 'react'
import InputPost from './InputPost'
import openSocket from 'socket.io-client'
import ResultFace from './ResultFaces'

export default class CompareFaces extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      comparePassport: null,
      compareDB: null,
      page: 0,
      ready: false,
      error: null,
      handling: false,
      time: {
        start: null,
        passport: null,
        db: null
      }
    }
  }

  componentDidMount(){
    
    this.socket = openSocket('/compare')
    this.socket.on('ready', ()=>{
      this.setState({ready: true})
    })
    this.socket.on('handling', handling => this.setState({handling: handling}))
    this.socket.on('comparePassport', (comparePassport) => {
      this.setState({time: {...this.state.time, passport: Date.now()}})
      this.setState(comparePassport)
      this.setState({page: 1})
    })
    this.socket.on('compareDB', (compareDB) => {
      this.setState({time: {...this.state.time, db: Date.now()}})
      this.setState(compareDB)
    })
    this.socket.on('bad_request', message => {
      this.setState({error: message}, () => {this.setState({error: null})})
    })
  }
  handleSubmit(base64_passport, base64_photo){
    this.setState({handling: true})
    this.setState({time: {...this.state.time, start: Date.now()}})
    this.setState({passportImage: base64_passport, photoImage: base64_photo})
    this.socket.emit('compare', base64_passport, base64_photo)
  }
  goBack(){
    this.setState({page: 0})
  }
  render(){
    let body
    if(this.state.page === 0){
      body = <InputPost
                handleSubmit={this.handleSubmit.bind(this)}
                error={this.state.error}
                ready={this.state.ready}
                handling={this.state.handling}
              />
    }
    else{
      body = <ResultFace
              comparePassport={this.state.comparePassport}
              passportImage={this.state.passportImage}
              photoImage={this.state.photoImage}
              compareDB={this.state.compareDB}
              time={this.state.time}
            />
    }
    return(
      <div>
        <h4><button className="btn btn-light" onClick={() => this.goBack()} disabled={!this.state.page}><i className="material-icons">arrow_back</i></button>
        <span>Nhận diện khuôn mặt</span></h4>
        {body}
      </div>
    )
  }
}
