import React from 'react'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'

const LoadingScreen = () => {
    return (
        <ThemedView mainContainer className='items-center justify-center min-h-[100vh]'>
            <ThemedText>Loading...</ThemedText>
        </ThemedView>
    )
}

export default LoadingScreen