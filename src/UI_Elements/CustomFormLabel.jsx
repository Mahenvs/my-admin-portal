const CustomFormLabel = (props) =>{
    return <>
        <span className={`mt-1  sm:text-sm md:text-lg ${props.class}`}>
            {props.label}
        </span>
    </>
 }
export default CustomFormLabel;

