import { memo, useState, useEffect } from "react"
import "./style.scss"
import {AiOutlineSkype,
    AiOutlineInstagram,
    AiOutlineFacebook,
    AiOutlineUser,
    AiOutlineMail,
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiOutlineRight,
    AiOutlinePhone,
} from "react-icons/ai";
import {Link} from 'react-router-dom'
import { ROUTERS } from '../../../../utils/router';

const Header = () =>{

    const [menusHeader, setMenusHeader] = useState([
        {
            name: "Trang chủ",
            path: ROUTERS.USER.HOME
        },
        {
            name: "Sản phẩm",
            path: ROUTERS.USER.PRODUCTS,
            isShowSubmenu: false,
            child:[
                {
                    name: 'Laptop Gamming',
                    path: '#'
                },
                {
                    name: 'Laptop Văn phòng',
                    path: '#'
                }
            ]
        },
        {
            name: "Liên hệ",
            path: ROUTERS.USER.CONTACTS
        },
        {
            name: "Tra cứu",
            path: ROUTERS.USER.ORDERLOOKUP
        },

    ]);

    const [menuCategories, setMenuCategories] = useState([
        {
            name: 'Điện thoại, Tablet',
            icon: <AiOutlineRight />,
            path: ROUTERS.USER.PRODUCTS,
            child: [
                {
                    name: 'Iphone',
                    path: ROUTERS.USER.PRODUCTS,
                },
                {
                    name: 'Samsung',
                    path: ROUTERS.USER.PRODUCTS,
                }
            ]
        },
        {
            name: 'Laptop',
            icon: <AiOutlineRight />,
            path: ROUTERS.USER.PRODUCTS,
            child: [
                {
                    name: 'MAC',
                    path: ROUTERS.USER.PRODUCTS,
                },
                {
                    name: 'ASUS',
                    path: ROUTERS.USER.PRODUCTS,
                }
            ]
        },
        {
            name: 'Âm thanh',
            icon: <AiOutlineRight />,
            path:  ROUTERS.USER.PRODUCTS,
        },
        {
            name: 'Đồ gia dụng',
            icon: <AiOutlineRight />,
            path:  ROUTERS.USER.PRODUCTS,
        },
        {
            name: 'Phụ kiện',
            icon: <AiOutlineRight />,
            path:  ROUTERS.USER.PRODUCTS,
        },
        {
            name: 'Máy tính để bàn',
            icon: <AiOutlineRight />,
            path:  ROUTERS.USER.PRODUCTS,
        },
        {
            name: 'Màn hình',
            icon: <AiOutlineRight />,
            path:  ROUTERS.USER.PRODUCTS,
        },
        {
            name: 'Tivi',
            icon: <AiOutlineRight />,
            path:  ROUTERS.USER.PRODUCTS,
        },
    ]);

    const images = [
        {
            urlImage :require('../../../../assets/users/slider.webp')
        }, 
        {
            urlImage :require('../../../../assets/users/slider2.jpg')
        }, 
        {
            urlImage :require('../../../../assets/users/slider3.png')
        }
    ];
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCounter) => (prevCounter + 1) % images.length);
        }, 3000); 

        return () => {
            clearInterval(interval); 
        };
    }, []);

    return (
    <>
    <div className="header-top">
        <div className="container">
            <div className="header-pr">
                <ul>
                    <li>Miễn phí giao hàng toàn quốc</li>
                    <li>Sản phẩm chính hãng</li>
                    <li>Xuất biên lai VAT</li>
                    <li>Thu cũ - Đổi mới - Lên đời</li>
              </ul>
            </div>
           
        </div>
    </div>
    <div className="header-main">
    <div className="container ">
        <div className="row">
            <div className="col-xl-3">
                <div className="header-logo">
                    <Link to={ROUTERS.USER.HOME}><img style={{width: "50px", height: 'auto'}} src={require('../../../../assets/users/icon0.png')}/></Link>
                </div>
            </div>
            <div className="col-xl-6">
            <nav className="header-menu">
                    <ul>
                        {menusHeader?.map((menu, menuKey) => {
                            return (
                                <li key={menuKey} className={menuKey === 0 ? "active" : ""}>
                                    <Link to={menu.path}>{menu?.name}</Link>
                                    {/* {menu.child && menu.child.length > 0 && (
                                        <ul className="header-menu-dropdown">
                                            {menu.child.map((childItem, childKey) => (
                                                <li key={`${menuKey}-${childKey}`} className={menuKey === 0 ? "active" : ""}>
                                                <Link to={childItem.path}>{childItem.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )} */}
                                </li>
                            )
                        })}
                    </ul>
            </nav>
</div>

            <div className="col-xl-3">
                <div className="header-cart">
                    <ul>
                        <li> 
                            <Link to="">
                            <AiOutlineHeart />
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                            <AiOutlineShoppingCart />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div className="header-content">
       <div className="container">
            <div className="row categories-container">
                <div className="col-lg-3">
                    <nav className="categories-list" >
                        <ul className="categories-menu">
                           {
                            menuCategories.map((itemCategory, keyCategory) => {
                                return (
                                    <li key={keyCategory} ><Link to={itemCategory.path}>{itemCategory.name} {itemCategory.icon} </Link> </li>
                                )
                            })
                           }
                        </ul>
                    </nav>
                    
                </div>
                <div className="col-lg-9 search-container">
                    <div className="search">
                           <div className="search-form">
                                <form>
                                    <input 
                                        type="text" 
                                        name="" 
                                        value=""
                                        placeholder="Bạn cần tìm kiếm gì?"
                                        />
                                    <button type="submit">Tìm kiếm</button>
                                </form>
                           </div>
                           <div className="search-phone">
                                <div className="search-phone-icon" style={{display: 'block'}}>
                                    <AiOutlinePhone/>
                                </div>
                                <div className="search-phone-number">
                                    <p>Hotline: 0987.654.321</p>
                                    <span>Hỗ trợ 24/7</span>
                                </div>
                           </div>
                           
                    </div>
                    <div className="item-home">
            <img 
            src={images[counter].urlImage} 
            alt={`slider-${counter}`} 
            style={{
                paddingTop: '16px', 
                width: '100%', 
                height: '300px', 
                objectFit: 'cover'  
  }}  />
        </div>
                </div>
            </div>
       </div>
    </div>
    </>
    )
}

export default memo(Header)