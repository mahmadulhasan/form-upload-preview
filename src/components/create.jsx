import React, { useState } from "react";
import { useNavigate } from "react-router";

const initialFormData = {
  id: null,
  name: "",
  dob: "",
  age: "",
  describe: "",
  email: "",
  password: "",
  gender: "",
  country: "India",
  terms: false,
  createdAt: "", // date+time
  date: "", // only date (current date)
};

const createForm = () => {
  const now = new Date();
  return {
    ...initialFormData,
    id: Date.now(),
    createdAt: now.toISOString(),
    date: now.toISOString().split("T")[0], // YYYY-MM-DD
  };
};

const passwordValid = (password) => /^(?=.*\d).{8,}$/.test(password);

const Create = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([createForm()]);
  const [errors, setErrors] = useState({});

  const addForm = () => setForms((prev) => [...prev, createForm()]);
  const deleteForm = (id) => setForms((prev) => prev.filter((f) => f.id !== id));

  const updateField = (id, key, value) => {
    setForms((prevForms) =>
      prevForms.map((form) => {
        if (form.id !== id) return form;
        const updated = { ...form, [key]: value };

        if (key === "dob") {
          const birthDate = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          updated.age = age >= 0 ? age : "";
        }
        return updated;
      })
    );
  };

  const validateForms = () => {
    let valid = true;
    const newErrors = {};

    forms.forEach((form) => {
      const formErr = {};
      if (!form.name.trim()) formErr.name = "Name is required";
      if (!form.dob) formErr.dob = "Date of Birth is required";
      if (!form.describe.trim()) formErr.describe = "Description is required";
      if (!form.email.trim()) formErr.email = "Email is required";
      if (!form.password) {
        formErr.password = "Password is required";
      } else if (!passwordValid(form.password)) {
        formErr.password = "Must be at least 8 chars & contain a number";
      }
      if (!form.gender) formErr.gender = "Gender is required";
      if (!form.country) formErr.country = "Country is required";
      if (!form.terms) formErr.terms = "You must accept terms";

      if (Object.keys(formErr).length > 0) {
        valid = false;
        newErrors[form.id] = formErr;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handlePreview = () => {
    if (!validateForms()) {
      alert("Please correct the errors before proceeding.");
      return;
    }
    navigate("/preview", { state: { forms } });
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Dynamic Form Builder</h2>

      <div className="text-center mb-4">
        <button className="btn btn-info" onClick={addForm}>
          + Add Form
        </button>
      </div>

      {forms.map((form, index) => {
        const formErr = errors[form.id] || {};
        return (
          <div
            key={form.id}
            className="card shadow-sm p-4 mb-4"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            <h5 className="mb-3">Form {index + 1}</h5>

            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${formErr.name ? "is-invalid" : ""}`}
                value={form.name}
                onChange={(e) => updateField(form.id, "name", e.target.value)}
              />
              <div className="invalid-feedback">{formErr.name}</div>
            </div>

            {/* DOB */}
            <div className="mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                className={`form-control ${formErr.dob ? "is-invalid" : ""}`}
                value={form.dob}
                onChange={(e) => updateField(form.id, "dob", e.target.value)}
              />
              <div className="invalid-feedback">{formErr.dob}</div>
            </div>

            {/* Age */}
            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                value={form.age}
                readOnly
              />
            </div>

            {/* Describe */}
            <div className="mb-3">
              <label className="form-label">Describe</label>
              <textarea
                className={`form-control ${formErr.describe ? "is-invalid" : ""}`}
                value={form.describe}
                onChange={(e) => updateField(form.id, "describe", e.target.value)}
                rows="3"
              ></textarea>
              <div className="invalid-feedback">{formErr.describe}</div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${formErr.email ? "is-invalid" : ""}`}
                value={form.email}
                onChange={(e) => updateField(form.id, "email", e.target.value)}
              />
              <div className="invalid-feedback">{formErr.email}</div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${errors[form.id]?.password ? "is-invalid" : ""}`}
                value={form.password}
                onChange={(e) => {
                  const value = e.target.value;
                  updateField(form.id, "password", value);

                  // Update error immediately on change
                  setErrors((prev) => ({
                    ...prev,
                    [form.id]: {
                      ...prev[form.id],
                      password:
                        !value
                          ? "Password is required"
                          : !passwordValid(value)
                            ? "Must be at least 8 chars & contain a number"
                            : "",
                    },
                  }));
                }}
              />
              {/* Show only this error, live */}
              {errors[form.id]?.password && (
                <div className="text-danger small">{errors[form.id].password}</div>
              )}
            </div>


            {/* Gender */}
            <div className="mb-3">
              <label className="form-label">Gender</label>
              <div>
                {["Male", "Female", "Don't want to disclose"].map((g) => (
                  <div className="form-check form-check-inline" key={g}>
                    <input
                      className={`form-check-input ${formErr.gender ? "is-invalid" : ""
                        }`}
                      type="radio"
                      name={`gender-${form.id}`}
                      value={g}
                      checked={form.gender === g}
                      onChange={(e) =>
                        updateField(form.id, "gender", e.target.value)
                      }
                    />
                    <label className="form-check-label">{g}</label>
                  </div>
                ))}
                {formErr.gender && (
                  <div className="text-danger small">{formErr.gender}</div>
                )}
              </div>
            </div>

            {/* Country */}
            <div className="mb-3">
              <label className="form-label">Country</label>
              <select
                className={`form-select ${formErr.country ? "is-invalid" : ""}`}
                value={form.country}
                onChange={(e) => updateField(form.id, "country", e.target.value)}
              >
                {["India", "USA", "UK"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{formErr.country}</div>
            </div>

            {/* Terms */}
            <div className="form-check mb-3">
              <input
                className={`form-check-input ${formErr.terms ? "is-invalid" : ""}`}
                type="checkbox"
                checked={form.terms}
                onChange={(e) => updateField(form.id, "terms", e.target.checked)}
              />
              <label className="form-check-label">
                I accept the terms and conditions
              </label>
              <div className="invalid-feedback">{formErr.terms}</div>
            </div>

            {/* Hidden fields */}
            <input type="hidden" value={form.createdAt} readOnly />
            <input type="hidden" value={form.date} readOnly />

            {/* Delete */}
            <div className="text-end">
              <button
                className="btn btn-danger"
                onClick={() => deleteForm(form.id)}
              >
                Delete Form
              </button>
            </div>
          </div>
        );
      })}

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handlePreview}>
          Preview All Forms
        </button>
      </div>
    </div>
  );
};

export default Create;
