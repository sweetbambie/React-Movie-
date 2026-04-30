type DetailItemProps = {
  label: string;
  value: string | number;
};

export const DetailItem = ({ label, value }: DetailItemProps) => {
  return (
    <div className="bg-gray-800/60 rounded-lg p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
};