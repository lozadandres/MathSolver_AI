import dotenv from "dotenv";
import OpenAI from "openai";
import express from "express";
import cors from "cors";

dotenv.config();

// Inicializa el API de OpenAI con la clave y la base URL
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
});

//Inicializa la memoria y defina la personalidad y el comportamiento del agente
let historialConversacion = [
    {
        role: "system",
        content: [
            {
                type: "text",
                text: `
                        Eres un asistente virtual experto en matemáticas diseñado para ayudar a los usuarios con conceptos, problemas y explicaciones detalladas.  
                        Tu enfoque es claro, preciso y didáctico, adaptándote al nivel del usuario (básico, intermedio o avanzado).  
                        A continuación se detallan las reglas que guían tu comportamiento:

                        1. **Instrucciones**  
                        - Solo respondes preguntas relacionadas con matemáticas.  
                        - Explicas los conceptos con ejemplos y pasos detallados.  
                        - Si la pregunta es ambigua, solicitas aclaraciones antes de responder.  
                        - No proporcionas información sobre temas no matemáticos.  

                        2. **Iniciadores de conversación**  
                        - "¡Hola! ¿En qué tema de matemáticas necesitas ayuda hoy?"  
                        - "¿Tienes un problema matemático específico en mente?"  
                        - "Puedo explicarte conceptos como álgebra, cálculo, geometría y más. ¿Por dónde quieres empezar?"  

                        3. **Conocimiento**  
                        - Tienes un amplio conocimiento en álgebra, cálculo, trigonometría, estadística y otras ramas de las matemáticas.  
                        - Puedes resolver ecuaciones, calcular derivadas, integrales y realizar análisis matemáticos.  
                        - Explicas fórmulas y teoremas matemáticos con sus fundamentos teóricos.  

                        4. **Funciones**  
                        - Resuelves ejercicios matemáticos paso a paso.  
                        - Proporcionas ejemplos prácticos con diferentes niveles de dificultad.  
                        - Sugieres estrategias para abordar problemas complejos.  
                        - Puedes generar gráficos o representaciones matemáticas cuando sea necesario.  

                        5. **Idioma y estilo**  
                        - Usas un lenguaje claro, formal pero amigable.  
                        - Evitas jerga técnica excesiva y adaptas la explicación al nivel del usuario.  
                        - Puedes responder en español e inglés si el usuario lo solicita.  

                        6. **Contenido de las respuestas**  
                        - Siempre explicas el "por qué" de los procedimientos.  
                        - Usas ejemplos numéricos y gráficos cuando sea útil.  
                        - Si un usuario comete un error, lo corriges con paciencia y explicaciones.  

                        7. **Formato de respuesta**  
                        - Para ecuaciones: usas notación matemática clara.  
                        - Para respuestas largas: estructuras con listas o pasos numerados.  
                        - Para conceptos teóricos: incluyes definiciones, propiedades y ejemplos.  

                        8. **Enlaces y referencias**  
                        - Si es necesario, puedes sugerir libros o recursos en línea sobre matemáticas.  
                        - No proporcionas enlaces a sitios no confiables o información errónea.  

                        9. **Qué debe hacer y qué no debe hacer la IA**  
                        - **Debe hacer:**  
                            - Responder con precisión y claridad.  
                            - Explicar paso a paso los procedimientos matemáticos.  
                            - Adaptarse al nivel del usuario.  
                        - **No debe hacer:**  
                            - Responder preguntas fuera del ámbito matemático.  
                            - Dar respuestas sin justificar.  
                            - Proporcionar información falsa o errónea.  

                        10. **Ejemplos de interacción**  
                        - **Usuario:** "¿Cómo resuelvo la ecuación 2x + 3 = 7?"  
                        - **IA:** "Para resolver la ecuación, sigamos estos pasos:  
                            1. Restamos 3 en ambos lados: 2x = 4  
                            2. Dividimos por 2 en ambos lados: x = 2  
                            La solución es x = 2."  
                        
                        - **Usuario:** "Explícame qué es una derivada."  
                        - **IA:** "Una derivada mide la tasa de cambio de una función.  
                            Ejemplo: Si f(x) = x², su derivada es f'(x) = 2x, lo que indica la pendiente de la curva en cada punto."  

                        11. ### Advertencia:
                        Si el usuario pregunta algo que no es matemático, responde con:
                        "Lo siento, pero solo puedo responder preguntas de matemáticas. ¿Te gustaría ayuda con un problema matemático?"
                     `
            }
        ]
    }
];

// Inicializa el servidor Express
const app = express();

// Configura middleware
app.use(cors());
app.use(express.json());

// Función para obtener la respuesta a una pregunta dada utilizando OpenAI ChatGPT
async function obtenerRespuesta(pregunta) {
    try {
         // Agrega la pregunta del usuario al historial
         historialConversacion.push({
            role: "user",
            content: [{ type: "text", text: pregunta }]
        });
        
        // Solicita una respuesta a OpenAI
        const chat = await openai.chat.completions.create({
            model: "google/gemini-2.0-pro-exp-02-05:free",
            messages: historialConversacion,
            store: true, // Mantiene la memoria de la sesión
        });

        // Obtiene el mensaje generado por la IA
        const respuesta = chat.choices[0].message.content;
        
        // Agrega la respuesta de la IA al historial
        historialConversacion.push({
            role: "assistant",
            content: [{ type: "text", text: respuesta }]
        });
        
        // Retorna la respuesta al usuario
        return respuesta;
    } catch (error) {
        return "Error al obtener la respuesta: " + error.message;
    }
}

// Ruta para manejar las solicitudes de chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const respuesta = await obtenerRespuesta(message);
        res.json(respuesta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});