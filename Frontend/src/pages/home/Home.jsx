import "./Home.css";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useCategories } from "../../utility/CategoryContext";
import { useProductContext } from "../../utility/ProductContext"; // Ensure this path is correct

import Slider from "react-slick";

import Banner from "../../components/Banners/Banner";
import CatSlider from "../../components/CatSlider/CatSlider";
import HomeSlider from "./HomeSlider";
import Product from "../../components/Product/Product";

import Banner1 from "./images/banner.jpg";
import Banner2 from "./images/banner1.jpg";
import Banner3 from "./images/banner2.jpg";
import Banner4 from "./images/banner3.jpg";
import Banner5 from "./images/banner4.jpg";
import TopPro from "./TopProducts/TopPro";
import TopProduct1 from "./images/toppro1.jpg";
import TopProduct2 from "./images/toppro2.jpg";
import TopProduct3 from "./images/toppro3.jpg";

const Home = () => {
  const { categories, loading: catLoading, error: catError } = useCategories();
  const {
    products,
    loading: prodLoading,
    error: prodError,
    fetchAllProducts,
  } = useProductContext();

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch all products when the component mounts
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Handle loading and error states
  if (catLoading || prodLoading) {
    return <div>Loading...</div>;
  }

  if (catError || prodError) {
    return <div>Error: {catError?.message || prodError}</div>;
  }

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.categoryName === selectedCategory);

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  // Top products data
  const tProducts = [
    {
      id: 1,
      name: "Minimalist Anti-Acne Kit, Skincare Routine Kit for Unisex...",
      image: TopProduct3,
      rating: 4.5,
      price: 1077,
      oldPrice: 1199,
    },
    {
      id: 2,
      name: "MYFITNESS Peanut Butter Chocolate 1.25kg",
      image: TopProduct1,
      rating: 4.0,
      price: 250,
      oldPrice: 450,
    },
    {
      id: 3,
      name: "Cadbury Dairy Milk Silk Chocolate Bar, 150 g (Pack of 3)",
      image: TopProduct2,
      rating: 4.7,
      price: 554,
      oldPrice: 650,
    },
  ];

  return (
    <>
      <HomeSlider />
      <CatSlider />
      <Banner />

      {/* Popular Products Section */}
      <section className="homeProducts">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <h2 className="hd mb-0 mt-0 mx-1">Popular Products</h2>
            <ul className="list list-inline ml-auto filterTab mb-0">
              {/* All Category Filter */}
              <li className="list-inline-item">
                <a
                  className={`cursor ${
                    selectedCategory === "All" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory("All")}
                >
                  All
                </a>
              </li>
              {/* Dynamically render parent categories */}
              {categories.slice(0, 7).map((category) => (
                <li className="list-inline-item" key={category.id}>
                  <Link
                    className="cursor"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="row productRow pt-2">
            {filteredProducts.length > 0 ? (
              filteredProducts
                .slice(0, 10) // Select only 10 products
                .reverse()
                .map((product) => (
                  <div className="item" key={product.productId}>
                    <Product product={product} />
                  </div>
                ))
            ) : (
              <div>No products available in this category.</div>
            )}
          </div>
        </div>
      </section>

      {/* Banners Section */}
      <div className="bannersSection pt-0 pb-0">
        <div className="container-fluid">
          <div className="row">
            <ul className="d-flex align-items-center">
              <li className="item item-inline">
                <img src={Banner4} alt="Banner 4" />
              </li>
              <li className="item item-inline">
                <img src={Banner3} alt="Banner 3" />
              </li>
              <li className="item item-inline">
                <img src={Banner2} alt="Banner 2" />
              </li>
              <li className="item item-inline">
                <img src={Banner5} alt="Banner 5" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Top Products Section */}
      <section className="topProductsSection p-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <TopPro title="Top Selling" products={tProducts} />
            </div>
            <div className="col">
              <TopPro title="Trending Products" products={tProducts} />
            </div>
            <div className="col">
              <TopPro title="Recently added" products={tProducts} />
            </div>
            <div className="col">
              <TopPro title="Top Rated" products={tProducts} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="homeProducts homeProductsRow2">
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <h2 className="hd mb-0 mt-0 mx-1">Featured Products</h2>
          </div>
          <br />
          <div className="row">
            <div className="col-md-3 pr-5 proBanner">
              <img src={Banner1} alt="Banner" className="w-100 transition" />
            </div>
            <div className="col-md-9">
              <Slider {...settings} className="prodSlider">
                {products.map((product) => (
                  <div className="item" key={product.productId}>
                    <Product product={product} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      <br />
    </>
  );
};

export default Home;
