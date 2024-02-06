import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Shop-App Admin",
  description: "Shop-App Admin dashboard",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>
        <AdminNav />
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;
