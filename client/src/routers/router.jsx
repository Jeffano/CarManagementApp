import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import App from "../App.jsx"
import Home from "../home/Home.jsx"
import Collection from "../collection/Collection.jsx"
import List from "../list/List.jsx"
import Account from "../account/Account.jsx"
import SignUp from "../components/SignUp.jsx"
import SignIn from "../components/SignIn.jsx"
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/collection",
                element: <PrivateRoute><Collection/></PrivateRoute>,
            },
            {
                path: "/list",
                element: <PrivateRoute><List/></PrivateRoute>,
            },
            {
                path: "/account",
                element: <PrivateRoute><Account/></PrivateRoute>,
            },
            {
                path: "/sign-up",
                element: <SignUp/>,
            },
            {
                path: "/sign-in",
                element: <SignIn/>,
            }
        ]
    },
])

export default router;