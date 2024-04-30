import { SignIn } from '@clerk/clerk-react';


function Login(){
    return(
        <div>
            Hello!
            <SignIn 
            redirectTo="/Home"
            onSignIn={(user) => console.log('User signed in:', user)}
            />
        </div>
    )
}

export default Login;