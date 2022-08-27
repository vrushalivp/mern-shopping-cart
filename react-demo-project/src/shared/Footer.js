import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return (
            <>
                <footer className="page-footer font-small"  style={{backgroundColor:"#563d7c",color:"white",bottom:0,width:'100%',position:'fixed'}}>


                    <div className="footer-copyright text-center py-3">© 2020 Copyright   &nbsp;
                        <NavLink to="/" className="text-center text-white text-decoration-none"> showcart.com</NavLink>
                    </div>


                </footer>
            </>
        )
    }
}
