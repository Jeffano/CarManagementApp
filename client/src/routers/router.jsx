import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import App from "../App.jsx"
import Home from "../home/Home.jsx"
import Collection from "../collection/Collection.jsx"
import List from "../list/List.jsx"
import Account from "../account/Account.jsx"

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
                element: <Collection/>,
            },
            {
                path: "/list",
                element: <List/>,
            },
            {
                path: "/account",
                element: <Account/>,
            },
        ]
    },
])

export default router;