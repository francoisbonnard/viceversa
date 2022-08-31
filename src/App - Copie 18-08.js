import React, { useState } from "react";
import "./App.css";
import myjson from "./refs.json";
import PickColor from "./PickColor";
import ReactSlider from "react-slider";

function App() {
  // const images = myjson.images;
  const imagesNumber = Object.keys(myjson.images).length;

  // calcul de la liste de référence
  const RefArray = [];
  for (var i = 0; i < imagesNumber; i++) {
    RefArray.push(i);
  }
  const RefArrayNumber = RefArray.length;
  const [images, UpdateListImages] = useState(RefArray);

  const rgbToHex = (r) =>
    [r]
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

    // recherche des similarités dans la liste
    const step=10;
    for (let i = 0; i < imagesNumber; i++) {
      for (let j = 0; j < Object.keys(myjson.images[i].palette).length; j++) {
        if (myjson.images[i].palette[j] === itemHex) {
          newList.push(i);
          break;
        }
      }
    }
    UpdateListImages(newList);
  }



  function resetList(e) {
    const resetListArray = [];
    for (var i = 0; i < imagesNumber; i++) {
      resetListArray.push(i);
    }
    UpdateListImages(resetListArray);
  }

  return (
    <div>
      <div className="gallery">
        {/* <PickColor /> */}
        <div className="buttonReset">
          <button onClick={resetList}>Reset</button>
        </div>
        <ReactSlider
          className="vertical-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          defaultValue={[0, 50, 100]}
          ariaLabel={["Lowest thumb", "Middle thumb", "Top thumb"]}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          orientation="vertical"
          invert
          pearling
          minDistance={1}
        />

        {images.map((index, i) => {
          return (
            <div className="item" key={i}>
              <img src={`./images/${myjson.images[index].name}`} alt="" />
              <div className="allBoxes">
                {myjson.images[index].palette.map((index, i) => {
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
