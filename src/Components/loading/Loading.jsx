import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading-container position-fixed">
      <div className="loading-content">

        <h2 className="text-center">PousaÊ</h2>
        <p className="text-center">Carregando...</p>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}