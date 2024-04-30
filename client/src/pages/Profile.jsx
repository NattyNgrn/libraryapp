import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function Profile(){

    return (
        <div>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <h1>Profile</h1>
        </div>
    )
}

export default Profile; 