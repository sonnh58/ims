import React from 'react'
import {NavLink, Route} from 'react-router-dom'
import RecognitionWebcam from './RecognitionWebcam'
import RecognitionImage from './RecognitionImage'
export default class Recognition extends React.Component{
  render(){
    return (
      <div>
        <br/>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink className="nav-link" to="/recognition/image">Upload Image</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/recognition/webcam">Webcam</NavLink>
          </li>
        </ul>
        <br/>
        <Route path="/recognition/image" component={RecognitionImage} />
        <Route path="/recognition/webcam" component={RecognitionWebcam} />
      </div>
    )
  }
}