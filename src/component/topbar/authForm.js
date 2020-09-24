import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AuthForm() {
    const [show, setShow] = useState(false);

    const [isLoginState, setIsLoginState] = useState(true)

    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const descriptionText = isLoginState ? 'Need an account?' : 'Have an account?'
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = isLoginState ? {login, password} : {login, password, email, phone};
        console.log(user);
        // doFetch({
        //     method: 'post',
        //     data: {
        //         user
        //     }
        // })
    }

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                {isLoginState ? 'Sign In' : 'Sign Up'}
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{isLoginState ? 'Sign In' : 'Sign Up'}{' '}
                        <Button variant="link"
                                onClick={event => setIsLoginState(!isLoginState)}>
                            {descriptionText}
                        </Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control type="login"
                                          placeholder="Логин"
                                          value={login}
                                          onChange={event => setLogin(login)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Пароль"
                                          value={password}
                                          onChange={event => setPassword(password)}
                            />
                        </Form.Group>
                        {
                            !isLoginState &&
                            <Form.Group controlId="formBasicPasswordConfirm">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password"
                                              placeholder="Подтверждение пароля"
                                              value={passwordConfirm}
                                              onChange={event => setPasswordConfirm(passwordConfirm)}
                                />
                            </Form.Group>
                        }
                        {
                            !isLoginState &&
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email"
                                              placeholder="Enter email"
                                              value={email}
                                              onChange={event => setEmail(email)}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                        }
                        {
                            !isLoginState &&
                            <Form.Group controlId="formBasicPhone">
                                <Form.Label>Номер Телефона</Form.Label>
                                <Form.Control type="phone"
                                              placeholder="Номер Телефона"
                                              value={phone}
                                              onChange={event => setPhone(phone)}
                                />
                            </Form.Group>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AuthForm;