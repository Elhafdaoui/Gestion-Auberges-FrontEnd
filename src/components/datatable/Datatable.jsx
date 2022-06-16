import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import AlertDialog from "../deleteConfirmation/dialogActivity"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import UpdateDialog from "../../pages/Modifier/modifierClient";

const Datatable = () => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      let list=[]
        fetch("http://localhost:8080/dashboard/clients").then((resp)=>{
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
    fetch(`http://localhost:8080/dashboard/clients/${id}`
      ,{
          method:"DELETE",
      })
      setData(data.filter((item) => item.id !== id));
    console.log(id)

  toast.error("Client supprimer avec succès ❗  ", {
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
            {/* <Link to="client" style={{ textDecoration: "none" }}>
              <div className="viewButton">Afficher</div>
            </Link> */}
            {/* <Link to="update" style={{ textDecoration: "none" }}>
              <div className="updateButton">Modifier</div>
            </Link> */}
           <Link to={`client/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton" >
              Afficher
            </div>
          </Link>
            
            <UpdateDialog AlertDialogDescription="Modifier Client !" buttonTitle="Formulaire"
              getRowId={params.row.id}
            />
            
            <AlertDialog 
              handleDelete = {() => handleDelete(params.row.id)} buttonTitle="Confirmation ! " 
              AlertDialogDescription=" Etes vous sûr de vouloir supprimer ce client ? "
           />
           

          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
          Clients
        <Link to="new" className="link">
        <PersonAddOutlinedIcon/>
        &#160;
          Nouveau Client
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
