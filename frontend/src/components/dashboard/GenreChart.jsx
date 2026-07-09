function GenreChart({ data }) {
  return (
    <div>
      <h2>Genre Chart</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default GenreChart;