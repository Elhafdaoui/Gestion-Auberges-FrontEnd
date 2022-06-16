export const utilisateurColumns = [
    // { field: "id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "Utilisateur",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
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
      field: "roles",
      headerName: "Role",
      width: 160,
    },
]
  
