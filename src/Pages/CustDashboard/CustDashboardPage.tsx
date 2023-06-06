import { useEffect, useState } from 'react';
import '../../assets/styles/custDashboardStyles/CustDashboardPage.scss';
import { useAppDispatch } from '../../store';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { StoreInit } from './CustomerInitialState';
import { addToViewCount, getPublishedStores } from '../../Redux/Templates/ProjectActions';
import { AuthLoader } from '../../components/authComponents/AuthLoader';

export const CustDashboardPage: React.FC = () => {

    const [stores, setStores ] = useState([StoreInit]);
    const [loader, setLoader] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const getStores = async () => {
        try {
            const response = await dispatch(getPublishedStores());
            if (response) setStores(response.payload.data)    
            setLoader(false);        
        } catch (error) {
            setLoader(false);
            toast.error("Error Retrieving Storefront Stores")
            return;
        }
    }

    useEffect(() => {
        setLoader(true);
        getStores();
    },[]);


    const handleAddToViews = async (id: string) => {
        try {
            await dispatch(addToViewCount(id));
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className='customer-dashboard-page'>
            {
                stores && stores.length ?
                <h1 className='customer-dashboard-header'><p className='customer-header-text'>Stores</p></h1> :
                <h1 className='customer-dashboard-header'>Check soon for stores</h1>
            }
            <div className='store-display'>
                {
                    stores && stores.length ? 
                    stores.map((pStore, index: number)=>
                    <div onClick={() => handleAddToViews(pStore.id)} style={{border: `5px solid rgb(${Math.floor(Math.random() * 254)}, ${Math.floor(Math.random() * 254)}, ${Math.floor(Math.random() * 254)})`, backgroundImage: `url(${pStore.bannerUrl})`}} className='store-object' key={index}>
                        <Link to="/stores/ecommerce" state={{linkedProject: pStore}}><p className='visit-store'>Visit Store</p></Link>
                        <div className='object-details'>
                            <p><b>Store: </b> {pStore.name}</p>
                            <p><b>Category: </b> {pStore.category}</p>
                        </div>
                    </div>) 
                    : ""
                }
            </div>
            {loader && <AuthLoader />}
        </div>
    )
}