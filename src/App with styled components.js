import React, { Component, useState } from "react";
import "./App.css";
import myjson from "./refs.json";
import PickColor from "./PickColor";
import ReactSlider from "react-slider";
import WheelColor from "./wheelColor";
import styled, { css } from 'styled-components';

const imagesNumber = Object.keys(myjson.images).length;

// calcul des listes de référence
const RefArray = [];
const RefArrayPalette = [];
// const 
for (var i = 0; i < imagesNumber; i++) {
  RefArray.push(i);
  RefArrayPalette.push([])
  for (var j = 0; j < 6; j++) {
    RefArrayPalette[i].push(0);
    // console.log(i, j, RefArrayPalette[i][j])
  }
}

const Box2 = styled.div`
  color: azure;
  position: relative;
  max-width: 200px;
  margin-left: 30px;
  margin-top: -20px;
  visibility: hidden;
  ${props => props.hovered && css`
  visibility: visible;
`} 
`;

function App() {

  const [hovered, setHovered] = useState(false);
  const [images, UpdateListImages] = useState(RefArray);
  const [currentColor, UpdateCurrentColor] = useState("#fff");
  const sliderInit = [0, 11, 100];
  const [posSlider, UpdatePosSlider] = useState(sliderInit);

  //________________________________________

  function calculateNewlistFromColorPicker(color) {
    const step = 50;
    const item = color;
    UpdatePosSlider([0, 50, 100])
    // convertit la valeur hsb en R G B

    const itemRGB0 = parseInt(color.slice(1, 3), 16);
    const itemRGB1 = parseInt(color.slice(3, 5), 16);
    const itemRGB2 = parseInt(color.slice(5, 7), 16);

    // on store ces valeurs dans le cas d'un update par le slider
    window["bufferPalette"] = item;
    window["bufferItem0"] = itemRGB0;
    window["bufferItem1"] = itemRGB1;
    window["bufferItem2"] = itemRGB2;

    const newList = [];

    // recherche des similarités dans la liste
    for (let i = 0; i < imagesNumber; i++) {
      for (let j = 0; j < Object.keys(myjson.images[i].palette).length; j++) {
        //eclate la valeur du Json en 3 RGB
        const JsonRGB0 = parseInt(myjson.images[i].palette[j].slice(1, 3), 16);
        const JsonRGB1 = parseInt(myjson.images[i].palette[j].slice(3, 5), 16);
        const JsonRGB2 = parseInt(myjson.images[i].palette[j].slice(5, 7), 16);
        // console.log(JsonRGB0, JsonRGB1, JsonRGB2);
        if (itemRGB0 - step <= JsonRGB0 && JsonRGB0 <= itemRGB0 + step) {
          if (itemRGB1 - step <= JsonRGB1 && JsonRGB1 <= itemRGB1 + step) {
            if (itemRGB2 - step <= JsonRGB2 && JsonRGB2 <= itemRGB2 + step) {
              newList.push(i);
              RefArrayPalette[i][j] = 1;
              console.log("add", i);
              break;
            }
          }
        }
      }
    }
    UpdateListImages(newList);

  }

  function calculateNewlistFromSlider(e) {

    UpdatePosSlider()
    for (var i = 0; i < imagesNumber; i++) {
      for (var j = 0; j < 6; j++) {
        RefArrayPalette[i][j] = 0
      }
    }
    const step = e[1];
    const item = window["bufferPalette"];
    const itemRGB0 = window["bufferItem0"];
    const itemRGB1 = window["bufferItem1"];
    const itemRGB2 = window["bufferItem2"];
    const newList = [];

    for (let i = 0; i < imagesNumber; i++) {
      for (let j = 0; j < Object.keys(myjson.images[i].palette).length; j++) {
        //eclate la valeur du Json en 3 RGB
        const JsonRGB0 = parseInt(myjson.images[i].palette[j].slice(1, 3), 16);
        const JsonRGB1 = parseInt(myjson.images[i].palette[j].slice(3, 5), 16);
        const JsonRGB2 = parseInt(myjson.images[i].palette[j].slice(5, 7), 16);

        if (itemRGB0 - step <= JsonRGB0 && JsonRGB0 <= itemRGB0 + step) {
          if (itemRGB1 - step <= JsonRGB1 && JsonRGB1 <= itemRGB1 + step) {
            if (itemRGB2 - step <= JsonRGB2 && JsonRGB2 <= itemRGB2 + step) {
              newList.push(i);
              RefArrayPalette[i][j] = 1;
              break;
            }
          }
        }
      }
    }
    UpdateListImages(newList);
  }

  function calculateNewList(e) {

    for (var i = 0; i < imagesNumber; i++) {
      for (var j = 0; j < 6; j++) {
        RefArrayPalette[i][j] = 0
      }
    }

    const step = 12;
    const item = e.target.style.backgroundColor;
    UpdatePosSlider([0, 12, 100])
    // convertit la valeur RGB en R G B
    const itemSplit = item.slice(0, -1).substring(4).split(",");

    const itemRGB0 = parseInt(itemSplit[0].trim());
    const itemRGB1 = parseInt(itemSplit[1].trim());
    const itemRGB2 = parseInt(itemSplit[2].trim());

    // on store ces valeurs dans le cas d'un update par le slider
    window["bufferPalette"] = item;
    window["bufferItem0"] = itemRGB0;
    window["bufferItem1"] = itemRGB1;
    window["bufferItem2"] = itemRGB2;

    const newList = [];

    // recherche des similarités dans la liste
    for (let i = 0; i < imagesNumber; i++) {
      for (let j = 0; j < Object.keys(myjson.images[i].palette).length; j++) {
        //eclate la valeur du Json en 3 RGB
        const JsonRGB0 = parseInt(myjson.images[i].palette[j].slice(1, 3), 16);
        const JsonRGB1 = parseInt(myjson.images[i].palette[j].slice(3, 5), 16);
        const JsonRGB2 = parseInt(myjson.images[i].palette[j].slice(5, 7), 16);
        // console.log(JsonRGB0, JsonRGB1, JsonRGB2);
        if (itemRGB0 - step <= JsonRGB0 && JsonRGB0 <= itemRGB0 + step) {
          if (itemRGB1 - step <= JsonRGB1 && JsonRGB1 <= itemRGB1 + step) {
            if (itemRGB2 - step <= JsonRGB2 && JsonRGB2 <= itemRGB2 + step) {
              newList.push(i);
              RefArrayPalette[i][j] = 1;
              break;
            }
          }
        }
      }
    }
    UpdateListImages(newList);
  }


  function resetList(e) {
    const resetListArray = [];
    for (var i = 0; i < imagesNumber; i++) {
      resetListArray.push(i);
      for (var j = 0; j < 6; j++) {
        RefArrayPalette[i][j] = 0
      }
    }
    UpdateListImages(resetListArray);
  }
//________________________________________RETURN_____________________
  return (
    <div>
      <div className="gallery">
        <div className="wheelcolor">
          <WheelColor
            onChange={(value) => calculateNewlistFromColorPicker(value)}
            currentColor={currentColor}
          />
        </div>
        <div className="buttonReset">
          <button class="custom-btn btn-3" onClick={resetList}>
            <span>Reset</span>
          </button>
          <div className="custom-color-ref"></div>
        </div>

        <ReactSlider
          className="vertical-slider"
          markClassName="markClassName"
          trackClassName="trackClassName"
          thumbClassName="thumbClassName"
          defaultValue={[0, 13, 100]}
          value={posSlider}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          orientation="vertical"
          invert
          minDistance={1}
          onAfterChange={calculateNewlistFromSlider}
        />

        {images.map((index, i) => {
          return (
            <div className="itemVert" >
              <div className="item" key={i}
              >
                <img src={`./images/${myjson.images[index].name}`} alt=""
                 onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                
                />
                <div className="allBoxes">
                  {myjson.images[index].palette.map((index2, j) => {
                    const b = myjson.images[index].palette[j]
                    let classNameDiv = "colorBox";
                    if (RefArrayPalette[index][j] === 1) {
                      classNameDiv = "colorBox2";
                    }
                    return (
                      <div
                        key={j}
                        className={classNameDiv}
                        style={{ backgroundColor: index2 }}
                        onClick={calculateNewList}
                      />
                    )
                  }, (i, index))}
                </div>
              </div>
              <Box2 hovered={hovered}>{myjson.images[index].prompt}</Box2>
            </div>
          );
        })}
      </div>
    </div >
  );
}

export default App;
