import "./book-view.scss";

export const BookView = ({ book, onBackClick }) => {
  return (
    <div>

      {/* Same code */}

      <button onClick={onBackClick} className="back-button">
        Back
      </button>
    </div>
  );
};