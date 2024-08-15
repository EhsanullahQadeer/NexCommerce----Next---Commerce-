export const Label = ({ text }: { text: string }) => {
  return (
    <label className="inline-flex uppercase items-center w-[67px] text-sm font-light leading-[26.04px] text-black-75">
      {text}:{' '}
    </label>
  );
};
