import React from 'react'
import axios from 'axios'
import Dropzone from 'react-dropzone'
export default class RecognitionImage extends React.Component{
  state = {
    recognition: [],
    uploading: false,
    showAll: false
  }
  onDrop(file){
    var reader  = new FileReader()
    this.setState({uploading: true})
    reader.readAsDataURL(file[0])
    reader.onload = () => {
      axios.post('/api/recognition/image', {image: reader.result, limits: 5})
      .then(res => {
        let passports = res.data.passports || []
        passports.sort((a,b) => a.distance > b.distance)
        this.setState({uploading: false})
        this.setState({recognition: res.data.passports || []})
      })
    }
  }
  render(){
    const recognition = this.state.recognition
    let recogElem
    if(this.state.uploading){
      recogElem = <p><em>Đang nhận diện...</em></p>
    }
    else 
    if(recognition.length === 0){
      recogElem = <div>Không thể nhận diện</div>
    }
    else 
    {
      recogElem = recognition.map(passport => 
        (<figure className="figure" key={passport._id}>
          <img width={350} className="img-thumbnail" alt={passport._id} src={`/api/passports/${passport._id}`} height={350} style={{maxWidth: "250px", maxHeight: "250px"}}/>
          <figcaption className="figure-caption">Distance: {passport.distance}</figcaption>
        </figure>
        )
      )
    }
    return(
      <div className="row">
        <div className="col-sm-6">
          <Dropzone multiple={false} onDrop={(file) => this.onDrop(file)} disabled={this.state.uploading}>
            <div>Tải ảnh lên</div>
          </Dropzone>
        </div>
        <div className="col-sm-6">
          {recogElem}
        </div>
      </div>
    )
  }
}