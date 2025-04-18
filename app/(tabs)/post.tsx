import PostInput from '@/components/posts/PostInput'
import { ThemedView } from '@/components/ui/ThemedView'

const post = () => {
    return (
        <ThemedView mainContainer className='min-h-[100%]'>
            <PostInput />
        </ThemedView>
    )
}

export default post