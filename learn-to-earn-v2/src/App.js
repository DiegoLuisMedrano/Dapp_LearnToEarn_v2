// Importa las bibliotecas necesarias
import React, { useState, useEffect } from "react";
import { agregarCurso, completarCurso, obtenerNumeroCursosCompletados, verificarCursoCompletado } from "./SmartContract";

function App() {
  const [cursos, setCursos] = useState([]);
  const [tituloCurso, setTituloCurso] = useState("");

  // Función para cargar los cursos completados por el usuario
  const cargarCursosCompletados = async (usuario) => {
    const numeroCursos = await obtenerNumeroCursosCompletados(usuario);
    const cursosCompletados = [];

    for (let i = 0; i < numeroCursos; i++) {
      const cursoCompletado = await verificarCursoCompletado(usuario, i);
      if (cursoCompletado) {
        cursosCompletados.push(i);
      }
    }

    return cursosCompletados;
  };

  // Carga los cursos completados por el usuario al cargar la página
  useEffect(() => {
    const loadCursos = async () => {
      const cursosCompletados = await cargarCursosCompletados(window.ethereum.selectedAddress);
      setCursos(cursosCompletados);
    };

    loadCursos();
  }, []);

  // Función para agregar un nuevo curso
  const handleAgregarCurso = async (e) => {
    e.preventDefault();
    await agregarCurso(tituloCurso);
    setTituloCurso("");
    window.location.reload();
  };

  // Función para completar un curso
  const handleCompletarCurso = async (cursoId) => {
    await completarCurso(cursoId);
    window.location.reload();
  };

  return (
    <div>
      <h1>Mis Cursos</h1>

      <form onSubmit={handleAgregarCurso}>
        <input type="text" value={tituloCurso} onChange={(e) => setTituloCurso(e.target.value)} placeholder="Ingrese el título del curso" />
        <button type="submit">Agregar Curso</button>
      </form>

      <h2>Cursos:</h2>
      <ul>
        {cursos.map((cursoId) => (
          <li key={cursoId}>
            Curso {cursoId}. Completado.
          </li>
        ))}
      </ul>

      <h2>Cursos disponibles:</h2>
      <ul>
        {cursos.map((cursoId) => (
          <li key={cursoId}>
            Curso {cursoId}. Pendiente.
            <button onClick={() => handleCompletarCurso(cursoId)}>Completar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
