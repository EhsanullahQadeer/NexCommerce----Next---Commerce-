import Stars from '../Stars';

const Description = () => {
  return (
    <div>
      <h2 className="text-2xl text-black-75 font-light mb-2.5 tracking-[-0.6px] leading-[30px]">
        Linen-blend dress
      </h2>
      <h3 className="text-2xl text-black-75 font-light mb-2.5 tracking-[-0.6px] leading-[30px]">
        $60.00
      </h3>
      <Stars count={5} reviewCount={2} />
      <p className='mt-[17px] mb-10 font-extralight text-sm text-black-100 leading-[26.04px]'>
        Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae
        luctus metus libero eu augue.
      </p>
    </div>
  );
};

export default Description;
