import "../assets/scss/Logged.scss";
import imageLogin from "../assets/images/imageLogin.png";
import imageTest from "../assets/images/imageTest.jpg";
import imageRemember from "../assets/images/imageRemember.jpg";
import RenderLessons from "../components/User/RenderLessons";
import RenderLessonByAnotherUser from "../components/User/RenderLessonByAnotherUser";
import { useEffect } from "react";
import { getUserByID } from "../apiService/user.service";
import { useDispatch } from "react-redux";
import { doLogin } from "../redux/counter/accountSlice";
import { getLesson } from "../redux/counter/lessonSlice";
import { getAllLessonByUserId } from "../apiService/lesson.service";
import { useLocation } from "react-router-dom";
const Logged = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  let params = new URLSearchParams(location.search);
  const getData = async () => {
    if (params) {
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const userId = params.get("userid");
      if (accessToken && refreshToken && userId) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        const [userData, lessonData] = await Promise.all([
          getUserByID(userId),
          getAllLessonByUserId(userId),
        ]);
        dispatch(doLogin(userData.data));
        dispatch(getLesson(lessonData));
        window.location.href = "/home";
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div style={{ width: "100%", backgroundColor: "#f6f7fb" }}>
        <div className="main-container">
          <span className="title">Hãy thử các tính năng cập nhật này</span>
          <div className="divContentUpdate">
            <div className="divContentUpdate-item">
              <div className="divContentUpdate-item__img">
                <img src={imageRemember} alt="" />
              </div>
              <div
                className="divContentUpdate-item__text"
                style={{ backgroundColor: "rgba(237, 239, 255,0.9)" }}
              >
                <span className="Label">Tìm kiếm mạnh mẽ hơn</span>
                <span className="content">
                  Tìm thẻ ghi nhớ bạn cần để học về bất kỳ chủ đề nào
                </span>
              </div>
            </div>
            <div className="divContentUpdate-item">
              <div className="divContentUpdate-item__img">
                <img src={imageTest} alt="" />
              </div>
              <div
                className="divContentUpdate-item__text"
                style={{ backgroundColor: "rgba(255, 220, 98, 0.7)" }}
              >
                <span className="Label">Cải thiện điểm số với chế độ Học</span>
                <span className="content">
                  Học với các câu hỏi hay hơn, kiểm soát nhiều hơn, và gợi ý
                </span>
              </div>
            </div>
            <div className="divContentUpdate-item">
              <div className="divContentUpdate-item__img">
                <img src={imageLogin} alt="" />
              </div>
              <div
                className="divContentUpdate-item__text"
                style={{ backgroundColor: "rgba(238, 170, 255, 0.7)" }}
              >
                <span className="Label">Hãy sẵn sàng cho kỳ thi</span>
                <span className="content">
                  Kiểm tra với gợi ý và chỉ dẫn học được tăng cường AI
                </span>
              </div>
            </div>
          </div>
        </div>
        <RenderLessons />
        <RenderLessonByAnotherUser />
      </div>
    </>
  );
};
export default Logged;
