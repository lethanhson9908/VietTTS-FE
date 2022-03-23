import React from 'react'
import axios from 'axios'
// import a from './static/output/a.wav'
// import ReactAudioPlayer from 'react-audio-player'

const baseURL = 'http://0.0.0.0:8000/TTS'

const Speech = () => {
	const [value, setValue] = React.useState('');
	const [text, setText] = React.useState('');
	const [audio_path, setAudio] = React.useState(''); 
	const [isLoading, setLoading] = React.useState(false)
	
	const speak = (value) => {
		const content = {text:value}
		
		setLoading(true)
		axios.post(baseURL,content)
			.then(response => {
				if(response.status === 200){
					setText(response.data.text)
					setAudio(response.data.audio_path)
					console.log(response.data.audio_path)
					setLoading(false)
				}
				else throw new Error(response.status);
				
			});
	}
	
	return (
		<div className="speech">
			<div className='group'>
				<h2>Mobifone Text To Speech demo</h2>
			</div>
			<div className="group">
				<textarea rows='10' value={value} onChange={(e) => setValue(e.target.value)}>{text}</textarea>
			</div>
			{isLoading ? 
				<div className="loader"></div>
				
				:
				<div className='group'>
					{value ? <button onClick={() => speak(value)}>Speech</button> : <button>Speech</button>}
					
					<br></br>
					
					{
					audio_path ? <audio className="audio "src={`data:audio/wav;base64,${audio_path}`} controls></audio> : <div></div>
					}
					
				</div>
			}
			
			{/* { audio_path ? 
				<audio src={a} controls>
				</audio>
				: <div></div>
			} */}
			{/* {loading ? <LoadingSpinner /> : <ResultsTable results={data} />} */}
		</div>
	)
}	

export default Speech;