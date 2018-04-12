import openSocket from 'socket.io-client'
import React from 'react'
import Webcam from 'react-webcam'

export default class RecognitionWebcam extends React.Component {
  constructor(props){
    super(props)
    this.state = {recognition: [], showAll: false, holding: false, ready: false}
    
  }
  componentWillMount() {
    this.socket = openSocket('/recognition')
    this.socket.on('recognition', data =>{
      if(this.state.holding) return
      else
      this.setState({
        recognition: data || [],
      })
      setTimeout(() => this.getScreenshot(), 1000)
    })    
    this.socket.on("ready",() => {
      this.setState({ready: true})
      this.getScreenshot()
    })
  }
  setRef(webcam){
    this.webcam = webcam
  }
  getScreenshot(){
    if(this.webcam){
      const imageSrc = this.webcam.getScreenshot()
      this.socket.emit('image', imageSrc)
    }
  }
  componentWillUnmount(){
    this.setState({holding: true})
    this.socket.disconnect()
  }
  toggleHolding(){
    if(this.state.holding){
      this.getScreenshot()
    }
    this.setState({holding: !this.state.holding})
  }
  render() {

    const recognition = this.state.recognition
    let recogElem
    if(!this.state.ready)
      recogElem = <div>Đang kết nối với server</div>
    else
    if(!Array.isArray(recognition) || recognition.length === 0){
      recogElem = <div>Không thể nhận diện</div>
    }
    else if(this.state.showAll){
      recogElem = recognition.map(passport => 
        (<figure className="figure" key={passport._id}>
          <img width={350} className="img-thumbnail" alt={passport._id} src={`/api/passports/${passport._id}`} height={350} style={{maxWidth: "250px", maxHeight: "250px"}}/>
          <figcaption className="figure-caption">Distance: {passport.distance}</figcaption>
        </figure>
        )
      )
    }
    else {
      
      let closest = recognition.reduce((a, b) =>  a.distance > b.distance? b: a)
      recogElem = <figure className="figure" key={closest._id}>
      <img width={350} className="img-thumbnail" alt={closest._id} src={`/api/passports/${closest._id}`} height={350} style={{maxWidth: "250px", maxHeight: "250px"}}/>
      <figcaption className="figure-caption">Distance: {closest.distance}</figcaption>
    </figure>
    }
    return (
      <div className="row">
        <div className="col-sm">
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef.bind(this)}
            screenshotFormat="image/jpeg"
            width={350}
          />
          <br/>
          <div>Giữ: <button className="btn btn-primary btn-sm" onClick={() => this.toggleHolding()}>{this.state.holding? "Bật": "Tắt"}</button></div>
        </div>
        <div className="col-sm">
          {recogElem}
        </div>
      </div>
    );
  }
}
