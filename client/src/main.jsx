import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SignIn, SignUp } from "@clerk/clerk-react";
import Home from './pages/Home';
import Personal from './pages/Personal';
import Profile from './pages/Profile';
import RootLayout from './layouts/root-layout';
import IndexPage from './pages';

const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{ path: "/", element: <IndexPage /> },
			{ path: "/Profile", element: <Profile /> },
			{ path: "/sign-in/*", element: <SignIn /> },
			{ path: "/sign-up/*", element: <SignUp /> },
			{ path: "/Personal", element: <Personal />},
			{ path: "/Home", element: <Home /> }
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
