// Importa las bibliotecas necesarias
import { ethers } from 'ethers';

// Aquí está el ABI de tu contrato
const ABI = [
  { 
    "type": "function",
    "name": "getName",
    "inputs": [],
    "outputs": [ { "name": "", "type": "string" } ]
  },

// Dirección del contrato en Ethereum
const contractAddress = '0xC13268548929d4184f4433df5De6416AAb67f08a';

// Crea una instancia de tu contrato utilizando la dirección
const contract = new ethers.Contract(contractAddress, ABI, provider);

// Abre una conexión a Ethereum utilizando Metamask
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

export const agregarCurso = async (titulo) => {
  try {
    await contract.agregarCurso(titulo);
  } catch (error) {
    console.error(error);
  }
};

export const completarCurso = async (cursoId) => {
  try {
    await contract.completarCurso(cursoId);
  } catch (error) {
    console.error(error);
  }
};

export const obtenerNumeroCursosCompletados = async (usuario) => {
  try {
    const numeroCursos = await contract.obtenerNumeroCursosCompletados(usuario);
    return numeroCursos.toNumber();
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const verificarCursoCompletado = async (usuario, cursoId) => {
  try {
    const cursoCompletado = await contract.verificarCursoCompletado(usuario, cursoId);
    return cursoCompletado;
  } catch (error) {
    console.error(error);
    return false;
  }
};
