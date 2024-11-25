export const ROUTERS = {
  NOTFOUND: "*",
  USER: {
    HOME: "/",
    PRODUCTS: "san-pham",
    DETAILS: "/chi-tiet-san-pham",
    CONTACTS: "/lien-he",
    ABOUT: "/khac",
    CART: "/gio-hang",
    ORDERLOOKUP: "/tra-cuu-don-hang",
    LOGIN: "/dang-nhap",
    SIGNUP: "/dang-ky",
    VERITYOTP: "/xac-thuc-tai-khoan",
    CHANGEPASSWORD: "doi-mat-khau-nguoi-dung",
    ORDERPAYMENT: "/thanh-toan",
    ORDER: "/don-hang",
    PRODUCT_TYPE: "/loai-san-pham",
    ORDER_DETAIL: "/chi-tiet-don-hang",
    ORDER_STORAGE: "/don-hang-ca-nhan",
    ORDERLIST: "/danh-sach-don-hang",
    PAYMENT: "/thanh-toan",
    ADD_REVIEW: "/danh-gia-san-pham",
    GET_REVIEW: "/hien-thi-danh-gia-san-pham"
  },
  ADMIN: {
    DASHBOARD: "/admin",
    CREATE_PRODUCT: "/admin/them-san-pham",
    PRODUCT_LIST: "/admin/san-pham",
    MANAGE_STAFF: "/admin/quan-ly-nguoi-dung",
    MANAGE_PRODUCTS: "/admin/quan-ly-san-pham",
    REVENUE_STATS: "/admin/bao-cao-doanh-thu",
    PURCHASE_HISTORY: "/admin/lich-su-giao-dich",
    UPDATE_PRODUCT: "/admin/chinh-sua-san-pham",
    DELETE_PRODUCT: "/admin/xoa-san-pham",
    DETAILS_PRODUCT: "/admin/chi-tiet-san-pham",
    UPDATE_USER: "/admin/chinh-sua-tai-khoan",
    DELETE_USER: "/admin/xoa-tai-khoan",
    PRODUCTS_DETAIL: "/admin/chi-tiet-san-pham",
    MANAGER_ORDER: "/admin/quan-ly-don-hang"
  },
  USERPROFILE: {
    ACCOUNT_INFO: "/thong-tin-ca-nhan",
    ORDER_MANAGERMENT: "/quan-ly-don-hang-ca-nhan",
    VIEW_PRODUCTS: "/lich-su-san-pham",
    ADDRESS_BOOK: "/so-dia-chi"
  }
};
