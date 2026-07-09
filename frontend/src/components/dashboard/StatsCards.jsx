function StatsCards({ stats }) {
  return (
    <div>
      <h2>Stats Cards</h2>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}

export default StatsCards;