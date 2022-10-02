import { useState, useEffect } from "react";

const useCheckRole = (data) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    if (data === "ADMIN") {
      setIsAdmin(true);
    } else if (data === "TEACHER") {
      setIsTeacher(true);
    } else if (data === "STUDENT") {
      setIsStudent(true);
    }
  }, []);
  return {
    isAdmin,
    isTeacher,
    isStudent,
  };
};

export default useCheckRole;
