import React, {useEffect, useState} from "react";
import LinkForm from './LinkForm';
import { db } from "../firebase";
import { collection, addDoc, getDocs, onSnapshot, doc, deleteDoc, updateDoc} from "firebase/firestore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos
import Swal from "sweetalert2";




const Links = () =>{

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

//funciones
    // const addOrEdditLink = async (linkObject) => {
    //     await addDoc(collection(db, 'links'), linkObject);
    //     // toast('Link Agregado', {
    //     //     type: 'success'
    //     // }).showToast();
    //     Swal.fire({
    //         title: "Link Agregado Correctamente",
    //         icon: "success"
    //     })
       

    // };

    const addOrEdditLink = async (linkObject) => {
        try {
            if (currentId === '') {
                // Mostrar alerta de carga antes de agregar el link
                Swal.fire({
                    title: 'Guardando...',
                    text: 'Por favor, espera mientras guardamos el enlace.',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading(); // Mostrar un indicador de carga
                    }
                });
    
                // Intentar agregar el link a Firestore
                await addDoc(collection(db, 'links'), linkObject);
    
                // Si la operación es exitosa, mostrar alerta de éxito
                Swal.fire({
                    title: "¡Link agregado correctamente!",
                    text: "El enlace se ha guardado exitosamente.",
                    icon: "success",
                    timer: 2000, // Alerta se cierra automáticamente después de 2 segundos
                    showConfirmButton: false
                });
    
            } else {
                // Intentar actualizar el link en Firestore
                await updateDoc(doc(db, 'links', currentId), linkObject);
    
                // Si la operación es exitosa, mostrar alerta de éxito
                Swal.fire({
                    title: "¡Actualizado correctamente!",
                    text: "Se ha actualizado exitosamente.",
                    icon: "success",
                    timer: 1000, // Alerta se cierra automáticamente después de 2 segundos
                    showConfirmButton: false
                });
                
                setCurrentId(''); // Limpiar currentId después de la operación
    
            }
        } catch (error) {
            // En caso de error, mostrar una alerta de error
            Swal.fire({
                title: "Error",
                text: "Ocurrió un error al intentar agregar o actualizar el enlace.",
                icon: "error",
            });
            console.error("Error al agregar o actualizar el enlace:", error);
        }
    };

    //funcion eliminar
    // const onDeleteLink = async (id) =>{
    //    if ( window.confirm('¿Esta seguro de eliminar este enlace?')) {
       
    //     const linkDoc = doc(db, 'links', id); // Crear una referencia al documento que quieres eliminar
    //     await deleteDoc(linkDoc); // Eliminar el documento
    //     if (Swal.fire({
    //         title: 'Eliminar Link!',
    //         text: '¿Desea eliminar el Link?.',
    //         icon: "warning"
    //     })) {
       
    //    }
    // }

    const onDeleteLink = async (id) => {
        // Llamar a SweetAlert para mostrar una alerta de confirmación
        const result = await Swal.fire({
            title: 'Eliminar Link',
            text: '¿Está seguro de eliminar este enlace?',
            icon: 'warning',
            showCancelButton: true, // Agregar botón de cancelar
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'

        });
    
        // Si el usuario confirma (presiona "Sí, eliminar"), procedemos a eliminar el link
        if (result.isConfirmed) {
            const linkDoc = doc(db, 'links', id); // Crear referencia al link
            await deleteDoc(linkDoc); // Eliminar link
            Swal.fire(
                'Eliminado',
                'El enlace ha sido eliminado.',
                'success', // Tipo de alerta de éxito
                 2000
            );
        }
    };
    const getLinks = () => {
        // Utilizamos 'onSnapshot' para obtener actualizaciones en tiempo real
        onSnapshot(collection(db, 'links'), (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                
                docs.push({...doc.data(), id:doc.id});
            });
            setLinks(docs);
        });
    }
    //hacer peticios a firebase
    useEffect(() =>{
        getLinks();
    }, []);
    return <div>
        <div className="col-md-4 p-2 ">
        <LinkForm {...{addOrEdditLink, currentId, links}}/>
        </div>
        <div className="col-md-8 p-2">
            {links.map(link =>(
                <div className="card mb-1" key={link.id}> 
                    <div className="card-body"> 
                        <div className="d-flex justify-content-between"> 
                            <h4>{link.name}</h4>
                            <div> 
                                <i className="material-icons text-danger" onClick={() =>onDeleteLink(link.id)}>close</i>
                                <i className="material-icons text-blank" onClick={() => setCurrentId(link.id)}>create</i>
                            </div>

                        </div>
                        <p>{link.description}</p>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">Ir al sitio web</a>
                    </div>
                </div>
            ))}
        </div>
    </div>;
};

export default Links;