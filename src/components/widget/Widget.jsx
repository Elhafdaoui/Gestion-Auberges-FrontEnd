import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Widget = ({ type }) => {
  const[clients,setClients]= useState({})
  const[charges,setCharges]=useState({})
  const[reservations,setReservations]=useState({})
  const[consommations,setConsommations]=useState({})
  const[produits,setProduits]=useState({})
//-------------------------------------------------------------
//Clients
  useEffect(()=>{
    fetch("http://localhost:8080/dashboard/clients").then(resp=>{
      resp.json().then(r=>{
        setClients(r)
      })
    })
  },[])

  let totalRecettes=0;
  Array.from(clients).forEach(client=>{
    var recetteSansText=parseInt(client.total.replace(/\D/g,""))
    totalRecettes+=recetteSansText
  })
//--------------------------------------------------------------------------------
//Charges
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/charges").then(resp=>{
    resp.json().then(r=>{
      setCharges(r)
    })
  })
},[])

let montantCharges=0;
Array.from(charges).forEach(charge=>{
  var chargeSansText=parseInt(charge.montant.replace(/\D/g,""))
  montantCharges+=chargeSansText
})

//-----------------------------------------------------------------------------------------
//Réservations
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/reservations").then(resp=>{
    resp.json().then(r=>{
      setReservations(r)
    })
  })
},[])

let recetteReservations=0;
Array.from(reservations).forEach(reservation=>{
  var chargeSansText=parseInt(reservation.recette.replace(/\D/g,""))
  recetteReservations+=chargeSansText
})

//--------------------------------------------------------------------------------------------
//Consommations
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/consommations").then(resp=>{
    resp.json().then(r=>{
      setConsommations(r)
    })
  })
},[])

let recetteConsommations=0;
Array.from(consommations).forEach(consommation=>{
  var chargeSansText=parseInt(consommation.recette.replace(/\D/g,""))
  recetteConsommations+=chargeSansText
})

//----------------------------------------------------------------------------------------------------
//Produit (on veut ajouter son prix d'achat au charges)
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/stock").then(resp=>{
    resp.json().then(r=>{
      setProduits(r)
    })
  })
},[])

let prixProduits=0;
Array.from(produits).forEach(produit=>{
  var chargeSansText=parseInt(produit.prix.replace(/\D/g,""))
  prixProduits+=chargeSansText
})

//----------------------------------------------------------------------------------------------------


//total des charges :
let totalCharges=prixProduits+montantCharges



var data
  //temporary
  switch (type) {
    case "user":
      data = {
        title: "Clients",
        isClients:true,
        link: "Recette clients",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "Charges",
        isCharges:true,
        link: "Total des charges",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "Chambres",
        isReservations:true,
        link: "Recette chambres",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "Consommations",
        link: "Recette consommations",
        isConsommations:true,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

//------------------------------------------------------------------------------------------------------------


  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
           {data.isClients===true?totalRecettes +" DH"  :""}
           {data.isCharges===true?totalCharges + " DH"  :""}
           {data.isReservations===true?recetteReservations + " DH"  :""}
           {data.isConsommations===true?recetteConsommations + " DH"  :""}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          {data.isClients===true || data.isReservations===true || data.isConsommations===true?<KeyboardArrowUpIcon/>:""}
          {data.isCharges===true?<KeyboardArrowDownIcon style={{color:"red"}}/>:""}
        </div>
        {data.icon}
      </div>
    </div>
    
  );
};

//-----------------------------------------------------------------------------------------
export default Widget;
