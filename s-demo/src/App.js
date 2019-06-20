import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import SpotifyLogin from 'react-spotify-login'

const accessToken = 'BQBM_FgGM30zvQaiaYkHDd5wCQjjHWIq7fwna0DYzDr0TRwx3o1I5OxainbQtncfgja7EY1EIVthZR8cuPz53J72NDUTL8OEpiEh0YLnLOI5FgirpfyQHNskE51KIlTXDFKzXVA-Dn1VB6_CR-3AhltsvHOA9TlX'
const onSuccess = response => console.log(response)
const onFailure = response => console.error(response)
const clientId = 'f12d02052bfe4088aa2bf73f27ed3529';
const redirectUri = 'http://localhost:3000/callback';

function App() {

  const [query, setQuery] = useState('popskyy')
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    fetchTracks()
  }, [])

  function fetchTracks() {
    let url = `https://api.spotify.com/v1/search?q=${query}&type=track`
    let me = 'https://api.spotify.com/v1/me'

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(resp => resp.json())
      .then(data => setTracks(data.tracks.items))

      fetch(me, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
        })
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetchTracks()
  }

  return (
    <BrowserRouter>
      <div className="App">
      <SpotifyLogin clientId={clientId}
        redirectUri={redirectUri}
        onSuccess={onSuccess}
        onFailure={onFailure} />

      <h3>Searching Spotify!</h3>

      {/* search box */}
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
        <button>Search</button>
      </form>
      <br/>
      {/* show the search results */}
      {tracks.map((track, index) => {
        const img = track.album.images[0]
        const artists = track.artists
        console.log(track)

        return (
          <div key={index}>
            {img && <img src={img.url} alt={track.name} width="250" />}
            <h5>{track.name}</h5>
            {artists.map((artist, index) => {
              return (
                <div key={index}>
                  <h5>{artist.name}</h5>
                </div>
              )
            })}            
          </div>
        )}
      )}
      </div>
    </BrowserRouter>
  );
}

export default App;
