const Button = (props) => {
    let className = `bg-gray-600   px-5 py-1 font-mono text-lg rounded-md text-teal-50`;
    if(props.class){
        className = `bg-gray-600  px-5 py-1 font-mono text-lg rounded-md text-teal-50 ${props.class}` ;
    }
    return <>
        <button type='button' className={className}  
        onClick={props.onClickButton}>
            {props.title}
        </button>
    </>
}
export default Button;