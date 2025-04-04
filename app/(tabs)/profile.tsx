import { ThemedView } from '@/components/ui/ThemedView'
import Profile from '@/components/users/Profile'
import React from 'react'


const profile = () => {
    return (
        <ThemedView mainContainer>
            <Profile />
        </ThemedView>
    )
}

export default profile