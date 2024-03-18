import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { getSelectedSize } from "../redux/CartSlice";
import { addtoCart } from "../redux/CartSlice";

function Item() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [item, setItem] = useState([]);
  const { id } = useParams();
  const selectedItem = cartItems.find((item) => item.y === id) || {};
  const [selectedSize, setSelectedSize] = useState(
    selectedItem.prices ? selectedItem.prices : []
  );

  const [sauce, setSauce] = useState("");
  const [ListSauce, setListSauce] = useState(
    selectedItem.sauces ? selectedItem.sauces : []
  );
  console.log(id);
  const handleChange = (e) => {
    const sauce = e.target.value;
    const price = e.target.dataset.price;
    setSauce(sauce);
    if (e.target.checked) {
      setListSauce((prevListSauce) => [
        ...prevListSauce,
        {
          id: parseInt(Date.now() * Math.random()).toString(),
          sauce: sauce,
          price: price,
        },
      ]);
    } else {
      setListSauce((prevListSauce) =>
        prevListSauce.filter((item) => item.sauce !== sauce)
      );
    }
  };

  const url = `https://api.lecourteau.com/api/menuItems/${id}`;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const Personalisation = [
    {
      name: "Fond blanc de volaille",
      ingrédients: "Carcasse de volaille, garniture aromatique",
      price: "1$",
    },
    {
      name: "Fond brun de veau",
      ingrédients: "Os de veau, garniture aromatique",
      price: "3$",
    },
    {
      name: "	Sauce Mayonnaise",
      ingrédients: "Jaunes d'oeuf, moutarde, huile",
      price: "2.5$",
    },
    {
      name: "Sauce Hollandaise",
      ingrédients: "Jaunes d'oeuf, beurre clarifié",
      price: "1.5$",
    },
  ];

  const handleAddToCart = (item) => {
    let pricesToAdd = selectedSize;

    if (item.prices.length === 1) {
      pricesToAdd = {
        price: item.prices[0].price,
        size: item.prices[0].size,
      };
    }

    const temp = {
      y: id,
      _id: parseInt(Date.now() * Math.random()).toString(),
      name: item.name,
      img: item.image,
      prices: pricesToAdd,
      quantitiy: 1,
      sauces: ListSauce,
    };
    dispatch(addtoCart(temp));
  };
  const handleSelectChange = (event) => {
    const selectedIndex = event.target.value;
    setSelectedSize(item.prices[selectedIndex]);
  };

  const fetchItem = async () => {
    try {
      const response = await axios.get(url);
      setItem(response.data);

      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchItem();
  }, []);
  if (isLoading) {
    return <p>is loading ...</p>;
  }
  return (
    <section className="item-section">
      <div className="item-background-left"></div>
      <div className="item-container">
        <h1>{item.name}</h1>
        <img src={item.image}></img>
        {item.prices.length === 1 ? (
          <div>
            <h3>
              {item.prices[0].price} $ : ({item.prices[0].size})
            </h3>
            <h4></h4>
          </div>
        ) : (
          <select className="select-size" onChange={handleSelectChange}>
            {item.prices.map((price, index) => (
              <option key={index} value={index}>
                {price.size}
              </option>
            ))}
          </select>
        )}
        <div>{selectedSize.price}</div>
        <div className="container-checkbox">
          <h4>Nos Sauces</h4>

          {Personalisation.map((item, index) => {
            const { name, price } = item;
            return (
              <div className="checkbox-wrapper-29">
                <label className="checkbox">
                  <input
                    className="checkbox__input"
                    onChange={handleChange}
                    checked={ListSauce.some((sauce) => sauce.sauce === name)}
                    type="checkbox"
                    value={name}
                    data-price={price}
                  ></input>
                  <span className="checkbox__label"></span>
                  <h3>
                    {name} +({price})
                  </h3>
                </label>
              </div>
            );
          })}
        </div>

        <Link to={`/cart`}>
          <button className="item-button" onClick={() => handleAddToCart(item)}>
            ajouter au panier
          </button>
        </Link>
      </div>
      <div className="item-background-right"></div>
    </section>
  );
}

export default Item;
/*<article class="feature1">
    <input type="checkbox" id="feature1"/>
    <div>
      <span>
        20 GB<br/>
        + $15.00
      </span>
    </div>
  </article>*/
