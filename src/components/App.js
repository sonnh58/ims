import React from 'react'
import Upload from './Upload'
import Recognition from './Recognition'
import PassportList from './PassportList/PassportList'
import CompareFaces from './CompareFaces/CompareFaces'
import Navbar from './Navbar'
import Footer from './Footer'
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom"

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Navbar/>
                        <div className="container padding-16">
                            <Redirect from="/" to="/compare"/>
                            <Route path='/compare' exact component={CompareFaces}/>
                            <Route path='/crime' component={PassportList}/>
                            <Route path='/recognition' component={Recognition}/>
                            <Route path='/upload' component={Upload}/>
                        </div>
                    </div>
                </Router>
                <Footer/>
            </div>
        )
    }
}