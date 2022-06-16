import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { utilisateurColumns } from "../../dataUtilisateurs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import AlertDialog from "../deleteConfirmation/dialogActivity"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import UpdateDialog from "../../pages/Modifier/modifierUtilisateur"

const Datatable = () => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      let list=[]
        fetch("http://localhost:8080/dashboard/users").then((resp)=>{
         resp.json().then((data)=>{
           data.forEach(element=>{
             list.push(element)
           })
           setData(list)
         })
        })

    }
    fetchData()
  },[])

  toast.configure({
    autoClose: 2500,
    draggable: true,
  });

  const handleDelete = async (id) => {
    fetch(`http://localhost:8080/dashboard/users/${id}`
      ,{
          method:"DELETE",
      })
      setData(data.filter((item) => item.id !== id));
    console.log(id)

  toast.error("Utilisateur supprimer avec succès ❗  ", {
  theme:"colored",
  position: "bottom-right",
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});
};

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
          // console.log(params.row.id)
        return (
          <div className="cellAction">

            <UpdateDialog AlertDialogDescription="Modifier Utilisateur !" buttonTitle="Formulaire"
              getRowId={params.row.id}
            />
            
            <AlertDialog 
              handleDelete = {() => handleDelete(params.row.id)} buttonTitle="Confirmation ! " 
              AlertDialogDescription=" Etes vous sûr de vouloir supprimer cet utilisateur ? "
           />
           

          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
          Utilisateur
        <Link to="/signup" className="link">
        <PersonAddOutlinedIcon/>
        &#160;
          Nouveau Utilisateur
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={utilisateurColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
