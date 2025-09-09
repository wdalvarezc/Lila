import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Modal } from "react-bootstrap";
import api from '../instances/axios'

const CreateOrderForm = () => {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState({
        customerId: "",
        deliveryDate: "",
        items: [{ productId: "", quantity: 1 }]
    });

    // Estado para el modal de cliente
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [newCustomer, setNewCustomer] = useState({ name: "", address: "", phone: "" });

    // Cargar clientes y productos al iniciar
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const [custRes, prodRes] = await Promise.all([
            api.get("customers"),
            api.get("products")
        ]);
        setCustomers(custRes.data);
        const prodR = prodRes.data.filter((e) => e.quantity > 0)
        console.log(prodR);
        setProducts(prodR);
    };

    // Manejo de inputs
    const handleChange = (e) => {
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...order.items];
        newItems[index][field] = value;
        setOrder({ ...order, items: newItems });
    };

    const addItem = () => {
        setOrder({ ...order, items: [...order.items, { productId: "", quantity: 1 }] });
    };

    const removeItem = (index) => {
        const newItems = order.items.filter((_, i) => i !== index);
        setOrder({ ...order, items: newItems });
    };

    // Crear nuevo cliente
    const handleCustomerSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("customers", newCustomer);
            setCustomers([...customers, res.data]); // agregar a la lista
            setOrder({ ...order, customerId: res.data.id }); // asignar al pedido
            setNewCustomer({ name: "", address: "", phone: "" });
            setShowCustomerModal(false);
        } catch (err) {
            alert("❌ Error al crear cliente: " + err.response?.data?.message);
        }
    };

    // Crear pedido
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("orders", order);
            alert("✅ Pedido creado con éxito");
            setOrder({ customerId: "", deliveryDate: "", items: [{ productId: "", quantity: 1 }] });
        } catch (err) {
            alert("❌ Error al crear pedido: " + err.response?.data?.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-90">
            <Card className="shadow p-4 mt-3 " style={{ width: "80%" }}>
                <h3 className="mb-3 text-center">🛒 Crear Pedido</h3>
                <Form onSubmit={handleSubmit}>
                    {/* Cliente */}
                    <Form.Group className="mb-3">
                        <Form.Label>Cliente</Form.Label>
                        <Row>
                            <Col md={9}>
                                <Form.Select
                                    name="customerId"
                                    value={order.customerId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona un cliente</option>
                                    {customers?.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md={3}>
                                <Button
                                    variant="outline-primary"
                                    onClick={() => setShowCustomerModal(true)}
                                    className="w-100"
                                >
                                    ➕ Nuevo Cliente
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group>

                    {/* Fecha de entrega */}
                    <Form.Group className="mb-3 w-50">
                        <Form.Label>Fecha de Entrega</Form.Label>
                        <Form.Control
                            type="date"
                            name="deliveryDate"
                            value={order.deliveryDate}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {/* Productos dinámicos */}
                    <h5>Productos</h5>
                    {order?.items.map((item, index) => (
                        <Row key={index} className="align-items-end mb-3">
                            <Col md={5}>
                                <Form.Group>
                                    <Form.Label>Producto</Form.Label>
                                    <Form.Select
                                        value={item.productId}
                                        onChange={(e) => handleItemChange(index, "productId", e.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona un producto</option>
                                        {products?.map((p) => (
                                            <option key={p.id} value={p.id}>
                                                {p.name} (Stock: {p.quantity})
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={1}>
                                <Form.Group>
                                    <Form.Label>Cantidad</Form.Label>
                                    <Form.Control
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} className="text-end">
                                {index > 0 && (
                                    <Button variant="danger" onClick={() => removeItem(index)}>
                                        ❌ Quitar
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    ))}

                    <Button variant="secondary" onClick={addItem} className="mb-3">
                        ➕ Agregar otro producto
                    </Button>

                    <div className="text-center">
                        <Button variant="primary" type="submit" size="lg">
                            🚀 Crear Pedido
                        </Button>
                    </div>
                </Form>
            </Card >

            {/* Modal para crear cliente */}
            < Modal show={showCustomerModal} onHide={() => setShowCustomerModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>➕ Nuevo Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleCustomerSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCustomer.name}
                                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCustomer.address}
                                onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCustomer.phone}
                                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                            />
                        </Form.Group>
                        <div className="text-end">
                            <Button variant="secondary" onClick={() => setShowCustomerModal(false)}>
                                Cancelar
                            </Button>{" "}
                            <Button variant="primary" type="submit">
                                Guardar
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal >
        </div>
    );
};

export default CreateOrderForm;
