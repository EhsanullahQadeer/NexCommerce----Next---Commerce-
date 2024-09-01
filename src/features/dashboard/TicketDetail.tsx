import Button from "@/components/Button";
import { useState } from "react";
import { Comment, commentList, dotColors, statusColors, TICKET } from "./data";
import Image from "next/image";
import Input from "@/components/Input";

interface TicketDetailsProps {
  data: TICKET;
  setSelectedTicket: any;
}

const TicketsDetails = ({ data, setSelectedTicket }: TicketDetailsProps) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [comments, setComments] = useState<Comment[]>(commentList);
  return (
    <div className="mt-1.5">
      <header className="flex justify-between items-center">
        <h1
          className={`text-[22px] sm:text-[22px] text-black-75
         tracking-[-1px] leading-[44px]`}
        >
          Support Tickets Details
        </h1>
      </header>

      <div className="space-y-4 mt-4">
        <div
          key={data.id}
          className="border rounded-lg p-4 w-full bg-white shadow-md cursor-pointer"
        >
          <div className="mb-3 flex justify-between">
            <Button
              size="xs"
              className="!bg-white !border-black-300 !text-black-500 !font-semibold !rounded-lg !p-0 !px-2 !py-1"
              onClick={() => setSelectedTicket(null)}
            >
              <i className="las la-arrow-left text-lg mr-2"></i>
              Go Back
            </Button>
            <Button
              className="!bg-red-500 !py-2 !px-3 !text-white !rounded-lg !border-red-600 !font-semibold !text-sm"
              size="xs"
            >
              Close Support Ticket
            </Button>
          </div>
          {/* Critical Status */}
          <Button
            className={`!px-3 !py-1 !text-xs !font-bold !rounded uppercase ${
              statusColors[data.criticalStatus]
            }`}
          >
            <div className="flex justify-between items-center">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  dotColors[data.criticalStatus]
                }`}
              ></div>
              {data.criticalStatus}
            </div>
          </Button>

          {/* Title */}
          <h3 className="text-black-75 text-lg my-2 ml-1">{data.title}</h3>

          {/* Description */}
          <p className="text-black-500 text-sm mb-4 ml-1">{data.description}</p>

          {/* File Name */}
          <Button
            size="xs"
            variant="primary"
            className="!rounded-lg !p-0 !px-3 !py-1 !font-normal hover:!bg-black-300 !bg-black-300 !border-black-300 !text-black-500"
          >
            <i className="las la-file-invoice mr-1 text-lg"></i>

            {data.uploadedFileName}
          </Button>
          <div className="mt-6">
            {comments.map((comment) => (
              <div key={comment.id} className={`border-t pt-4 mt-4`}>
                <div className="flex items-start mb-2">
                  <Image
                    src="/images/user-avatar.jpg"
                    alt={`${comment.user} profile picture`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="ml-3">
                    <div className="flex items-center">
                      <p className="text-black-75 text-sm font-semibold">
                        {comment.user}
                      </p>
                      {comment.userType === "user" && (
                        <i className="las la-check-circle text-blue-800 ml-1"></i>
                      )}
                    </div>
                    <p className="text-black-200 text-xs">
                      {comment.designation}
                    </p>
                    <p className="text-black-500 text-sm mt-1">
                      {comment.comment}
                    </p>
                    <p className="text-black-600 text-xs mt-1">
                      {comment.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Reply Section */}
            {!showReplyInput && (
              <div className="flex items-center mt-4 gap-3">
                <Image
                  src="/images/user-avatar.jpg"
                  alt="User profile picture"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <Button
                  size="xs"
                  variant="outlined"
                  className="!bg-white !border-black-300 !text-black-500 !rounded-lg"
                  onClick={() => setShowReplyInput(true)}
                >
                  <i className="las la-reply text-lg mr-2"></i>
                  Reply
                </Button>
              </div>
            )}

            {showReplyInput && (
              <div className="mt-4 flex gap-3">
                <Image
                  src="/images/user-avatar.jpg"
                  alt="User profile picture"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex items-center justify-between gap-2 w-full">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter your reply"
                      className="bg-white"
                    />
                  </div>
                  <Button
                    onClick={() => setShowReplyInput(!showReplyInput)}
                    className="!py-2.5"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsDetails;
