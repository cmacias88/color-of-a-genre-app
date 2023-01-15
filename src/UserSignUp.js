import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Row from "react-bootstrap/Row";
import { Link } from 'react-router-dom';


function UserSignUp({handleSignIn, setFname, setLname, setUsername, setPassword}) {

    const [validated, setValidated] = useState(false);

    const [data, setData] = useState({
        password: "",
        showPassword: false,
    });

    return(
        <div>
            <h1>Make Your Account</h1>
            <Form noValidate validated={validated} onSubmit={handleSignIn} className="forms">
                <Row className="mb-3">
                    <Form.Group className="mb-1" controlId="formFname">
                        <Form.Label name="fname">First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your first name." onChange={setFname} required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid first name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="formLname">
                        <Form.Label name="lname">Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your last name." onChange={setLname} required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid last name.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group className="mb-1" controlId="formUsername">
                        <Form.Label name="username">Username</Form.Label>
                        <Form.Control type="text" placeholder="Set your username." onChange={setUsername} required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid username.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group className="mb-1" controlId="formPassword">
                        <Form.Label name="password">Password</Form.Label>
                        <Form.Control type={data.showPassword ? "text" : "password"} 
                                    placeholder="Set your password." 
                                    onChange={setPassword}
                                    required />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid password.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <button type="submit">
                    Submit
                </button>
            </Form>
            <span class="redirect-login">
                <Link to="/log-in">Already registered?</Link>
            </span>
        </div>
    )
};

export default UserSignUp;