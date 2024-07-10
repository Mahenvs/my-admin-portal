 const Card =(props) =>{
    return(<>
        <div className={` lg:p-8 lg:px-10 bg-gray-100 lg:m-auto lg:py-5 lg:mb-4
        sm:p-6 sm:px-2
        md:p-4 md:px-8 md:m-3 md:py-5
        p-4  px-4 m-1 py-4 mx-auto mb-1 ${props.class}`}>
            {props.children}
        </div>

    </>)
}

export default Card;