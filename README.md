# MathSolver AI - Asistente matemático

MathSolver AI es una aplicación web interactiva que funciona como asistente matemático personal. Mediante inteligencia artificial, proporciona soluciones y explicaciones detalladas para diversos problemas matemáticos, desde aritmética básica hasta cálculo complejo.

## Características

- Interfaz de chat interactiva para consultas matemáticas
- Respuestas en tiempo real con explicaciones detalladas
- Soporte para varios temas matemáticos:
- Resolución de ecuaciones
- Conceptos algebraicos
- Problemas de cálculo
- Cálculos geométricos
- Soluciones paso a paso
- Explicaciones de teoremas

## Tecnologías

- Frontend: React + Vite
- Backend: Node.js
- Integración de IA: OpenAI API

## Project Structure

```
├── frontend/           # React frontend application
│   ├── src/           # Source files
│   ├── public/        # Public assets
│   └── package.json   # Frontend dependencies
├── app.js             # Backend server
├── package.json       # Backend dependencies
└── .env              # Environment variables (not tracked in git)
```

## Instrucciones de instalación

1. Clonar el repositorio:
   ```bash
   git clone [repository-url]
   cd mathsolver-ai
   ```

2. Instalar dependencias del backend:
   ```bash
   npm install
   ```

3. Instalar dependencias del frontend:
   ```bash
   cd frontend
   npm install
   ```

4. Cree un archivo `.env` en el directorio raíz con su clave API de OpenAI:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

5. Iniciar el servidor backend:
   ```bash
   node app.js
   ```

6. Iniciar el servidor de desarrollo frontend:
   ```bash
   cd frontend
   npm run dev
   ```

7. Abra su navegador y navegue hasta `http://localhost:5173`

## Uso

1. Abra la aplicación en su navegador web
2. Escriba su pregunta matemática en el campo de entrada
3. Presione Enter o haga clic en el botón Enviar
4. Reciba explicaciones y soluciones detalladas

## License

This project is licensed under the MIT License - see the LICENSE file for details.
