import React, { useEffect, useState } from "react";

const FormList = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("forms");
    if (storedData) {
      setForms(JSON.parse(storedData));
    }
  }, []);


  return (
    <div className="container mt-4">
      <h2 className="mb-3">Saved Forms</h2>
      <table className="table table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Age</th>
            <th>Description</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Terms Accepted</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {forms.length > 0 ? (
            forms.map((form, index) => (
              <tr key={form.id}>
                <td>{index + 1}</td>
                <td>{form.name}</td>
                <td>{form.dob}</td>
                <td>{form.age}</td>
                <td>{form.describe}</td>
                <td>{form.email}</td>
                <td>{form.password}</td>
                <td>{form.gender}</td>
                <td>{form.country}</td>
                <td>{form.terms ? "Yes" : "No"}</td>
                <td>
                  {form.createdAt
                    ? new Date(form.createdAt).toLocaleString()
                    : "N/A"}
                </td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center text-muted">
                No saved forms found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FormList;
