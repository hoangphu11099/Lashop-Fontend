const symbols = ["◉", "⌨", "◍", "♧", "◒", "▣"];
export default function Art({ p, index = 0 }) {
  return (
    <div className={"art art-" + (index % 6)}>
      {p.image ? (
        <img
          src={p.image}
          alt={p.name}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <span aria-hidden="true">{symbols[index % 6]}</span>
      )}
    </div>
  );
}
