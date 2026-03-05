import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const EMOJI_KEYWORDS = [
  [/\b(compra|tienda|supermercado|mercado)\b/i, '🛒'],
  [/\b(leche|comida|comer|cocina|cocinar|receta|almuerzo|cena|desayuno)\b/i, '🍽️'],
  [/\b(llam|tele|teléfono|móvil|celular)\b/i, '📞'],
  [/\b(doctor|médico|salud|hospital|cita|dentista|medicina)\b/i, '🏥'],
  [/\b(correo|email|mensaje|carta|enviar)\b/i, '📧'],
  [/\b(reporte|informe|documento|archivo|excel|pdf)\b/i, '📄'],
  [/\b(reunión|meeting|junta|equipo)\b/i, '👥'],
  [/\b(estudiar|estudio|libro|leer|lectura|curso|clase|examen)\b/i, '📚'],
  [/\b(ejercicio|gym|gimnasio|correr|deporte|entrenar)\b/i, '🏋️'],
  [/\b(limpiar|limpieza|ordenar|barrer|fregar)\b/i, '🧹'],
  [/\b(viaje|viajar|vuelo|hotel|vacaciones|maleta)\b/i, '✈️'],
  [/\b(trabajo|oficina|proyecto|tarea)\b/i, '💼'],
  [/\b(pagar|pago|banco|dinero|factura|cuenta)\b/i, '💰'],
  [/\b(cumpleaños|fiesta|regalo|celebr)\b/i, '🎉'],
  [/\b(mascota|perro|gato|veterinario)\b/i, '🐾'],
  [/\b(presentación|diapositiva|slide|powerpoint|preparar)\b/i, '📊'],
  [/\b(revisar|revisión|check|verificar)\b/i, '✅'],
]

function getTaskEmoji(title) {
  for (const [pattern, emoji] of EMOJI_KEYWORDS) {
    if (pattern.test(title)) return emoji
  }
  return '📌'
}

function TaskItem({ task, onToggle, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-item${isDragging ? ' dragging' : ''}`}
      {...attributes}
    >
      <span className="drag-handle" {...listeners}>⠿</span>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="task-checkbox"
      />
      <span className={task.completed ? 'task-title completed' : 'task-title'}>
        {getTaskEmoji(task.title)} {task.title}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="btn btn-delete"
      >
        Eliminar
      </button>
    </div>
  )
}

export default TaskItem
