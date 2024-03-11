import { Button, Result } from "antd";
import "../assets/scss/NotPermitted.scss";
import { useNavigate } from "react-router-dom";
const NotPermitted = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        iconFontSize={100}
        subtitleFontSize={30}
        titleFontSize={25}
        extra={
          <Button type="primary" onClick={() => navigate("/home")}>
            Back Home
          </Button>
        }
        className="custom-result"
      />
    </>
  );
};
export default NotPermitted;
