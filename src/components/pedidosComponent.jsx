import PedidoTable from "./pedidoTable";
import { useEffect, useState } from 'react';
import api from '../instances/axios'
import { Spinner } from 'react-bootstrap';



export default function PedidosComponent() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(true);


    async function handleChange(id, status) {
        try {
            await api.patch(`orders/${id}/status`, {
                status,
            });
            alert("Estado actualizado con éxito ✅");
            await cargarDatos();
        } catch (error) {
            console.error(error);
            alert("Error al actualizar estado ❌");
        }

    }
    const cargarDatos = async () => {
        setDate("")
        setLoading(true);
        try {
            const response = await api.get('orders');
            setPedidos(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            alert("Error al cargar datos ❌");
        } finally {
            setLoading(false);
        }
    };

    const cargarFecha = async (fechaFiltro) => {
        setDate(fechaFiltro);
        setLoading(true);
        try {
            const res = await api.get("orders/date/", {
                params: fechaFiltro ? { date: fechaFiltro } : {}, // se manda ?fecha=YYYY-MM-DD si hay filtro
            });
            setPedidos(res.data);
        } catch (error) {
            console.error(error);
            alert("Error al cargar datos ❌");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    return (
        <>
            {
                loading ? (
                    <div className="text-center my-4" >
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <>
                        <PedidoTable Orders={pedidos ? pedidos : []} handleChange={handleChange} cargarFecha={cargarFecha} date={date} cargarDatos={cargarDatos} />
                    </>
                )
            }
        </>
    )
}
