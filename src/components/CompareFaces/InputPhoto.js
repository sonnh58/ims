import React from 'react'
import InputImage from './InputImage'
import Webcam from 'react-webcam'
export default class InputPhoto extends React.Component{
  state = {
    input: 0, // 0 image, 1 webcam
    imgShow: false
  }
  setRef(webcam){
    this.webcam = webcam
  }
  getScreenshot(){
    if(this.webcam){
      this.props.handlePhoto(this.webcam.getScreenshot())
      this.setState({imgShow: true})
    }
  }
  toggleInput(){
    this.setState({input: 1 - this.state.input})
  }
  render(){
    if(this.state.input === 0)
    return (
      <div>
        <InputImage content="Tải lên ảnh chụp" handleFile={file => this.props.handlePhoto(file)} /> 
        <div>Preview</div>
        <img src={this.props.photo || "assets/no-content.png"} alt="Ảnh chụp đối chiếu" width={320} height={280}/>
        <br/><br/>
        <button className="btn btn-primary" onClick={() => this.toggleInput()}>Use webcam</button>
      </div>
    )
    else{
      let body
      if(!this.state.imgShow){
        body =
          <div>
            <br/>
            <br/>
            <Webcam
                audio={false}
                height={300}
                ref={this.setRef.bind(this)}
                screenshotFormat="image/jpeg"
                width={350}
              />
          </div>
      }
      else{
        body = <div>
          <br/>
          <div>Preview</div>
          <img src={this.props.photo || "assets/no-content.png"} alt="Ảnh chụp đối chiếu" width={350} height={300}/>
        </div>
      }
      return(
        <div>
          <button className="btn btn-primary" onClick={() => this.toggleInput()}>Upload ảnh</button>{' '}
          {this.state.imgShow?
          <button className="btn btn-light" onClick={()=> this.setState({imgShow: false})}>Reset</button>
          :
          <button className="btn btn-info" onClick={() => this.getScreenshot()}>Chụp ảnh</button>
          }
          {body}
        </div>
      )
    }
  }
}