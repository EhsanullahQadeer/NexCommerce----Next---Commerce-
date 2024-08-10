import Input from '../Input';

const MobileSearchBar = () => {
  return (
    <div className="relative flex pt-[42px] px-5 mt-2.5 mb-[15px] items-center">
      <Input
        placeholder="Search in..."
        className="!rounded-none h-9 !bg-transparent !border-black-400 !text-white placeholder-gray-500 max-w-[204px] text-xs font-extralight focus:!border-primary !px-[15px] border-r-none"
        required
      />
      <div className="flex h-9 w-9 bg-primary items-center justify-center cursor-pointer hover:bg-secondary">
        <i className="las la-search text-xs text-white"></i>
      </div>
    </div>
  );
};

export default MobileSearchBar;
