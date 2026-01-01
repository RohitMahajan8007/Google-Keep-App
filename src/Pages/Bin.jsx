const Bin = ({ notes, deleteForever }) => {
  if (!notes.length) return <p>No notes in bin</p>;

  return (
    <div className="space-y-3">
      {notes.map((n) => (
        <div key={n.id} className="p-3 border rounded flex justify-between">
          <span>{n.title}</span>
          <button onClick={() => deleteForever(n.id)}>
            Delete Forever
          </button>
        </div>
      ))}
    </div>
  );
};
export default Bin;
