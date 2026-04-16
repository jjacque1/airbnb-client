import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"


export default function ProfilePage(){

    const { user } = useContext(AuthContext)

    if(!user){
        return <p>Loading profile...</p>
    }

    return (
        <div>
            <header>
                <h1>Welcome {user.fullName}</h1>
            </header>
            <div>
                <p>Email: {user.email}</p>
            </div>
        </div>
    )
}