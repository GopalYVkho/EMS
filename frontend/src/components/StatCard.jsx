
const StatCard = ({ title, value, valueColor = "text-gray-800" }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className={`text-2xl sm:text-3xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
};

export default StatCard;