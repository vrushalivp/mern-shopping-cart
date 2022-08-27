import React, { Component } from "react";

export const sessioncontext = React.createContext();


class SessionContextProvider extends Component {

    state = {
        isLoggedIn:  false
    }

    setSeesionObj = (sessObj) => {
        this.setState({ isLoggedIn: sessObj })
    }

    render() {
        return (
            <sessioncontext.Provider
                value={{
                    ...this.state,
                    setSeesionObj:this.setSeesionObj
                }}
            >
                {this.props.children}
            </sessioncontext.Provider>
        )
    }

}
export default SessionContextProvider; 
