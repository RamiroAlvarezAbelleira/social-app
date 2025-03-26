import PostInput from '@/components/posts/PostInput'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView'

const post = () => {
    return (
        <ThemedView mainContainer className='min-h-[100%]'>
            <PostInput />
        </ThemedView>
    )
}

export default post