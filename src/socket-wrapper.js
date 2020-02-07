import React, { useState, useEffect, useContext } from 'react'

export const SocketContext = React.createContext()
export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider>
      {children}
    </SocketContext.Provider>
  )
}
