
import "bootstrap-icons/font/bootstrap-icons.css";

const Note = ( {item, onToggle} ) => {

    return (
      <div 
        className='d-flex align-items-center justify-content-between pr-2'
        onDoubleClick={(e) => {
          e.preventDefault();
          navigate(`/update`, { state: { _id: item._id, _text: item.text } }); 
        }}>

        <h6>{item.text.length > 40 ? `${item.text.substring(0, 40)} ...` : item.text}</h6> 

        <i 
          className={`bi bi-star${item.isImportant ? '-fill' : '' }`} 
          style={ {color: 'green'} }
          onClick={() => onToggle(item)} 
        />
      </div>              
    )
}

export default Note;