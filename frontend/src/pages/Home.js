import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import categories from "../categories";
import { LinkContainer } from "react-router-bootstrap";
import images from "../connectImages/images";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";
import SwitchToggle from "../components/SwitchToggle";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <div>
      <img src={images.homePageImg} alt="" className="home-banner" />
      <div className="featured-products-container container mt-4">
        <h2>Last Products</h2>
        {/* last products here */}
        {lastProducts.map((product) => (
            <ProductPreview {...product}/>
        ))}
        <div>
          <Link
            to="/category/all"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more {">>"}
          </Link>
        </div>
      </div>
      {/* sale banner */}
      <div className="sale__banner--container mt-4">
        <img src={images.saleBannerImg} alt="" />
      </div>
      <div className="recent-products-container container mt-4">
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLocaleUpperCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
