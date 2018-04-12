import React from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
export default class Upload extends React.Component{
  state = {
    uploadSuccess: [],
    uploadFail: []
  }
  onDrop(files){
    for(let file of files) {
      let formData = new FormData()
      formData.append('passport', file)
      axios.post('/api/passports/upload', formData)
      .then(res => {
        this.setState({uploadSuccess: [...this.state.uploadSuccess, file.name]})
        })
      .catch(err => {
        this.setState({uploadFail: [...this.state.uploadFail, {name: file.name, error: err.response.data.error}]})
      })
    }
  }
  render(){
    return(
      <div>
        <Dropzone onDrop={(files) => this.onDrop(files)}>
          <div>Tải lên hộ chiếu</div>
        </Dropzone>
        <div>
          {this.state.uploadSuccess.map((file, i) => <div key={i}>Tải lên thành công {file}</div>)}
        </div>
        <div style={{"color":"red"}}>
          {this.state.uploadFail.map((file, i) => <div key={i}>{file.name}: {file.error}</div>)}
        </div>
      </div>
    )
  }
}