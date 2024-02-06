import getProducts from "@/actions/getProducts";
import Dashboard from "./Dashboard";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";

const Admin = async () => {
  const products = await getProducts({ category: null });
  const users = await getUsers();
  const orders = await getOrders();
  const graphData = await getGraphData();
  return (
    <div className="pt-8">
      <Container>
        <Dashboard products={products} users={users} orders={orders} />
        <div className="mt-4 mx-auto max-w-[1150px]">
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  );
};

export default Admin;
