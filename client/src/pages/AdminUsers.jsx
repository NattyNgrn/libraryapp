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

    return ( // table from flowbite
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        First Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Last Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Delete</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Make Admin</span>
                    </th>
                </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4">
                        {user.id}
                    </td>
                    <td className="px-6 py-4">
                        {user.first_name}
                    </td>
                    <td className="px-6 py-4">
                        {user.last_name}
                    </td>
                    <td className="px-6 py-4">
                        {user.public_metadata?.role === "admin" ? "Admin" : "User"}
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button
                            className='hover:bg-red-300 p-px px-2 rounded mx-2 bg-purple-100 text-base'
                            onClick={() => deleteUser(user)}>
                            Delete
                        </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button
                            className='hover:bg-red-300 p-px px-2 rounded mx-2 bg-purple-100 text-base'
                            onClick={() => makeAdmin(user)}>
                            Make Admin
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    );

}
