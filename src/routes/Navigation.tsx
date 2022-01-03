import { Suspense } from 'react';
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import logo from '../logo.svg';
import { routes } from './routes';

export const Navigation = () => {
    return (
        <Suspense fallback={null}>
            <BrowserRouter>
                <div className='main-layout'>
                    <nav>
                        <img src={ logo } alt='React logo'></img>

                        <ul>
                            {/*TODO: crear navLink dinamicos */}
                            {
                                routes.map(route => {
                                    return  <li key={ route.to }>
                                                <NavLink 
                                                    to={ route.to }
                                                    className={ ({ isActive }) => isActive ? 'nav-active' : '' }>
                                                        { route.name }
                                                </NavLink>
                                            </li> 
                                })
                            }
                        </ul>
                    </nav>

                    <Routes>
                        {
                            routes.map(route => {
                                return  <Route
                                            key={route.to}
                                            path={route.path}
                                            element={ <route.Component/> }
                                        />
                            })
                        }  

                        <Route path="/*" element={ <Navigate to={ routes[0].to } replace /> } />
                    </Routes>

                </div>
            </BrowserRouter>
        </Suspense>
    )
}
