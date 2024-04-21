 const Card =(props) =>{
    return(<>
        <div className={`p-8 px-10 bg-gray-100 m-auto py-5 ${props.class}`}>
            {props.children}
        </div>

    </>)
}

export default Card;