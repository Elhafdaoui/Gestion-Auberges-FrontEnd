export const recetteColumns = [
    // {field:"id",headerName:"ID",width:130},
    {
      field: "recettes",
      headerName: "Recettes",
      width: 180,
      renderCell: (params) => {
        return (
          <div className={`statusRecette ${params.row.recettes}`}>
            {params.row.recettes}
          </div>
        );
      }
    },
    {
    field: "depenses",
      headerName: "Dépenses",
      width: 180,
      renderCell: (params) => {
        return (
          <div className={`statusCharge ${params.row.depenses}`}>
            {params.row.depenses}
          </div>
        );
      }
    },
    {
        field: "bilan",
        headerName: "Bilan",
        width:180
    },
    {
      field: "date",
      headerName: "Mois",
      width:180
  },
    {
        field: "statut",
        headerName: "Statut",
        width: 180,
            renderCell: (params) => {
              return (
                <div className={`cellWithStatut ${params.row.statut}`}>
                  {params.row.statut}
                </div>
              );
            },
    }

  ];
  
//   //temporary data
//   export const recetteRows = [
//     {
//         id:1,
//       recette:10000+" DH",
//       charge: 50000+" DH",
//       total:-40000+" DH",
//       mois:"14/04/2022",
//       status:"Perdant"
//     },
//     {
//       id:2,
//     recette:50000+" DH",
//     charge: 10000+" DH",
//     total:+40000+" DH",
//     mois:"14/05/2022",
//     status:"Gagnant"
//   },
//   {
//     id:3,
//   recette:70000+" DH",
//   charge: 50000+" DH",
//   total:-20000+" DH",
//   mois:"14/06/2022",
//   status:"Gagnant"
// },
// {
//   id:4,
// recette:10000+" DH",
// charge: 50000+" DH",
// total:-40000+" DH",
// mois:"14/07/2022",
// status:"Perdant"
// },
// {
//   id:5,
// recette:100000+" DH",
// charge: 50000+" DH",
// total:60000+" DH",
// mois:"28/07/2022",
// status:"Gagnant"
// },
// {
//   id:6,
// recette:130000+" DH",
// charge: 50000+" DH",
// total:80000+" DH",
// mois:"05/08/2022",
// status:"Gagnant"
// },
// {
//   id:7,
// recette:70000+" DH",
// charge: 20000+" DH",
// total:50000+" DH",
// mois:"22/08/2022",
// status:"Gagnant"
// },
// {
//   id:8,
// recette:90000+" DH",
// charge: 10000+" DH",
// total:80000+" DH",
// mois:"14/09/2022",
// status:"Gagnant"
// },
// ];
  