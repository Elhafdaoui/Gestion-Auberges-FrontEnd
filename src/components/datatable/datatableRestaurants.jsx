import "./dataRestaurant.scss";
import { DataGrid } from "@mui/x-data-grid";
import { restaurantColumns } from "../../dataRestaurants";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import AlertDialog from "../deleteConfirmation/dialogActivity"
import 'react-toastify/dist/ReactToastify.css';
import { toast} from "react-toastify";
import UpdateDialog from "../../pages/Modifier/modifierRestaurant";

  const Datatable = () => {
  const [data, setData] = useState();

  useEffect(()=>{
    const fetchData = async ()=>{
      let list=[]
        fetch("http://localhost:8080/dashboard/restaurants").then((resp)=>{
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
    fetch(`http://localhost:8080/dashboard/restaurants/${id}`
    ,{
        method:"DELETE",
    })
    setData(data.filter((item) => item.id !== id));
  console.log(id)

  toast.error("Restaurant supprimer avec succès ❗ ", {
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
            <UpdateDialog AlertDialogDescription="Modifier Restaurant !" buttonTitle="Formulaire"
              getRowId={params.row.id}
            />
            <AlertDialog 
              handleDelete={()=>handleDelete(params.row.id)} buttonTitle="Confirmation !" 
              AlertDialogDescription=" Etes vous sûr de vouloir supprimer ce restaurant ? "
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
         Restaurants
        <Link to="new" className="link">
        <AddIcon/>
        &#160;
          Nouveau Restaurant
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={restaurantColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
