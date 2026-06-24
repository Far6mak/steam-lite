import { useState } from "react";
import { useGameStore } from "../store/gameStore";

// Импорты из @dnd-kit
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Компонент для одного элемента библиотеки с поддержкой перетаскивания
const SortableLibraryItem = ({ game, isRunning, toggleGame, removeFromLibrary }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: game.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="library-item">
      {/* Drag-ручка — абсолютно позиционирована */}
      <span {...attributes} {...listeners} className="drag-handle">
        ☰
      </span>

      {/* Левая часть — информация и кнопка Play */}
      <div className="library-left">
        <div className="library-info">
          <h3>{game.title}</h3>
          <p>{game.genre}</p>
          <p>⭐ {game.rating}</p>
        </div>

        <button
          className={isRunning ? "play-btn running" : "play-btn"}
          onClick={() => toggleGame(game.id)}
        >
          {isRunning ? "Close" : "Play"}
        </button>
      </div>

      {/* Кнопка Remove */}
      <button
        className="remove-btn"
        onClick={() => removeFromLibrary(game.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default function Library() {
  const library = useGameStore((state) => state.library);
  const removeFromLibrary = useGameStore((state) => state.removeFromLibrary);
  const reorderLibrary = useGameStore((state) => state.reorderLibrary);

  const [runningGames, setRunningGames] = useState([]);

  const toggleGame = (gameId) => {
    setRunningGames((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  };

  // Настройка сенсоров для DnD
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Обработчик окончания перетаскивания
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = library.findIndex((item) => item.id === active.id);
      const newIndex = library.findIndex((item) => item.id === over.id);
      reorderLibrary(oldIndex, newIndex);
    }
  };

  return (
    <div className="page">
      <h2>Library</h2>

      {library.length === 0 ? (
        <p style={{ opacity: 0.6 }}>Your library is empty</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={library.map((g) => g.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="library-list">
              {library.map((game) => {
                const isRunning = runningGames.includes(game.id);

                return (
                  <SortableLibraryItem
                    key={game.id}
                    game={game}
                    isRunning={isRunning}
                    toggleGame={toggleGame}
                    removeFromLibrary={removeFromLibrary}
                  />
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}