import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
//import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
//import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate=useNavigate()
  const { dispatch } = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">Auberge</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>

          <p className="title">LISTS</p>
          <Link to="/dashboard/clients" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Clients</span>
            </li>
          </Link>

          <Link to="/dashboard/reservations" style={{textDecoration:"none"}}>
            <li>
                <HotelOutlinedIcon className="icon" />
                <span>Réservations</span>
              </li>
            </Link>
            <Link to="/dashboard/consommations" style={{textDecoration:"none"}}>
            <li>
                <FastfoodIcon className="icon" />
                <span>Consommations</span>
              </li>
            </Link>

          <Link to="/dashboard/stock" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Stocks</span>
            </li>
          </Link>

          <Link to="/dashboard/activites" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Activités</span>
          </li>
          </Link>

          <Link to="/dashboard/restaurants" style={{ textDecoration: "none" }}>
          <li>
            <RestaurantOutlinedIcon className="icon" />
            <span>Restaurants</span>
          </li>
          </Link>
          {
            /*
          <li>
            <AssignmentIndOutlinedIcon className="icon" />
            <span>Employés</span>
          </li>
          */
          }
           <Link to="/dashboard/charges" style={{ textDecoration: "none" }}>
          <li>
            <TipsAndUpdatesOutlinedIcon className="icon" />
            <span>Dépenses  {/* Charges fixes au paravant */} </span>
          </li>
          </Link>
          <Link to="/dashboard/recettes" style={{ textDecoration: "none" }}>
          <li>
            <CurrencyExchangeIcon className="icon" />
            <span>Bilan</span> {/*Donnée par Les recettes datable ... Tout ce qui est fichiers recette est bilan*/}
          </li>
          </Link>
          <p className="title">USEFUL</p>
          <Link to="/dashboard">
          <li>
            <InsertChartIcon className="icon" />
            <span >Stats</span>
          </li>     
          </Link>
               
          <p className="title">USER</p>
          {currentUser.roles==="admin"?
          <li>
          <AccountCircleOutlinedIcon className="icon" />
          <Link to="/dashboard/users">
            <span>Utilisateurs</span>
          </Link>            
        </li>:""}
          
          <li>
            <ExitToAppIcon className="icon" />
            <Link to="/">
            <span onClick={()=>{
              localStorage.removeItem('user')
              navigate("/")
              window.location.reload()
            }}>Déconnexion</span>
            </Link>
          </li>
        </ul>
      </div>

      <p className="mode">MODE</p>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
