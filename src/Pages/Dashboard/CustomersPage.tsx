import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Order, Project, OrderInit } from "../CustDashboard/CustomerInitialState";
import { useAppDispatch } from "../../store";
import { getStores } from "../../Redux/Templates/ProjectActions";
import '../../assets/styles/dashboardStyles/DashboardPage.scss'
import { Close } from "grommet-icons";
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdEmail } from "react-icons/md";
import { BiPhone } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { BsPersonCircle } from "react-icons/bs";

export const CustomersPage: React.FC = () => {
    const [loader, setLoader] = useState<boolean>(false);
    const [custOrderHistory, setcustOrderHistory] = useState([OrderInit]);
    const [trackOrders, setTrachOrders] = useState([OrderInit]);
    const [custId, setcustId] = useState("");
    const [custModalDisplay, setcustModalDisplay] = useState("none");
    const [customers, setCustomers] = useState([])


    const dispatch = useAppDispatch();

    const getAllStores = async () => {
        try {
            const response = await dispatch(getStores());
            if (response) {
                if (response.payload.data) {
                    const store = response.payload.data;

                    const AllOrders = store.projects.map((project: Project) => project.orders);
                    setTrachOrders(AllOrders.flat())
                    setCustomers(Array.from(new Set(store.customers)));
                }
                setTimeout(()=>{
                    setLoader(false);
                }, 500)
            }
        } catch (error) {
            setLoader(false);
            console.log(error)
            toast.error("Error Retrieving Storefront Stores")
            return;
        }
    }
    useEffect(() => {
        setLoader(true);
        getAllStores();
    },[]);


    const handleOpenModal = () => {
        setcustOrderHistory([])
        setcustModalDisplay(custModalDisplay === 'none' ? 'flex' : "none")
    }
    
    const handleOpenModalwithCust = (id: string) => {
        setcustId(id);
        handleOpenModal();
        setLoader(true);
        setTimeout(() => {
            setcustId(id);
            setcustOrderHistory(trackOrders.filter(item => item.userId === id))
            setLoader(false)
        }, 500)
        console.log(trackOrders)
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "Order ID", width: 300 },
        { field: "orderDate", headerName: "Order Date", width: 95 },
        { field: "orderAmount", headerName: "Amount", width: 95 },
        { field: "orderPaid", headerName: "Payment", width: 80 },
        { field: "deliveryLevel", headerName: "Delivery Level", width: 150, editable: true},
        { field: "deliveryComplete", headerName: "Delivered", width: 120 },
        { field: "shippingAddress", headerName: "Shipping Address", width: 150},
        { field: "shippingContact", headerName: "Shipping Contact", width: 180},
        { field: "products", headerName: "Items", width: 500},
    ]

    const row = (order: Order) => {
        return { id: order.id, orderDate: new Date(order.created_at).toLocaleDateString(), orderAmount: order.amount, orderPaid: order.paid ? "Paid" : "Not Paid", deliveryLevel: getdeliveryLevel(order.delivery_level_reached), deliveryComplete: order.delivery_completed ? "Yes" : "No", shippingAddress: order.shipping_reciepient_address, shippingContact: order.shipping_reciepient_contacts, products: JSON.parse(order.products || "[]")}
    }

    const getdeliveryLevel = (value?: string) => {
        switch (value) {
            case "L_ONE":
                return "1/5 starting";
                break;
            case "L_TWO":
                return "2/5 moved";
                break;
            case "L_THREE":
                return "3/5 halfway";
                break;
            case "L_FOUR":
                return "4/5 almost";
                break;
            case "L_FIVE":
                return "5/5 completed";
                break;
            default:
                return "1/5 start";
        }
    }

    const rows = custOrderHistory[0]?.id ? custOrderHistory.map((order: Order) => row(order))
        :   []

    return (
        <div className="customers-page-container">
            <h2 className="cust-container-title">{ customers.length ? "Customers" : "You have no customers. Create more exciting Stores to attract customers" }</h2>
            {
                customers.length ? 
                    customers.map((customer, _index) => 
                        <div className="custcard">
                            <div className="custcard-border-top"></div>
                            <div>
                                <div className="img"></div>
                                <span className="spanna"> <BsPersonCircle /> <br /> { JSON.parse(customer).first_name + " " + JSON.parse(customer).last_name}</span>
                                <p className="job"> <MdEmail />{ JSON.parse(customer).email || "--"}</p>
                                <p className="job"> <BiPhone /> { JSON.parse(customer).contact || "--"}</p>
                                <p className="job"><GrLocation /> { JSON.parse(customer).address || "--"}</p>
                                <button onClick={() => handleOpenModalwithCust(JSON.parse(customer).id)}>See more...</button>
                            </div>
                        </div>
                    )
                : ""
            }
            <div style={{display: `${custModalDisplay}`}} className="customer-modal-customer">
                <div className="modal-source">
                    <h3>Customer Order History (id: {custId})</h3>
                    <div className="item-display">
                        <DataGrid style={{width: "91%", height: "70%", borderTop: "4px solid red"}}
                            rows={rows}
                            isCellEditable={() => true}
                            columns={columns}
                            initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                            }}
                            pageSizeOptions={[4, 5, 8, 10]}
                            checkboxSelection
                        />
                    </div>
                    {loader && <CircularProgress className="loader" />}
                    <Close onClick={handleOpenModal} className="modal-close"/>
                </div>
            </div>
            
        </div>
    )
}