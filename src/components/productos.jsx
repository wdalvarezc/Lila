import ProductTable from "./productTable";
import { useEffect, useState } from 'react';
import api from '../instances/axios';
import CreateProductModal from "./modalProduct";


export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);


    async function handleSaveProduct(productData) {
        try {
            await api.post(`products`, productData);
            alert("Estado actualizado con éxito ✅");
            await fetchProductos();
        } catch (error) {
            console.error(error);
            alert("Error al actualizar estado ❌");
        }
    };
    const fetchProductos = async () => {
        try {
            const response = await api.get('products');
            setProductos(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        } finally {
            console.log('ok')
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);
    return (
        <>
            <ProductTable Products={productos ? productos : []} loading={loading} fetchProductos={fetchProductos} />
            <div className="d-flex justify-content-center">
                <CreateProductModal onSave={handleSaveProduct} />
            </div>
        </>
    )
}