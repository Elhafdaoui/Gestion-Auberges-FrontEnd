import "./single.scss";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/chartClient";
import List from "../../components/table/tableClient";
import { useEffect } from "react";
import { useParams } from 'react-router';
const Single = () => {
const [data,setData]=useState({})
const {idClient}=useParams()
console.log(idClient)

useEffect(()=>{
  fetch(`http://localhost:8080/dashboard/clients/${idClient}`).then(res=>{
    res.json().then(r=>{
      setData(r)
    })
  })
},[])
console.log(data)
return (
    <>
    
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div> */}
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={data.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle"> {data.client} </h1>
                <div className="detailItem">
                <div className="detailItem">
                  <span className="itemKey">Cin:</span>
                  <span className="itemValue">{data.cin}</span>
                </div>
                  <span className="itemKey"> Email: </span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Adresse:</span>
                  <span className="itemValue">
                    {data.adresse}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Nationalité:</span>
                  <span className="itemValue">{data.nationalite}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Total payé:</span>
                  <span className="itemValue">{data.total}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Dépenses Client ( Derniers 6 Mois)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Réservations</h1>
          <List/>
        </div>
      </div>
    </div>
    </>
  );
};

export default Single;
