import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdminHomepage from "./components/Admin/AdminHomepage";
import Dashboard from "./components/Admin/DashboardAdmin";
import ManageUser from "./components/Admin/ManageUserComponents/ManageUser";
import ManageLesson from "./components/Admin/ManageLessonComponents/ManageLesson";
import ManageVocabulary from "./components/Admin/ManageVocabularyComponents/ManageVocabulary";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/Global.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import Homepage from "./components/User/Homepage";
import HeaderHomepage from "./components/User/HeaderHomepage";
import { Helmet } from "react-helmet";

const LayoutUser = () => {
  return (
    <div className="app-container">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
        />
      </Helmet>
      <HeaderHomepage />
      <Outlet />
    </div>
  );
};
const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  //  const user = useSelector((state) => state.account.user);
  //  const userRole = user.role;
  return (
    <div className="app-container">
      {isAdminRoute && <AdminHomepage />}
      {/* {isAdminRoute && userRole === "USER" && <NotPermitted />} */}
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <LayoutAdmin />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "user",
        element: <ManageUser />,
      },
      {
        path: "lesson",
        element: <ManageLesson />,
      },
      {
        path: "vocabulary",
        element: (
          <PerfectScrollbar>
            <ManageVocabulary />
          </PerfectScrollbar>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <LayoutUser />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          // <PerfectScrollbar>
          <Homepage />
          // </PerfectScrollbar>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <NotFound />,
  },
]);

export default function App() {
  return <>{<RouterProvider router={router} />}</>;
}
