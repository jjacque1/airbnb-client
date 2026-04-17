import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"


export default function ProfilePage(){

    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    async function handleLogout(){
        await logout()
        return (
            navigate("/login")
        )
    }

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
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}