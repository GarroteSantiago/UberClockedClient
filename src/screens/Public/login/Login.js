import React, {useState} from "react";
import {login} from "../../../api/authentication.js";
import Form from "../../../components/data/forms/Form.js";
import EmailInput from "../../../components/data/inputs/emailInput/EmailInput.js";
import PasswordInput from "../../../components/data/inputs/passwordInput/PasswordInput.js";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Form title="Login" redirectTo="/home" submitMethod={() => login(email, password)}>
            <EmailInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <PasswordInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form>
    )
}
export default Login;