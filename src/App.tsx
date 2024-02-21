import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";


function App() {
	const router = createBrowserRouter([
		{
			path: "*",
			element: <NotFound />,
		},
		{
			path: "/404",
			element: <NotFound />,
		},
		{
			path: "/",
			element: <Home />,
		},
		// TODO: for future reference
		// {
		// 	path: "/",
		// 	element: <PrivateRoute />,
		// 	children: [
		// 		{
		// 			path: "/profile",
		// 			element: <Profile />,
		// 		},
		// 		{
		// 			path: "/",
		// 			element: <RoleChecker allowedRoles={[Roles.ADMIN]} />,
		// 			children: [
		// 				{
		// 					path: "/payment-status",
		// 					element: <Admin />,
		// 				},
		// 			],
		// 		},
		// 	],
		// },
	]);
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
