import { Modal, Box, Typography, TextField, Rating } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../Button";
import Image from "next/image";

export interface ReviewInitialValues {
  review: string;
  rating: number;
}

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { review: string; rating: number }) => void;
  productImage: string;
  productName: string;
  mode?: "readOnly";
  values?: ReviewInitialValues;
}

function RatingModal(props: RatingModalProps) {
  const { isOpen, onClose, onSubmit, productImage, productName, values, mode } =
    props;
  const formik = useFormik({
    initialValues: values || {
      review: "",
      rating: 0,
    },
    validationSchema: Yup.object({
      review: Yup.string()
        .required("Review is required")
        .max(500, "Max 500 characters"),
      rating: Yup.number().nullable().required("Rating is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    },
  });
  if (!productName) {
    return null;
  }
  const isReadOnly = mode === "readOnly";
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        className="bg-white p-6 rounded-lg shadow-lg mx-auto mt-32 max-w-md"
        style={{ outline: "none" }}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <Typography
            variant="h6"
            className="text-black-75 font-semibold text-center"
          >
            {isReadOnly?"Thank you for your Rating!":"Rate the Product"}
            
          </Typography>
          <button
            onClick={onClose}
            aria-label="close"
            className="text-gray-600 hover:text-black-75 "
          >
            <i className="la la-times text-xl" />
          </button>
        </div>

        {/* Product Information */}
        <div className="flex items-center mb-4 flex-col">
          <Image
            src={productImage}
            alt={productName}
            width={64}
            height={64}
            className="object-cover rounded mr-4"
          />
          <Typography variant="subtitle1" className="text-gray-800">
            {productName}
          </Typography>
        </div>

        {/* Rating Instructions */}
        <Typography variant="body2" className="text-black-50 mb-2 text-center">
          {!isReadOnly && "Please rate your experience with this product:"}
        </Typography>

        {/* Rating Component */}
        <div className="flex items-center mb-4 flex-col">
          <Rating
            name="product-rating"
            value={formik.values.rating}
            onChange={(event, newValue) =>
              formik.setFieldValue("rating", newValue)
            }
            readOnly={isReadOnly}
            size="large"
          />
          {formik.touched.rating && formik.errors.rating && (
            <Typography className="text-red-500 text-xs mt-2">
              {formik.errors.rating}
            </Typography>
          )}
        </div>

        {/* Review TextField */}
        <TextField
          label={isReadOnly ? "Your review" : "Write your review"}
          multiline
          rows={4}
          fullWidth
          value={formik.values.review}
          onChange={formik.handleChange}
          name="review"
          className="mb-4"
          error={formik.touched.review && Boolean(formik.errors.review)}
          helperText={formik.touched.review && formik.errors.review}
          inputProps={{ maxLength: 500 }}
          slotProps={{ input: { readOnly: isReadOnly } }}
        />
        {!isReadOnly && (
          <Typography className="text-gray-500 text-right text-sm">
            {formik.values.review.length}/500
          </Typography>
        )}

        {/* Button Group */}
        {!isReadOnly && (
          <div className="flex justify-between mt-4">
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => formik.handleSubmit()}>
              Submit
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
}

export default RatingModal;
