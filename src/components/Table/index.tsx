'use client';
import { cn } from '@/lib/utils';
import { selectCart } from '@/store/slices/cart/cartSlice';
import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';

export type ColumnHeaders = {
  key: string;
  title: string;
  renderCell?: (cell: TableData, header: ColumnHeaders) => ReactNode;
  renderHeader?: (header: ColumnHeaders) => ReactNode;
  class?: string;
};

type TableData = {
  [key: string]: string | number | boolean | any;
};

interface TableProps {
  headers: ColumnHeaders[];
  className?: string;
}

const Table: FC<TableProps> = ({ headers, className }) => {
  const {cartDetails} = useSelector(selectCart)

  console.log("cartDetails", cartDetails);
  

  return (
    <table
      className={cn(
        'table-auto w-full border border-black-300 lg:border-0',
        className
      )}
    >
      <thead className="hidden lg:table-header-group">
        <tr className="border-b border-black-300">
          {headers?.map((header, index) => (
            <th
              key={index}
              className={cn(
                'text-black-200 text-sm font-light leading-[1.5] py-[14px] text-left',
                header.class,
                '!block lg:!table-cell'
              )}
            >
              {header.renderHeader
                ? header?.renderHeader(header)
                : header.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cartDetails?.map((item, index) => (
          <tr
            key={index}
            className="relative block lg:table-row border-b border-black-300 py-[42px] lg:py-0"
          >
            {headers?.map((header, index) => (
              <td
                key={index}
                className="px-[30px] lg:px-0 py-0 lg:py-[30px] !block w-full lg:w-auto text-center lg:text-left lg:!table-cell"
              >
                {header.renderCell
                  ? header?.renderCell(item, header)
                  : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
