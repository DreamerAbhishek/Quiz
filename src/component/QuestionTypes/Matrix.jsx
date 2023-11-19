import React from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// const Matrix = () => {
//   const rows = ["Item A", "Item B", "Item C"];
//   const columns = ["Option 1", "Option 2", "Option 3"];

//   const [matches, setMatches] = React.useState([]);

//   const handleMatch = (row, column) => {
//     const existingMatchIndex = matches.findIndex(
//       (match) => match.row === row && match.column === column
//     );

//     if (existingMatchIndex !== -1) {
//       // If the match already exists, remove it
//       const updatedMatches = [...matches];
//       updatedMatches.splice(existingMatchIndex, 1);
//       setMatches(updatedMatches);
//     } else {
//       // Add the new match
//       setMatches([...matches, { row, column }]);
//     }
//   };

//   const handleSubmit = () => {
//     // Implement scoring or other logic here
//     console.log("User Matches:", matches);
//   };

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th></th>
//             {columns.map((column, columnIndex) => (
//               <th key={columnIndex}>{column}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               <td>{row}</td>
//               {columns.map((column, columnIndex) => (
//                 <td key={columnIndex} onClick={() => onMatch(row, column)}>
//                   Match
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

const ItemTypes = {
  STRING: "string",
  IMAGE: "image",
};

const DraggableItem = ({ type, content, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type,
    item: { content },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        border: "1px solid #ccc",
        padding: "8px",
        margin: "4px",
        backgroundColor: "#fff",
      }}
    >
      {content}
    </div>
  );
};

const DroppableCell = ({ onDrop, children }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [ItemTypes.STRING, ItemTypes.IMAGE],
    drop: (item) => onDrop(item.content),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <td
      ref={drop}
      style={{
        border: `2px solid ${isActive ? "green" : "black"}`,
        height: "60px",
        width: "60px",
        textAlign: "center",
        verticalAlign: "middle",
      }}
    >
      {children}
    </td>
  );
};

const DragDropQuizApp = () => {
  const [droppedItems, setDroppedItems] = React.useState([]);

  const handleDrop = (content) => {
    setDroppedItems([...droppedItems, content]);
  };

  const renderDroppedItems = () => {
    return droppedItems.map((item, index) => (
      <div key={index} style={{ margin: "4px" }}>
        {item}
      </div>
    ));
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <DndProvider backend={HTML5Backend}>
              <DroppableCell onDrop={handleDrop} />
              <DroppableCell onDrop={handleDrop} />
              <DroppableCell onDrop={handleDrop} />
            </DndProvider>
          </tr>
        </tbody>
      </table>

      <DndProvider backend={HTML5Backend}>
        <div style={{ marginTop: "20px" }}>
          <DraggableItem
            type={ItemTypes.STRING}
            content="String 1"
            onDrop={handleDrop}
          />
          <DraggableItem
            type={ItemTypes.STRING}
            content="String 2"
            onDrop={handleDrop}
          />
          <DraggableItem
            type={ItemTypes.IMAGE}
            content={<img src="image1.jpg" alt="Imag 1" />}
            onDrop={handleDrop}
          />
          <DraggableItem
            type={ItemTypes.IMAGE}
            content={<img src="image2.jpg" alt="Imag 2" />}
            onDrop={handleDrop}
          />
        </div>
      </DndProvider>
      <div style={{ marginTop: "20px" }}>
        Dropped Items:
        {renderDroppedItems()}
      </div>
    </div>
  );
};

export default DragDropQuizApp;
