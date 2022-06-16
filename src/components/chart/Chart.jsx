import "./chart.scss";
import { useState,useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const Chart = ({ aspect, title }) => {

  const [valeurs,setValeurs]=useState()

  //Janvier
  const [recetteReservationsJanvier,setRecetteReservationsJanvier]=useState({})
  const [recetteConsommationsJanvier,setRecetteConsommationsJanvier]=useState({})
  //charges
  const[chargesJanvier,setChargesJanvier]=useState({})
  const [recetteProduitsJanvier, setRecetteProduitsJanvier] = useState({})
  //----------------------------------------------------------------------
  const [recetteActivitesJanvier, setrecetteActivitesJanvier] = useState({})

  //Février
  const [recetteReservationsFevrier,setRecetteReservationsFevrier]=useState({})
  const [recetteConsommationsFevrier,setRecetteConsommationsFevrier]=useState({})
  //charges
  const[chargesFevrier,setChargesFevrier]=useState({})
  const [recetteProduitsFevrier, setRecetteProduitsFevrier] = useState({})
  //----------------------------------------------------------------------
  const [recetteActivitesFevrier, setrecetteActivitesFevrier] = useState({})


//Mars
const [recetteReservationsMars,setRecetteReservationsMars]=useState({})
const [recetteConsommationsMars,setRecetteConsommationsMars]=useState({})
//charges
const[chargesMars,setChargesMars]=useState({})
const [recetteProduitsMars, setRecetteProduitsMars] = useState({})
//----------------------------------------------------------------------
const [recetteActivitesMars, setrecetteActivitesMars] = useState({})


//Avril
const [recetteReservationsAvril,setRecetteReservationsAvril]=useState({})
const [recetteConsommationsAvril,setRecetteConsommationsAvril]=useState({})
//charges
const[chargesAvril,setChargesAvril]=useState({})
const [recetteProduitsAvril, setRecetteProduitsAvril] = useState({})
//----------------------------------------------------------------------
const [recetteActivitesAvril, setrecetteActivitesAvril] = useState({})




//Mai
const [recetteReservationsMai,setRecetteReservationsMai]=useState({})
const [recetteConsommationsMai,setRecetteConsommationsMai]=useState({})
//charges
const[chargesMai,setChargesMai]=useState({})
const [recetteProduitsMai, setRecetteProduitsMai] = useState({})
//----------------------------------------------------------------------
const [recetteActivitesMai, setrecetteActivitesMai] = useState({})




//Juin
const [recetteReservationsJuin,setRecetteReservationsJuin]=useState({})
const [recetteConsommationsJuin,setRecetteConsommationsJuin]=useState({})
//charges
const[chargesJuin,setChargesJuin]=useState({})
const [recetteProduitsJuin, setRecetteProduitsJuin] = useState({})
//----------------------------------------------------------------------
const [recetteActivitesJuin, setrecetteActivitesJuin] = useState({})





  //la date actuelle
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'/'+mm+'/'+yyyy;
  //console.log(today)
  var todayMonth=today.slice(4,5)
  //console.log(today.charAt(4))
//-----------------------------------------------------------------------------------


          //Janvier
//Reservation------------------------------------------------------------------------------------------
  useEffect(()=>{
    fetch("http://localhost:8080/dashboard/reservations").then(resp=>{
      resp.json().then(r=>{
          setRecetteReservationsJanvier(r)
      })
    })
  },[])
//-------------------------------------------------------------------------------------
//Consommation
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/consommations").then(resp=>{
    resp.json().then(r=>{
        setRecetteConsommationsJanvier(r)
    })
  })
},[])
//-------------------------------------------------------------------------------------
//Stock  --> Charge1
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/stock").then(resp=>{
    resp.json().then(r=>{
        setRecetteProduitsJanvier(r)
    })
  })
},[])
//-------------------------------------------------------------------------------------
//Charges
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/charges").then(resp=>{
    resp.json().then(r=>{
      setChargesJanvier(r)
    })
  })
},[])
//-------------------------------------------------------------------------------------
//Activites
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/activites").then(resp=>{
    resp.json().then(r=>{
      setrecetteActivitesJanvier(r)
    })
  })
},[])


