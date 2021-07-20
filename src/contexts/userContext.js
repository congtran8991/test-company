import React, { createContext, useState,memo } from 'react'

export const LoadingContext = createContext()

const LoadingContextProvider = ({ children }) => {
  // State
  const [isLoading, setIsLoading] = useState(0)

  // Function to toggle theme
  const showLoading = (chaneLoading) => {
    setIsLoading(chaneLoading)
  }

  // Context data
  const loadingContextData = {
    isLoading,  
    setIsLoading
  }

  // Return provider
  return (
    <LoadingContext.Provider value={loadingContextData}>
      {children}
    </LoadingContext.Provider>
  )
}

export default memo(LoadingContextProvider)