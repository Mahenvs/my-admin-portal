import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const CustomFormControl = forwardRef((props,ref) =>{
    let classes = `w-[10rem] sm:w-[25rem] leading-8 sm:p-1 sm:my-1 border-b-2 border-sky-700 rounded text-md md:text-xl text-gray-900  focus:outline-none focus:border-sky-900  justify-end  ${props.extraClass}`;
    
    if(props.class == "error"){
        classes =`w-[10rem] sm:w-[25rem] leading-8 p-1 border-b-2 border-red-600 text-stone-950 rounded text-md md:text-xl  focus:outline-none focus:border-sky-900`;
    }

    return <span className=' flex mb-2 '>
            <input className={classes} ref={ref}
            type={props.type} placeholder={props.title} id={props.id} 
            onChange={props.inputChange}
            onBlur={props.inputBlur}
            disabled ={props.disabledOrNot}
            value={props.value}
            />
    </span>
})
export default CustomFormControl;

