import {FaHome} from 'react-icons/fa'
import { useNavigate, useLocation } from 'react-router-dom'

const DashFooter = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    
    const onGoHomeClicked = () => navigate('/dash')
    
    let goHomeButton = null
  return (
    <footer className='dash-footer'>
        {pathname !== '/dash' ? (
            <button className="dash-footer__button icon-button"
                title='Home'
                onClick={onGoHomeClicked}
            >
                <FaHome/>
            </button>
        ): null}
        <p>Current User:</p>      
        <p>Status:</p>
    </footer>
  )
}

export default DashFooter
