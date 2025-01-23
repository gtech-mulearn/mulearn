export function Keywords({ keywords }) {
  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword) => (
        <span
          key={keyword}
          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
        >
          {keyword}
        </span>
      ))}
    </div>
  );
}
