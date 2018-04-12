import React from 'react'
import {NavLink} from 'react-router-dom'
export default class Navbar extends React.Component{
 render(){
    return(
        <div className="page-header">
            <div className="page-header-top">
                <div className="container">
                    <div className="page-logo">
                        <a href="index.html"> <img src="/assets/logo-default.jpg" alt="logo" class="logo-default"/>
                        </a>
                    </div>
                    <ul className="nav nav-justified">
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/compare">Đối chiếu</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/crime" exact>Tội phạm</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/recognition">Nhận diện</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/upload">Upload</NavLink>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
   )
 }
}