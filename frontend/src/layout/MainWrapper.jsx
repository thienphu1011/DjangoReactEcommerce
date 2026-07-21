import {useState, useEffect} from 'react'
import {setUser} from '../utils/auth'

const MainWrapper = ({children}) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const handler = async () => {
            setLoading(true);

        }
        await setUser()
        setLoading(false);

    })
    handler();
}

export default MainWrapper