import { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import Search from "../../components/Search";
import { useAuth } from "../../contexts/AuthContext";
import FILTER_TYPE from "../../types/filterTypes";
import Assignments from "../../components/Assignments";
import useFetch from "../../hooks/useFetch";

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState(null);
  const [filteredAssignments, setFilteredAssignments] = useState(null);
  const [refreshAssignments, setRefreshAssignments] = useState(false);

  const { user, accessToken } = useAuth();
  const { fetchedData, loading, error, fetchData } = useFetch();

  const fetchAssignments = async () => {
    await fetchData(import.meta.env.VITE_API_URL + `/api/assignments/${user.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  useEffect(() => {
    if (fetchedData) {
      setAssignments(fetchedData);
      setFilteredAssignments(fetchedData);
    }
  }, [fetchedData]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const updateAssignmentCompletion = (assignmentId, isCompleted) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId ? { ...a, isCompleted } : a
      )
    );
    setFilteredAssignments((prev) =>
      prev.map((a) =>
        a.id === assignmentId ? { ...a, isCompleted } : a
      )
    );
  };

  return (
    <div>
      <Heading title={"Assignments"} />

      <div className="dark:bg-dark-green rounded-xl p-6">
        <div className="flex flex-col lg:flex-row ">
          <Search
            data={assignments}
            setFilteredData={setFilteredAssignments}
            filters={[FILTER_TYPE.DATE]}
          />
        </div>

        <Assignments
          assignments={filteredAssignments}
          loading={loading}
          updateAssignmentCompletion={updateAssignmentCompletion} // 👉 prosledjuje se
          error={error}
        />
      </div>
    </div>
  );
};

export default AssignmentsPage;
