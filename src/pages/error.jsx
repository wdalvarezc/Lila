import React from 'react';
import { Image } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Image src="./imagenes/kel.gif" rounded width={500} />
      <p className="text-xl mt-4" style={{color:'white'}}>owwww ahí vamos !!!!!</p>
      <Link to="/" className="mt-6 text-blue-500 underline">
        Volver al inicio
      </Link>
    </div>
  );
}
