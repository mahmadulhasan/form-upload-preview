import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [data, setData] = useState([]);
  const [fromState, setFromState] = useState(false);

  useEffect(() => {
    const id = location.state?.id;
    const formsFromState = location.state?.forms || [];

    if (formsFromState.length > 0) {
      // Data from state
      setData(formsFromState);
      setFromState(true);
    } else {
      // No data
      setData([]);
      setFromState(false);
    }
  }, [location.state]);

  const handleSaveSubmit = () => {
    const storedForms = JSON.parse(localStorage.getItem("forms") || "[]");
    const updatedForms = [...storedForms, ...data];
    localStorage.setItem("forms", JSON.stringify(updatedForms));

    // Clear the state after save
    navigate("/preview", { state: {} });
    alert("Data saved successfully!");
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Form Preview</h2>

      {data.length === 0 ? (
        <p className="text-center">No data present.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Age</th>
                <th>Description</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Country</th>
                <th>Terms Accepted</th>
              </tr>
            </thead>
            <tbody>
              {data.map((form, index) => (
                <tr key={form.id}>
                  <td>{index + 1}</td>
                  <td>{form.name}</td>
                  <td>{form.dob}</td>
                  <td>{form.age}</td>
                  <td>{form.describe}</td>
                  <td>{form.email}</td>
                  <td>{form.gender}</td>
                  <td>{form.country}</td>
                  <td>{form.terms ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center mt-3">
        <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSaveSubmit}
          disabled={!fromState}
        >
          💾 Save & Submit
        </button>
      </div>
    </div>
  );
};

export default Preview;
