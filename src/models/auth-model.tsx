
import * as Yup from 'yup'



export class RegisterModel
{
    userName!: string;
    email!: string;
    password!: string;
    confirmPassword!: string;
}
export class LoginModel {
    userName!: string;
    password!: string;
}


export const RegisterValidation = Yup.object<RegisterModel>().shape({
    userName: Yup.string().required().min(3).max(50).label("User Name"),
    email: Yup.string().email().required().min(6).max(50).label("Email"),
    password: Yup.string().required().min(4).max(50).label("Password"),
    confirmPassword: Yup.string().required().min(4).max(50).oneOf([Yup.ref('password')], 'Passwords must match').label("Confirm Password"),
})
export const LoginValidation = Yup.object<LoginModel>().shape({
    userName: Yup.string().required().min(3).max(50),
    password: Yup.string().required().min(4).max(50)
})