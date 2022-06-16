export const reservationColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "chambre",
    headerName: "Chambre",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.chambre}
        </div>
      );
    },
  },
  {
    field: "etat",
    headerName: "Etat",
    width: 180,
    renderCell: (params) => {
      return (
        <div className={`etatChambre ${params.row.etat}`}>
          {params.row.etat}
        </div>
      );
    }
  },
  {
    field: "client",
    headerName: "Client",
    width: 180,
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
  },
  {
    field: "phone",
    headerName: "Téléphone",
    width: 180,
  },
  {
    field: "cin",
    headerName: "Cin",
    width: 180,
  },
  {
    field: "nationalite",
    headerName: "Nationalité",
    width: 180,
  },
  {
    field: "methode",
    headerName: "Méthode de paiement",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellMethode" >
          {params.row.methode}
        </div>
      );
    }
  },
  {
    field: "montant",
    headerName: "Montant",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellMontant" >
          {params.row.montant}
        </div>
      );
    }
  },
  {
    field: "dateReservation",
    headerName: "Date Réservation",
    width: 180,
  },
  {
    field: "finReservation",
    headerName: "Fin Réservation",
    width: 180,
  },
  {
    field: "statut",
    headerName: "Statut",
    width: 180,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.statut}`}>
          {params.row.statut}
        </div>
      );
    },
    
  },
  {
    field: "recette",
    headerName: "Recette",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellRecetteReservation" >
          {params.row.recette}
        </div>
      );
    }
  }
];

// //temporary data
// export const reservationRows = [
//   {
//     id: 1,
//     chambre: "Chambre 1",
//     img: "https://www.ledsmaster.com/wp-content/uploads/2018/04/20180207210359.jpg",
//     etat: "Excellente",
//     client: "Zakaria El Hafdaoui",
//     methode:"Cash",
//     montant:"350",
//     cin:"J530808",
//     recette: "1209",
//     date:"04/04/2022",
//     date_fin:"14/04/2022",
//     status:"Occupée"
//   },
//   {
//     id: 2,
//     chambre: "Chambre 2",
//     img: "https://www.maisonapart.com/images/auto/640-480-c/20210208_121536_but-cac-envie-de-campagne.jpg",
//     etat: "Sale",
//     client: "Zakaria El Hafdaoui",
//     methode:"Paiement en ligne",
//     montant:"240",
//     cin:"J530808",
//     recette: "3009",
//     date:"05/01/2022",
//     date_fin:"07/01/2022",
//     status:"Réservée"
//   },
//   {
//     id: 3,
//     chambre: "Chambre 3",
//     img: "https://img-3.journaldesfemmes.fr/USeLbxpeO5C-AWWKHWX-8J_xVMU=/820x546/smart/9e45ebe939d64e739eb7eed20642de8e/ccmcms-jdf/24418449.jpg",
//     etat: "Hors service",
//     client: "-",
//     methode:"-",
//     montant:"-",
//     cin:"-",
//     recette: "-",
//     date:"-",
//     date_fin:"-",
//     status:"-"
//   },
//   {
//     id: 4,
//     chambre: "Chambre 4",
//     img: "https://img-3.journaldesfemmes.fr/CD5FQv1hijNidizFL2sImqIkryw=/1500x/smart/1ff88cbfeabc4c88b093be96327ad864/ccmcms-jdf/21867822.png",
//     etat: "Excellente",
//     client: "Zakaria El Hafdaoui",
//     methode:"Paiement en ligne",
//     montant:"298",
//     cin:"J530808",
//     recette: "6000",
//     date:"21/03/2022",
//     date_fin:"01/04/2022",
//     status:"Réservée"
//   },
//   {
//     id: 5,
//     chambre: "Chambre 5",
//     img: "https://img-3.journaldesfemmes.fr/ExGO3NsiLo95k9lqGzLEIEGr68g=/1500x/smart/8c0f0bb487cc4736af667dc01d77970a/ccmcms-jdf/23887429.jpeg",
//     etat: "Sale",
//     client: "Zakaria El Hafdaoui",
//     methode:"Cash",
//     montant:"189",
//     cin:"J530808",
//     recette: "2000",
//     date:"-",
//     date_fin:"-",
//     status:"Libre"
//   },
//   {
//     id: 6,
//     chambre: "Chambre 6",
//     img: "https://img-3.journaldesfemmes.fr/mrsIQaSngN1kiKvSZ0S0hXLGcCY=/1240x/smart/881c33b760514bfea4ec4961f7a19132/ccmcms-jdf/24389085.jpg",
//     etat: "Hors service",
//     client: "-",
//     methode:"-",
//     montant:"-",
//     cin:"-",
//     recette: "-",
//     date:"-",
//     date_fin:"-",
//     status:"-"
//   },
//   {
//     id: 7,
//     chambre: "Chambre 7",
//     img: "https://img-3.journaldesfemmes.fr/kkm9KTF2yy1m-hl80rl-_LqqWSw=/1240x/smart/29cd4f9febb94daaab2b6d3bbe117029/ccmcms-jdf/24389083.jpg",
//     etat: "Excellente",
//     client: "Zakaria El Hafdaoui",
//     methode:"Paiement en ligne",
//     montant:"289",
//     cin:"J530808",
//     recette: "891",
//     date:"12/04/2022",
//     date_fin:"13/04/2022",
//     status:"Occupée"
//   },
//   {
//     id: 8,
//     chambre: "Chambre 8",
//     img: "https://img-3.journaldesfemmes.fr/JUz1oH-2IK-avIF2e-8r65g2YlI=/1240x/smart/e8f7482cf35247169b85015a927f72fa/ccmcms-jdf/24389084.jpg",
//     etat: "Sale",
//     client: "Zakaria El Hafdaoui",
//     methode:"Cash",
//     montant:"150",
//     cin:"J530808",
//     recette: "5192",
//     date:"05/04/2022",
//     date_fin:"22/04/2022",
//     status:"Réservée"
//   },
//   {
//     id: 9,
//     chambre: "Chambre 9",
//     img: "https://img-3.journaldesfemmes.fr/oqZsyx2-bUwogk7p5X45ET9Vvvg=/1240x/smart/5f9a3226224d4cc6a811033cccab83f4/ccmcms-jdf/24389074.jpg",
//     etat: "Hors service",
//     client: "-",
//     methode:"-",
//     montant:"-",
//     cin:"-",
//     recette: "-",
//     date:"-",
//     date_fin:"-",
//     status:"-"
//   },
//   {
//     id: 10,
//     chambre: "Chambre 10",
//     img: "https://img-3.journaldesfemmes.fr/7PuB90y7WI04hnrXMYS8kV69Q88=/1240x/smart/041abaf49d0941fd9ee4a51dcdfdfba2/ccmcms-jdf/24389082.jpg",
//     etat: "Excellente",
//     client: "Zakaria El Hafdaoui",
//     methode:"Cash",
//     montant:"419",
//     cin:"J530808",
//     recette: "3394",
//     date:"19/04/2022",
//     date_fin:"27/04/2022",
//     status:"Occupée"
//   },
// ];
