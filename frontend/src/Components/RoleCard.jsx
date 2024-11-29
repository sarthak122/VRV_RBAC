export const RoleCard = ({ roleCounts }) => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Admin</h3>
          <p className="text-3xl">{roleCounts?.["Admin"] || 0}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">Moderator</h3>
          <p className="text-3xl">{roleCounts?.["Moderator"] || 0}</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold">User</h3>
          <p className="text-3xl">{roleCounts?.["User"] || 0}</p>
        </div>
      </div>
    </div>
  );
};
