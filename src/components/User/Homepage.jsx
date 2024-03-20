import "../../assets/scss/Homepage.scss";
import React from "react";
import {
  DownOutlined,
  SmileOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Dropdown, Space, Row, Col, Button, Input } from "antd";
import imageRemember from "../../assets/images/imageRemember.jpg";
import imageMobile from "../../assets/images/imageMobile.jpg";
import imageTest from "../../assets/images/imageTest.jpg";
import imageTest2 from "../../assets/images/imageTest2.avif";
import Learn from "../../assets/images/Learn.svg";
import Test from "../../assets/images/Test.svg";
import Loh from "../../assets/images/Loh.svg";
import anhToan from "../../assets/images/anhToan.jpg";
import anhToan2 from "../../assets/images/anhToan2.avif";
import imageComment2 from "../../assets/images/imageComment2.avif";
import imageComment1 from "../../assets/images/imageComment1.avif";
import imageComment3 from "../../assets/images/imageComment3.avif";
import imageTeacher from "../../assets/images/imageTeacher.avif";
import homepage from "../../assets/images/homepage.jpg";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const Homepage = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="div-homepage"
        style={{ margin: "0 auto", paddingTop: "10px" }}
      >
        <div className="div-image">
          <img src={homepage} alt="" />
          <div className="div-text">
            <div className="div-text__one">
              <h2>Thẻ ghi nhớ kỹ thuật số và các công cụ học tốt nhất</h2>
            </div>
            <div className="div-text__two">
              <span>
                Tham gia cùng hơn 60 triệu học sinh đang sử dụng các thẻ ghi nhớ
                dựa trên nền tảng khoa học, các bài kiểm tra thử và lời giải
                chuyên gia của Quizlet để cải thiện điểm số và đạt được mục
                tiêu.
              </span>
            </div>
            <div className="div-text__btn">
              <Button
                type="primary"
                onClick={() => navigate("/login")}
                className="btnDivTextOne"
              >
                <span>Đăng ký miễn phí</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="div-Title">
          <span>
            90% học sinh sử dụng Quizlet cho biết họ đã cải thiện được điểm số.
          </span>
        </div>
        <div className="div-Remember">
          <div className="div-Remember_left">
            <img src={imageRemember} alt="" />
          </div>
          <div className="div-Remember_right">
            <div className="div-text__one">
              <h2>Ghi nhớ nhanh hơn, miễn phí</h2>
            </div>
            <div className="div-text__two">
              <span>
                Nghiên cứu cho thấy việc tự kiểm tra bằng thẻ ghi nhớ sẽ hiệu
                quả hơn việc đọc lại ghi chú của bạn. Từ toán học, y học đến
                ngôn ngữ hiện đại, Quizlet được học sinh sử dụng trong hơn 100
                chủ đề khác nhau.
              </span>
            </div>
            <div className="div-text__btn">
              <Button
                type="primary"
                onClick={() => navigate("/login")}
                className="btnRemember"
              >
                <span>Bắt đầu</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="div-mobile">
          <div className="div-Remember_left">
            <img src={imageMobile} alt="" />
          </div>
          <div className="div-Remember_right">
            <div className="div-text__one">
              <h2>Thời gian đi lại hôm qua, hôm nay lại là buổi học</h2>
            </div>
            <div className="div-text__two">
              <span>
                Học ở mọi nơi – ngay cả khi ngoại tuyến – với ứng dụng iOS và
                Android của chúng tôi. Tiến trình của bạn được đồng bộ hóa giữa
                điện thoại và máy tính.
              </span>
            </div>
          </div>
        </div>
        <div className="div-LearnAndTest">
          <div className="div-LearnAndTest_left">
            <div className="title">
              <h2>Sẵn sàng cho ngày thi với Học và Kiểm tra</h2>
            </div>
            <div className="text">
              <span>
                Biến thẻ ghi nhớ của bạn thành các bài kiểm tra thử có thể tùy
                chỉnh. Vượt qua sự ghi nhớ thông thường với các loại câu hỏi
                thách thức khả năng của bạn.
              </span>
            </div>
            <div className="listTask">
              <div className="listTask-item">
                <div className="div-Icon">
                  <img src={Learn} alt="" />
                </div>
                <div className="div-Text">
                  <p>Ôn luyện bằng chế độ Học</p>
                  <span>
                    Nhận phản hồi tức thì trong khi thực hành với các câu hỏi
                    trắc nghiệm, đúng hoặc sai, tự luận và hơn thế nữa.
                  </span>
                </div>
              </div>
              <div className="listTask-item">
                <div className="div-Icon">
                  <img src={Test} alt="" />
                </div>
                <div className="div-Text">
                  <p>Làm bài kiểm tra</p>
                  <span>
                    Học tập hiệu quả với các bài kiểm tra thử để bạn sẵn sàng
                    cho kỳ thi.
                  </span>
                </div>
              </div>
              <div className="listTask-item">
                <div className="div-Icon">
                  <img src={Loh} alt="" />
                </div>
                <div className="div-Text">
                  <p>Truy cập chấm điểm thông minh</p>
                  <span>
                    Tính năng chấm điểm thông minh của Quizlet đảm bảo bạn không
                    bị chấm sai vì những lỗi nhỏ.
                  </span>
                </div>
              </div>
            </div>
            <div className="btn">
              <Button
                type="primary"
                onClick={() => navigate("/login")}
                className="btnLearnAndTest"
              >
                <span>Thử miễn phí Học và Kiểm tra</span>
              </Button>
            </div>
          </div>
          <div className="div-LearnAndTest_right">
            <img src={imageTest2} alt="" />
          </div>
        </div>
        <div className="div-Math">
          <div className="div-Math_left">
            <div className="title">
              <h2>Nhận trợ giúp cho bài tập về nhà với lời giải chuyên gia</h2>
            </div>
            <div className="text">
              <span>
                Các lời giải chuyên gia Quizlet hướng dẫn cho bạn cách tiếp cận
                từng bước để giải quyết các câu hỏi khó. Tìm hàng triệu lời giải
                trong 64 chủ đề.
              </span>
            </div>
            <div className="listTask">
              <div className="listTask-item">
                <div className="div-Icon">
                  <img src={Learn} alt="" />
                </div>
                <div className="div-Text">
                  <p>Hàng nghìn cuốn sách giáo khoa</p>
                  <span>
                    Tìm lời giải cho các câu hỏi trong sách giáo khoa về toán,
                    khoa học, kinh doanh và hơn thế nữa.
                  </span>
                </div>
              </div>
              <div className="listTask-item">
                <div className="div-Icon">
                  <img src={Test} alt="" />
                </div>
                <div className="div-Text">
                  <p>Chuyên gia biên soạn</p>
                  <span>
                    Mỗi lời giải sách giáo khoa đều được biên soạn cẩn thận và
                    kiểm tra kỹ lưỡng bởi đội ngũ chuyên gia của chúng tôi.
                  </span>
                </div>
              </div>
              <div className="listTask-item">
                <div className="div-Icon">
                  <img src={Loh} alt="" />
                </div>
                <div className="div-Text">
                  <p>Học từng bước</p>
                  <span>
                    Đừng chỉ ghi nhớ, hãy hiểu rõ! Tiết lộ từng bước một để nắm
                    đảm bảo nắm rõ, và xem thử lời giải miễn phí từ mọi đầu sách
                    giáo khoa.
                  </span>
                </div>
              </div>
            </div>
            <div className="btn">
              <Button
                type="primary"
                onClick={() => navigate("/login")}
                className="btnMath"
              >
                <span>Khám phá lời giải miễn phí</span>
              </Button>
            </div>
          </div>
          <div className="div-Math_right">
            <img src={anhToan2} alt="" />
          </div>
        </div>
        <div className="div-Title">
          <span>Các học sinh nói gì về Quizlet.</span>
        </div>
        <div className="div-Comment">
          <div className="div-Comment__item">
            <div className="div-image">
              <img src={imageComment1} alt="" />
            </div>
            <div className="div-text">
              <span className="comment">
                “Quizlet đã tiếp sức cho thành công của tôi từ khi còn học trung
                học. Những tấm thẻ ghi nhớ có thể dùng ngay khi đang di chuyển
                đang hỗ trợ đắc lực cho tôi ở đại học”.
              </span>
              <span className="university"> Hamza, năm cuối, Y học</span>
            </div>
          </div>
          <div className="div-Comment__item">
            <div className="div-image">
              <img src={imageComment2} alt="" />
            </div>
            <div className="div-text">
              <span className="comment">
                “Chế độ Học là điều tuyệt vời nhất từng có từ Quizlet. Nó hiển
                thị cho bạn các thuật ngữ theo cách dễ ghi nhớ nhất."
              </span>
              <span className="university">Sydney, năm hai, Sinh học</span>
            </div>
          </div>
          <div className="div-Comment__item">
            <div className="div-image">
              <img src={imageComment3} alt="" />
            </div>
            <div className="div-text">
              <span className="comment">
                “Tất cả bạn bè của chúng tôi đều sử dụng Quizlet. Đây là một
                cách học thú vị và chúng tôi thấy tự tin hơn khi chuẩn bị cho kỳ
                thi giữa kỳ và cuối kỳ."
              </span>
              <span className="university">
                Owen & Oscar, học sinh năm hai phổ thông
              </span>
            </div>
          </div>
        </div>
        <div className="div-Teacher">
          <div className="div-Teacher_left">
            <img src={imageTeacher} alt="" />
          </div>
          <div className="div-Teacher_right">
            <div className="div-text__one">
              <h2>Truyền năng lượng cho học sinh của bạn</h2>
            </div>
            <div className="div-text__two">
              <span>
                Giúp các em tự tin học bất cứ nội dung nào, dù cho mục tiêu phấn
                đấu có là gì đi nữa. Sử dụng các học phần miễn phí, chế độ học
                và trò chơi Cột mốc trong lớp của Quizlet, bạn có thể ngay lập
                tức tạo ra một lớp học tương tác cao hơn. Học sinh và giáo viên
                có thể đăng ký và học miễn phí.
              </span>
            </div>
            <div className="div-text__btn">
              <Button
                type="primary"
                onClick={() => navigate("/login")}
                className="btnTeacher"
              >
                <span>Lập tài khoản miễn phí</span>
              </Button>
            </div>
          </div>
        </div>
        {/* <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by ThucHoang2003
        </Footer> */}
      </div>
    </>
  );
};
export default Homepage;
