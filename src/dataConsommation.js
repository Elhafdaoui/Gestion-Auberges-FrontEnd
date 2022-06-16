export const consommationColumns = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "produit",
      headerName: "Produit",
      width: 230,
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
        headerName: "Prix consommation",
        width: 230,
        renderCell: (params) => {
            return (
              <div className="cellPrix">
                {params.row.prix}
              </div>
            );
          },
      },
    {
        field: "client",
        headerName: "Client",
        width: 260,        
      },
      {
        field: "cin",
        headerName: "Cin",
        width: 200,
      },
      {
        field: "email",
        headerName: "Email",
        width: 280,
      },
      {
        field: "phone",
        headerName: "Téléphone",
        width: 230,
      },
    {
        field: "quantite",
        headerName: "Quantité",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellQuantite">
              {params.row.quantite}
            </div>
          );
        },
    },
      {
        field: "restaurant",
        headerName: "Restaurant",
        width: 230,
    },
    {
      field: "date",
      headerName: "Date",
      width: 230,
  },
  {
    field: "heure",
    headerName: "Heure",
    width: 170,
},
    {
        field:"recette",
        headerName:"Recette",
        width:150,
        renderCell: (params) => {
          return (
            <div className="cellRecette">
              {params.row.recette}
            </div>
          );
        },
    }
  ];
  
  //temporary data
  export const consommationRows = [
      {
        id: 1,
        img:"https://assets.afcdn.com/recipe/20200227/108291_w1200h1800c1cx1824cy2736cxb3648cyb5472.webp",
        consommation:"Poulet",
        prix:"50",
        img1:"http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
        client:"El Hafdaoui Zakaria",
        cin:"J530808",
        quantité:2,
        img2: "https://mylittlekech.com/wp-content/uploads/2017/08/restaurants-a-marrakech.jpg",
        restaurant: "Restaurant 1",
        recette:"563"
    },
    {
        id: 2,
        img:"https://assets.afcdn.com/recipe/20200227/108291_w1200h1800c1cx1824cy2736cxb3648cyb5472.webp",
        consommation:"Poulet",
        prix:"50",
        img1:"http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
        client:"El Hafdaoui Zakaria",
        cin:"J530808",
        quantité:2,
        img2: "https://mylittlekech.com/wp-content/uploads/2017/08/restaurants-a-marrakech.jpg",
        restaurant: "Restaurant 1",
        recette:"563"
    },
    {
        id: 3,
        img:"https://assets.afcdn.com/recipe/20200227/108291_w1200h1800c1cx1824cy2736cxb3648cyb5472.webp",
        consommation:"Poulet",
        prix:"50",
        img1:"http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
        client:"El Hafdaoui Zakaria",
        cin:"J530808",
        quantité:2,
        img2: "https://mylittlekech.com/wp-content/uploads/2017/08/restaurants-a-marrakech.jpg",
        restaurant: "Restaurant 1",
        recette:"563"
    },
    {
        id: 4,
        img:"https://assets.afcdn.com/recipe/20200227/108291_w1200h1800c1cx1824cy2736cxb3648cyb5472.webp",
        consommation:"Poulet",
        prix:"50",
        img1:"http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
        client:"El Hafdaoui Zakaria",
        cin:"J530808",
        quantité:2,
        img2: "https://mylittlekech.com/wp-content/uploads/2017/08/restaurants-a-marrakech.jpg",
        restaurant: "Restaurant 1",
        recette:"563"
    },
    {
        id: 5,
        img:"https://assets.afcdn.com/recipe/20200227/108291_w1200h1800c1cx1824cy2736cxb3648cyb5472.webp",
        consommation:"Poulet",
        prix:"50",
        img1:"http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
        client:"El Hafdaoui Zakaria",
        cin:"J530808",
        quantité:2,
        img2: "https://mylittlekech.com/wp-content/uploads/2017/08/restaurants-a-marrakech.jpg",
        restaurant: "Restaurant 1",
        recette:"563"
    },
    {
        id: 6,
        img:"https://assets.afcdn.com/recipe/20200227/108291_w1200h1800c1cx1824cy2736cxb3648cyb5472.webp",
        consommation:"Poulet",
        prix:"50",
        img1:"http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
        client:"El Hafdaoui Zakaria",
        cin:"J530808",
        quantité:2,
        img2: "https://mylittlekech.com/wp-content/uploads/2017/08/restaurants-a-marrakech.jpg",
        restaurant: "Restaurant 1",
        recette:"563"
    },
    {
        id: 7,
        img:"https://assets.afcdn.com/recipe/20200227/108291_w1200h1800c1cx1824cy2736cxb3648cyb5472.webp",
        consommation:"Poulet",
        prix:"50",
        img1:"http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
        client:"El Hafdaoui Zakaria",
        cin:"J530808",
        quantité:2,
        img2: "https://mylittlekech.com/wp-content/uploads/2017/08/restaurants-a-marrakech.jpg",
        restaurant: "Restaurant 1",
        recette:"563"
    },
    {
        id: 8,
        img:"https://assets.afcdn.com/recipe/20200227/108291_w1200h1800c1cx1824cy2736cxb3648cyb5472.webp",
        consommation:"Poulet",
        prix:"50",
        img1:"http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
        client:"El Hafdaoui Zakaria",
        cin:"J530808",
        quantité:2,
        img2: "https://mylittlekech.com/wp-content/uploads/2017/08/restaurants-a-marrakech.jpg",
        restaurant: "Restaurant 1",
        recette:"563"
    },
    {
        id: 9,
        img:"https://assets.afcdn.com/recipe/20200227/108291_w1200h1800c1cx1824cy2736cxb3648cyb5472.webp",
        consommation:"Poulet",
        prix:"50",
        img1:"http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
        client:"El Hafdaoui Zakaria",
        cin:"J530808",
        quantité:2,
        img2: "https://mylittlekech.com/wp-content/uploads/2017/08/restaurants-a-marrakech.jpg",
        restaurant: "Restaurant 1",
        recette:"563"
    },
    {
        id: 10,
        img:"https://assets.afcdn.com/recipe/20200227/108291_w1200h1800c1cx1824cy2736cxb3648cyb5472.webp",
        consommation:"Poulet",
        prix:"50",
        img1:"http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
        client:"El Hafdaoui Zakaria",
        cin:"J530808",
        quantité:2,
        img2: "https://mylittlekech.com/wp-content/uploads/2017/08/restaurants-a-marrakech.jpg",
        restaurant: "Restaurant 1",
        recette:"563"
    },
    {
        id: 11,
        img:"https://assets.afcdn.com/recipe/20200227/108291_w1200h1800c1cx1824cy2736cxb3648cyb5472.webp",
        consommation:"Poulet",
        prix:"50",
        img1:"http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
        client:"El Hafdaoui Zakaria",
        cin:"J530808",
        quantité:2,
        img2: "https://mylittlekech.com/wp-content/uploads/2017/08/restaurants-a-marrakech.jpg",
        restaurant: "Restaurant 1",
        recette:"563"
    },
    {
        id: 12,
        img:"https://assets.afcdn.com/recipe/20200227/108291_w1200h1800c1cx1824cy2736cxb3648cyb5472.webp",
        consommation:"Poulet",
        prix:"50",
        img1:"http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
        client:"El Hafdaoui Zakaria",
        cin:"J530808",
        quantité:2,
        img2: "https://mylittlekech.com/wp-content/uploads/2017/08/restaurants-a-marrakech.jpg",
        restaurant: "Restaurant 1",
        recette:"563"
    },
];
  