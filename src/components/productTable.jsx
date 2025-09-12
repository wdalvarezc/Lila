import { Image, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import api from '../instances/axios';


export default function ProductTable(props) {
    const products = props.Products
    const loading = props.loading
    const [show2, setShow2] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        sku: "",
        description: "",
        quantity: "",
        price: "",
        category: ""
    });

    const onSave = async (productData) => {

        await api.put(`products/${formData.id}`, productData)
            .then(() => {
                alert("Estado actualizado con éxito ✅");
            })
            .catch((error) => {
                console.error(error);
                alert("Error al actualizar estado ❌");
            })
        await props.fetchProductos();
    };
    // Abrir / cerrar modal
    const handleShow = (e) => {
        setFormData({
            id: e.id,
            name: e.name,
            sku: e.sku,
            description: e.description,
            quantity: e.quantity,
            price: e.price,
            category: e.category
        })
        setShow2(true);
    }
    const handleClose = () => setShow2(false);

    // Manejo de cambios
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Guardar producto
    const handleSubmit = async (e) => {
        e.preventDefault();
        onSave(formData);
        setFormData({ name: "", sku: "", description: "", price: "", quantity: "", category: "" });
        handleClose();
    };

    return <>
        <div style={{ padding: '1rem' }}>
            <table className="table table-dark table-striped border-warning">
                <thead className="table-">
                    <tr>
                        <th scope="col">LISTA DE PRODUCTOS</th>
                    </tr>
                    <tr>
                        <th scope="col">PRODUCTO</th>
                        <th scope="col">NOMBRE</th>
                        <th scope="col">DESCRIPCIÓN</th>
                        <th scope="col">CANTIDAD</th>
                        <th scope="col">ACCIONES</th>
                    </tr>
                </thead>

                <tbody className="table-group-divider">
                    {loading && <Image src="./imagenes/torna.gif" rounded width={300} className="d-block mx-auto" />}
                    {products.map((e) => {
                        return <tr key={e.id}>
                            <th scope="row">
                                <Image src="./imagenes/amor.jpeg" rounded width={50} />
                            </th>
                            <td>{e.name}</td>
                            <td>{e.description}</td>
                            <td>{e.quantity}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleShow(e)}>
                                    Actualizar
                                </Button>
                                <Modal show={show2} onHide={handleClose} centered >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Actualizar {e.name}</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <Form onSubmit={handleSubmit}>

                                            <Form.Group className="mb-3">
                                                <Form.Label>SKU</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="sku"
                                                    value={formData.sku}
                                                    onChange={handleChange}
                                                    placeholder="Ej: CAM-001"
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Descripción</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    placeholder="Ej: Campana de cruz roja"
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Precio</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    placeholder="Ej: 50000"
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Cantidad</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="quantity"
                                                    value={formData.quantity}
                                                    onChange={handleChange}
                                                    placeholder="Ej: 50000"
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Categoria</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    placeholder="Ej: Campanas"
                                                    required
                                                />
                                            </Form.Group>

                                            <Button variant="dark" type="submit" className="w-100">
                                                Actualizar Producto
                                            </Button>
                                        </Form>
                                    </Modal.Body>
                                </Modal>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </>
}