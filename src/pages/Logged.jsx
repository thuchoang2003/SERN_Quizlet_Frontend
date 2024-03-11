import "../assets/scss/Logged.scss";
import imageLogin from "../assets/images/imageLogin.png";
import imageTest from "../assets/images/imageTest.jpg";
import imageRemember from "../assets/images/imageRemember.jpg";
import RenderLessons from "../components/User/RenderLessons";
import RenderLessonByAnotherUser from "../components/User/RenderLessonByAnotherUser";
const Logged = (props) => {
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
