import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home';
import Personal from './pages/Personal';

import RootLayout from './layouts/root-layout';
import IndexPage from './pages';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{ path: "/", element: <IndexPage /> },
			{ path: "/Personal", element: <Personal />},
			{ path: "/Home", element: <Home /> },
			{ path: "/sign-in/*", element: <SignIn />},
			{ path: "/sign-up/*", element: <SignUp />},
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
