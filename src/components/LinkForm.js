import React, {useState, useEffect} from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; //Importar conexion db

const LinkForm = (props) =>{
const initialStateValues = {
    url: '',
    name: '',
    description: ''
};

    //definir estado
    const [values, setValues] = useState({initialStateValues});

    //manejar cambio de input
    const handleImputChange = e => {
       const {name, value} = e.target;
       setValues({...values, [name]: value})
       
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.addOrEdditLink(values);
        setValues({...initialStateValues})
    }

    // obtener enlace id
    const getLinkById = async (id) =>{
        const linkDoc = doc(db, 'links', id);
        const docSnapshot = await getDoc(linkDoc)
        setValues({...docSnapshot.data()})
    }

    useEffect(() =>{
        if (props.currentId == '') {
            setValues({...initialStateValues})
        } else {
            getLinkById(props.currentId);
        }

    }, [props.currentId]);

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <h1>Guardador de Links</h1>
            <div className="form-group input-group" >
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input type="url" className="form-control" placeholder="https://url.com" name="url" onChange={handleImputChange} value={values.url || ''} required/>

            </div>

            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>
                <input type="text" className="form-control" placeholder="Nombre de la página" name="name" onChange={handleImputChange} value={values.name || ''} required/>
            </div>

            <div className="form-group">
                <textarea name="description" row="3" className="form-control" placeholder="Escribe una descripción" onChange={handleImputChange} value={values.description} required></textarea> 
            </div>

            <button className="btn btn-primary btn-block">
                {/* //Si es una cosa mostrar boton guaradr sino mostrar boton actualizar  */}
                {props.currentId == '' ? 'Guardar ' : 'Actualizar'}
            </button>

        </form>
    )
}

export default LinkForm;