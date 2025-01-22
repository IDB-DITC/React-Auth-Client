import { Box } from '@mui/system';
import { useIsAuthenticated, useAuthUser, useSignOut } from 'react-auth-kit'
import { Link } from 'react-router-dom';





export default function AppHeader() {

    const authUser = useAuthUser();
    const signOut = useSignOut();
    const isAuthenticated = useIsAuthenticated();




    if (isAuthenticated()) {
        return (
            <Box component="nav">
                <Link to='/'>Index</Link>
                <Link to='/create'>Create</Link>

                <a className="right" onClick={() => signOut()}>Logout</a>
                <a className="right" >
                    {`Hello ${authUser()?.name}`}                   
                </a>
               

            </Box>
        );
    }
    else {
        return (
            <Box component="nav">
               
                <Link className="right" to='/login'>Login</Link>
                <Link className="right" to='/register'>Register</Link>

            </Box>
       );
    }
    


}