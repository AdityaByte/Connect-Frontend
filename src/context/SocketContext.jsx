import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

const SocketContext = createContext()
export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }) => {
    const [connected, setConnected] = useState(false)

    const clientRef = useRef(null)

    useEffect(() => {
        const socketURL = `${import.meta.env.VITE_BACKEND_URL}/ws`
        console.log("backend url ", socketURL)
        const socket = new SockJS(socketURL)
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: str => console.log(str),
            reconnectDelay: 10000, // Reconnects after 10 seconds.
            onConnect: () => {
                console.log("STOMP connected")
                setConnected(true)
            },
            onDisconnect: () => {
                console.log("STOMP Disconnected")
                setConnected(false)
            },
            onStompError: (frame) => {
                console.error("STOMP Error", frame)
            },
            onWebSocketClose: (event) => {
                console.warn("Websocket closed:", event)
            }
        })

        clientRef.current = stompClient
        stompClient.activate()

        return () => {
            stompClient.deactivate()
        }
    }, [])

    const subscribe = (topic, callback) => {
        if (clientRef.current && clientRef.current.connected) {
            return clientRef.current.subscribe(topic, callback)
        }
    }

    const publish = (destination, headers={}, body) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination,
                headers,
                body: JSON.stringify(body)
            })
        }
    }

    return (
        <SocketContext.Provider value={{ connected, subscribe, publish }}>
            {children}
        </SocketContext.Provider>
    )

}
