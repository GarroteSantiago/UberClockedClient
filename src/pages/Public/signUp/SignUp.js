import React, {useState} from "react";
import Form from "../../../components/data/forms/Form.js";
import TextInput from "../../../components/data/inputs/textInput/TextInput.js";
import EmailInput from "../../../components/data/inputs/emailInput/EmailInput.js";
import PasswordInput from "../../../components/data/inputs/passwordInput/PasswordInput.js";
import {createUser} from "../../../api/user/user.js";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <Form title="Sign Up" redirectTo="/login" submitMethod={() => createUser(2, name, email, password)}>
                <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Name tag" />
                <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </Form>
        </>
    )
}
export default SignUp;