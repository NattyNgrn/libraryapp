import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

export default function AdminUsers() {
    const { user, isLoaded } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !user.id) {
            navigate("/sign-in")
        } else if (isLoaded && user.id && user.publicMetadata?.role !== 'admin') {
            navigate("/home");
        }
    }, [isLoaded, navigate, user]);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!isLoaded) return;
        fetch("http://localhost:8219/getusers")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch((error) => console.log(error));
    }, [isLoaded]);

    const deleteUser = (user) => {
        fetch(`http://localhost:8219/deleteuser/${user.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        window.location.reload();
    };
    const makeAdmin = (user) => {
        fetch(`http://localhost:8219/makeadmin/${user.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        window.location.reload();
    }

    return (
        <div>
            <h1 className="text-4xl">Admin Users</h1>
            <div className="flex flex-row justify-between p-4 border-b-2"></div>
            <table className='width-100'>
                <thead>
                <tr className="flex flex-row justify-between p-4 border-b-2">
                    <th className="py-2">ID</th>
                    <th className="py-2">First Name</th>
                    <th className="py-2">Last Name</th>
                    <th className="py-2">Role</th>
                    <th className="py-2">Delete</th>
                    <th className="py-2">Make Admin</th>
                </tr>
                </thead>
                <tbody>
                { users.map((user) =>
                    <tr key={user.id} className="flex flex-row justify-between p-4 border-b-2">
                        <td className="py-2">{user.id}</td>
                        <td className="py-2">{user.first_name}</td>
                        <td className="py-2">{user.last_name}</td>
                        <td className="py-2">{user.public_metadata?.role === "admin" ? "Admin" : "User"}</td>
                        <td className="py-2"><button
                            className='hover:bg-red-300 p-px px-2 rounded mx-2 bg-purple-100 text-base'
                            onClick={() => deleteUser(user)}>
                                Delete
                        </button></td>
                        <td className="py-2">{
                            user.public_metadata?.role !== "admin"
                            && <button 
                                className='hover:bg-red-300 p-px px-2 rounded mx-2 bg-red-200 text-base'
                                onClick={() => makeAdmin(user)}>
                                    Make Admin
                            </button>
                        }</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );

}


//<table className="w-full">
    {/* <thead>
        <tr className="border-b">
            <th className="py-2">ID</th>
            <th className="py-2">First Name</th>
            <th className="py-2">Last Name</th>
            <th className="py-2">Role</th>
            <th className="py-2">Delete</th>
            <th className="py-2">Make Admin</th>
        </tr>
    </thead>
    <tbody>
        {users.map((user) => (
            <tr key={user.id} className="border-b">
                <td className="py-2">{user.id}</td>
                <td className="py-2">{user.first_name}</td>
                <td className="py-2">{user.last_name}</td>
                <td className="py-2">{user.public_metadata?.role === "admin" ? "Admin" : "User"}</td>
                <td className="py-2">
                    <button onClick={() => deleteUser(user)}>Delete</button>
                </td>
                {user.public_metadata?.role !== "admin" && (
                    <td className="py-2">
                        <button onClick={() => makeAdmin(user)}>Make Admin</button>
                    </td>
                )}
            </tr>
        ))}
    </tbody>
</table> */}
