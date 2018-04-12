import React from 'react'
export default class ResultFaces extends React.Component{

  state = {
    passportFace: null
  }
  componentWillMount(){
    this.cropImage(this.props.passportImage, this.props.comparePassport.passportFaceLocation, (imageBase64) => {
      this.setState({passportFace: imageBase64})
    })
    this.cropImage(this.props.photoImage, this.props.comparePassport.photoFaceLocation, (imageBase64) => {
      this.setState({photoFace: imageBase64})
    })
  }
  distanceToRatio(distance){
    distance = Number(distance)
    if(!distance) return distance
    return (100/(1+64*(distance**8))).toFixed(2)
  }
  toBoxCrop(box){
    // list [top, right, bottom, left] to object (left, top, width, height)
    return {left: box[3], top: box[0], widht: box[1] - box[3], height: box[2] - box[0]}
  }
  cropImage(imageBase64, box, cb){
    // box contain (top, right, bottom, left) shown crop location
    let [top, right, bottom, left] = box
    let imgObject = new Image()
    imgObject.src = imageBase64
    //set up canvas for thumbnail
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    canvas.width = right - left
    canvas.height = bottom - top
    imgObject.onload = () => {
      ctx.drawImage(imgObject, left, top, right - left, bottom - top, 0, 0, canvas.width, canvas.height)
      cb(canvas.toDataURL())
    }
  }
  render(){
    let resultDB = null
    if(this.props.compareDB){
      let halfFirst = this.props.compareDB.slice(0, 5)
      let halfLast = this.props.compareDB.slice(5)
      resultDB = 
      <div>
        <h4>So sánh với CSDL tội phạm</h4>
        <div>10 đối tượng có khuôn mặt giống nhất. Thời gian: {((this.props.time.db - this.props.time.start)/1000).toFixed(3)}s</div>
        <div className="row">
          {halfFirst.map(data => 
          <div key={data._id} className="col">
            <figure className="figure text-center">
              <img style={{height: "100px"}} src={`/api/passports/${data._id}`} alt="Ảnh tội phạm gần giống nhất" className="img-thumbnail" />
              <figcaption className="figure-caption text-center">Giống nhau: {this.distanceToRatio(data.distance)}%</figcaption>
            </figure>
          </div>)}
        </div>
        <div className="row">
          {halfLast.map(data => 
          <div key={data._id} className="col">
            <figure className="figure text-center">
              <img style={{height: "100px"}} src={`/api/passports/${data._id}`} alt="Ảnh tội phạm gần giống nhất" className="img-thumbnail" />
              <figcaption className="figure-caption text-center">Giống nhau: {this.distanceToRatio(data.distance)}%</figcaption>
            </figure>
          </div>)}
        </div>
      </div>
    }
    return(
      <div>
        <div className="row">
          <div className="col">
            <figure className="figure text-center">
              <img src={this.state.passportFace} alt="Ảnh khuôn mặt bóc ra từ hộ chiếu"  width="120" height="160"/>
              <figcaption className="figure-caption text-center">Ảnh khuôn mặt bóc ra từ hộ chiếu</figcaption>
            </figure>
          </div>
          <div className="col">
            <figure className="figure text-center">
              <img src={this.state.photoFace} alt="Ảnh khuôn mặt bóc ra từ ảnh chụp" width="120" height="160"/>
              <figcaption className="figure-caption text-center">Ảnh khuôn mặt bóc ra từ ảnh chụp</figcaption>
            </figure>
          </div>

          <div className="col-6">
            <h5>Kết quả nhận diện</h5>
            <div>Giống nhau: {this.distanceToRatio(this.props.comparePassport.distance)}%</div>
            <div>Thời gian: {((this.props.time.passport - this.props.time.start)/1000).toFixed(3)}s</div>
          </div>
        </div>

        {resultDB}
      </div>
    )
  }
}