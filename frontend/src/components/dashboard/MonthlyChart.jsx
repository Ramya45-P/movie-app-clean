function MonthlyChart({ data }) {
  return (
    <div>
      <h2>Monthly Chart</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default MonthlyChart;