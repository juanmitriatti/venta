const ListaProductos = (props) => {
 console.log("props",props);
   /* if (!props.productos.productos && !props.productos){
        return;
    }
*/  const productos = props.productos;
    if (productos) {
        return (
        <ul>
            {productos.map((producto) =>
                        <li key={producto.id.toString()}>
                        value={producto.nombre}
                    </li>
            )}
        </ul>
        );
    }
    return <ul></ul>;
  }

  export default ListaProductos;