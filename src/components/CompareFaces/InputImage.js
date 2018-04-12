import React from 'react'
import Dropzone from 'react-dropzone'
import ImageCompressor from 'image-compressor.js'
export default class InputImage extends React.Component{

  onDrop(file){
    // this.props.handleFile(file[0])
    new ImageCompressor(file[0], {
      quality: .8,
      success: (result) => {
        this.props.handleFile(file[0])
      } 
    })
  }
  render(){
    const style = {
      width : "150px",
      height : "60px",
      border : "1px dashed black",
      borderRadius: "5px",
      padding: "5px",
      margin: "5px"
    }
    return (
      <Dropzone onDrop={(file) => this.onDrop(file)} multiple={false} style={style}>
        {this.props.content}
      </Dropzone>
    )
  }
}