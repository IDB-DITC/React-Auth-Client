import { useState } from "react"
import { LoginModel, LoginValidation } from "../../models/auth-model"
import { AuthProcess, LoginApi } from "../../services/auth-api"
import { Formik, FormikHelpers } from "formik";
import { Box, Button, Divider, Paper, TextField } from "@mui/material";
import { Redirect, useHistory } from "react-router-dom";
import { useIsAuthenticated, useSignIn } from 'react-auth-kit';
import { jwtDecode } from 'jwt-decode';



export default function LoginComponent() {

    const [model, setModel] = useState<LoginModel>(new LoginModel());
    const history = useHistory();
    const isAuthenticated = useIsAuthenticated();
    const signIn = useSignIn();

    function FormSubmit(formData: LoginModel, helpers: FormikHelpers<LoginModel>) {
        


        LoginApi(formData).then(res => {
            //AuthProcess(res.data);
            localStorage.setItem('token', res.data);

            var claims = jwtDecode(res.data);
            const expireAt = new Date(claims.exp ?? 120 * 1000);
            console.log(claims);

            if (signIn({
                token: res.data,
                tokenType: 'Bearer',    // Token type set as Bearer
                authState: { name: claims.sub, uid: claims.iat },   
                expiresIn: claims.iat ?? 120  // Token Expriration time, in minutes

            })) {
                history.push('/')
            }
            else {
                // Else, there must be some error. So, throw an error
                alert("Error Occoured. Try Again")
            }

            history.push('/');
        }).catch(err => {
            helpers.setErrors(err);
        })
    }
    if (isAuthenticated()) {
        // If authenticated user, then redirect to secure dashboard
        return (
            <Redirect to={'/'} />
        )
    }


    return (
        <Formik initialValues={model} validationSchema={LoginValidation} onSubmit={FormSubmit}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <Box>
                        <br />
                        <TextField
                            name="userName"
                            label="User Name"
                            fullWidth
                            error={formik.errors.userName ? true : false}
                            helperText={formik.errors.userName}
                            value={formik.values.userName}
                            onChange={formik.handleChange} />
                        <br />
                        <br />
                        <TextField
                            name="password"
                            label="Password"
                            fullWidth type="password"
                            error={formik.errors.password ? true : false}
                            helperText={formik.errors.password}
                            value={formik.values.password}
                            onChange={formik.handleChange} />
                        <br />
                        <br />
                        <Divider />
                        <br />
                        <Button type="submit" variant="outlined">Register</Button>
                    </Box>
                </form>
            )}
        </Formik>

    );

}