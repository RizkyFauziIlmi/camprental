import { FaBoxes } from "react-icons/fa";
export const ItemNotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col gap-2 items-center justify-center">
      <FaBoxes className="w-12 h-12" />
      <div className="text-center">
        <div className="text-lg font-semibold">Item Not Found</div>
        <small className="text-sm text-muted-foreground font-medium leading-none">
          Please try again, change the query!
        </small>
      </div>
    </div>
  );
};
