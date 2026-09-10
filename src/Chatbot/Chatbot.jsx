import './Chatbot.css'
import { useState } from 'react';
import iconGemini from '../assets/gemini.png'
export default function Chatbot({ selectedRestaurant, userData}) {
    const [message, setMessage] = useState("");
        const [chatbotActive, setChatBotActive] = useState(false)
        const [messages, setMessages] = useState([]);
        const [loading, setLoading] = useState(false);
        const apiURL = import.meta.env.VITE_API_URL
        async function sendMessage(e) {
            e.preventDefault();
            try {
                setMessages(prev => [
                    ...prev,
                    { role: "user", content: message }
                ]);
                setMessage("");
                setLoading(true);
                const response = await fetch(`${apiURL}/chatbot`, {
                    method: 'POST',
                    
                    headers: {
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify({
    message: message,

    nameUser: userData?.name,
    emailUser: userData?.email,
    cpfUser: userData?.cpf,

    nameTrip: selectedRestaurant?.name,
    descriptionTrip: selectedRestaurant?.description,
    reviewTrip: selectedRestaurant?.review,
    priceTrip: selectedRestaurant?.price,
    dateStart: selectedRestaurant?.startDate,
    dateEnd: selectedRestaurant?.endDate,
    petsTrip: selectedRestaurant?.petsAllowed,
    travelersTrip: selectedRestaurant?.numberOfTravelers
})

                })
                const data = await response.json()
                if (data.Status) {
                    setMessages(prev => [
                        ...prev,
                        { role: "assistant", content: data.Response }
                    ]);

                } else {
                    setMessages(prev => [
                        ...prev,
                        { role: "assistant", content: "An error occurred while processing your message." }
                    ]);
                }
                if (data?.Error){
                    console.error(data?.Error)
                }
            } catch (error) {
                console.error(error)
                setMessages("Unable to connect to the chatbot.");
            } finally {
                setLoading(false)
            }
        }
    return (
        <>
            <button className={`chatbotBtn bg-primary ${chatbotActive ? 'remove': ''}`} onClick={() => { setChatBotActive(true) }}>
                <img src={iconGemini} alt="iconGemini" />
            </button>
            <aside className={`chatbot ${chatbotActive ? 'active': ''}`}>
                <header>
                    <button onClick={() => { setChatBotActive(false) }}>X</button>
                </header>
                <div >
                    {
                        messages.map((msg, index) => (
                            <div key={index}>
                                <p>{msg.role === 'user' ? 'You:' : 'Gemini:'}</p>
                                <p >{msg.content}</p>
                            </div>
                        ))
                    }
                    {loading && (
                        <div>
                            <p>IA: </p>
                            <p>
                                🤖 Typing...
                            </p>
                        </div>
                    )}
                </div>
                <form  onSubmit={sendMessage}>

                    <input type="text" placeholder='Type a question' value={message} minLength={2} maxLength={1600}
                        onChange={(e) => setMessage(e.target.value)}  />
                    <input type="submit" className='btn btn-primary' disabled={message.trim().length < 2 || loading} value="Send"  />
                </form>
            </aside>
        </>
    )
}       