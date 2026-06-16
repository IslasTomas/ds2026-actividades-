
import { useParams } from 'react-router-dom' ;

export function LibroDetalle () {
    const { id } = useParams <{ id: string }>();
     
    return <h1>Detalle del libro {id}</h1>;
}