const ListaProductos = (props) => {
    /* if (!props.productos.productos && !props.productos){
         return;
     }
 */
    console.log("ListaProductos props:", props);

    const productos = props.productos;
    if (productos && productos.length > 0) {
        return (
            <table className="table" border={1}>
                <tr>
                    <td className="bg-primary">
                        Nombre
                    </td>
                    <td className="bg-primary">
                        Precio
                    </td>
                    <td className="bg-primary">
                        Cantidad
                    </td>
                    <td className="bg-primary">
                        Quitar
                    </td>
                </tr>
                {productos.map((producto) =>
                    <tr>
                        <td>
                            {producto.nombre}
                        </td>
                        <td>
                            {producto.precio}
                        </td>
                        <td >
                            1
                        </td>
                        <td className="bg-danger">
                            X
                        </td>
                    </tr>
                )}
            <tr>
                    <td colspan="3" className="bg-primary">
                        Total
                    </td>
                    <td className="bg-primary">
                        $1000
                    </td>
                </tr>
            </table>
        );
    }
    return <ul></ul>;
}

export default ListaProductos;