import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { toast } from "react-toastify";

const Home = () => {


  toast.configure({
      autoClose: 2500,
      draggable: true,
    });
        toast.info("Bienvenue à l'auberge 🤗😁 !", {
          theme:"colored",
          position: "top-left",
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          toastId:1,
        });


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Les 6 Derniers Mois (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Dernières réservations</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
