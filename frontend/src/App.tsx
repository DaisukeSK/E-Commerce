import { useState, useEffect, createContext } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import SignIn from "./components/SignIn";
import ShoppingCart from "./components/OptionMenus/ShoppingCart.tsx";
import ShoppingHistory from "./components/OptionMenus/ShoppingHistory.tsx";
import Setting from "./components/Setting";
import Header from "./components/Header/Header";
import Product from "./components/Product";
import Favorite from "./components/OptionMenus/Favorite.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/Homepage.tsx";
import Banner from "./components/HomePage/Banner.tsx";

import Aside from "./components/Aside.tsx";

const backendURL: string = "https://e-commerce-q1y2.onrender.com";
// const backendURL: string = "http://localhost:8080";

export type productsType = {
  category_id: number;
  description: string;
  images: Array<string>;
  price: number;
  product_id: number;
  title: string;
  product_quantity?: number;
};

export type cartType = productsType & {
  product_quantity: number;
  user_id: number;
};

export type historyType = cartType & { shopping_date: string };

export type categoriesType = {
  category_id: number;
  category_name: string;
};

type AppContextType = {
  backendURL: string;
  products: Array<productsType>;
  categories: Array<categoriesType>;
  favList: Array<number>;
  setFavList: React.Dispatch<React.SetStateAction<number[]>>;
  shoppingCart: Array<cartType>;
  setShoppingCart: React.Dispatch<React.SetStateAction<cartType[]>>;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

export function App() {
  const [products, setProducts] = useState<Array<productsType>>([]);
  const [categories, setCategories] = useState<Array<categoriesType>>([]);
  const [favList, setFavList] = useState<Array<number>>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [shoppingCart, setShoppingCart] = useState<Array<cartType>>([]);

  useEffect(() => {
    axios
      .get(
        "https://gnews.io/api/v4/top-headlines?lang=en&category=business&apikey=5ff8585f9ec438acfacef3cea3ba6587",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      )
      .then((obj1) => {
        console.log("res", obj1);
      });

    axios
      .all([
        axios.get(`${backendURL}/product/getAllProducts`),
        axios.get(`${backendURL}/product/getAllCategories`),
        axios.post(`${backendURL}/favorite/getFavorite`, {
          userId: localStorage.getItem("id")!,
        }),
        axios.post(`${backendURL}/cart/getCart`, {
          user_id: +localStorage.getItem("id")!,
        }),
      ])
      .then(
        axios.spread((obj1, obj2, obj3, obj4) => {
          setProducts([...obj1.data]);
          setCategories([...obj2.data]);
          setFavList([...obj3.data]);
          setShoppingCart([...obj4.data]);

          setLoaded(true);
        })
      );
  }, []);

  return (
    <AppContext.Provider
      value={{
        favList,
        setFavList,
        backendURL,
        products,
        categories,
        shoppingCart,
        setShoppingCart,
      }}
    >
      <BrowserRouter>
        <Header />

        {loaded ? (
          <>
            <Banner />
            <main>
              <Aside />
              <Routes>
                <Route path={"/"} element={<HomePage />}></Route>
                <Route
                  path={"/search/:search?"}
                  element={<ProductList />}
                ></Route>
                <Route
                  path={"/category/:category?"}
                  element={<ProductList />}
                ></Route>
                <Route path={"/cart"} element={<ShoppingCart />}></Route>
                <Route path={"/history"} element={<ShoppingHistory />}></Route>
                <Route path={"/favorite"} element={<Favorite />}></Route>
                <Route path={"/setting"} element={<Setting />}></Route>
                <Route path={"/signIn"} element={<SignIn />}></Route>
                {products.map((product: productsType, key: number) => {
                  return (
                    <Route
                      key={key}
                      path={`/product/${product.product_id}`}
                      element={<Product product={product} />}
                    ></Route>
                  );
                })}
              </Routes>
            </main>
          </>
        ) : (
          <div className="loading">
            <div className="spin"></div>
            <div className="message">
              <span>
                Loading...
                <br />
                It may take up to 1 minute.
              </span>
              <span>
                Please wait while
                <br />
                waking up the server.
              </span>
            </div>
          </div>
        )}
      </BrowserRouter>
    </AppContext.Provider>
  );
}
