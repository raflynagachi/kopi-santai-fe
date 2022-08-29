export default function GameLeaderboard({ leaderboard, userID }) {
  return (
    <div>
      <h5>Leaderboard</h5>
      <table className="table border">
        <thead className="bg-info">
          <tr>
            <td>No</td>
            <td>Name</td>
            <td className="text-end">Score</td>
          </tr>
        </thead>
        <tbody>
          {
          leaderboard
            ? leaderboard.map((item, idx) => (
              <tr key={item.userID} className={userID === item.userID ? 'table-active' : ''}>
                <td>{idx + 1}</td>
                <td className="text-start">{item.name}</td>
                <td className="text-end">{item.score}</td>
              </tr>
            ))
            : (
              <tr>
                <td colSpan={3}>No leaderboard</td>
              </tr>
            )
        }
        </tbody>
      </table>
    </div>
  );
}
