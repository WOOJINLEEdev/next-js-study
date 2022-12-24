import { useState, useEffect } from "react";

import { formatDate } from "utils/format-date";

const useFormatDate = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const now = new Date();
      const yymmdd = formatDate(now, "YYYY.MM.DD");
      const hhmm = formatDate(now, "hh:mm");

      setDate(yymmdd);
      setTime(hhmm);
    }
  }, []);

  return {
    date,
    time,
  };
};

export default useFormatDate;
