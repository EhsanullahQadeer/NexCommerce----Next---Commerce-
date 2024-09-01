import Button from "@/components/Button";
import { useState } from "react";
import { dotColors, statusColors, TICKET, tickets } from "./data";
import TicketsDetails from "./TicketDetail";
import CreateTicketForm from "./CreateTicket";

const SupportTickets = () => {
  const [visibleTickets, setVisibleTickets] = useState(4);
  const [selectedTicket, setSelectedTicket] = useState<TICKET | null>(null);
  const [showForm, setShowForm] = useState<Boolean>(false);

  const loadMoreTickets = () => {
    setVisibleTickets((prev) => prev + 4);
  };

  return (
    <div className="mt-1.5">
      {showForm ? (
        <CreateTicketForm setShowForm={setShowForm} />
      ) : selectedTicket ? (
        <TicketsDetails
          data={selectedTicket}
          setSelectedTicket={setSelectedTicket}
        />
      ) : (
        <div>
          <header className="flex justify-between items-center">
            <h1
              className={`text-[22px] sm:text-[22px] text-black-75
         tracking-[-1px] leading-[44px]`}
            >
              Support Tickets
            </h1>
            <Button
              className="uppercase"
              size="xs"
              onClick={() => setShowForm(true)}
            >
              Create Ticket
              <i className="las la-plus ml-2"></i>
            </Button>
          </header>

          <div className="space-y-4 mt-4">
            {tickets.slice(0, visibleTickets).map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 w-full bg-white shadow-md cursor-pointer"
                onClick={() => setSelectedTicket(item)}
              >
                {/* Critical Status */}
                <Button
                  className={`!px-3 !py-1 !text-xs !font-bold !rounded uppercase ${
                    statusColors[item.criticalStatus]
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div
                      className={`w-2 h-2 rounded-full mr-2 ${
                        dotColors[item.criticalStatus]
                      }`}
                    ></div>
                    {item.criticalStatus}
                  </div>
                </Button>

                {/* Title */}
                <h3 className="text-black-75 text-lg my-2 ml-1">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-black-500 text-sm mb-4 ml-1">
                  {item.description}
                </p>

                {/* File Name */}
                <Button
                  size="xs"
                  variant="primary"
                  className="!rounded-lg !p-0 !px-3 !py-1 !font-normal hover:!bg-black-300 !bg-black-300 !border-black-300 !text-black-500"
                >
                  <i className="las la-file-invoice mr-1 text-lg"></i>

                  {item.uploadedFileName}
                </Button>
              </div>
            ))}
          </div>

          {visibleTickets < tickets.length && (
            <div className="flex justify-center mt-4">
              <Button className="uppercase" onClick={loadMoreTickets}>
                Load More <i className="las la-sync ml-2"></i>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SupportTickets;
