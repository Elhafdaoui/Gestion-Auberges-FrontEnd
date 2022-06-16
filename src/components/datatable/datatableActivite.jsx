import "./dataActivite.scss";
import { DataGrid } from "@mui/x-data-grid";
import { activityColumns } from "../../dataActivites.js";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import AlertDialog from "../deleteConfirmation/dialogActivity"
import 'react-toastify/dist/ReactToastify.css';
import { toast} from "react-toastify";
import UpdateDialog from "../../pages/Modifier/modifierActivite";

const Datatable = () => {
  const [data,setData] = useState();

  useEffect(()=>{
    const fetchData = async ()=>{
      let list=[]
        fetch("http://localhost:8080/dashboard/activites").then((resp)=>{
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
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/dashboard/activites/${id}`
    ,{
        method:"DELETE",
    })
    setData(data.filter((item) => item.id !== id));
  console.log(id)

    toast.error("Activité supprimer avec succès ❗ ", {
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
      width: 200,
      renderCell: (params) => {

        return (
          <div className="cellAction">
            {/* <Link to="update" style={{ textDecoration: "none" }}>
              <div className="updateButton">Modifier</div>
            </Link> */}

            <UpdateDialog AlertDialogDescription="Modifier Activite !" buttonTitle="Formulaire"
              getRowId={params.row.id}
            />

              <AlertDialog 
              handleDelete = {() => handleDelete(params.row.id)} buttonTitle="Confirmation !" 
              AlertDialogDescription=" Etes vous sûr de vouloir supprimer cette activité ? " 
              />
            </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Activités
        <Link to="new" className="link">
        <AddIcon/>
        &#160;
          Nouvelle Activité
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={activityColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;