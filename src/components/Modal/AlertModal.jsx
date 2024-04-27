

import swal from 'sweetalert';
import React, { useEffect } from 'react';

const AlertComponent = ({
  title,
  text,
  icon,
  buttons,
  dangerMode,
  successMessage,
  errorMessage,
  handelDeleteConfirm,
  handelDeleteClose
}) => {
  useEffect(() => {
    swal({
      title: title,
      text: text,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((result) => {
      if (result) {
        handelDeleteConfirm();
        swal(successMessage || "Success!", {
          icon: "success",
        });
      } else {
        swal(errorMessage || "Cancelled!");
        handelDeleteClose();
      }
    });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return null; // React components must return something, but since swal handles the UI, we return null
};

export default AlertComponent;

