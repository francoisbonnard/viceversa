import React, { useState } from "react";
import "./App.css";
import myjson from "./refs.json";
import PickColor from "./PickColor";

function App() {
 // const images = myjson.images;
  const imagesNumber = Object.keys(myjson.images).length;
  

  const [images, UpdateListImages] = useState (myjson.images)

  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("");

  function calculateNewList(e) {
    const newList = [];
    const item = e.target.style.backgroundColor;

    // convertit la valeur RGB en HEX
    const itemSplit = item.slice(0, -1).substring(4).split(",");
    const itemHex = rgbToHex(
      parseInt(itemSplit[0].trim()),
      parseInt(itemSplit[1].trim()),
      parseInt(itemSplit[2].trim())
    );

    for (let i = 0; i < imagesNumber; i++) {
      for (let j = 0; j < Object.keys(myjson.images[i].palette).length; j++) {
        if (myjson.images[i].palette[j] === itemHex) {
          newList.push(myjson.images[i].name);
          console.log(myjson.images[i].name);
        }
      }
    }
    UpdateListImages(newList)
  }

  return (
    <div>
      <div className="gallery">
        <PickColor />
        <div>couleur</div>
        {images.map((index, i) => {
          return (
            <div className="item" key={i}>
              <img src={`./images/${index.name}`} alt="" />
              <div className="allBoxes">
                {index.palette.map((index, i) => {
                  return (
                    <div
                      key={i}
                      className="colorBox"
                      style={{ backgroundColor: index }}
                      onClick={calculateNewList}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
