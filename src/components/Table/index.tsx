import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';

export type ColumnHeaders = {
  key: string;
  title: string;
  renderCell?: (cell: TableData, header: ColumnHeaders) => ReactNode;
  renderHeader?: (header: ColumnHeaders) => ReactNode;
  class?: string;
};

type TableData = {
  [key: string]: string | number | boolean;
};

interface TableProps {
  headers: ColumnHeaders[];
  data: TableData[];
  className?: string;
}

const Table: FC<TableProps> = ({ headers, data, className }) => {
  return (
    <table
      className={cn(
        'table-auto w-full border border-black-300 lg:border-0',
        className
      )}
    >
      <thead className="hidden lg:table-header-group">
        <tr className="border-b border-black-300">
          {headers?.map((header) => (
            <th
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
        {data?.map((item, index) => (
          <tr
            key={index}
            className="relative block lg:table-row border-b border-black-300 py-[42px] lg:py-0"
          >
            {headers?.map((header) => (
              <td
                key={header.key}
                className="px-[30px] lg:px-0 py-0 lg:py-[30px] !block w-full lg:w-auto text-center lg:text-left lg:!table-cell"
              >
                {header.renderCell
                  ? header?.renderCell(item, header)
                  : item?.[header.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
