const Title = ({ text1, text2 }) => {
  return (
    <div className="mb-6">
      <p className="text-3xl text-gray-800">
        {text1} <span className="font-medium">{text2}</span>
      </p>
    </div>
  );
};

export default Title;
