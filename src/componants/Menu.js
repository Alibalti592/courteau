import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { addtoCart } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
const catURL = "https://api.lecourteau.com/api/categories";
const menUrl = "https://api.lecourteau.com/api/menuItems";

function Menu() {
  const [category, setCategory] = useState([]);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    const temp = {
      _id: parseInt(Date.now() * Math.random()).toString(),
      name: item.name,
      img: item.image,
      prices: [],
    };
    dispatch(addtoCart(temp));
  };
  const fetchCategory = async () => {
    try {
      const response = await axios.get(catURL);

      setCategory(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const fetchMenu = async () => {
    try {
      const response = await axios.get(menUrl);
      const newItems = response.data;
      setItems(newItems);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchCategory();
    fetchMenu();
  }, []);
  const uniqueCategories = [
    ...new Set(items.map((item) => item.category.name)),
  ];

  return (
    <>
      <section className="menu-background">
        <div className="menu-container">
          <div className="category-container">
            {category.map((category, index) => {
              const { id, name } = category;
              return (
                <button
                  key={id}
                  className={`job-btn ${index === value && "active-btn"}`}
                  onClick={() => {
                    setValue(index);
                  }}
                >
                  {name}
                </button>
              );
            })}
          </div>

          <div className="items-container">
            <h1>Menu</h1>
            <p>
              En cas de différence entre ces prix et les prix au comptoir, ces
              derniers ont priorité. Les photos sont à titre indicatif pour
              mettre en valeur les ingrédients, la présentation peut varier.
            </p>

            <div className="item-details">
              <div className="category">
                {uniqueCategories.map((categoryy) => {
                  return (
                    <div>
                      <h1>{categoryy}</h1>
                      <div className="we">
                        {items
                          .filter((item) => item.category.name === categoryy)
                          .map((item) => {
                            const { _id, image, name, prices } = item;

                            return (
                              <article className="item" key={_id}>
                                <Link to={`item/${_id}`}>
                                  <img
                                    src={image}
                                    alt={name}
                                    className="item-img"
                                  />
                                </Link>

                                <h4>{name}</h4>
                                <ul>
                                  {prices.map((price, index) => (
                                    <li key={index}>
                                      {price.price}$ : ({price.size})
                                    </li>
                                  ))}
                                </ul>
                              </article>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </>
  );
}

export default Menu;
/* {items
                      .filter((item) => item.category.name === categoryy)
                      .map((item) => {
                        const { _id, image, name, prices } = item;

                        return (
                          <article className="item" key={_id}>
                            <img src={image} alt={name} className="item-img" />
                            <h3>{name}</h3>
                            <ul>
                              {prices.map((price, index) => (
                                <li key={index}>
                                  {price.size}: {price.price}
                                </li>
                              ))}
                            </ul>
                          </article>
                        );
                      })}*/
