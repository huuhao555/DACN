
import './style.scss'
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";


const ProductDetailsComponent = () => {
    return (
        <div className='product-body'>
            <div className='container'>
                <div className='row'>
                    <div className='col-xl-12'> <div className='product-inner'>
                        <div className='product-main'>
                            <div className='d-flex flex-wrap'>
                                <div className='col-lg-4 product-image'>
                                    <img src={require("../../assets/users/product/macbook/mac_air_m2.png")}
                                        style={{ width: "375px" }}
                                        alt='Product Macbook' />
                                </div>
                                <div className='col-lg-7 product-info'>
                                    <div className='info-content'>
                                        <div className='info-top'>
                                            <div className='product-name'>
                                                <h1>MACBOOK PRO MAX EXTRA VIP VAA</h1>
                                            </div>
                                            <div className='product-rating'>
                                                <span className='number'>0.0</span>
                                                <span className='icon'><AiFillStar /></span>
                                            </div>
                                        </div>
                                        <div className='info-bottom'>
                                            <div></div>
                                            <div></div>
                                            <div className='action-buys'>
                                                <button type="submit" class="button btn-buyonl" name="buy-onl" id="buy-onl">
                                                    <span className='icon-addtocart'><AiOutlineShoppingCart /></span>
                                                    Thêm vào giỏ
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div></div>

                    <div className='col-xl-7'>
                        <h3>heasds</h3>
                    </div>
                    <div className='col-xl-5'>
                        <h4>asdasdsa</h4>
                    </div>
                    <div className='col-xl-12'>
                        <h4>adsadasd</h4>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProductDetailsComponent