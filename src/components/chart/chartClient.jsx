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
import { useParams } from "react-router";


const Chart = ({ aspect, title }) => {

    const {idClient} = useParams()

    //useState Client
    const [client,setClient] = useState({})

    //useState Réservation
    const [reservation, setReservation] = useState({})

    //useState Consommation
    const [consommation, setConsommation] = useState({})

    //Récuperer le client
    useEffect(()=>{
        fetch(`http://localhost:8080/dashboard/clients/${idClient}`).then(res=>{
            res.json().then(r=>{
                setClient(r)
            })
        })
    },[])

    //Récuperer les réservations
    useEffect(()=>{
        fetch(`http://localhost:8080/dashboard/reservations`).then(res=>{
            res.json().then(r=>{
                setReservation(r)
            })
        })
    },[])

    //Récuperer les consommations
    useEffect(()=>{
        fetch("http://localhost:8080/dashboard/consommations").then(res=>{
            res.json().then(r=>{
                setConsommation(r)
            })
        })
    },[])


    //ReservationClient
    let reservationClient = []

  Array.from(reservation).map(reservation => {
      if(reservation.client===client.client && reservation.cin === client.cin)
      reservationClient.push(reservation)
  });

  //ConsommationClient
  let consommationClient = []

  Array.from(consommation).map(consommation => {
      if(consommation.client===client.client && consommation.cin === client.cin)
      consommationClient.push(consommation)
  });
  
    //Janvier
        //Consommation
        var consommationJanvier = 0
        consommationClient.map(consommation=>{
            if(consommation.date.slice(4,5)==="1"){
                let consommationSansText=parseInt(consommation.recette.replace(/\D/g,"")) //Extraire prix sans text(DH)
                consommationJanvier+=consommationSansText
            }
        }) 
        
        //Reservation
        var reservationJanvier = 0
        reservationClient.map(reservation=>{
            if(reservation.dateReservation.slice(4,5)==="1"){
                let reservationSansText=parseInt(reservation.montant.replace(/\D/g,"")) //Extraire prix sans text(DH)
                reservationJanvier+=reservationSansText
            }
        })

        //Total Janvier
        var totalJanvier=consommationJanvier+reservationJanvier
        
//-------------------------------------------------------------------------------------------------
        //Février
        //Consommation
        var consommationFevrier = 0
        consommationClient.map(consommation=>{
            if(consommation.date.slice(4,5)==="2"){
                let consommationSansText=parseInt(consommation.recette.replace(/\D/g,"")) //Extraire prix sans text(DH)
                consommationFevrier+=consommationSansText
            }
        }) 
        
        //Reservation
        var reservationFevrier = 0
        reservationClient.map(reservation=>{
            if(reservation.dateReservation.slice(4,5)==="2"){
                let reservationSansText=parseInt(reservation.montant.replace(/\D/g,"")) //Extraire prix sans text(DH)
                reservationFevrier+=reservationSansText
            }
        })

        //Total Février
        var totalFevrier=consommationFevrier+reservationFevrier

//-------------------------------------------------------------------------------------------------

        //Mars
        //Consommation
        var consommationMars = 0
        consommationClient.map(consommation=>{
            if(consommation.date.slice(4,5)==="3"){
                let consommationSansText=parseInt(consommation.recette.replace(/\D/g,"")) //Extraire prix sans text(DH)
                consommationMars+=consommationSansText
            }
        }) 
        
        //Reservation
        var reservationMars = 0
        reservationClient.map(reservation=>{
            if(reservation.dateReservation.slice(4,5)==="3"){
                let reservationSansText=parseInt(reservation.montant.replace(/\D/g,"")) //Extraire prix sans text(DH)
                reservationMars+=reservationSansText
            }
        })

        //Total Mars
        var totalMars=consommationMars+reservationMars

//-------------------------------------------------------------------------------------------------

        //Avril
        //Consommation
        var consommationAvril = 0
        consommationClient.map(consommation=>{
            if(consommation.date.slice(4,5)==="4"){
                let consommationSansText=parseInt(consommation.recette.replace(/\D/g,"")) //Extraire prix sans text(DH)
                consommationAvril+=consommationSansText
            }
        }) 
        
        //Reservation
        var reservationAvril = 0
        reservationClient.map(reservation=>{
            if(reservation.dateReservation.slice(4,5)==="4"){
                let reservationSansText=parseInt(reservation.montant.replace(/\D/g,""))  //Extraire prix sans text(DH)
                reservationAvril+=reservationSansText
            }
        })

        //Total Avril 
        var totalAvril=consommationAvril+reservationAvril

//-------------------------------------------------------------------------------------------------

        //Mai
        //Consommation
        var consommationMai = 0
        consommationClient.map(consommation=>{
            if(consommation.date.slice(4,5)==="5"){
                let consommationSansText=parseInt(consommation.recette.replace(/\D/g,"")) //Extraire prix sans text(DH)
                consommationMai+=consommationSansText
            }
        }) 
        
        //Reservation
        var reservationMai = 0
        reservationClient.map(reservation=>{
            if(reservation.dateReservation.slice(4,5)==="5"){
                let reservationSansText=parseInt(reservation.montant.replace(/\D/g,"")) //Extraire prix sans text(DH)
                reservationMai+=reservationSansText
            }
        })

        //Total Mai 
        var totalMai=consommationMai+reservationMai

//-------------------------------------------------------------------------------------------------

        //Juin
        //Consommation
        var consommationJuin = 0
        consommationClient.map(consommation=>{
            if(consommation.date.slice(4,5)==="6"){
                let consommationSansText=parseInt(consommation.recette.replace(/\D/g,"")) //Extraire prix sans text(DH)
                consommationJuin+=consommationSansText
            }
        }) 
        
        //Reservation
        var reservationJuin = 0
        reservationClient.map(reservation=>{
            if(reservation.dateReservation.slice(4,5)==="6"){
                let reservationSansText=parseInt(reservation.montant.replace(/\D/g,"")) //Extraire prix sans text(DH)
                reservationJuin+=reservationSansText
            }
        })

        //Total Juin
        var totalJuin=consommationJuin+reservationJuin
        
        


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
