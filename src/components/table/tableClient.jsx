import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useParams } from 'react-router';

const List = () => {

    const {idClient} = useParams()

    const [client, setClient] = useState({})
    const [reservations,setReservations]=useState({})

    //Récuperer le client
    useEffect(()=>{
        fetch(`http://localhost:8080/dashboard/clients/${idClient}`).then(res=>{
        res.json().then(r=>{
          setClient(r)
        })
      })
    },[])

    //Recuperer tout les réservations
    useEffect(()=>{
        fetch("http://localhost:8080/dashboard/reservations").then(resp=>{
            resp.json().then(r=>{
                setReservations(r)
            })
        })
    },[])

    //Filter les réservations de telle sorte à obtenir que celles de notre client
    const reservationList=[];
  Array.from(reservations).map(reservation => {
      if(reservation.client===client.client || reservation.cin === client.cin)
          reservationList.push(reservation)
  })

  
  // const rows = [
  //   {
  //     id: 1,
  //     product: "Chambre 1",
  //     img: "https://insights.ehotelier.com/wp-content/uploads/sites/6/2020/01/hotel-room.jpg",
  //     customer: "El Hafdaoui Zakaria",
  //     date: "27 Janvier",
  //     amount: 785,
  //     method: "Cash",
  //     status: "Reservé",
  //   },
  //   {
  //     id: 2,
  //     product: "Chambre 2",
  //     img: "https://img-3.journaldesfemmes.fr/JUz1oH-2IK-avIF2e-8r65g2YlI=/1240x/smart/e8f7482cf35247169b85015a927f72fa/ccmcms-jdf/24389084.jpg",
  //     customer: "El Hafdaoui Zakaria",
  //     date: "05 Février",
  //     amount: 900,
  //     method: "Paiement En ligne",
  //     status: "Occupé",
  //   },
  //   {
  //     id: 3,
  //     product: "Chambre 3",
  //     img: "https://img-3.journaldesfemmes.fr/mrsIQaSngN1kiKvSZ0S0hXLGcCY=/1240x/smart/881c33b760514bfea4ec4961f7a19132/ccmcms-jdf/24389085.jpg",
  //     customer: "-",
  //     date: "-",
  //     amount: "-",
  //     method: "-",
  //     status: "Libre",
  //   },
  //   {
  //     id: 4,
  //     product: "Chambre 4",
  //     img: "https://img-3.journaldesfemmes.fr/oqZsyx2-bUwogk7p5X45ET9Vvvg=/1240x/smart/5f9a3226224d4cc6a811033cccab83f4/ccmcms-jdf/24389074.jpg",
  //     customer: "El Hafdaoui Zakaria",
  //     date: "13 Avril",
  //     amount: 920,
  //     method: "Paiement En Ligne",
  //     status: "Reservé",
  //   },
  //   {
  //     id: 5,
  //     product: "Chambre 5",
  //     img: "https://img-3.journaldesfemmes.fr/CD5FQv1hijNidizFL2sImqIkryw=/1500x/smart/1ff88cbfeabc4c88b093be96327ad864/ccmcms-jdf/21867822.png",
  //     customer: "El Hafdaoui Zakaria",
  //     date: "20 Mai",
  //     amount: 2000,
  //     method: "Paiement En Ligne",
  //     status: "Occupé",
  //   },
  // ];
  

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Chambre</TableCell>
            <TableCell className="tableCell">Client</TableCell>
            <TableCell className="tableCell">Cin</TableCell> {/* Statut au paravant et a été place en dernier après méthode de paiement */}
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Montant</TableCell>
            <TableCell className="tableCell" ><span style={{marginLeft:"30px"}}>Méthode De Paiement</span> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservationList.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.chambre}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.client}</TableCell>
              <TableCell className="tableCell">{row.cin}</TableCell>
              <TableCell className="tableCell">{row.dateReservation}</TableCell>
              <TableCell className="tableCell">{row.montant}</TableCell>
              <TableCell className="tableCell"> <span className="methodePaiement"></span> {row.methode}</TableCell>
              {/* <TableCell className="tableCell">
                <span className={`statutReservation ${row.statut}`}>{row.statut}</span>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
