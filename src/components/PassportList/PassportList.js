import React from 'react'
import axios from 'axios'
import Passport from './Passport'
export default class PassportList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      passports: []
    }
  }
  componentWillMount(){
    axios.get('/api/passports')
    .then(res => {
      const data = res.data
      this.setState({passports: data.passports})
    })
    .catch(err => console.log(err))
  }
  deletePassport(_id){
    axios.delete(`/api/passports/${_id}`)
    .then(res => {
      if(res.status === 200){
        this.setState({passports: this.state.passports.filter(p => p._id !== _id)})
      }
    })
  }
  render(){
    return (
      <div>
        {this.state.passports.map(p => 
        <Passport key={p._id} _id={p._id} onDelete={this.deletePassport.bind(this)}/>)}
      </div>
    )
  }
}