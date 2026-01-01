const NoResults = ({ text = "No results found" }) => {
  return (
    <div className="text-center text-gray-400 mt-20">
      {text}
    </div>
  );
};

export default NoResults;
