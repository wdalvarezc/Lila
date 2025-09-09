import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function PedidoTable(props) {
    const orders = props.Orders
    const status = ["pendiente", "empacar", "enviar", "entregar", "completado"]
    const color = ["primary", "info", "light", "warning", "success"]
    const [fechaFiltro, setFechaFiltro] = useState("");

    useEffect(() => {
        console.log(props.date);
        setFechaFiltro(props.date)
    }, [])

    return <>
        <div style={{ padding: '1rem' }}>
            <table className="table table-dark table-striped border-warning">
                <thead className="table-">
                    <tr>
                        <th scope="col">LISTA DE PEDIDOS</th>
                        <th>
                            <Form className="d-flex align-items-center">
                                <Form.Control
                                    type="date"
                                    value={fechaFiltro}
                                    onChange={(e) => props.cargarFecha(e.target.value)}
                                    className="me-2"
                                />
                                <Button variant="secondary" onClick={() => props.cargarDatos()}>
                                    Limpiar
                                </Button>
                            </Form>
                        </th>
                    </tr>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">ESTADO</th>
                        <th scope="col">CLIENTE</th>
                        <th scope="col">TELÉFONO</th>
                        <th scope="col">DIRECCIÓN</th>
                        <th scope="col">PEDIDO</th>
                        <th scope="col">PRECIO</th>
                        <th scope="col">ENTREGA</th>
                        <th scope="col">CAMBIO ESTADO</th>
                    </tr>
                </thead>

                <tbody className="table-group-divider">
                    {orders.map((e) => {
                        let priceTotal = 0
                        let estado = status.findIndex(s => s === e.status)
                        console.log(estado)
                        return <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.status}</td>
                            <td>{e.Customer.name}</td>
                            <td>
                                <Button
                                    variant="light"
                                    href={`tel:+57${e.Customer.phone}`}
                                >
                                    📞 Llamar
                                </Button>
                            </td>
                            <td>{e.Customer.address}</td>
                            <td>
                                <ul>
                                    {e.Products.map(producto => {
                                        priceTotal += producto.OrderItem.price
                                        return <li>{`${producto.name} - ${producto.OrderItem.quantity}`}</li>
                                    })}
                                </ul>
                            </td>
                            <td>{priceTotal}</td>
                            <td>{e.deliveryDate?.split('T', 1)}</td>
                            <td><Button variant={color[estado + 1]} onClick={() => props.handleChange(e.id, status[estado + 1])}>{status[estado + 1]}</Button></td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </>
}