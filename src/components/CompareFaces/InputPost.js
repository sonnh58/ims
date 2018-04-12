import React from 'react'
import InputImage from './InputImage'
import InputPhoto from './InputPhoto'
export default class InputPost extends React.Component{
  state = {
    passport: this.props.passport || null,
    photo: this.props.photo || null,
    error: null
  }
  showResult(message) {
    // Em viet lai doan nay de no bắn hộ chiếu vào website nhé.

    console.log(message);
    this.setState({passport: 'data:image/JPEG;base64,' + message.faceImgByte});
  }
  componentDidMount(){
    console.log('Socket: CONNECTING' );
    /* Dia chi server socket */
    let socket = new window.SockJS('http://127.0.0.1:8081/SocketServer/connect');
    // dang ky subscribe nhan ket qua tra ve tu server
    // var userName = document.getElementById("field_userName").value;
    // var subscribeLink = '/topic/showSignResult/'+userName;
    let subscribeLink = '/topic/showSignResult/admin';
    console.log(subscribeLink);
    let stompClient = window.Stomp.over(socket);
    console.log(stompClient);
    console.log("day tao day");
    stompClient.connect({}, (frame)=> {
      /* setConnected(true); */
      console.log('Connected: ' + frame);
  
      console.log('Socket: CONNECTED' );
      stompClient.subscribe(subscribeLink, (calResult) => {
          this.showResult(JSON.parse(calResult.body).person);
      });
    });
        /* stompClient.subscribe('/topic/showSignResult/admin', function( calResult) {
            showResult(JSON.parse(calResult.body).person);
        }); */
    this.setState({error: this.state.error})
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.error){
      this.setState({error: nextProps.error})
    }
  }
  handlePassport(file){
    this.setState({error: null, passport: null})
    if(!file.type.includes("image")){
      return this.setState({error: "Chỉ được phép nhập ảnh"})
    }
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.setState({passport: reader.result})
    }
  }
  
  handlePhoto(file){

    if(typeof file === "string" && file.startsWith("data") && file.includes("base64")){
      return this.setState({photo: file})
    }
    this.setState({error: null, photo: null})
    if(!file.type.includes("image")){
      return this.setState({error: "Chỉ được phép nhập ảnh"})
    }
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.setState({photo: reader.result})
    }
  }
  handleSubmit(){
    if(!this.state.passport){
      return this.setState({error:"Chưa nhập passport"})
    }
    if(!this.state.photo){
      return this.setState({error: "Chưa nhập ảnh đối chiếu"})
    }
    this.setState({error: null})
    this.props.handleSubmit(this.state.passport, this.state.photo)
  }
  render(){
    return (
      <div>
        <div className="row">
          <div className="col">
            <InputImage content="Tải lên hộ chiếu" handleFile={file => this.handlePassport(file)} />
            <div>Preview</div>
            <img src={this.state.passport || "assets/no-content.png"} alt="Ảnh hộ chiếu" width={320} height={280}/>
          </div>
          <div className="col">
            <InputPhoto handlePhoto={file => this.handlePhoto(file)} photo={this.state.photo}/>
          </div>
        </div>
        <br/>
        <button className="btn btn-primary" onClick={() => this.handleSubmit()} disabled={this.props.handling || !this.props.ready}>Xử lí</button>
        <br/>
        {this.state.error &&
          <div style={{color: "red"}}>Error: {this.state.error}</div>
        }
        {this.props.handling && <div>Đang xử lí</div>}
        {this.props.ready || <div>Đang kết nối server</div>}
      </div>
    )
  }
}