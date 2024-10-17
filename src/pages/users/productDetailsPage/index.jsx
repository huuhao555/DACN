import { useLocation } from "react-router-dom";
import "./style.scss";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
const ProductDetailsPage = () => {
  const location = useLocation();
  const { product } = location.state || {};

  const TableRow = ({ label, value }) => (
    <tr style={{ boxSizing: "border-box" }} className='row-info'>
      <td style={{
        background: "#f7f7f7",
        borderColor: "#eeeeee",
        borderStyle: "solid",
        borderWidth: "1px",
        boxSizing: "border-box",
        padding: "8px",
        verticalAlign: "top",
        width: "219px"
      }}>
        <span className=''><strong>{label}</strong></span>
      </td>
      <td style={{
        borderColor: "#eeeeee",
        borderStyle: "solid",
        borderWidth: "1px",
        padding: "8px",
        verticalAlign: "top"
      }}>
        {value}
      </td>
    </tr>
  );

  return (
    <div className="product-body">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            {" "}
            <div className="product-inner">
              <div className="product-main">
                <div className="d-flex flex-wrap">
                  <div className="col-lg-4 product-image">
                    <Zoom>
                      <img
                        src={product.Image}
                        style={{ width: "375px" }}
                        alt={product.Type_name}
                      />
                    </Zoom>
                  </div>
                  <div className="col-lg-7 product-info">
                    <div className="info-content">
                      <div className="info-top">
                        <div className="product-name">
                          <h1>{`${product.Company} ${product.Type_name} `}</h1>
                        </div>
                        <div className="product-rating">
                          <span className="number">0.0</span>
                          <span className="icon">
                            <AiFillStar />
                          </span>
                        </div>
                      </div>
                      <div className="product-description">
                        <span>{`${product.Description}`}</span>
                      </div>
                      <div className="info-bottom">
                        <div className="action-buys">
                          <button
                            type="submit"
                            class="button btn-buyonl"
                            name="buy-onl"
                            id="buy-onl"
                          >
                            <span className="icon-addtocart">
                              <AiOutlineShoppingCart />
                            </span>
                            Thêm vào giỏ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-7 col-sm-12 col-12'>
            <div className='product-inner'>
              <div className='product-block'>
                <div className='product-heading'>
                  <h2>Thông tin sản phẩm</h2>
                </div>
                <div className='product-wrap'>
                  <div className='product-desc--content'>
                    <div className='desc-content'>
                      <h2>
                        <span style={{ fontSize: "22px" }}>
                          <strong>Thông số kĩ thuật:</strong>
                        </span>
                      </h2>
                      <div className='table-info'>
                        <table border={1} cellPadding={3} cellSpacing={0} className='table-border'>
                          <tbody style={{ boxSizing: "border-box" }}>
                            {Object.entries(product).map(([key, value], index) => (
                              <TableRow key={index} label={key} value={value} />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-5 col-sm-12 col-12'>
            <div className='product-inner'>
              <div className='product-block'>
                <div className='product-heading'>
                  <h2>Sản phẩm tương tự</h2>
                </div>
                <div className='product-wrap'>
                  {/* <div className='list-proloop'>
                    <div className='proloop' data-id='1'>
                      <div className='proloop-block' data-variantid="0">
                        <div className='proloop-img'>
                          <picture className=''>
                            <img src={product.Image} alt="" />
                          </picture>
                        </div>
                        <div className='proloop-detail'>
                          <h3>hello</h3>
                        </div>
                      </div>
                    </div>
                    <div className='proloop' data-id='2'>
                      <div className='proloop-block' data-variantid="0">
                        <div className='proloop-img'>
                          <picture><img src={product.Image} alt="" /></picture>
                        </div>
                        <div className='proloop-detail'>
                          <h3>hello</h3>
                        </div>
                      </div>
                    </div>
                    <div className='proloop' data-id='2'>
                      <div className='proloop-block' data-variantid="0">
                        <div className='proloop-img'>
                          <picture><img src={product.Image} alt="" /></picture>
                        </div>
                        <div className='proloop-detail'>
                          <h3>hello</h3>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className='col-xl-12 col-sm-12 col-12'>
            <div className='product-inner' id='customers-rating'>
              <div className='product-block'>
                <div className='product-heading'>
                  <h2>Đánh giá &amp; Nhận xét </h2>
                </div>
                <div className='product-wrap'>
                  <div class="comment-form">
                    <div class="row">
                      <div class="col-lg-7 col-12">
                        <form class="form-contact comment_form" action="#" id="commentForm">
                          <div class="row">
                            <div class="col-12">
                              <div class="form-group">
                                <textarea class="form-control w-100" name="comment" id="comment" cols="30" rows="9" placeholder="Write Comment" style={{ height: "15px" }}></textarea>
                              </div>
                            </div>
                            <div class="col-sm-6">
                              <div class="form-group">
                                <input class="form-control" name="name" id="name" type="text" placeholder="Name" />
                              </div>
                            </div>
                            <div class="col-sm-6">
                              <div class="form-group">
                                <input class="form-control" name="email" id="email" type="email" placeholder="Email" />
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="form-group">
                                <input class="form-control" name="website" id="website" type="text" placeholder="Website" />
                              </div>
                            </div>
                          </div>
                          <div class="form-group">
                            <button type="submit" class="button button-contactForm">Đánh giá</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
