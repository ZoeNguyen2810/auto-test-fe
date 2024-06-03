import React from 'react'
import { useGlobalContext } from '../../../Context'
import { LoginOutlined } from '@ant-design/icons'

const IconLogout: React.FC = () => {
    const { setIsLogged , isLogged} = useGlobalContext()
    const handleLogout = () => {
        if ( isLogged === true) {
        setIsLogged(false)
        }
    }
    return (
        <div  onClick={handleLogout}>
            <LoginOutlined /> LogOut
        </div>
    )
}

export default IconLogout
