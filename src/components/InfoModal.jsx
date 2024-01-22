export default function InfoModal({title,message,onConfirm}){
    return(<>
        <dialog open>
        <div className="error">
        <h2>{title}</h2>
        <p>{message}</p>
        {onConfirm && (
            <div id="confirmation-actions">
            <button onClick={onConfirm} className="button">
                Okay
            </button>
            </div>
        )}
        </div>
        </dialog>
    </>)
}