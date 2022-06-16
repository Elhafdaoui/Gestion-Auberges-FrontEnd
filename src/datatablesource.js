export const userColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "client",
    headerName: "Client",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.client}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Téléphone",
    width: 230,
  },
  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "cin",
    headerName: "Cin",
    width: 160,
  },
  {
    field: "nationalite",
    headerName: "Nationalité",
    width: 180,
  },
  {
    field: "origine",
    headerName: "Origine",
    width: 200,
  },
  {
    field: "type",
    headerName: "Type",
    width: 220,
    renderCell: (params) => {
      return (
        <div className={`typeClient ${params.row.type}`}>
          {params.row.type}
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
    field: "total",
    headerName: "Total payé",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellTotal">
          {params.row.total}
        </div>
      );
    },
  },
];

// //temporary data
// export const userRows = [
//   {
//     id: 1,
//     client: "Zakaria",
//     img: "http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
//     statut: "Active",
//     email: "1zakaria@gmail.com",
//     phone:"0614505905",
//     age: 35,
//     cin:"J530808",
//     origine:"Booking",
//     nationalite:"Marocaine",
//     type:"Avec reservation",
//     total:"1000"
//   },
//   {
//     id: 2,
//     client: "Zakaria",
//     img: "http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
//     email: "2zakaria@gmail.com",
//     phone:"0614505905",
//     statut: "Passive",
//     age: 42,
//     cin:"J530808",
//     origine:"Particulier",
//     nationalite:"Francaise",
//     type:"Sans reservation",
//     total:"2500"
//   },
//   {
//     id: 3,
//     client: "Zakaria",
//     img: "http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
//     email: "3zakaria@gmail.com",
//     phone:"0614505905",
//     statut: "En cours",
//     age: 45,
//     cin:"J530808",
//     origine:"Agence de voyage",
//     nationalite:"Américaine",
//     type:"Sans reservation",
//     total:"200"
//   },
//   {
//     id: 4,
//     client: "Zakaria",
//     img: "http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
//     email: "4zakaria@gmail.com",
//     phone:"0614505905",
//     statut: "Active",
//     age: 16,
//     cin:"J530808",
//     origine:"Booking",
//     nationalite:"Espagnole",
//     type:"Avec reservation",
//     total:"1349"
//   },
//   {
//     id: 5,
//     client: "Zakaria",
//     img: "http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
//     email: "5zakaria@gmail.com",
//     phone:"0614505905",
//     statut: "Passive",
//     age: 22,
//     cin:"J530808",
//     origine:"Agence de voyage",
//     nationalite:"Italienne",
//     type:"Sans reservation",
//     total:"3213"
//   },
//   {
//     id: 6,
//     client: "Zakaria",
//     img: "http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
//     email: "6zakaria@gmail.com",
//     phone:"0614505905",
//     statut: "Active",
//     age: 15,
//     cin:"J530808",
//     origine:"Particulier",
//     nationalite:"Belge",
//     type:"Avec reservation",
//     total:"1200"
//   },
//   {
//     id: 7,
//     client: "Zakaria",
//     img: "http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
//     email: "7zakaria@gmail.com",
//     phone:"0614505905",
//     statut: "Passive",
//     age: 44,
//     cin:"J530808",
//     origine:"Agence de voyage",
//     nationalite:"Russe",
//     type:"Avec reservation",
//     total:"1450"
//   },
//   {
//     id: 8,
//     client: "Zakaria",
//     img: "http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
//     email: "8zakaria@gmail.com",
//     phone:"0614505905",
//     statut: "Active",
//     age: 36,
//     cin:"J530808",
//     origine:"Particulier",
//     nationalite:"Anglaise",
//     type:"Avec reservation",
//     total:"800"
//   },
//   {
//     id: 9,
//     client: "Zakaria",
//     img: "http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
//     email: "zakaria@gmail.com",
//     phone:"0614505905",
//     statut: "En cours",
//     age: 65,
//     cin:"J530808",
//     origine:"Booking",
//     nationalite:"Brazilienne",
//     type:"Sans reservation",
//     total:"150"
//   },
//   {
//     id: 10,
//     client: "Zakaria",
//     img: "http://m.gettywallpapers.com/wp-content/uploads/2021/03/Cool-HD-Wallpaper.jpg",
//     email: "zakaria@gmail.com",
//     phone:"0614505905",
//     statut: "Active",
//     age: 65,
//     cin:"J530808",
//     origine:"Particulier",
//     nationalite:"Marocaine",
//     type:"Sans reservation",
//     total:"100"
//   },
// ];

// export const clientRows =[
  
// ]