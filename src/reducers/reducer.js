// reducer.js
import {
  TOGGLE_SIDEBAR,
  LOGIN_SUCCESS,
  LOGOUT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from "../actions/actionTypes";

const initialState = {
  isSidebarOpen: false,
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  cartItems: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case LOGIN_SUCCESS:      
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.title,
        isAdmin: action.payload.check
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case ADD_TO_CART:
      console.log(action.payload);
      // Kiểm tra xem món hàng đã tồn tại trong giỏ hàng chưa
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log(existingItemIndex);

      if (existingItemIndex !== -1) {
        // Nếu món hàng đã tồn tại, tăng số lượng lên một
        console.log(state.cartItems);
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // Nếu món hàng chưa tồn tại, thêm vào giỏ hàng
        console.log(state.cartItems);              
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
                    
      }
    case REMOVE_FROM_CART:
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    default:
      return state;
  }
};

export default reducer;
