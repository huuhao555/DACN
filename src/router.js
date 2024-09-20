import {Route, Routes} from 'react-router-dom'
import { ROUTERS } from "./utils/router";
import HomePage from './pages/users/homePage';
import MasterLayout from './pages/users/theme/masterLayout';
import ProfilePage from './pages/users/profilePage';

const renderUserRouter = () =>{
    const userRouter = [
        { 
            path: ROUTERS.USER.HOME,
            component: <HomePage/>
        },
        { 
            path: ROUTERS.USER.PRODUCTS,
            component: <ProfilePage/>
        },
    ]

    return (
        <MasterLayout>
            <Routes>
            {
                userRouter.map((item, key) => ( 
                <Route key= {key} path={item.path} element={item.component}/>
                ))
            }
        </Routes>
        </MasterLayout>
    )
}
const RouterCustom = () =>{
    return renderUserRouter();
}

export default RouterCustom