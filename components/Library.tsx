import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
interface LibraryProps {}

const Library: React.FC<LibraryProps> = ({}) => {
  const onClick = () => {
    //handle upload songs
  };
  return (
    <div className="flex flex-col">
      <div
        className="flex 
      items-center
      justify-between
      px-5
      pt-4
      "
      >
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={24} className="text-neutral-400"></TbPlaylist>
          <p className=" text-neutral-400 font-medium gap-x-2">Your Library</p>
        </div>
        <AiOutlinePlus
          size={24}
          className="text-neutral-400 hover:text-white cursor-pointer transition"
          onClick={onClick}
        ></AiOutlinePlus>
      </div>
      <div className=" flex flex-col gap-y-2 mt-4 px-3"> List of songs!</div>
    </div>
  );
};

export default Library;
