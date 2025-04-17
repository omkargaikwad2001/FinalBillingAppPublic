import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../Service/CategoryService";
import { fetchItems } from "../Service/ItemService";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });
  const [itemsData, setItemsData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ added

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.name === item.name
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.itemId !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.itemId === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token") && localStorage.getItem("role")) {
        setAuthData(
          localStorage.getItem("token"),
          localStorage.getItem("role")
        );
      }

      try {
        const response = await fetchCategories();
        setCategories(response.data);
        const itemResponse = await fetchItems();
        setItemsData(itemResponse.data);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false); // ✅ done loading
      }
    }

    loadData();
  }, []);

  const setAuthData = (token, role) => {
    setAuth({ token, role });
  };

  const loadCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.log("Error loading categories", error);
    }
  };

  const clearCart = ()=>{
    setCartItems([]);
  }

  const contextValue = {
    loading, // ✅ add to context
    categories,
    setCategories,
    auth,
    setAuthData,
    itemsData,
    setItemsData,
    loadCategories,
    addToCart,
    cartItems,
    setCartItems,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
