import React from 'react';

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    url: "http://i.imgflip.com/1bij.jpg"
  })

  const [allMemes, setAllMemes] = React.useState([])

  function handleChange(event) {
    const {name, value} = event.target
    setMeme(prevMeme => {
        return {
            ...prevMeme,
            [name]: value
        }
    })
}

  function getMeme() {
    const randomNum = Math.floor(Math.random() * allMemes.length);
    const meme = allMemes[randomNum].url;
    setMeme(prevMeme => ({
        ...prevMeme,
        url: meme
    }))
  }

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))
  },[])


  return (  
    <div className='main--container'>
      <div className='input--container'>
        <input type='text' placeholder='Top text' onChange={handleChange} name="bottomText"></input>
        <input type='text' placeholder='Bottom text' onChange={handleChange} name="topText"></input>
      </div>
      <button onClick={getMeme}>Get a new meme image  🖼</button>
      <div className='img--container'>
        <img src={meme.url} alt="" className='meme--img'></img>
        <p className='img--text top'>{meme.topText}</p>
        <p className='img--text bottom'>{meme.bottomText}</p>
      </div>
    </div>
  );
}
