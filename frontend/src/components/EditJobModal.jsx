import { useState } from 'react';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';
import './AddJobModal.css';

function EditJobModal({ job, onClose, onJobUpdated }) {
  const [company, setCompany] = useState(job.company);
  const [position, setPosition] = useState(job.position);
  const [status, setStatus] = useState(job.status);
  const [jobType, setJobType] = useState(job.jobType || 'full-time');
  const [jobLocation, setJobLocation] = useState(job.jobLocation || 'remote');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.put(`/jobs/${job._id}`, { company, position, status, jobType, jobLocation });
      showToast('Application updated', 'success');
      onJobUpdated();
    } catch (err) {
      setError(err.response?.data?.error || 'Could not update job. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Edit application</span>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="edit-company">Company</label>
            <input id="edit-company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </div>
          <div className="auth-field">
            <label htmlFor="edit-position">Position</label>
            <input id="edit-position" type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
          </div>
          <div className="modal-row">
            <div className="auth-field">
              <label htmlFor="edit-status">Status</label>
              <select id="edit-status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="auth-field">
              <label htmlFor="edit-jobType">Job type</label>
              <select id="edit-jobType" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>
          <div className="auth-field">
            <label htmlFor="edit-jobLocation">Location</label>
            <input id="edit-jobLocation" type="text" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} />
          </div>
          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJobModal;