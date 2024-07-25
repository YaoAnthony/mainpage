//router
import { NavLink } from 'react-router-dom';
//icon
import { logo } from '../../Assets';

 // This component is the logo of the website
 const LOGO = () => (
    <NavLink 
        to="/"
        className="flex flex-col items-end">
        <img src={logo} alt="Logo" className="h-16 w-40" />  
        {/* <span className="font-bold text-sm -translate-y-2 ">Vega Vega</span> */}
    </NavLink>
)

export default LOGO;