function RecentActivity({ data }) {
  return (
    <div>
      <h2>Recent Activity</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default RecentActivity;