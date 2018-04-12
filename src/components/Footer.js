import React from 'react'
import {NavLink} from 'react-router-dom'
export default class Footer extends React.Component{
    render(){
        return(
            <footer class="footer">
                <div class="container">
                    2017 © Bản quyền thuộc về Cục Cửa Khẩu,
                    <a target="_blank" href="#"> Bộ Tư lệnh Bộ đội Biên phòng Việt Nam</a>
                </div>
            </footer>
        )
    }
}