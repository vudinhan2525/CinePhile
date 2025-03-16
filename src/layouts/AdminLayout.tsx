
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default AdminLayout;
