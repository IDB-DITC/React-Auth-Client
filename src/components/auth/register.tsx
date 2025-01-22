import { useState } from "react"
import { RegisterModel, RegisterValidation } from "../../models/auth-model"
import { RegisterApi } from "../../services/auth-api"
import { Formik, FormikHelpers } from "formik";
import { Box, Button, Divider, Paper, TextField } from "@mui/material";
import { Redirect, useHistory } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";



export default function RegisterComponent() {

    const [model, setModel] = useState<RegisterModel>(new RegisterModel());
    const history = useHistory();
    const isAuthenticated = useIsAuthenticated();
    function FormSubmit(formData: RegisterModel, helpers: FormikHelpers<RegisterModel>) {
        RegisterApi(formData).then(res => {
            history.push('/login');
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
        <Formik initialValues={model} validationSchema={RegisterValidation} onSubmit={FormSubmit}
        >
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <Box>
                        <br />
                        <TextField
                            name="userName"
                            label="User Name"
                            className="input"
                            fullWidth
                            error={formik.errors.userName ? true : false}
                            helperText={formik.errors.userName}
                            value={formik.values.userName}
                            onChange={formik.handleChange} />
                        <br />
                        <br />
                        <TextField
                            name="email"
                            label="Email"
                            fullWidth
                            className="input"
                            error={formik.errors.email ? true : false}
                            helperText={formik.errors.email}
                            value={formik.values.email}
                            onChange={formik.handleChange} />
                        <br />
                        <br />
                        <TextField
                            name="password"
                            label="Password"
                            className="m-2 p-1"
                            fullWidth type="password"
                            error={formik.errors.password ? true : false}
                            helperText={formik.errors.password}
                            value={formik.values.password}
                            onChange={formik.handleChange} />
                        <br />
                        <br />
                        <TextField
                            name="confirmPassword"
                            label="Confirm Password"
                            fullWidth type="password"
                            error={formik.errors.confirmPassword ? true : false}
                            helperText={formik.errors.confirmPassword}
                            value={formik.values.confirmPassword}
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