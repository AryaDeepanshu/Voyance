import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

/* React Query for add-review Post Request: */
const addReviewMutation = useMutation({
  mutationFn: (review) => {
    return axiosBaseURL.post(`review/add`, review, {
      withCredentials: true,
    });
  },
  onSuccess: () => {
    queryClient.invalidateQueries([`review-${hotelId}`]);
  },
});

/* React Query for update-review Post Request: */
const updateReviewMutation = useMutation({
  mutationFn: (review) => {
    return axiosBaseURL.post(`review/update`, review, {
      withCredentials: true,
    });
  },
  onSuccess: () => {
    queryClient.invalidateQueries([`review-${hotelId}`]);
  },
});

/* React Query for delete-review Post Request: */
const deleteReviewMutation = useMutation({
  mutationFn: (hotelId) => {
    return axiosBaseURL.post(`review/delete`, hotelId, {
      withCredentials: true,
    });
  },
  onSuccess: () => {
    queryClient.invalidateQueries([`review-${hotelId}`]);
  },
});

/* Add Review Method: */
const addReview = () => {
  if (experience === "" || value === 0) {
    toast.error("All fields are required.", {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    return;
  }

  setDisable(true);

  addReviewMutation.mutate({
    hotelId: hotelId,
    star: value,
    review: experience,
  });

  toast.success("Successfully added the review", {
    position: toast.POSITION.BOTTOM_LEFT,
  });

  setValue(0);
  setExperience("");
  setUpdatedValue(0);
  setUpdatedExperience("");

  setDisable(false);
};

/* update Review Method: */
const updateReview = () => {
  if (updatedExperience === "" || updatedValue === 0) {
    toast.error("All fields are required.", {
      position: toast.POSITION.BOTTOM_LEFT,
    });

    return;
  }

  setDisable(true);

  updateReviewMutation.mutate({
    userId: user._id,
    hotelId: hotelId,
    star: updatedValue,
    review: updatedExperience,
  });

  setValue(0);
  setExperience("");
  setUpdatedValue(0);
  setUpdatedExperience("");

  toast.success("Successfully updated the review", {
    position: toast.POSITION.BOTTOM_LEFT,
  });

  setDisable(false);
  setModal(false);
};

/* delete Review Method: */
const deleteReview = () => {
  deleteReviewMutation.mutate({
    userId: user._id,
    hotelId: hotelId,
  });

  setValue(0);
  setExperience("");
  setUpdatedValue(0);
  setUpdatedExperience("");

  toast.success("Successfully deleted the review", {
    position: toast.POSITION.BOTTOM_LEFT,
  });
};
