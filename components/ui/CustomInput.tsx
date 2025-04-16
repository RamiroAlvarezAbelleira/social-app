import React from 'react'
import { ThemedView } from './ThemedView'
import { Control, Controller } from 'react-hook-form'
import { TextInput } from 'react-native'
import { ThemedText } from './ThemedText'
import { useTheme } from '@react-navigation/native'

interface CustomInputProps {
    name: string,
    control: Control<any>,
    placeholder?: string,
    secureTextEntry?: boolean,
    error?: string
}

const CustomInput = ({ name, control, placeholder, secureTextEntry, error }: CustomInputProps) => {
    const { colors } = useTheme()
    return (
        <ThemedView>
            <Controller
                name={name}
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                    <ThemedView className='mx-4 gap-y-0.5 mt-2 mb-8'>
                        <ThemedText className='capitalize font-semibold'>{name}</ThemedText>
                        <TextInput
                            style={{ color: colors.text, borderColor: colors.border }}
                            className='h-12 px-4 mt-2 font-semibold border-2 rounded-[8px]'
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            placeholderTextColor={colors.border}
                            secureTextEntry={secureTextEntry}
                        />
                        {error && <ThemedText lightColor='#B00020' darkColor='#CF6679' className='absolute z-[10] bottom-[-25px]'>{error}</ThemedText>}
                    </ThemedView>
                )}
            />
        </ThemedView>
    )
}

export default CustomInput