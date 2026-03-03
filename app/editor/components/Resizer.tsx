import { ResizerProps } from "@/types/props";

const Resizer = ({ onMouseDown }: ResizerProps) => {
  return (
    <div
      onMouseDown={onMouseDown}
      className="w-[3px] cursor-col-resize bg-[#3c3c3c] hover:bg-[#007acc] transition-colors duration-150 flex-shrink-0"
    />
  );
};

export default Resizer;
