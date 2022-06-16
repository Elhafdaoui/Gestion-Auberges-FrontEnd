export const activityColumns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "activite",
      headerName: "Activité",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.activite}
          </div>
        );
      },
    },
    
    
    {
      field: "lieu",
      headerName: "Lieu",
      width: 160,
    },
    {
      field: "prix",
      headerName: "Prix Activité",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellPrix">
            {params.row.prix}
          </div>
        );
      },
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
      field: "date",
      headerName: "Date",
      width: 160,
    },
    {
      field: "heure",
      headerName: "Durée",
      width: 160,
    },
    {
      field: "recette",
      headerName: "Recette",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellRecette">
            {params.row.recette}
          </div>
        );
      },
    },
  ];
  
  // //Données temporaires
  // export const activityRows = [
  //   {
  //     id: 1,
  //     activité: "Motoneige",
  //     img: "https://i0.wp.com/www.thestorytellersmtl.com/wp-content/uploads/2021/02/traineau-chien-promenade-auberge-lac-taureau.jpg?resize=525%2C700&ssl=1",
  //     lieu:"Agadir",
  //     prix:"120 DH",
  //     status:"Demandée",
  //     recette: "1209",
  //   },
  //   {
  //     id: 2,
  //     activité: "Randonnée",
  //     img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/EL_AMINE.jpg/280px-EL_AMINE.jpg",
  //     lieu:"Agadir",
  //     prix:"150 DH",
  //     status:"Demandée",
  //     recette: "3009",
  //   },
  //   {
  //     id: 3,
  //     activité: "Surf",
  //     img: "https://cdn.radiofrance.fr/s3/cruiser-production/2021/08/696b8bea-3893-4a18-b549-515a4c641d93/838_gettyimages-982747408.webp",
  //     lieu:"Agadir",
  //     prix:"170 DH",
  //     status:"Peu demandée",
  //     recette: "200",
  //   },
  //   {
  //     id: 4,
  //     activité: "Patin",
  //     img: "https://www.cpdeuxrives.ca/sites/files/3CD4609C-05AB-4220-9283-A13F7EA441FF.jpeg",
  //     lieu:"Agadir",
  //     prix:"120 DH",
  //     status:"Très demandée",
  //     recette: "6000",
  //   },
  //   {
  //     id: 5,
  //     activité: "Ski de fond",
  //     img: "https://www.girlsup.fr/blog/wp-content/uploads/2019/11/maloja_Dialas_Winter19-20_76-77-935x581.jpg",
  //     lieu:"Agadir",
  //     prix:"120 DH",
  //     status:"Demandée",
  //     recette: "2000",
  //   },
  //   {
  //     id: 6,
  //     activité: "Vélo",
  //     img: "https://www.netnoo.com/wp-content/uploads/2018/10/media-avantages-sportive-activite-mettre.jpg",
  //     lieu:"Agadir",
  //     prix:"120 DH",
  //     status:"Très demandée",
  //     recette: "928",
  //   },
  //   {
  //     id: 7,
  //     activité: "Tennis",
  //     img: "https://suaps.univ-grenoble-alpes.fr/medias/photo/shutterstock-215158288_1530184607052-jpg",
  //     lieu:"Agadir",
  //     prix:"120 DH",
  //     status:"Demandée",
  //     recette: "891"
  //   },
  //   {
  //     id: 8,
  //     activité: "Natation",
  //     img: "https://www.lepape-info.com/wp-content/uploads/2017/03/Femme-natation-600x399.jpg",
  //     lieu:"Agadir",
  //     prix:"120 DH",
  //     status:"Peu demandée",
  //     recette: "192"
  //   },
  //   {
  //     id: 9,
  //     activité: "Jogging ",
  //     img: "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2020.2F10.2F29.2Faeced2c2-556b-4a47-943b-5dc344f40270.2Ejpeg/1200x1200/quality/80/crop-from/center/jogging-sport-en-club-peut-on-continuer-a-faire-du-sport-pendant-le-reconfinement.jpeg",
  //     lieu:"Agadir",
  //     prix:"120 DH",
  //     status:"Demandée",
  //     recette: "2201"
  //   },
  //   {
  //     id: 10,
  //     activité: "Rafting",
  //     img: "https://www.sport-et-tourisme.fr/wp-content/uploads/2020/05/Rafting-en-eaux-vives.jpg",
  //     lieu:"Agadir",
  //     prix:"120 DH",
  //     status:"Peu Demandée",
  //     recette: "194"
  //   },
  //   {
  //       id: 11,
  //       activité: "La plongée sous-marine ",
  //       img: "https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/fb/da/35.jpg",
  //       lieu:"Agadir",
  //       prix:"120 DH",
  //       status:"Très Demandée",
  //       recette: "3394",
  //     },
  // ];
  