import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TextInput } from 'react-native';
import { ThemedView } from './ThemedView';

const SearchBar = () => {
    const { colors } = useTheme()
    return (
        <ThemedView className='mt-5'>
            <TextInput 
            style={{ color: colors.text, borderColor: colors.border }} 
            className='h-12 mx-4 px-4 mt-2 font-semibold border-2 rounded-[8px]' 
            placeholder='Search...' 
            placeholderTextColor={colors.text}
            />
        </ThemedView>
    )
}

export default SearchBar