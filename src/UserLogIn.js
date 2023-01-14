import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Row from "react-bootstrap/Row";
import { Link } from 'react-router-dom';


function UserLogIn({handleLogIn, setUsername, setPassword}) {

    // const [validated, setValidated] = useState(false);

    const [data, setData] = useState({
        password: "",
        showPassword: false,
    });

    return(
        <div>
            <h1>Log In To Your Account</h1>
            {/* <Form noValidate validated={validated} onSubmit={handleLogIn} className="forms"> */}
            <Form onSubmit={handleLogIn} className="forms">
                <Row className="mb-3">
                    <Form.Group className="mb-1" controlId="formUsername">
                        <Form.Label name="username">Username</Form.Label>
                        <Form.Control type="text" placeholder="Username:" onChange={setUsername} required />
                        <Form.Control.Feedback type="invalid">
                            This user does not exist. Please make sure your spelling is correct.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group className="mb-1" controlId="formPassword">
                        <Form.Label name="password">Password</Form.Label>
                        <Form.Control type={data.showPassword ? "text" : "password"} 
                                    placeholder="Password:" 
                                    onChange={setPassword}
                                    required />
                        <Form.Control.Feedback type="invalid">
                            This password does not match with the identified user.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <button type="submit">
                    Submit
                </button>
            </Form>
            <span class='redirect-signup'>
                <Link to="/sign-up">Don't have an account?</Link>
            </span>
        </div>
    )
};

export default UserLogIn;