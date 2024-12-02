const Title = ({ text1, text2 }) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-8 h-8 bg-[#cba035] rounded-full flex items-center justify-center">
        <span className="text-white text-sm font-bold">★</span>
      </div>
      <p className="text-xl font-medium text-gray-800">
        {text1} <span className="text-[#cba035]">{text2}</span>
      </p>
    </div>
  );
};

export default Title;
