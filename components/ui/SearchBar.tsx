import React from 'react'
import { TextInput } from 'react-native'
import { ThemedView } from './ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

const SearchBar = () => {

    const color = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
    return (
        <ThemedView>
            <TextInput style={{ color }} className='h-12 mx-4 px-4 mt-2 font-semibold border-2 rounded-[8px]' placeholder='Search' />
        </ThemedView>
    )
}

export default SearchBar