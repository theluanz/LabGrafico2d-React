interface IProps {
  children: string;
  onClick?: () => void;
}

function Button({ children, onClick }: IProps) {
  return (
    <button
      className="px-4 py-2 mt-2 bg-blue-400 shadow  text-blue-900 rounded-lg hover:bg-blue-500hover:text-white hover:shadow-lg transition-colors
      "
      onClick={onClick}>
      {children}
    </button>
  );
}

export { Button };
