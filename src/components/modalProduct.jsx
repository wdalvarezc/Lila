import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function CreateProductModal({ onSave }) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        description: "",
        quantity: "",
        price: "",
        category: ""
    });

    // Abrir / cerrar modal
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // Manejo de cambios
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Guardar producto
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSave) {
            onSave(formData);
        }
        setFormData({ name: "", sku: "", description: "", price: "", quantity: "", category: "" });
        handleClose();
    };

    return (
        <>
            {/* Botón que abre el modal */}
            <Button variant="primary" onClick={handleShow}>
                ➕ Crear Producto
            </Button>

            {/* Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Producto</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ej: Camiseta Azul"
                                required
                            />
                        </Form.Group>

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
                                placeholder="Ej: 10"
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

                        <Button variant="success" type="submit" className="w-100">
                            Guardar Producto
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateProductModal;
