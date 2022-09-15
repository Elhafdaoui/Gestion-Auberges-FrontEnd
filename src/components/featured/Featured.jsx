import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState, useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Featured = () => {
  const { dispatch } = useContext(DarkModeContext);

  const [recetteReservations,setRecetteReservations]=useState({})
  const [recetteConsommations,setRecetteConsommations]=useState({})
  //charges
  const[charges,setCharges]=useState({})
  const [recetteProduits, setRecetteProduits] = useState({})
  //----------------------------------------------------------------------
  const [recetteActivites, setrecetteActivites] = useState({})


  //la date actuelle
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'/'+mm+'/'+yyyy;

  var todayMonth=today.slice(4,5)
//-----------------------------------------------------------------------------------


//Reservation------------------------------------------------------------------------------------------
  useEffect(()=>{
    fetch("http://localhost:8080/dashboard/reservations").then(resp=>{
      resp.json().then(r=>{
          setRecetteReservations(r)
      })
    })
  },[])
//-------------------------------------------------------------------------------------
//Consommation
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/consommations").then(resp=>{
    resp.json().then(r=>{
        setRecetteConsommations(r)
    })
  })
},[])
//-------------------------------------------------------------------------------------
//Stock  --> Charge1
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/stock").then(resp=>{
    resp.json().then(r=>{
        setRecetteProduits(r)
    })
  })
},[])
//-------------------------------------------------------------------------------------
//Charges
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/charges").then(resp=>{
    resp.json().then(r=>{
      setCharges(r)
    })
  })
},[])
//-------------------------------------------------------------------------------------
//Activites
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/activites").then(resp=>{
    resp.json().then(r=>{
      setrecetteActivites(r)
    })
  })
},[])



//recette Consommation
let totalConsommationJour=0;
Array.from(recetteConsommations).map(recetteConsommation=>{
  var recetteSansText=parseInt(recetteConsommation.prix.replace(/\D/g,""))
  if(recetteConsommation.date===today)
  totalConsommationJour+=recetteSansText  //totalReservationJour :
})
//-------------------------------------------------------------------------------------

//Recette Reservation
let totalReservationJour=0;
Array.from(recetteReservations).map(recetteReservation=>{
  var recetteSansText=parseInt(recetteReservation.montant.replace(/\D/g,""))
  if(recetteReservation.dateReservation===today)
    totalReservationJour+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//charge produit
let totalChargeProduitJour=0;
Array.from(recetteProduits).map(recetteProduit=>{
  var recetteSansText=parseInt(recetteProduit.prix.replace(/\D/g,""))
  if(recetteProduit.dateImport===today)
    totalChargeProduitJour+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//charge
let montantCharge=0
Array.from(charges).map(charge=>{
  var recetteSansText=parseInt(charge.montant.replace(/\D/g,""))
  if(charge.dateFacturation===today)
  montantCharge+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//Activite
let montantActivite=0
Array.from(recetteActivites).map(activite=>{
  var recetteSansText=parseInt(activite.recette.replace(/\D/g,""))
  if(activite.date===today)
  montantActivite+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//-------------------------------------------------------------------------
        // Recette Total du jour = Somme Recettes - total Charges


const totalCharges=montantCharge+totalChargeProduitJour //Somme Charges
const totalRecettes=montantActivite+totalReservationJour+totalConsommationJour // Somme Recettes
//total
const total=totalRecettes-totalCharges

//Fixer un sueil( but | Objectif) pour le pourcentage
const seuil=5000;

//La moyenne = total/seuil

const moyenne=total/seuil*100;

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Résumé</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={moyenne} text={moyenne+"%"} strokeWidth={5} />
        </div>
        <p className="title">Recette du jour</p>
        <p className="amount">{total} DH</p>
        <p className="desc">
          Certaines transactions sont en cours. Les dernières paiements peuvent ne pas être inclus.
        </p>
        {/* <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">12.4k MAD</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">12.4k MAD</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">12.4k MAD</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Featured;
