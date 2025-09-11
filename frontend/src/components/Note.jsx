import "bootstrap-icons/font/bootstrap-icons.css";

const Note = ( {item, onToggle, onDoubleClick} ) => {

    return (
      <div 
        className='d-flex align-items-center justify-content-between pr-2'
        onDoubleClick={()=> onDoubleClick(item)} >

        <h6>{item.text.length > 50 ? `${item.text.substring(0, 50)}...` : item.text}</h6> 

        <i 
          className={`bi bi-star${item.isImportant ? '-fill' : '' }`} 
          style={ {color: 'green'} }
          onClick={() => onToggle(item)} 
        />
      </div>              
    )
}

export default Note;