import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-container mx-auto px-2.5">
      {children}
    </div>
  )
}

export default Container;
