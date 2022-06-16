export const stockColumns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "produit",
      headerName: "Produit",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.produit}
          </div>
        );
    },
},
  {
    field: "prix",
    headerName: "Prix produit",
    width: 180,
    renderCell: (params) => {
      return (
        <div className={`cellPrixProduit ${params.row.prix}`}>
          {params.row.prix}
        </div>
      );
    }
    },
    {
    field: "quantiteInitiale",
    headerName: "Quantité Initiale",
    width: 180,
    },
    {
      field: "quantiteRestante",
      headerName: "Quantité Restante",
      width: 180,
      },
      {
      field: "fournisseur",
      headerName: "Fournisseur",
      width: 200,
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
        field: "dateImport",
        headerName: "Date d'import",
        width: 180,
      },
      {
      field: "dateExpiration",
      headerName: "Date Expiration",
      width: 180,
      },
    {
      field: "etat",
      headerName: "Etat",
      width: 180,
      renderCell: (params) => {
        return (
          <div className={`etatProduit ${params.row.etat}`}>
            {params.row.etat}
          </div>
        );
      }
    },
    {
        field: "recette",
        headerName: "Recette",
        width: 180,
        renderCell: (params) => {
          return (
            <div className="cellRecetteStock">
              {params.row.recette}
            </div>
          );
        }
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
  ];
  
  //temporary data
  // export const productRows = [
  //   {
  //     id: 1,
  //     produit: "Poulet",
  //     img:"https://assets.afcdn.com/recipe/20200227/108291_w1200h1800c1cx1824cy2736cxb3648cyb5472.webp",
  //     prix:"20DH",
  //     quantité: "150 KG",
  //     fournisseur:"El hafdaoui Zakaria",
  //     date_expiration:"02/02/2022",
  //     etat: "Excellente",
  //     date: "05/01/2022",
  //     recette:"1559 DH",
  //     status:"Très demandé"
  //   },
  //   {
  //       id: 2,
  //       produit: "Steak",
  //       img:"https://www.gastronomiac.com/wp/wp-content/uploads/2021/06/Steaks-de-boeuf.jpg",
  //       prix:"20DH",
  //       quantité: "0",
  //       fournisseur:"El hafdaoui Zakaria",
  //       date_expiration:"02/02/2022",
  //       etat: "Hors service",
  //       date: "04/04/2022",
  //       recette:"1559 DH",
  //       status:"Demandé"
  //     },
  //     {
  //       id: 3,
  //       produit: "Fromage",
  //       img:"https://www.pourquoidocteur.fr/media/article/thunbs/uploded_istock-637341166-1522845538.jpg",
  //       prix:"20DH",
  //       quantité: "150 KG",
  //       fournisseur:"El hafdaoui Zakaria",
  //       date_expiration:"02/02/2022",
  //       etat: "Périmé",
  //       date: "05/01/2022",
  //       recette:"1012 DH",
  //       status:"Peu demandé"
  //     },
  //     {
  //       id: 4,
  //       produit: "Viande",
  //       img:"https://ds.static.rtbf.be/article/image/770x433/5/f/d/ba3c736667394d5082f86f28aef38107-1529669795.jpg",
  //       prix:"20DH",
  //       quantité: "0",
  //       fournisseur:"El hafdaoui Zakaria",
  //       date_expiration:"02/02/2022",
  //       etat: "Hors service",
  //       date: "12/12/2022",
  //       recette:"1559 DH",
  //       status:"Très demandé"
  //     },
  //     {
  //       id: 5,
  //       produit: "Viande hachée",
  //       img:"http://www.walmarket.ma/369-large_default/viande-hachee-pur-boeuf-nature.jpg",
  //       prix:"20DH",
  //       quantité: "510 KG",
  //       fournisseur:"El hafdaoui Zakaria",
  //       date_expiration:"02/02/2022",
  //       etat: "Excellente",
  //       date: "08/10/2022",
  //       recette:"1559 DH",
  //       status:"Peu demandé"
  //     },
  //     {
  //       id: 6,
  //       produit: "Spaghetti",
  //       img:"https://deatogo.com/wp-content/uploads/2017/02/spaguethi-elom-500-600x550.jpg",
  //       prix:"20DH",
  //       quantité: "150 KG",
  //       fournisseur:"El hafdaoui Zakaria",
  //       date_expiration:"02/02/2022",
  //       etat: "Périmé",
  //       date: "05/01/2022",
  //       recette:"1559 DH",
  //       status:"Demandé"
  //     },
  //     {
  //       id: 7,
  //       produit: "Riz",
  //       img:"https://images.radio-canada.ca/q_auto,w_1200/v1/alimentation/recette/16x9/riz-basmati-recettes-mordu.jpg",
  //       prix:"20DH",
  //       quantité: "721 KG",
  //       fournisseur:"El hafdaoui Zakaria",
  //       date_expiration:"02/02/2022",
  //       etat: "Bien",
  //       date: "17/06/2022",
  //       recette:"412 DH",
  //       status:"Très demandé"
  //     },
  //     {
  //       id: 8,
  //       produit: "Lait",
  //       img:"http://www.tchinlait.com/file/img/produits/produits-candia-algerie-Lait-partiellement-AecrAemAe-UHT.png",
  //       prix:"20DH",
  //       quantité: "150 KG",
  //       fournisseur:"El hafdaoui Zakaria",
  //       date_expiration:"02/02/2022",
  //       etat: "Périmé",
  //       date: "05/01/2022",
  //       recette:"1559 DH",
  //       status:"Peu demandé"
  //     },
  //     {
  //       id: 9,
  //       produit: "Dessert",
  //       img:"https://resize-elle.ladmedia.fr/r/300,388,center-middle,forcex,ffffff/img/var/plain_site/storage/images/elle-a-table/fiches-cuisine/tous-les-themes/recettes-de-desserts-au-chocolat/88701295-2-fre-FR/Recettes-de-desserts-au-chocolat.jpg",
  //       prix:"20DH",
  //       quantité: "150 KG",
  //       fournisseur:"El hafdaoui Zakaria",
  //       date_expiration:"02/02/2022",
  //       etat: "Excellente",
  //       date: "05/01/2022",
  //       recette:"1559 DH",
  //       status:"Demandé"
  //     },
  //     {
  //       id: 10,
  //       produit: "Pain",
  //       img:"https://ichef.bbci.co.uk/news/800/cpsprodpb/7E58/production/_117644323_262c7b8f-a2d1-49ed-83af-2518a27760d7.jpg.webp",
  //       prix:"20DH",
  //       quantité: "150 KG",
  //       fournisseur:"El hafdaoui Zakaria",
  //       date_expiration:"02/02/2022",
  //       etat: "Périmé",
  //       date: "05/01/2022",
  //       recette:"1559 DH",
  //       status:"Très demandé"
  //     },
  //     {
  //       id: 11,
  //       produit: "Poire",
  //       img:"https://img-3.journaldesfemmes.fr/BSus0nIn7b8cizJP-xO7obz-iqk=/1500x/smart/3a6dcec155554a5cbcc5abbb9422b995/ccmcms-jdf/12184726.jpg",
  //       prix:"20DH",
  //       quantité: "150 KG",
  //       fournisseur:"El hafdaoui Zakaria",
  //       date_expiration:"02/02/2022",
  //       etat: "Excellente",
  //       date: "05/01/2022",
  //       recette:"1559",
  //       status:"Peu demandé"
  //     },
  // ];
  