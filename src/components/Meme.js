import React from 'react';
import html2canvas from 'html2canvas';

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    url: "http://i.imgflip.com/1bij.jpg",
  })

  const [allMemes, setAllMemes] = React.useState([])
  const [status, setStatus] = React.useState("api") // types: local and api

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
    setStatus("api")
    const randomNum = Math.floor(Math.random() * allMemes.length);
    const meme = allMemes[randomNum];
    setMeme(prevMeme => ({
        ...prevMeme,
        url: meme.url,
    }))
  }

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))
  },[])

  const handleBtnExport = () => {
    html2canvas(document.querySelector('#meme')).then((canvas) => {
      const img = canvas.toDataURL('image/jpeg');
      const link = document.createElement('a');
      const nameMeme = meme.url.split('/').at(-1).split('.')[0];
      // console.log(nameMeme)
      link.download = `meme-${nameMeme}.jpeg`;
      link.href = img;
      console.log(img)
      link.click();
    });
  };

  function onChangeInput(e) {
    setStatus("local")
    setMeme(prevMeme => ({
      ...prevMeme,
      url: URL.createObjectURL(e.target.files[0]),
    }))
  }

  return (  
    <div className='main--container'>
      <div className='input--container'>
        <input type='text' placeholder='Top text' onChange={handleChange} name="bottomText"></input>
        <input type='text' placeholder='Bottom text' onChange={handleChange} name="topText"></input>
      </div>
      <div className="btn-input-container">
        <input
          className="input--file"
          type="file"
          accept=".png,.jpeg,.jpg"
          onChange={(e) => onChangeInput(e)}
        />
        <button onClick={getMeme}>Get a new meme image  🖼</button>
      </div>
      <div id="meme" className='img--container'>
        <img src={meme.url} alt="" className='meme--img'></img>
        <p className='img--text top'>{meme.topText}</p>
        <p className='img--text bottom'>{meme.bottomText}</p>
      </div>
      {status === "local"
        ?
        <button className="btn--download" onClick={handleBtnExport}>Download</button>
        :
        <button className="btn--download" disabled={true} onClick={handleBtnExport}>
          Sorry, you cannot download using the API 😥
        </button>
      }
    </div>
  );
}