//recette Consommation
let totalConsommationJanvier=0;
Array.from(recetteConsommationsJanvier).map(recetteConsommation=>{
  var recetteSansText=parseInt(recetteConsommation.prix.replace(/\D/g,""))
  if(recetteConsommation.date.slice(4,5)==="1")
  totalConsommationJanvier+=recetteSansText  //totalReservationJour :
})
//-------------------------------------------------------------------------------------

//Recette Reservation
let totalReservationJanvier=0;
Array.from(recetteReservationsJanvier).map(recetteReservation=>{
  var recetteSansText=parseInt(recetteReservation.montant.replace(/\D/g,""))
  if(recetteReservation.dateReservation.slice(4,5)==="1")
  totalReservationJanvier+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//charge produit
let totalChargeProduitJanvier=0;
Array.from(recetteProduitsJanvier).map(recetteProduit=>{
  var recetteSansText=parseInt(recetteProduit.prix.replace(/\D/g,""))
  if(recetteProduit.dateImport.slice(4,5)==="1")
  totalChargeProduitJanvier+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//charge
let montantChargeJanvier=0
Array.from(chargesJanvier).map(charge=>{
  var recetteSansText=parseInt(charge.montant.replace(/\D/g,""))
  if(charge.dateFacturation.slice(4,5)==="1")
  montantChargeJanvier+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//Activite
let montantActiviteJanvier=0
Array.from(recetteActivitesJanvier).map(activite=>{
  //console.log(activite)
  var recetteSansText=parseInt(activite.recette.replace(/\D/g,""))
  if(activite.date.slice(4,5)==="1")
  montantActiviteJanvier+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//-------------------------------------------------------------------------
        // Recette Total du jour = Somme Recettes - total Charges


const totalChargesJanvier=montantChargeJanvier+totalChargeProduitJanvier //Somme Charges
const totalRecettesJanvier=montantActiviteJanvier+totalReservationJanvier+totalConsommationJanvier // Somme Recettes
//total
const totalJanvier=totalRecettesJanvier-totalChargesJanvier //Janvier
  



 //Février 
//Reservation------------------------------------------------------------------------------------------
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/reservations").then(resp=>{
    resp.json().then(r=>{
        setRecetteReservationsFevrier(r)
    })
  })
},[])
//-------------------------------------------------------------------------------------
//Consommation
useEffect(()=>{
fetch("http://localhost:8080/dashboard/consommations").then(resp=>{
  resp.json().then(r=>{
      setRecetteConsommationsFevrier(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Stock  --> Charge1
useEffect(()=>{
fetch("http://localhost:8080/dashboard/stock").then(resp=>{
  resp.json().then(r=>{
      setRecetteProduitsFevrier(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Charges
useEffect(()=>{
fetch("http://localhost:8080/dashboard/charges").then(resp=>{
  resp.json().then(r=>{
    setChargesFevrier(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Activites
useEffect(()=>{
fetch("http://localhost:8080/dashboard/activites").then(resp=>{
  resp.json().then(r=>{
    setrecetteActivitesFevrier(r)
  })
})
},[])


//recette Consommation
let totalConsommationFevrier=0;
Array.from(recetteConsommationsFevrier).map(recetteConsommation=>{
var recetteSansText=parseInt(recetteConsommation.prix.replace(/\D/g,""))
if(recetteConsommation.date.slice(4,5)==="2")
totalConsommationFevrier+=recetteSansText  //totalReservationJour :
})
//-------------------------------------------------------------------------------------

//Recette Reservation
let totalReservationFevrier=0;
Array.from(recetteReservationsFevrier).map(recetteReservation=>{
var recetteSansText=parseInt(recetteReservation.montant.replace(/\D/g,""))
if(recetteReservation.dateReservation.slice(4,5)==="2")
  totalReservationFevrier+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//charge produit
let totalChargeProduitFevrier=0;
Array.from(recetteProduitsFevrier).map(recetteProduit=>{
var recetteSansText=parseInt(recetteProduit.prix.replace(/\D/g,""))
if(recetteProduit.dateImport.slice(4,5)==="2")
  totalChargeProduitFevrier+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//charge
let montantChargeFevrier=0
Array.from(chargesFevrier).map(charge=>{
var recetteSansText=parseInt(charge.montant.replace(/\D/g,""))
if(charge.dateFacturation.slice(4,5)==="2")
  montantChargeFevrier+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//Activite
let montantActiviteFevrier=0
Array.from(recetteActivitesFevrier).map(activite=>{
var recetteSansText=parseInt(activite.recette.replace(/\D/g,""))
if(activite.date.slice(4,5)==="2")
  montantActiviteFevrier+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//-------------------------------------------------------------------------
      // Recette Total du jour = Somme Recettes - total Charges


const totalChargesFevrier=montantChargeFevrier+totalChargeProduitFevrier //Somme Charges
const totalRecettesFevrier=montantActiviteFevrier+totalReservationFevrier+totalConsommationFevrier // Somme Recettes
//total
const totalFevrier=totalRecettesFevrier-totalChargesFevrier //Fevrier




//Mars
//Reservation------------------------------------------------------------------------------------------
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/reservations").then(resp=>{
    resp.json().then(r=>{
        setRecetteReservationsMars(r)
    })
  })
},[])
//-------------------------------------------------------------------------------------
//Consommation
useEffect(()=>{
fetch("http://localhost:8080/dashboard/consommations").then(resp=>{
  resp.json().then(r=>{
      setRecetteConsommationsMars(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Stock  --> Charge1
useEffect(()=>{
fetch("http://localhost:8080/dashboard/stock").then(resp=>{
  resp.json().then(r=>{
      setRecetteProduitsMars(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Charges
useEffect(()=>{
fetch("http://localhost:8080/dashboard/charges").then(resp=>{
  resp.json().then(r=>{
    setChargesMars(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Activites
useEffect(()=>{
fetch("http://localhost:8080/dashboard/activites").then(resp=>{
  resp.json().then(r=>{
    setrecetteActivitesMars(r)
  })
})
},[])


//recette Consommation
let totalConsommationMars=0;
Array.from(recetteConsommationsMars).map(recetteConsommation=>{
var recetteSansText=parseInt(recetteConsommation.prix.replace(/\D/g,""))
if(recetteConsommation.date.slice(4,5)==="3")
totalConsommationMars+=recetteSansText  //totalReservationJour :
})
//-------------------------------------------------------------------------------------

//Recette Reservation
let totalReservationMars=0;
Array.from(recetteReservationsMars).map(recetteReservation=>{
var recetteSansText=parseInt(recetteReservation.montant.replace(/\D/g,""))
if(recetteReservation.dateReservation.slice(4,5)==="3")
totalReservationMars+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//charge produit
let totalChargeProduitMars=0;
Array.from(recetteProduitsMars).map(recetteProduit=>{
var recetteSansText=parseInt(recetteProduit.prix.replace(/\D/g,""))
if(recetteProduit.dateImport.slice(4,5)==="3")
totalChargeProduitMars+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//charge
let montantChargeMars=0
Array.from(chargesMars).map(charge=>{
var recetteSansText=parseInt(charge.montant.replace(/\D/g,""))
if(charge.dateFacturation.slice(4,5)==="3")
montantChargeMars+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//Activite
let montantActiviteMars=0
Array.from(recetteActivitesMars).map(activite=>{
var recetteSansText=parseInt(activite.recette.replace(/\D/g,""))
if(activite.date.slice(4,5)==="3")
montantActiviteMars+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//-------------------------------------------------------------------------
      // Recette Total du jour = Somme Recettes - total Charges


const totalChargesMars=montantChargeMars+totalChargeProduitMars //Somme Charges
const totalRecettesMars=montantActiviteMars+totalReservationMars+totalConsommationMars // Somme Recettes
//total
const totalMars=totalRecettesMars-totalChargesMars //Mars




//Avril
//Reservation------------------------------------------------------------------------------------------
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/reservations").then(resp=>{
    resp.json().then(r=>{
        setRecetteReservationsAvril(r)
    })
  })
},[])
//-------------------------------------------------------------------------------------
//Consommation
useEffect(()=>{
fetch("http://localhost:8080/dashboard/consommations").then(resp=>{
  resp.json().then(r=>{
      setRecetteConsommationsAvril(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Stock  --> Charge1
useEffect(()=>{
fetch("http://localhost:8080/dashboard/stock").then(resp=>{
  resp.json().then(r=>{
      setRecetteProduitsAvril(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Charges
useEffect(()=>{
fetch("http://localhost:8080/dashboard/charges").then(resp=>{
  resp.json().then(r=>{
    setChargesAvril(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Activites
useEffect(()=>{
fetch("http://localhost:8080/dashboard/activites").then(resp=>{
  resp.json().then(r=>{
    setrecetteActivitesAvril(r)
  })
})
},[])


//recette Consommation
let totalConsommationAvril=0;
Array.from(recetteConsommationsAvril).map(recetteConsommation=>{
var recetteSansText=parseInt(recetteConsommation.prix.replace(/\D/g,""))
if(recetteConsommation.date.slice(4,5)==="4")
totalConsommationAvril+=recetteSansText  //totalReservationJour :
})
//-------------------------------------------------------------------------------------

//Recette Reservation
let totalReservationAvril=0;
Array.from(recetteReservationsAvril).map(recetteReservation=>{
var recetteSansText=parseInt(recetteReservation.montant.replace(/\D/g,""))
if(recetteReservation.dateReservation.slice(4,5)==="4")
totalReservationAvril+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//charge produit
let totalChargeProduitAvril=0;
Array.from(recetteProduitsAvril).map(recetteProduit=>{
var recetteSansText=parseInt(recetteProduit.prix.replace(/\D/g,""))
if(recetteProduit.dateImport.slice(4,5)==="4")
totalChargeProduitAvril+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//charge
let montantChargeAvril=0
Array.from(chargesAvril).map(charge=>{
var recetteSansText=parseInt(charge.montant.replace(/\D/g,""))
if(charge.dateFacturation.slice(4,5)==="4")
montantChargeAvril+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//Activite
let montantActiviteAvril=0
Array.from(recetteActivitesAvril).map(activite=>{
var recetteSansText=parseInt(activite.recette.replace(/\D/g,""))
if(activite.date.slice(4,5)==="4")
montantActiviteAvril+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//-------------------------------------------------------------------------
      // Recette Total du jour = Somme Recettes - total Charges


const totalChargesAvril=montantChargeAvril+totalChargeProduitAvril //Somme Charges
const totalRecettesAvril=montantActiviteAvril+totalReservationFevrier+totalConsommationAvril // Somme Recettes
//total
const totalAvril=totalRecettesAvril-totalChargesAvril //Avril




//Mai
//Reservation------------------------------------------------------------------------------------------
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/reservations").then(resp=>{
    resp.json().then(r=>{
        setRecetteReservationsMai(r)
    })
  })
},[])
//-------------------------------------------------------------------------------------
//Consommation
useEffect(()=>{
fetch("http://localhost:8080/dashboard/consommations").then(resp=>{
  resp.json().then(r=>{
      setRecetteConsommationsMai(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Stock  --> Charge1
useEffect(()=>{
fetch("http://localhost:8080/dashboard/stock").then(resp=>{
  resp.json().then(r=>{
      setRecetteProduitsMai(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Charges
useEffect(()=>{
fetch("http://localhost:8080/dashboard/charges").then(resp=>{
  resp.json().then(r=>{
    setChargesMai(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Activites
useEffect(()=>{
fetch("http://localhost:8080/dashboard/activites").then(resp=>{
  resp.json().then(r=>{
    setrecetteActivitesMai(r)
  })
})
},[])


//recette Consommation
let totalConsommationMai=0;
Array.from(recetteConsommationsMai).map(recetteConsommation=>{
var recetteSansText=parseInt(recetteConsommation.prix.replace(/\D/g,""))
if(recetteConsommation.date.slice(4,5)==="5")
totalConsommationMai+=recetteSansText  //totalReservationJour :
})
//-------------------------------------------------------------------------------------

//Recette Reservation
let totalReservationMai=0;
Array.from(recetteReservationsMai).map(recetteReservation=>{
var recetteSansText=parseInt(recetteReservation.montant.replace(/\D/g,""))
if(recetteReservation.dateReservation.slice(4,5)==="5")
totalReservationMai+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//charge produit
let totalChargeProduitMai=0;
Array.from(recetteProduitsMai).map(recetteProduit=>{
var recetteSansText=parseInt(recetteProduit.prix.replace(/\D/g,""))
if(recetteProduit.dateImport.slice(4,5)==="5")
totalChargeProduitMai+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//charge
let montantChargeMai=0
Array.from(chargesMai).map(charge=>{
var recetteSansText=parseInt(charge.montant.replace(/\D/g,""))
if(charge.dateFacturation.slice(4,5)==="5")
montantChargeMai+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//Activite
let montantActiviteMai=0
Array.from(recetteActivitesMai).map(activite=>{
var recetteSansText=parseInt(activite.recette.replace(/\D/g,""))
if(activite.date.slice(4,5)==="5")
montantActiviteMai+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})


//-------------------------------------------------------------------------
      // Recette Total du jour = Somme Recettes - total Charges


const totalChargesMai=montantChargeMai+totalChargeProduitMai //Somme Charges
const totalRecettesMai=montantActiviteMai+totalReservationFevrier+totalConsommationMai // Somme Recettes
//total
const totalMai=totalRecettesMai-totalChargesMai //Mai





//Juin
//Reservation------------------------------------------------------------------------------------------
useEffect(()=>{
  fetch("http://localhost:8080/dashboard/reservations").then(resp=>{
    resp.json().then(r=>{
        setRecetteReservationsJuin(r)
    })
  })
},[])
//-------------------------------------------------------------------------------------
//Consommation
useEffect(()=>{
fetch("http://localhost:8080/dashboard/consommations").then(resp=>{
  resp.json().then(r=>{
      setRecetteConsommationsJuin(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Stock  --> Charge1
useEffect(()=>{
fetch("http://localhost:8080/dashboard/stock").then(resp=>{
  resp.json().then(r=>{
      setRecetteProduitsJuin(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Charges
useEffect(()=>{
fetch("http://localhost:8080/dashboard/charges").then(resp=>{
  resp.json().then(r=>{
    setChargesJuin(r)
  })
})
},[])
//-------------------------------------------------------------------------------------
//Activites
useEffect(()=>{
fetch("http://localhost:8080/dashboard/activites").then(resp=>{
  resp.json().then(r=>{
    setrecetteActivitesJuin(r)
  })
})
},[])


//recette Consommation
let totalConsommationJuin=0;
Array.from(recetteConsommationsJuin).map(recetteConsommation=>{
var recetteSansText=parseInt(recetteConsommation.prix.replace(/\D/g,""))
if(recetteConsommation.date.slice(4,5)==="6")
totalConsommationJuin+=recetteSansText  //totalReservationJour :
})
//-------------------------------------------------------------------------------------

//Recette Reservation
let totalReservationJuin=0;
Array.from(recetteReservationsJuin).map(recetteReservation=>{
var recetteSansText=parseInt(recetteReservation.montant.replace(/\D/g,""))
if(recetteReservation.dateReservation.slice(4,5)==="6")
totalReservationJuin+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//charge produit
let totalChargeProduitJuin=0;
Array.from(recetteProduitsJuin).map(recetteProduit=>{
var recetteSansText=parseInt(recetteProduit.prix.replace(/\D/g,""))
if(recetteProduit.dateImport.slice(4,5)==="6")
totalChargeProduitJuin+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//charge
let montantChargeJuin=0
Array.from(chargesJuin).map(charge=>{
var recetteSansText=parseInt(charge.montant.replace(/\D/g,""))
if(charge.dateFacturation.slice(4,5)==="6")
montantChargeJuin+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//Activite
let montantActiviteJuin=0
Array.from(recetteActivitesJuin).map(activite=>{
var recetteSansText=parseInt(activite.recette.replace(/\D/g,""))
if(activite.date.slice(4,5)==="6")
montantActiviteJuin+=recetteSansText  //totalReservationJour : montant reservation du jour payé par client != recette
})

//-------------------------------------------------------------------------
      // Recette Total du jour = Somme Recettes - total Charges


const totalChargesJuin=montantChargeJuin+totalChargeProduitJuin   //Somme Charges
const totalRecettesJuin=montantActiviteJuin+totalReservationFevrier+totalConsommationJuin   // Somme Recettes
//total
const totalJuin=totalRecettesJuin-totalChargesJuin //Juin


// DataFinal du Graph
const data = [
  { name: "Janvier", Total:totalJanvier },
  { name: "Février", Total: totalFevrier },
  { name: "Mars", Total: totalMars},
  { name: "Avril", Total: totalAvril },
  { name: "Mai", Total: totalMai},
  { name: "Juin", Total: totalJuin },
];


  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
            animationBegin={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
