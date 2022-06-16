export const restaurantColumns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "restaurant",
      headerName: "Restaurant",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.restaurant}
          </div>
        );
      },
    },
    {
      field: "nature",
      headerName: "Nature",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={`natureRestaurant ${params.row.nature}`}>
            {params.row.nature}
          </div>
        );
      }
    },
    {
      field: "prix",
      headerName: "Prix",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellPrixRestaurant">
            {params.row.prix}
          </div>
        );
      }
    },
    {
      field: "etat",
      headerName: "Etat",
      width: 130,
      renderCell: (params) => {
        return (
          <div className={`etatRestaurant ${params.row.etat}`}>
            {params.row.etat}
          </div>
        );
      }
    },
    {
        field: "statut",
        headerName: "Statut",
        width: 160,
        renderCell: (params) => {
          return (
            <div className={`cellWithStatus ${params.row.statut}`}>
              {params.row.statut}
            </div>
          );
        },
      },
      {
        field: "places",
        headerName: "Nombre de places",
        width: 175,
        renderCell: (params) => {
          return (
            <div className={`places ${params.row.places}`}>
              {params.row.places}
            </div>
          );
      },
    },
    {
      field: "recette",
      headerName: "Recette",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellRecetteRestaurant">
            {params.row.recette}
          </div>
        );
    },
    }
  ];
  
  // //temporary data
  // export const restaurantRows = [
  //   {
  //     id: 1,
  //     prix:"50DH",
  //     restaurant: "Restaurant 1",
  //     nature:"Moderne",
  //     img: "https://mylittlekech.com/wp-content/uploads/2017/08/restaurants-a-marrakech.jpg",
  //     etat: "Excellente",
  //     recette: "1209DH",
  //     places: "10",
  //     status:"Peu demandé"
  //   },
  //   {
  //     id: 2,
  //     prix:"110DH",
  //     restaurant: "Restaurant 2",
  //     nature:"Traditionnel",
  //     img: "https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg",
  //     etat: "Sale",
  //     recette: "3009DH",
  //     places: "15",
  //     status:"Demandé"
  //   },
  //   {
  //     id: 3,
  //     prix:"123DH",
  //     restaurant: "Restaurant 3",
  //     nature:"Moderne",
  //     img: "https://media-cdn.tripadvisor.com/media/photo-s/17/75/3f/d1/restaurant-in-valkenswaard.jpg",
  //     etat: "Hors service",
  //     recette: "5200DH",
  //     places: "6",
  //     status:"Très demandé"
  //   },
  //   {
  //     id: 4,
  //     prix:"150DH",
  //     nature:"Moderne",
  //     restaurant: "Restaurant 4",
  //     img: "https://img-3.journaldesfemmes.fr/CD5FQv1hijNidizFL2sImqIkryw=/1500x/smart/1ff88cbfeabc4c88b093be96327ad864/ccmcms-jdf/21867822.png",
  //     etat: "Excellente",
  //     recette: "6000DH",
  //     places: "8",
  //     status:"Très demandé"
  //   },
  //   {
  //     id: 5,
  //     prix:"114DH",
  //     restaurant: "Restaurant 5",
  //     nature:"Traditionnel",
  //     img: "https://www.challenge.ma/wp-content/uploads/2020/01/bazaar-fabrice-maurel-4-750x500.jpg",
  //     etat: "Sale",
  //     recette: "2000DH",
  //     places: "2",
  //     status:"Demandé"
  //   },
  //   {
  //       id: 6,
  //       prix:"92DH",
  //       restaurant: "Restaurant 6",
  //       nature:"Traditionnel",
  //       img: "https://mylittlekech.com/wp-content/uploads/2017/08/restaurants-a-marrakech.jpg",
  //       etat: "Excellente",
  //       recette: "1200DH",
  //       places: "14",
  //       status:"Peu demandé"
  //     },
  //     {
  //       id: 7,
  //       prix:"56DH",
  //       restaurant: "Restaurant 7",
  //       nature:"Moderne",
  //       img: "https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg",
  //       etat: "Sale",
  //       recette: "3009DH",
  //       places: "06",
  //       status:"Demandé"
  //     },
  //     {
  //       id: 8,
  //       prix:"87DH",
  //       restaurant: "Restaurant 8",
  //       nature:"Traditionnel",
  //       img: "https://media-cdn.tripadvisor.com/media/photo-s/17/75/3f/d1/restaurant-in-valkenswaard.jpg",
  //       etat: "Hors service",
  //       recette: "5200DH",
  //       places: "16",
  //       status:"Très demandé"
  //     },
  //     {
  //       id: 9,
  //       prix:"56DH",
  //       restaurant: "Restaurant 9",
  //       nature:"Moderne",
  //       img: "https://img-3.journaldesfemmes.fr/CD5FQv1hijNidizFL2sImqIkryw=/1500x/smart/1ff88cbfeabc4c88b093be96327ad864/ccmcms-jdf/21867822.png",
  //       etat: "Excellente",
  //       recette: "6000DH",
  //       places: "30",
  //       status:"Très demandé"
  //     },
  //     {
  //       id: 10,
  //       prix:"100DH",
  //       restaurant: "Restaurant 10",
  //       nature:"Traditionnel",
  //       img: "https://www.challenge.ma/wp-content/uploads/2020/01/bazaar-fabrice-maurel-4-750x500.jpg",
  //       etat: "Sale",
  //       recette: "2000DH",
  //       places: "24",
  //       status:"Demandé"
  //     }
  // ];
  