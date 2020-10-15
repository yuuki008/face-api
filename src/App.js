import React, { useState } from 'react'
import Emotion from './components/Emotion';
import InputFace from './components/InputFace';
import './App.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import {inputImage} from './api/index';

const useStyles = makeStyles({
  button:{
    width: "20%",
    float:  "left",
    top: '10px',
    left: '10px',
    height: "40px",
    background: 'lightgray'
  }
})

const App = () => {
  const classes = useStyles()

  const [face, setFace] = useState({}),
        [isFetched, setIsFetched] = useState(false),
        [image, setImage ] = useState("");



  return (
    <div className="current">
      {isFetched !== true ?(
        <InputFace setFace={setFace} setIsFetched={setIsFetched} setImage={setImage}/>
      ):(
        <>
        <div className="face">
          <Button
              className={classes.button}
          >
            <label>
              <input type="file" idi="image"
              style={{display: "none"}}
              onChange={(e) => inputImage(e, setFace, setIsFetched, setImage)} 
              />
              change face
            </label>
          </Button>
        <Emotion  emotion={face.emotion} image={image}/>
        <h3>笑顔: <span>{(face.smile * 100).toFixed(1)}%</span></h3>
        <h3>年齢: <span>{face.age}歳</span></h3>
        <h3>ひげ</h3>
        <ul>
          <li>口髭:<span>{face.facialHair.beard * 100}%</span></li>
          <li>顎髭:<span>{face.facialHair.moustache * 100}%</span></li>
          <li>サイド:<span>{face.facialHair.sideburns * 100}%</span></li>
        </ul>
        <h3>化粧</h3>
        <ul>
          <li>目の周り:<span>{face.makeup.eyeMakeup === true ? "あり" : "なし"}</span></li>
          <li>口の周り:<span>{face.makeup.lipMakeup === true ? "あり" : "なし"}</span></li>
        </ul>
        <h3>メガネ: <span>{face.glasses}</span></h3>
        <h3>ハゲ率: <span>{(face.hair.bald * 100).toFixed(1)}%</span></h3>
        <h3>ヘアカラー</h3>
        <ul className="hairColor">
          {face.hair.hairColor.map(color => 
            <li key={color.color}>{color.color}:{(color.confidence * 100).toFixed(1)}%</li>
            )}
        </ul>
        </div>
        <div className="image" >
          <img src={image}/>
        </div>
        </>
      )}
    </div>
  )
}

export default App

