import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdminHomepage from "./components/Admin/AdminHomepage";
import Dashboard from "./components/Admin/DashboardAdmin";
import ManageUser from "./components/Admin/ManageUserComponents/ManageUser";
import ManageLesson from "./components/Admin/ManageLessonComponents/ManageLesson";
import ManageVocabulary from "./components/Admin/ManageVocabularyComponents/ManageVocabulary";
import Logged from "./pages/Logged";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/Global.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import Homepage from "./components/User/Homepage";
import HeaderHomepage from "./components/User/HeaderHomepage";
import { Helmet } from "react-helmet";
import Detail_Lesson from "./pages/Detail_Lesson";
import Edit_Lesson from "./pages/Edit_Lesson";
import Remember_Card from "./pages/Remember_Card";
import Test_Lesson from "./pages/Test_Lesson";
import Result_Test from "./pages/Result_Test";
import CardPairing from "./pages/CardPairing";
import CreateLesson from "./pages/CreateLesson";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import NotPermitted from "./pages/NotPermitted";
import { useSelector } from "react-redux";
import FooterComponents from "./components/User/Footer";

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
      <FooterComponents />
    </div>
  );
};
const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith("/admin");
  const user = useSelector((state) => state.account.user);
  const userRole = user.role;
  return (
    <div className="app-container">
      {isAdminRoute && userRole === "Admin" && <AdminHomepage />}
      {isAdminRoute && userRole !== "Admin" && <NotPermitted />}
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
      {
        path: "/home",
        element: <Logged />,
      },
      {
        path: "lesson/:slug",
        element: <Detail_Lesson />,
      },
      {
        path: "lesson/edit",
        element: <Edit_Lesson />,
      },
      {
        path: "lesson/flashcard",
        element: <Remember_Card />,
      },
      {
        path: "lesson/test",
        element: <Test_Lesson />,
      },
      {
        path: "lesson/result",
        element: <Result_Test />,
      },
      {
        path: "lesson/pairing",
        element: <CardPairing />,
      },
      {
        path: "lesson/create",
        element: <CreateLesson />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
]);

export default function App() {
  return <>{<RouterProvider router={router} />}</>;
}
