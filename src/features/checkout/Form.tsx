import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import TextArea from '@/components/Input/Textarea';

const Form = () => {
  return (
    <form>
      <h2 className="mb-[18px] text-black-75 text-base font-medium leading-[17.6px]">
        Billing Details
      </h2>
      <div className="flex flex-col gap-[13px]">
        <div className="grid sm:grid-cols-2 gap-[13px] sm:gap-5">
          <Input label="First Name *" />
          <Input label="Last Name *" />
        </div>
        <div>
          <Input label="Company Name (Optional)" />
        </div>
        <div>
          <Input label="Country *" />
        </div>
        <div>
          <Input
            label="Street Address *"
            placeholder="House number and Street name"
          />
          <Input
            placeholder="Appartments, suite, unit etc ..."
            className="mt-[13px]"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-[13px] sm:gap-5">
          <Input label="Town / City *" />
          <Input label="State / Country *" />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <Input label="Postcode / ZIP *" />
          <Input label="Phone *" />
        </div>
        <div>
          <Input label="Email *" />
        </div>
        <div className="mt-3">
          <Checkbox
            label="Create an account?"
            labelClass="!text-black-75 !font-light"
          />
        </div>
        <div>
          <Checkbox
            label="Ship to a different address?"
            labelClass="!text-black-75 !font-light"
          />
        </div>
        <div className="">
          <TextArea
            label="Order notes (optional)"
            rows={4}
            placeholder="Notes about your order, e.g. special notes for delivery"
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
