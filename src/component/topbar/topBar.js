import React, {useContext, useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import AuthForm from "./authForm";
import Button from "react-bootstrap/Button";
import {CurrentUserContext} from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";

function TopBar() {

    const [tokenValid, setTokenValid] = useState(true)
    const [state, setState] = useContext(CurrentUserContext)
    const apiUrl = tokenValid ? '/user' : '/token/refresh/'
    const [{response}, doFetch] = useFetch(apiUrl)
    const token = localStorage.getItem('token')


    const handleSubmitLogOut = () => {
        localStorage.clear()
        setState(state => ({
            ...state,
            isLoggedIn: false
        }))
    }

    useEffect(()=>{
        if (token){
            setState(state => ({
                ...state,
                isLoggedIn: true
            }))
        }
    }, [])

    useEffect(()=>{
        if (state.isLoggedIn === true) {
            doFetch({method: 'GET'})
        }
    }, [state.isLoggedIn, tokenValid])

    useEffect(()=>{

        if (response !== null && response.code){
            doFetch({method: 'POST'})
            setTokenValid(false)
        }

        if (response !== null && response.access){
            localStorage.setItem('token', response.access)
            setTokenValid(true)
        }
        if ( apiUrl === '/token/refresh/' && response !== null && response.code){
            handleSubmitLogOut()
        }
    }, [response])

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Super Shop</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
                {
                    state.isLoggedIn ?
                        <Navbar.Text>
                            Signed in as: <a href="#login">{(response !== null) ? response.username : ''}</a>
                        </Navbar.Text> :
                        <div>
                            <AuthForm/>,
                        </div>
                }
                {
                    state.isLoggedIn &&
                    <Button variant="outline-secondary"
                            onClick={handleSubmitLogOut}
                    >
                        Log Out
                    </Button>
                }

            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar;
