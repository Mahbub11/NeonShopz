import {AlertCircle}  from 'lucide-react'


export const FormError=({message}:{
    message:string
})=>{

    if(!message) return
    return(
        <div className='bg-destructive text-secondary-foreground p-2'>
            <AlertCircle className='w-4 h-4' size={16} color='red' />
            {message}
        </div>
    )
}