import {AlertCircle, CheckCircle2}  from 'lucide-react'


export const FormSuccess=({message}:{
    message:string
})=>{

    if(!message) return null
    return(
        <div className='bg-teal-400 text-secondary-foreground p-3'>
            <CheckCircle2 className='w-4 h-4' size={16} color='red' />
            {message}
        </div>
    )
}