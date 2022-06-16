export const chargesColumns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "charge",
      headerName: "Charges",
      width: 340,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.charge}
          </div>
        );
      },
    },

    {
      field: "dateFacturation",
      headerName: "Date Facturation",
      width: 200,
    },

    {
        field: "datePaiement",
        headerName: "Date Paiement",
        width: 200,
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
      field: "montant",
      headerName: "Montant à payer",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellMontantCharge">
            {params.row.montant}
          </div>
        );
      }
    }
  ];
  
  //temporary data
  export const chargesRows = [
    {
      id: 1,
      charges: " Facture d'électricité ",
      img: "https://www.thoughtco.com/thmb/NjWNoDg8rEZ4KVQMUq3xwp3G6tU=/735x0/lightbulblit-57a5bf6b5f9b58974aee831e.jpg",
      date_facturation:"29/01/2022",
      date_payement:"05/02/2022",
      status:"Payé",
      montant: "1209DH",
    },
    {
        id: 2,
        charges: "Facture d'eau",
        img: "https://images.news18.com/ibnlive/uploads/2021/03/1616382096_shutterstock_364247039.jpg?impolicy=website&width=510&height=356",
        date_facturation:"20/02/2022",
        date_payement:"27/02/2022",
        status: "Non payé",
        montant: "1209DH"
    },
    {
        id: 3,
        charges: "Salaires employés",
        img: "https://www.vousnousils.fr/wp-content/uploads/2014/08/%C2%A9-Dooder-Fotolia.com_.jpg",
        date_facturation:"12/05/2022",
        date_payement:"23/05/2022",
        status: "Payé",
        montant: "5200DH",
    },
    {
        id: 4,
        charges: "Local",
        img: "https://www.qcsservices.fr/wp-content/uploads/2018/03/AdobeStock_137536920-px.jpg",
        date_facturation:"30/11/2022",
        date_payement:"05/12/2022",
        status: "Non payé",
        montant: "6000DH",
    },
    {
        id: 5,
        charges: "Impôts et taxes",
        img: "http://tax-news.ma/wp-content/uploads/2019/12/impots-canada.png",
        date_facturation:"21/03/2022",
        date_payement:"26/03/2022",
        status: "Payé",
        montant: "2000DH",
    },
    {
        id: 6,
        charges: "Les assurances",
        img: "https://www.sahamassurance.ma/sites/all/themes/saham/assets/images/logo.png",
        date_facturation:"09/03/2022",
        date_payement:"13/03/2022",
        status: "Payé",
        montant: "1209DH",
      },
      {
        id: 7,
        charges: "L'abonnement",
        img: "https://www.itpedia.nl/wp-content/uploads/2018/07/wifi.png",
        date_facturation:"05/08/2022",
        date_payement:"12/08/2022",
        status: "Non payé",
        montant: "3009DH",
      },
      {
        id: 8,
        charges: "Les frais de sous-traitance",
        img: "https://cdn-bjcjo.nitrocdn.com/qFzVwCWrYNEBTXHyPVZcNoRvbiWoOUsA/assets/static/optimized/rev-b2edb6a/wp-content/uploads/2019/05/Copie-de-748x493_Blog_Template_Featured_Image-1-copia-2.jpg",
        date_facturation:"26/07/2022",
        date_payement:"27/07/2022",
        status: "Payé",
        montant: "5200DH",
      },
      {
        id: 9,
        charges: "Les intêrêts",
        img: "https://www.moneyvox.fr/i/media/06i/006452i964.jpg",
        date_facturation:"27/10/2022",
        date_payement:"02/11/2022",
        status: "Payé",
        montant: "6000DH",
      },
      {
        id: 10,
        charges: "Transport",
        img: "https://www.supplychaininfo.eu/wp-content/uploads/2019/10/transport-routier-de-marchandises.jpg",
        date_facturation:"10/10/2022",
        date_payement:"12/10/2022",
        status: "Non payé",
        montant: "2000DH",
      }
  ];
  