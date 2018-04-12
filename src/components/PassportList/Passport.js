import React from 'react'

export default class Passport extends React.Component{
  state = {
    deleting: false
  }
  onClickDelete(){
    this.setState({deleting: true})
    this.props.onDelete(this.props._id)
  }
  render(){
    return (
      <figure className="figure">
        <img className="img-thumbnail"style={{maxWidth: "300px", maxHeight: "300px"}} src={`api/passports/${this.props._id}`} alt={this.props._id} width={350} height={350}/>
        <figcaption className="figure-caption"><button className="btn btn-danger" disabled={this.state.deleting} onClick={() => this.onClickDelete()}>Delete</button></figcaption>
      </figure>)
  }
}